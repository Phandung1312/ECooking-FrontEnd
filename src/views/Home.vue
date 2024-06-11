<template lang="">
  <div class="w-full flex flex-col">
    <div class="flex flex-col mb-3">
      <h4 class="text-lg font-bold mb-1">👋 Hey, Welcome back!</h4>
      <span class="text-gray-500 font-semibold text-sm"
        >Here is all your analytics overview</span
      >
    </div>
    <div class="grid grid-rows-2 grid-cols-4 gap-4 h-screen">
      <div
        class="row-span-1 col-span-3 p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col"
      >
        <div class="flex items-center justify-between mb-2">
          <div>
            <h4 class="text-xl font-bold">Month's summarySales</h4>
            <p class="text-gray-500">This month's summarySales</p>
          </div>
          <div
            class="px-4 py-1.5 flex items-center cursor-pointer text-gray-400 font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-500 transition-all duration-300 hover:text-blue-500"
          >
            <span class="material-icons text-base mr-1">ios_share</span>
            <span class="text-sm">Export</span>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-3 h-full items-center">
          <StatCard
            bgColor="rose"
            title="Total summarySales"
            :value="this.summarySales.quantity"
            icon="shopping_bag"
            :changeValue="
              this.roundNumber(this.summarySales.growthQuantityPercentage)
            "
          ></StatCard>
          <StatCard
            bgColor="amber"
            title="Total Carts"
            :value="this.summaryCarts.quantity"
            icon="shopping_cart"
            :changeValue="
              this.roundNumber(this.summaryCarts.growthQuantityPercentage)
            "
          ></StatCard>
          <StatCard
            bgColor="green"
            title="Total Revenue"
            :value="'$' + this.roundNumber(this.summaryRevenue.totalAmount)"
            icon="local_atm"
            :changeValue="
              this.roundNumber(this.summaryRevenue.growthAmountPercentage)
            "
          ></StatCard>
          <StatCard
            bgColor="purple"
            title="New Customers"
            :value="this.summaryCustomers.quantityNewCustomer"
            icon="person_add"
            :changeValue="
              this.roundNumber(this.summaryCustomers.grownNewCustomerPercent)
            "
          ></StatCard>
        </div>
      </div>

      <div
        class="row-span-1 col-span-1 p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col"
      >
        <div class="flex justify-between mb-2">
          <h4 class="text-xl font-bold">Profit</h4>
          <select
            class="bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none cursor-pointer"
          >
            <option value="thisWeek">This Week</option>
            <option value="lastWeek">Last Week</option>
          </select>
        </div>
        <div class="h-full flex items-center flex-col-reverse">
          <BarChart />
        </div>
      </div>

      <div
        class="row-span-1 col-span-2 p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col"
      >
        <h4 class="text-xl font-bold mb-2">Top Channels</h4>
        <div class="relative overflow-x-auto">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <caption class="sr-only">
              Top Channels
            </caption>
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Source</th>
                <th scope="col" class="px-6 py-3 text-center">Customers</th>
                <th scope="col" class="px-6 py-3 text-center">
                  Total summarySales
                </th>
                <th scope="col" class="px-6 py-3 text-center">Revenues</th>
                <th scope="col" class="px-6 py-3 text-center">Profit</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="(channel, index) in this.topChannels"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <span class="flex items-center">
                    <span
                      class="rounded-full h-8 w-8 bg-blue-100 flex items-center justify-center mr-3"
                    >
                      <img
                        class="w-4/6"
                        :src="getImangeChannel(channel.referrer)"
                        alt="images"
                      />
                    </span>
                    <span>{{ channel.referrer }}</span>
                  </span>
                </th>
                <td class="px-6 py-4 text-center">
                  {{ channel.quantityCustomer }}
                </td>
                <td class="px-6 py-4 text-center">
                  {{ channel.totalQuantitySold }}
                </td>
                <td class="px-6 py-4 text-center text-green-500">
                  {{ roundNumber(channel.revenue) }}
                </td>
                <td class="px-6 py-4 text-center text-blue-500">
                  {{ roundNumber(channel.profit) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        class="row-span-1 col-span-2 p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col"
      >
        <h4 class="text-xl font-bold mb-2">Top Products in month</h4>
        <div class="relative overflow-x-auto">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <caption class="sr-only">
              Top Products in month
            </caption>
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Product name</th>
                <th scope="col" class="px-6 py-3 text-center">Category</th>
                <th scope="col" class="px-6 py-3 text-center">Price</th>
                <th scope="col" class="px-6 py-3 text-center">Sold</th>
                <th scope="col" class="px-6 py-3 text-center">Profit</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="(product, index) in this.topProducts"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <span class="flex items-center">
                    <span class="h-12.5 w-15 rounded-md">
                      <img class="w-4/6" :src="product.imgUrl" alt="images" />
                    </span>
                    <span>{{ product.name }}</span>
                  </span>
                </th>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-400 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                    >{{ product.category }}</span
                  >
                </td>
                <td class="px-6 py-4 text-center">
                  ${{ product.totalRevenue }}
                </td>
                <td class="px-6 py-4 text-center">
                  {{ product.totalQuantitySold }}
                </td>
                <td class="px-6 py-4 text-center text-green-500">
                  {{ roundNumber(product.totalProfit) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StatCard from "../components/StatCard.vue";
import BarChart from "../components/Chart/BarChart.vue";
import statisticService from "../services/StatisticService";
export default {
  setup() {
    document.title = "Home";
  },
  components: {
    StatCard,
    BarChart,
  },
  data() {
    return {
      summarySales: {},
      summaryCarts: {},
      summaryCustomers: {},
      summaryRevenue: {},
      topProducts: [],
      topChannels: [],
    };
  },
  async created() {
    this.getEventSummaries();
    this.getTopProductsByProfitInMonth();
    this.getTopChannelsByProfitInMonth();
  },
  methods: {
    currentDate() {
      const current = new Date();
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, "0");
      const day = String(current.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    roundNumber(value) {
      if (!value) {
        return "N/A";
      } else {
        return value.toFixed(2);
      }
    },

    async getEventSummaries() {
      const currentDate = this.currentDate();
      const response = await statisticService.getEventSummaries(currentDate);

      this.summaryCarts.quantity =
        response.data.data.eventSummaries[0].totalProducts;
      this.summaryCarts.growthQuantityPercentage =
        response.data.data.eventSummaries[0].growthQuantityPercentage;

      this.summarySales.quantity =
        response.data.data.eventSummaries[1].totalProducts;
      this.summarySales.growthQuantityPercentage =
        response.data.data.eventSummaries[1].growthQuantityPercentage;

      this.summaryRevenue.totalAmount =
        response.data.data.eventSummaries[1].totalAmount;
      this.summaryRevenue.growthAmountPercentage =
        response.data.data.eventSummaries[1].growthRevenuePercentage;

      this.summaryCustomers.quantityNewCustomer =
        response.data.data.quantityNewCustomer;
      this.summaryCustomers.grownNewCustomerPercent =
        response.data.data.grownNewCustomerPercent;
    },

    async getTopProductsByProfitInMonth() {
      const current = new Date();
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, "0");
      const currentDate = this.currentDate();
      const response = await statisticService.getTopProductsByProfit(
        `${year}-${month}-01`,
        currentDate,
        3
      );
      this.topProducts = response.data.data;
    },

    async getTopChannelsByProfitInMonth() {
      const current = new Date();
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, "0");
      const currentDate = this.currentDate();
      const response = await statisticService.getTopChannelsByProfit(
        `${year}-${month}-01`,
        currentDate,
        5
      );
      this.topChannels = response.data.data;
    },

    getImangeChannel(channel) {
      switch (channel) {
        case "Google":
          return "https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png";
        case "Facebook":
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png";
        case "Twitter":
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png";
        case "Instagram":
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png";
        case "LinkedIn":
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png";
        case "Tiktok":
          return "https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338430_1280.png";
        default:
          return "";
      }
    },
  },
};
</script>
<style scoped></style>
