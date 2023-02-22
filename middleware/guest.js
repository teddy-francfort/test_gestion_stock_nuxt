export default defineNuxtRouteMiddleware((to, from) => {
    console.log('middleware guest ' + to );

    const apiFetch = myFetch();

    apiFetch('/api/is-auth')
        .then(function(response){
            console.log('is logged')
            window.location.href = '/'
        })
        .catch(function(error) {
            console.log('is not logged')
            console.log(error)
        })
})