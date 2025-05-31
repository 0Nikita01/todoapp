type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiRequestOptions {
  method?: HttpMethod;
  data?: any;
  params?: Record<string, string>; // для query-параметров
}

export async function apiRequest<T = any>(
    path: string,
    { method = 'GET', data, params }: ApiRequestOptions = {}
): Promise<T> {
    let url = path;
    // Добавление query-параметров, если есть
    if (params) {
        const query = new URLSearchParams(params).toString();
        url += `?${query}`;
    }
    const options: RequestInit = {
        method,
        headers: {
        'Content-Type': 'application/json',
        },
        ...(method !== 'GET' && { body: JSON.stringify(data) }),
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        
        const error = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(error.message || 'Something went wrong');
    }

    return res.json();
}