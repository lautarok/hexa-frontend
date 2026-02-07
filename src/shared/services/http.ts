"use server"

import ServerError from "@/src/core/types/serverError"

class HttpError {
    code: string
    message: string
    statusCode: number

    constructor(serverError: ServerError) {
        this.message = serverError.message
        this.code = serverError.code
        this.statusCode = serverError.statusCode
    }
}

type DefaultMethodOptions = {
    headers?: Record<string, string>
    searchParams?: Record<string, string>
    disableCache?: boolean
    ttl?: number
}

type MutationMethodOptions = DefaultMethodOptions & {
    body?: Record<string, unknown>
    formData?: FormData
}

const apiCall = async <TResponse>(
    path: string,
    options?: MutationMethodOptions & {method: string}
): Promise<TResponse> => {
    const searchParams = new URLSearchParams(options?.searchParams)

    const httpResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}?${searchParams.toString()}`, {
        method: options?.method ?? "GET",
        body: options?.body ? JSON.stringify(options.body) : undefined,
        headers: options?.headers,
        cache: options?.method === "GET" && !options.disableCache ? "force-cache" : "no-cache",
        next: {revalidate: 10}
    })

    const response = await httpResponse.json()

    if (httpResponse.status < 200 || httpResponse.status >= 400) {
        throw new HttpError(response)
    }

    return response
}

export const POST = async <TResponse>(
    path: string,
    options?: MutationMethodOptions
): Promise<TResponse> => {
    return await apiCall(path, {
        ...options,
        method: "POST"
    })
}

export const PUT = async <TResponse>(
    path: string,
    options?: MutationMethodOptions
): Promise<TResponse> => {
    return await apiCall(path, {
        ...options,
        method: "PUT"
    })
}

export const GET = async <TResponse>(
    path: string,
    options?: DefaultMethodOptions
): Promise<TResponse> => {
    return await apiCall(path, {
        ...options,
        method: "GET"
    })
}