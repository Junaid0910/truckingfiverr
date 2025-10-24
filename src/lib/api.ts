/* Simple frontend API helper for Trucking Vault
   Uses relative '/api' base and reads token from localStorage.
*/

export async function request(path: string, opts: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers: Record<string,string> = opts.headers instanceof Headers ? {} : { 'Content-Type': 'application/json', ...(opts.headers as Record<string,string> || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(path.startsWith('/api') ? path : `/api${path}`, { ...opts, headers });
  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch (err) { data = text; }
  if (!res.ok) {
    // If unauthorized (401), clear token and redirect to login to re-authenticate.
    // Do NOT auto-redirect on 403 (Forbidden) so pages can show friendly messages.
    if (res.status === 401) {
      try { localStorage.removeItem('token'); } catch(e){}
      try { localStorage.removeItem('userRole'); } catch(e){}
      // best-effort redirect
      try { window.location.href = '/login'; } catch(e){}
    }
    const err = new Error(data?.error || data || res.statusText || 'API error');
    (err as any).status = res.status;
    (err as any).data = data;
    throw err;
  }
  return data;
}

export const api = {
  get: (p: string) => request(p, { method: 'GET' }),
  post: (p: string, body?: any) => request(p, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: (p: string, body?: any) => request(p, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  del: (p: string) => request(p, { method: 'DELETE' }),
};

export default api;
