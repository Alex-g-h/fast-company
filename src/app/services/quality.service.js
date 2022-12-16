import httpService from "./http.service";

const qualityEndpoit = "quality/";

const qualityService = {
  fetchAll: async () => {
    const { data } = await httpService.get(qualityEndpoit);
    return data;
  }
};

export default qualityService;
