export interface ApiStatus {
  message: string;
}

export interface MySettings {
  aiCoachName: string;
}

export async function getApiStatus(): Promise<ApiStatus> {
  return getJson<ApiStatus>('/api/');
}

export async function getMySettings(): Promise<MySettings> {
  return getJson<MySettings>('/api/rest/settings/me');
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}
