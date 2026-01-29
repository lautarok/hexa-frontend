import ServerError from "../types/serverError"

const cacheMap = new Map<string, unknown>()

export class HttpError extends Error {
    public code: string
    public statusCode: number

    constructor(serverError: ServerError) {
        super(serverError.message)
        this.code = serverError.code
        this.statusCode = serverError.statusCode
    }
}

type DefaultMethodOptions = {
    headers?: Record<string, string>
    searchParams?: Record<string, string>
    disableCache?: boolean
}

type MutationMethodOptions = DefaultMethodOptions & {
    body?: Record<string, unknown>
    formData?: FormData
}

const apiCall = async <TResponse>(
    path: string,
    options?: MutationMethodOptions & {method: string}
): Promise<TResponse> => {
    if (!options?.disableCache && options?.method === "GET" && cacheMap.has(path)) {
        return cacheMap.get(path) as TResponse
    }

    const httpResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
        method: options?.method ?? "GET",
        body: options?.body ? JSON.stringify(options.body) : undefined,
        headers: options?.headers
    })

    const response = await httpResponse.json()

    if (httpResponse.status < 200 || httpResponse.status >= 400) {
        throw new HttpError(response)
    }

    if (options?.method === "GET" && global["window"]) {
        cacheMap.set(path, response)
    }

    return response
}

const POST = <TResponse>(
    path: string,
    options?: MutationMethodOptions
): Promise<TResponse> => {
    return apiCall(path, {
        ...options,
        method: "POST"
    })
}

const GET = <TResponse>(
    path: string,
    options?: DefaultMethodOptions
): Promise<TResponse> => {
    return apiCall(path, {
        ...options,
        method: "GET"
    })
}

const http = {
    POST,
    GET
}

export default http