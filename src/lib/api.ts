export interface ApiStatus {
    message: string;
}

export interface Me {
    aiCoachName?: string;
    name?: string;
}

export async function getApiStatus(): Promise<ApiStatus> {
    return getJson<ApiStatus>('/api/');
}

export async function getMe(url = '/api/me'): Promise<Me> {
    return getJson<Me>(url);
}

async function getJson<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API request failed with ${response.status}`);
    }

    return response.json() as Promise<T>;
}
