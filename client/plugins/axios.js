export default function ({ $axios, store, redirect }) {
    $axios.onError(error => {
        if (error) {
            if (error.response && error.response.status === 401 && store.state.account.loggedIn) {
                store.dispatch('logout')
                localStorage.removeItem('jwtToken')
                redirect({ name: 'signin' })
                store.dispatch('setPopupMsg', {
                    success: false,
                    msg: 'Not authorized!'
                })
            }
        }
    })
}