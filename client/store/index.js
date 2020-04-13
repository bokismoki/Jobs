export const state = () => ({
    burgerNavOpen: false,
    account: {
        id: '',
        admin: false,
        loggedIn: false
    },
    jobs: [],
    filter: '',
    popupMsg: null
})

export const getters = {
    burgerNavOpen: state => state.burgerNavOpen,
    loggedIn: state => state.account.loggedIn,
    admin: state => state.account.admin,
    accountId: state => state.account.id,
    jobs: state => state.jobs,
    filteredJobs: state => {
        return state.jobs.filter(job => {
            return job.title.toLowerCase().includes(state.filter.toLowerCase()) ||
                job.description.toLowerCase().includes(state.filter.toLowerCase()) ||
                job.company.location.toLowerCase().includes(state.filter.toLowerCase()) ||
                job.company.name.toLowerCase().includes(state.filter.toLowerCase())
        })
    },
    popupMsg: state => state.popupMsg
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
    },
    ADD_JOBS: (state, payload) => {
        payload.forEach(job => {
            state.jobs.push(job)
        })
    },
    SET_FILTER: (state, payload) => {
        state.filter = payload
    },
    SET_POPUP_MSG: (state, payload) => {
        state.popupMsg = payload
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
    },
    addJobs: ({ commit }, payload) => {
        commit('ADD_JOBS', payload)
    },
    setFilter: ({ commit }, payload) => {
        commit('SET_FILTER', payload)
    },
    setPopupMsg: ({ commit }, payload) => {
        commit('SET_POPUP_MSG', payload)
        setTimeout(() => {
            commit('SET_POPUP_MSG', null)
        }, 3000);
    }
}