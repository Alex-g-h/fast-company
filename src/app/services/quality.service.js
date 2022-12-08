import httpService from "./http.service";

const qualityEndpoit = "quality/";

const qualityService = {
  get: async () => {
    const { data } = await httpService.get(qualityEndpoit);
    return data;
  }
};

export default qualityService;
