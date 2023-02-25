import httpService from "./http.service";

const commentEndpoit = "comment/";

const commentService = {
  createComment: async (payload) => {
    const { data } = await httpService.put(
      commentEndpoit + payload._id,
      payload
    );
    return data;
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentEndpoit, {
      params: {
        orderBy: "pageId",
        equalTo: `${pageId}`
      }
    });
    return data;
  },
  removeComment: async (commentId) => {
    const { data } = await httpService.delete(commentEndpoit + commentId);
    return data;
  }
};

export default commentService;
