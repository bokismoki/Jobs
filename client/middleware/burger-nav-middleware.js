export default ({ store }) => {
    if (store.getters.burgerNavOpen) {
        store.dispatch('setBurgerNavOpen', false)
    }
}