<!-- eslint-disable vue/valid-v-model -->
<template>
	<div class="fluid text-xs-center">
		<div class="flex flex-wrap">
			<!--  Share or View toggle buttons  -->
			<div style="mb-[1em]">
				<v-btn-toggle v-model="shareOrView" mandatory>
					<button class="btn btn-warning" value="share">Share</button>
					<button class="btn btn-warning" value="view">View</button>
				</v-btn-toggle>
			</div>

			<!-- Player -->
			<div v-if="shareOrView === 'view'">
				<div ref="videoContainerRef">
					<video ref="video0Ref" style="display: none"></video>
					<video ref="video1Ref" style="display: none"></video>
				</div>
				<!-- Turn fullscreen on -->
				<button
					class="btn btn-primary"
					v-if="showFullscreenButton"
					v-on:click="fullScreen()"
					style="font-size: 2em"
				>
					fullscreen
				</button>
			</div>

			<div class="flex">
				<div style="padding: 1em">
					<!-- Server URL -->
					<input type="text" v-model="serverUrl" label="Server URL" />
					<!-- Screen ID -->
					<input
						type="text"
						v-model="screenId"
						label="Screen ID"
						placeholder="Input screen ID"
					/>
					<!-- Passphrase -->
					<input
						label="Passphrase (optional)"
						v-model="passphrase"
						placeholder="Input passphrase"
						:type="showPassphrase ? 'text' : 'password'"
						:append-icon="
							showPassphrase ? 'visibility' : 'visibility_off'
						"
						@click:append="showPassphrase = !showPassphrase"
					/>

					<button
						v-if="shareOrView === 'share'"
						color="primary"
						v-on:click="shareScreen()"
						block
						:disabled="!enableActionButton"
					>
						Share
					</button>

					<button
						v-if="shareOrView === 'view'"
						color="secondary"
						v-on:click="viewScreen()"
						block
						:disabled="!enableActionButton"
					>
						View computer
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* tslint:disable:no-console */
import { ref } from "vue";
import MediaStreamRecorder from "msr";
import urlJoin from "url-join";
import * as t from "io-ts";
import screenfull from "screenfull";

// PipingScreenShareComponent

function blobToArrayBuffer(blob) {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.onerror = () => {
			reject(fileReader.error);
		};
		fileReader.readAsArrayBuffer(blob);
	});
}

function createServerUrl(baseServerUrl, screenId, chunkNum) {
	// TODO: Use digest-hash not to give information for Piping Server
	return urlJoin(baseServerUrl, `screen-share-web/${screenId}/${chunkNum}`);
}

async function passphraseToKey(passphrase) {
	// Convert passphrase string to Uint8Array
	const passphraseU8Array = new TextEncoder().encode(passphrase);
	// Generate key from passphrase by SHA-2156
	const key = new Uint8Array(
		await crypto.subtle.digest("SHA-256", passphraseU8Array)
	);
	return key;
}

// AES-GCM (Initial Vector (IV) is attached on the head)
const IvAesGcm = {
	ivLen: 12,

	async createCryptoKey(passphrase) {
		const passphraseDigest = await passphraseToKey(passphrase);
		return crypto.subtle.importKey(
			"raw",
			passphraseDigest,
			{ name: "AES-GCM", length: 128 },
			false,
			["encrypt", "decrypt"]
		);
	},

	// NOTE: Return-type of encrypt and decrypt is not symmetric.
	async encryptAsBlob(raw, passphrase) {
		// Create IV
		const iv = window.crypto.getRandomValues(new Uint8Array(this.ivLen));
		// Create key from passphrase
		const cryptoKey = await this.createCryptoKey(passphrase);
		// Encrypt
		const encrypted = await crypto.subtle.encrypt(
			{ name: "AES-GCM", iv },
			cryptoKey,
			raw
		);
		return new Blob([iv, encrypted]);
	},

	// NOTE: Return-type of encrypt and decrypt is not symmetric.
	async decryptAsArrayBuffer(encryptedWithIv, passphrase) {
		// Extract IV and encrypted parts
		const iv = encryptedWithIv.slice(0, this.ivLen);
		const encrypted = encryptedWithIv.slice(this.ivLen);
		// Create key from passphrase
		const cryptoKey = await this.createCryptoKey(passphrase);
		return crypto.subtle.decrypt(
			{ name: "AES-GCM", iv },
			cryptoKey,
			encrypted
		);
	},
};

function encodeSeqNum(seqNum) {
	const view = new DataView(new ArrayBuffer(4));
	view.setUint32(0, seqNum, false);
	return view.buffer;
}

function decodeSeqNum(buf) {
	return new DataView(buf).getUint32(0, false);
}

function parseHashAsQuery() {
	const url = new URL(`a://a${location.hash.substring(1)}`);
	return url.searchParams;
}

const video0Ref = ref();
const video1Ref = ref();
const videoContainerRef = ref();

const shareOrView = ref(
	(() => {
		const type = parseHashAsQuery().get("type");
		if (type === null) {
			return "share";
		}
		const typeEither = t
			.union([t.literal("share"), t.literal("view")])
			.decode(type);
		if (typeEither._tag === "Left") {
			return "share";
		}
		return typeEither.right;
	})()
);

const serverUrl = ref(parseHashAsQuery().get("server") ?? "https://ppng.io");
const screenId = ref(parseHashAsQuery().get("screen_id") ?? "");
const passphrase = ref("");
const showPassphrase = ref(false);
const enableActionButton = ref(true);
const showFullscreenButton = ref(false);

async function shareScreen() {
	if (!("getDisplayMedia" in navigator.mediaDevices)) {
		console.error("getDisplayMedia is required");
		return;
	}

	// Disable the button
	enableActionButton.value = false;

	const seqNumToAbortController = new Map();

	const stream = await navigator.mediaDevices.getDisplayMedia({
		video: true,
	});
	const mediaRecorder = new MediaStreamRecorder(stream);
	mediaRecorder.mimeType = "video/mp4";

	let seqNum = 0;
	mediaRecorder.ondataavailable = async (blob) => {
		// Encrypt
		const encryptedBlob = await IvAesGcm.encryptAsBlob(
			await blobToArrayBuffer(new Blob([encodeSeqNum(seqNum), blob])),
			passphrase.value
		);

		const existingAbortController = seqNumToAbortController.get(seqNum);
		if (existingAbortController !== undefined) {
			seqNumToAbortController.delete(seqNum);
			existingAbortController.abort();
		}

		const abortController = new AbortController();
		// Send a blob
		fetch(createServerUrl(serverUrl.value, screenId.value, seqNum % 2), {
			method: "POST",
			body: encryptedBlob,
			signal: abortController.signal,
		});
		seqNumToAbortController.set(seqNum, abortController);
		seqNum++;
	};

	mediaRecorder.start(500);
}

async function viewScreen() {
	// Disable the button
	enableActionButton.value = false;

	// Queue of blob URL
	const blobUrlQueue = [];
	let active = video0Ref?.value;
	let hidden = video1Ref?.value;

	// For waiting the buffer filled
	let waitDoubleBufferResolve = null;
	// Played seq number
	let prevPlayedSeqNum;

	// Double-buffered
	async function doubleBuffer() {
		await new Promise((resolve) => {
			if (blobUrlQueue.length === 0) {
				waitDoubleBufferResolve = resolve;
			} else {
				resolve();
			}
		});
		console.log("double buffer called");
		// Revoke active blob URL because its play has ended
		URL.revokeObjectURL(active.src);
		// Swap video elements
		[active, hidden] = [hidden, active];
		active.play();
		// NOTE: It is never undefined logically because the queue is not empty
		const { blobUrl, seqNum } = blobUrlQueue.shift();
		prevPlayedSeqNum = seqNum;
		hidden.src = blobUrl;
		active.style.display = "";
		hidden.style.display = "none";
	}

	// Subscribe ended
	active.onended = doubleBuffer;
	hidden.onended = doubleBuffer;

	let firstPlayDone = false;

	const load = async (cycleNum) => {
		try {
			const res = await fetch(
				createServerUrl(serverUrl.value, screenId.value, cycleNum)
			);
			if (res.status !== 200) {
				throw new Error(`status is not 200, ${res.status}`);
			}
			return {
				res,
				cycleNum,
			};
		} catch (e) {
			setTimeout(() => {
				cyclePromises[cycleNum] = load(cycleNum);
			}, 1000);
			throw e;
		}
	};

	const cyclePromises = [load(0), load(1)];

	// eslint-disable-next-line no-constant-condition
	while (true === true) {
		try {
			// Get a chunk
			const { res, cycleNum } = await Promise.any(cyclePromises);
			// Get body
			const encryptedBuffer = await res.arrayBuffer();
			// Request
			cyclePromises[cycleNum] = load(cycleNum);
			// Decrypt
			const decrypted = await IvAesGcm.decryptAsArrayBuffer(
				encryptedBuffer,
				passphrase.value
			);

			// Get seq number
			const seqNum = decodeSeqNum(decrypted.slice(0, 4));

			// Skip if the screen is older than played one
			if (prevPlayedSeqNum !== undefined && seqNum < prevPlayedSeqNum) {
				continue;
			}

			// Get a blob
			const blob = new Blob([decrypted.slice(4)], {
				type: "video/mp4",
			});

			if (blob.size === 0) {
				console.log("blob is empty");
				break;
			}

			// Push the blob URL
			const blobUrl = URL.createObjectURL(blob);
			blobUrlQueue.push({
				blobUrl,
				seqNum,
			});

			if (!firstPlayDone && blobUrlQueue.length >= 2) {
				// NOTE: There are never undefined logically because the length queue is over 1
				// FIXME: reorder blob by seq number
				active.src = blobUrlQueue.shift()?.blobUrl;
				hidden.src = blobUrlQueue.shift()?.blobUrl;
				active.play();
				firstPlayDone = true;
				// Enable show fullscreen button
				showFullscreenButton.value = true;
			} else {
				// NOTE: You can chane the threshold >= n
				if (
					blobUrlQueue.length >= 1 &&
					waitDoubleBufferResolve !== null
				) {
					// Resolve
					waitDoubleBufferResolve();
					// Release
					waitDoubleBufferResolve = null;
				}
			}
		} catch (e) {
			console.error(e);
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	}
}

function fullScreen() {
	if (screenfull.isEnabled) {
		screenfull.request(videoContainerRef.value);
	} else {
		console.warn("full screen is not enabled");
	}
}

export default {
	setup() {
		return {
			serverUrl,
			screenId,
			passphrase,
			shareOrView,
			showPassphrase,
			enableActionButton,
			showFullscreenButton,
			shareScreen,
			viewScreen,
			fullScreen,
			video0Ref,
			video1Ref,
			videoContainerRef,
		};
	},
};
</script>
