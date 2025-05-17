export const authApiUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
export const userLogin = (payload) => {
    return fetch(`${authApiUrl}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
}

export const userRegister = (payload) => {
    return fetch(`${authApiUrl}/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
}