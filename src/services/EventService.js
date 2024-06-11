import axios from "../plugins/axios";

const eventService = {
  getListEvents(pageNumber, pageSize) {
    return axios.get(`events`, {
      params: {
        page: pageNumber - 1,
        size: pageSize,
      },
    });
  },

  searchAndSortEvents(
    pageNumber,
    pageSize,
    search,
    types,
    sortField,
    sortOrder
  ) {
    return axios.get(`events/search`, {
      params: {
        page: pageNumber - 1,
        size: pageSize,
        search: search,
        types: types,
        sortField: sortField,
        sortOrder: sortOrder,
      },
    });
  },

  deleteEvent(id, notifyCallback) {
    return axios.delete(`events/${id}`).then((response) => {
      if (response.data.status === "ok") {
        notifyCallback({
          title: "Success",
          text: response.data.message,
          type: "success",
        });
        return true;
      } else {
        notifyCallback({
          title: "Error",
          text: response.data.message,
          type: "error",
        });
        return false;
      }
    }).catch((error) => {
      console.error("Error deleting event:", error);
      notifyCallback({
        title: "Error",
        text: "Error deleting event. Please try again later.",
        type: "error",
      });
    });
  },
};

export default eventService;
