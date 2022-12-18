import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoit = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoit);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoit + payload._id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndpoit + localStorageService.getUserId()
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.put(userEndpoit + payload._id, payload);
    return data;
  }
};

export default userService;
