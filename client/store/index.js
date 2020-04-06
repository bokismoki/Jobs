export const state = () => ({
    burgerNavOpen: false
})

export const getters = {
    burgerNavOpen: state => state.burgerNavOpen
}

export const mutations = {
    SET_BURGER_NAV_OPEN: (state, payload) => {
        state.burgerNavOpen = payload
    }
}

export const actions = {
    setBurgerNavOpen: ({ commit }, payload) => {
        commit('SET_BURGER_NAV_OPEN', payload)
    }
}