import axios from "../plugins/axios";

const customerService = {
  getListCustomers(pageNumber, pageSize, search, sortField, sortOrder) {
    return axios.get(`customers/search`, {
      params: {
        page: pageNumber - 1,
        size: pageSize,
        search: search,
        sortField: sortField,
        sortOrder: sortOrder,
      },
    });
  },

  getCustomerDetail(id) {
    return axios.get(`customers/${id}`);
  },

  deleteCustomer(id, notifyCallback) {
    return axios
      .delete(`customers/${id}`)
      .then((response) => {
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
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
        notifyCallback({
          title: "Error",
          text: "Error deleting customer. Please try again later.",
          type: "error",
        });
      });
  },
};

export default customerService;
