export async function api(endpoint: string, method = 'GET', data?: any) {
  const token = localStorage.getItem('token');

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
  };

  const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, config);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}