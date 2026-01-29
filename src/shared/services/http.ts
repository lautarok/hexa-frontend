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

const apiCall = async <TResponse>(
    path: string,
    options?: {
        disableCache?: boolean,
        headers?: Record<string, string>,
        body?: unknown,
        method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    }
): Promise<TResponse> => {
    if (!options?.disableCache && options?.method === "GET") {
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

    if (options?.method === "GET") {
        cacheMap.set(path, response)
    }

    return response
}

const POST = <TResponse>(
    path: string,
    options?: {
        headers?: Record<string, string>,
        body?: unknown
    }
): Promise<TResponse> => {
    return apiCall(path, {
        ...options,
        method: "POST"
    })
}

const http = {
    POST
}

export default http