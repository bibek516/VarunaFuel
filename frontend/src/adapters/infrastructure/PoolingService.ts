const API = import.meta.env.VITE_API_URL;

export const PoolingService = {
  fetch(year: number) {
    return fetch(`${API}/compliance/adjusted-cb?year=${year}`).then(r => r.json());
  },
  create(year: number) {
    return fetch(`${API}/pools`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year }),
    }).then(r => r.json());
  }
};
