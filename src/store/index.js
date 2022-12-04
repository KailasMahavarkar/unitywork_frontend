// @ts-nocheck
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store({
    state: {
        counter: 0,
        user: {},
        authed: false,
        gigs: []
    },
    getters: {
        getUser: state => state.user,
        getAuthed: state => state.authed,
        getGigs: state => state.gigs
    },

    mutations: {
        setUser: (state, user) => state.user = user,
        setAuthentication: (state, status) => {
            state.authed = status
        },
        setGigs: (state, gigs) => {
            state.gigs = gigs
        },
        resetUser: state => state.user = {},
    },
    actions: {
        setUser: ({ commit }, user) => commit('setUser', user),
        setAuthentication: ({ commit }, payload) => commit('setAuthentication', payload),
        setGigs: ({ commit }, payload) => commit('setGigs', payload),
    },
    modules: {
    },
    plugins: [vuexLocal.plugin]
})
