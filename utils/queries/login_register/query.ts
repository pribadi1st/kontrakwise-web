import { API_BASE_URL } from "../base"

export interface FormRegister {
    email: string
    password: string
    cPassword: string
    tnc: boolean
}

export const registerAPI = async (formData: FormRegister) => {
    const { email, password } = formData
    const response = await fetch(`${API_BASE_URL}users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
        const body = await response.json()
        return { error: true, detail: body.detail }
    }
    return { error: false, detail: "User registered successfully" }
}