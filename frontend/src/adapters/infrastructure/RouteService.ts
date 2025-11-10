// import axios from "axios";
// import type { IRouteService } from "../../core/ports/IRouteService";
// // import { Route } from "../../core/domain/Route";
// import type { Route } from "../../core/domain/Route";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// export const RouteService: IRouteService = {
//   async list(): Promise<Route[]> {
//     const res = await axios.get(`${API_URL}/routes`);
//     return res.data;
//   },

//   async setBaseline(id: number): Promise<void> {
//     await axios.post(`${API_URL}/routes/${id}/baseline`);
//   },
// };

// import type { Route } from "../../core/domain/Route";
import type { IRouteService } from "../../core/ports/IRouteService";

const API_URL = import.meta.env.VITE_API_URL;

export const RouteService: IRouteService = {
  async list() {
    const res = await fetch(`${API_URL}/routes`);
    return res.json();
  },

  async setBaseline(id: number) {
    await fetch(`${API_URL}/routes/${id}/baseline`, {
      method: "POST",
    });
  },
};
