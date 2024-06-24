<template>
  <div class="p-4">
    <div class="w-full">
      <div class="mt-5 mb-2 p-10 bg-slate-50 flex flex-col rounded-lg">
        <div class="pb-4 flex">
          <DropMenu
            class="sm:w-[10%] md:w-[40%] lg:w-[20%]"
            :options="statusOptions"
            :title="'Filter: '"
            @option-selected="handleStatusSelected"
          ></DropMenu>
          <DropMenu
            class="mx-3"
            :options="paginationSizes"
            :title="'Page Size: '"
            @option-selected="handlePaginationSelected"
          ></DropMenu>
        </div>

        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <caption class="sr-only">
            Files
          </caption>
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr class="bg-gray-200">
              <th scope="col" class="pl-4 pr-2 py-3 min-w-16 w-[1%]">No</th>

              <th scope="col" class="px-4 py-3">RECIPE ID</th>
              <th scope="col" class="px-4 py-3">TITLE</th>
              <th scope="col" class="px-4 py-3">REASON</th>
              <th scope="col" class="px-4 py-4 w-[15%]">DATE</th>
              <th scope="col" class="px-4 py-4 w-[15%]">STATUS</th>
              <th scope="col" class="px-4 py-3 w-1/12">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(report, index) in reports"
              :key="report.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td
                class="px-4 py-4 w-[5%] font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <span>#{{ index + 1 }}</span>
              </td>
              <td class="px-4 py-4 w-[15%]">
                <span class="ml-2 whitespace-nowrap overflow-ellipsis">{{
                  report.recipe.id
                }}</span>
              </td>

              <td class="px-4 py-4 w-[30%]">
                <span class="font-bold mb-2">{{ report.recipe.title }}</span>
              </td>
              <td class="px-4 py-4 w-[30%]">
                <span class="font-medium mb-2">{{ report.content }}</span>
              </td>
              <td class="px-4 py-4 w-[30%]">
                <span class="ml-2 whitespace-nowrap overflow-ellipsis">{{
                  formatTimestampToDateString(report.createdAt)
                }}</span>
              </td>
              <td class="px-4 py-4">
                <span
                  v-if="report.status === 0"
                  class="inline-block text-center w-[75px] bg-red-500 text-white text-xs font-medium me-2 px-2.5 py-1"
                >
                  PENDING
                </span>
                <span
                  v-else-if="report.status === 1"
                  class="inline-block text-center w-[75px] bg-green-500 text-white text-xs font-medium me-2 px-2.5 py-1"
                >
                  RESOLVED
                </span>
                <span
                  v-else
                  class="inline-block text-center w-[75px] bg-gray-200 text-gray-800 text-xs font-medium me-2 px-2.5 py-1"
                >
                  REJECTED
                </span>
              </td>
              <td class="px-4 py-4 w-[5%]">
                <div
                  class="flex items-center h-full"
                  v-if="report.status === 0"
                >
                  <button
                    type="button"
                    @click="handleBlock(report)"
                    class="btn text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      class="h-4 w-4 lg:h-6 lg:w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    @click="handleReject(report)"
                    class="btn text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500 ml-5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="h-4 w-4 lg:h-6 lg:w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        >
          <div class="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >Previous</a
            >
            <a
              href="#"
              class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >Next</a
            >
          </div>
          <div
            class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"
            v-if="pages.totalElements > 0"
          >
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ getShowElementFrom() }}</span>
                to
                <span class="font-medium">{{ getShowElementTo() }}</span>
                of
                <span class="font-medium">{{ pages.totalElements }}</span>
                results
              </p>
            </div>
            <div>
              <nav
                class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <a
                  @click="prevPage"
                  class="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span class="material-icons text-sm" aria-hidden="true"
                    >arrow_back_ios_new</span
                  >
                </a>
                <a
                  @click="goToPage(page)"
                  v-for="page in pages.totalPages"
                  :key="page"
                  class="cursor-pointer"
                  :class="{
                    'relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600':
                      filterParameters.page === page,
                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                      filterParameters.page !== page,
                  }"
                >
                  {{ page }}
                </a>
                <a
                  @click="nextPage"
                  class="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span class="material-icons text-sm" aria-hidden="true"
                    >arrow_forward_ios</span
                  >
                </a>
              </nav>
            </div>
          </div>
          <div
            class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center"
            v-else
          >
            <span class="text-sm">Not found</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropMenu from "../../components/DropMenu.vue";
import reportService from "../../services/ReportService";
export default {
  setup() {
    document.title = "List Reports - ECooking";
  },
  data() {
    return {
      reports: [],
      paginationSizes: [5, 10, 15, 30].map((value) => ({ key: value, value })),
      loading: false,
      filterParameters: {
        status: "",
        page: 1,
        size: 20,
      },
      statusOptions: [
        { key: "all", value: "ALL" },
        { key: "pending", value: "PENDING" },
        { key: "resolved", value: "RESOLVED" },
        { key: "rejected", value: "REJECTED" },
      ],
      pages: {
        totalElements: 0,
        totalPages: 0,
      },
    };
  },
  methods: {
    async getListReport(isSearchMethod = true) {
      try {
        this.isLoading = true;
        if (isSearchMethod) {
          this.filterParameters.page = 1;
        }
        const response = await reportService.getListReport(
          this.filterParameters,
          this.notify
        );
        this.isLoading = false;
        this.reports = response.data;
        this.filterParameters.size = parseInt(response.perPage);
        this.pages.totalElements = parseInt(response.total);
        this.pages.totalPages = parseInt(response.total / response.perPage) + 1;
      } catch (error) {
        console.error(error);
      }
    },
    prevPage() {
      if (this.filterParameters.page > 1) {
        this.filterParameters.page--;
        this.getListReport(false);
      }
    },

    nextPage() {
      if (this.filterParameters.page < this.pages.totalPages) {
        this.filterParameters.page++;
        this.getListReport(false);
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.pages.totalPages) {
        this.filterParameters.page = page;
        this.getListReport(false);
      }
    },
    handlePaginationSelected(option) {
      this.filterParameters.size = option;
      this.getListReport();
    },
    handleStatusSelected(option) {
      if (option === "all") {
        this.filterParameters.status = option;
      } else {
        switch (option) {
          case "pending":
            this.filterParameters.status = 0;
            break;
          case "resolved":
            this.filterParameters.status = 1;
            break;
          case "rejected":
            this.filterParameters.status = 2;
            break;
        }
      }
      this.getListReport();
    },
    handleBlock(report) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "Block Recipe with ID" + report.recipe.id,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Block it!",
          cancelButtonText: "No, cancel!",
        })
        .then((result) => {
          if (result.isConfirmed)
            reportService
              .resolveReport(report.id, this.notify)
              .then((response) => {
                if (response === "ok") {
                  this.getListReport(false);
                }
              })
              .catch((e) => {
                console.log(e);
              });
        });
    },
    handleReject(report) {
      reportService
        .rejectReport(report.id, this.notify)
        .then((response) => {
          if (response === "ok") {
            this.getListReport(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    formatTimestampToDateString(timestampInMilliseconds) {
      const dateObject = new Date(timestampInMilliseconds);

      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();

      return `${day}/${month}/${year}`;
    },
    getShowElementFrom() {
      return (
        this.filterParameters.size * this.filterParameters.page -
        this.filterParameters.size +
        1
      );
    },

    getShowElementTo() {
      const nextPageEnd =
        this.filterParameters.size * this.filterParameters.page;
      return Math.min(nextPageEnd, this.pages.totalElements);
    },

    notify({ title, text, type }) {
      this.$notify({
        title,
        text,
        type,
      });
    },
  },
  components: {
    DropMenu,
  },
  async mounted() {
    await this.getListReport(true);
  },
};
</script>

<style>
</style>