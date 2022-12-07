import httpService from "./http.service";

const professionEndpoit = "profession/";

const professionService = {
  get: async () => {
    const { data } = await httpService.get(professionEndpoit);
    return data;
  }
};

export default professionService;
