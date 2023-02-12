export function setToken(value: string) {
    localStorage.setItem('token', value);
}

export function getToken(key: string) {
    return localStorage.getItem(key);
}

export function removeToken(key: string) {
    localStorage.removeItem(key);
}