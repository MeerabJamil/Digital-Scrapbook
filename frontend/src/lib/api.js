const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Every request sends the httpOnly session cookie automatically
// (credentials: "include"), and every response is parsed as JSON.
// Non-2xx responses throw an Error whose message is the backend's
// { message } field, so callers can just show err.message.
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // some responses (rare) may have no body
  }

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong. Please try again.");
  }

  return data;
}

export const api = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};

// --- Auth ---
export const authApi = {
  register: (data) => api.post("/api/auth/register", data),
  login: (data) => api.post("/api/auth/login", data),
  logout: () => api.post("/api/auth/logout"),
  me: () => api.get("/api/auth/me"),
};

// --- Albums ---
export const albumApi = {
  list: () => api.get("/api/albums"),
  get: (id) => api.get(`/api/albums/${id}`),
  create: (data) => api.post("/api/albums", data),
  update: (id, data) => api.put(`/api/albums/${id}`, data),
  remove: (id) => api.delete(`/api/albums/${id}`),
};

// --- Memories ---
export const memoryApi = {
  listForAlbum: (albumId) => api.get(`/api/albums/${albumId}/memories`),
  create: (albumId, data) => api.post(`/api/albums/${albumId}/memories`, data),
  get: (id) => api.get(`/api/memories/${id}`),
  update: (id, data) => api.put(`/api/memories/${id}`, data),
  remove: (id) => api.delete(`/api/memories/${id}`),
};
