import httpService from "./http.service";

const userEndpoit = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoit);
    return data;
  }
};

export default userService;
