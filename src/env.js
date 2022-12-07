export const MODE = process.env.VUE_APP_MODE || "dev"


const env = {
    MODE: process.env.MODE,
    SERVER_URL: MODE === "dev" ? process.env.VUE_APP_SERVER_URL_LOCAL : (process.env.VUE_APP_SERVER_URL)
}


export default env;