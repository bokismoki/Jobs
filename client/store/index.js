export const state = () => ({
    burgerNavOpen: false,
    account: {
        id: '',
        admin: false,
        loggedIn: false
    },
    jobs: []
})

export const getters = {
    burgerNavOpen: state => state.burgerNavOpen,
    loggedIn: state => state.account.loggedIn,
    admin: state => state.account.admin,
    accountId: state => state.account.id,
    jobs: state => state.jobs
}

export const mutations = {
    SET_BURGER_NAV_OPEN: (state, payload) => {
        state.burgerNavOpen = payload
    },
    LOGIN: (state, payload) => {
        state.account = payload
    },
    LOGOUT: state => {
        state.account.id = ''
        state.account.admin = false
        state.account.loggedIn = false
    },
    SET_JOBS: (state, payload) => {
        state.jobs = payload
    }
}

export const actions = {
    async nuxtServerInit({ dispatch }, { $axios }) {
        const jobs = await $axios.get('/job')
        dispatch('setJobs', jobs.data)
    },
    setBurgerNavOpen: ({ commit }, payload) => {
        commit('SET_BURGER_NAV_OPEN', payload)
    },
    login: ({ commit }, payload) => {
        commit('LOGIN', payload)
    },
    logout: ({ commit }) => {
        commit('LOGOUT')
    },
    setJobs: ({ commit }, payload) => {
        commit('SET_JOBS', payload)
    }
}