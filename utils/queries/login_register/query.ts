import zod from "zod"
import { API_BASE_URL } from "../base"

export interface FormRegister {
    email: string
    password: string
    cPassword: string
    tnc: boolean
}

export interface FormLogin {
    email: string
    password: string
}

export const loginAPIInternal = async (formData: FormLogin) => {
    const response = await fetch(`${API_BASE_URL}users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    if (!response.ok) {
        const body = await response.json()
        return { error: true, detail: body.detail }
    }
    const resp = await response.json()
    return { error: false, detail: resp }
}

export const loginAPI = async (formData: FormLogin) => {
    const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    if (!response.ok) {
        const body = await response.json()
        return { error: true, detail: body.detail }
    }
    const body = await response.json()
    return body
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