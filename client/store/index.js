export const state = () => ({
    burgerNavOpen: false,
    account: {
        id: '',
        admin: false,
        loggedIn: false
    }
})

export const getters = {
    burgerNavOpen: state => state.burgerNavOpen,
    loggedIn: state => state.account.loggedIn,
    admin: state => state.account.admin,
    accountId: state => state.account.id
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
    }
}

export const actions = {
    setBurgerNavOpen: ({ commit }, payload) => {
        commit('SET_BURGER_NAV_OPEN', payload)
    },
    login: ({ commit }, payload) => {
        commit('LOGIN', payload)
    },
    logout: ({ commit }) => {
        commit('LOGOUT')
    }
}