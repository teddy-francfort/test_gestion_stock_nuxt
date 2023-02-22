export default defineNuxtRouteMiddleware((to, from) => {
    console.log('middleware auth ' + to );

    const apiFetch = myFetch();

    apiFetch('/api/is-auth')
        .then(function(response){
            console.log('is logged')
        })
        .catch(function(error) {
            console.log('is not logged')
            console.log(error)
            window.location.href = '/login'
        })
})