import axios from "../plugins/axios";

const statisticService = {
  getEventSummaries(currentDate) {
    return axios.get(`events/event-summaries`, {
      params: {
        currentDate: currentDate,
      },
    });
  },

  getTopProductsByProfit(startDate, endDate, limit) {
    return axios.get(`products/top-profit`, {
      params: {
        startDate: startDate,
        endDate: endDate,
        limit: limit,
      },
    });
  },

  getTopChannelsByProfit(startDate, endDate, limit) {
    return axios.get(`events/top-referrers-profit`, {
      params: {
        startDate: startDate,
        endDate: endDate,
        limit: limit,
      },
    });
  },
};

export default statisticService;
