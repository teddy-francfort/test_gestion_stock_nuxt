import {useAppConfig, useCookie} from "#app";

export const myFetch = () => $fetch.create({
    baseURL: useAppConfig().apiUrl,
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value,
    }
});