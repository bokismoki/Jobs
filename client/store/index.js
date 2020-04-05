export const state = () => ({
    burgerNavOpen: false
})

export const getters = {
    burgerNavOpen: state => state.burgerNavOpen
}

export const mutations = {
    SET_BURGER_NAV_SLIDE: (state, payload) => {
        state.burgerNavOpen = payload
    }
}

export const actions = {
    setBurgerNavSlide: ({ commit }, payload) => {
        commit('SET_BURGER_NAV_SLIDE', payload)
    }
}