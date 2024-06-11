<template lang="">
  <div class="w-full p-4">
    <nav class="flex" aria-label="Breadcrumb">
      <ol
        class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
      >
        <li class="inline-flex items-center">
          <a
            href="/"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
          >
            <span class="material-icons text-sm font-bold mr-1">home</span>
            <span>Home</span>
          </a>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <span class="material-icons text-sm font-bold text-gray-500"
              >arrow_forward_ios</span
            >
            <span
              class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400"
              >Event</span
            >
          </div>
        </li>
      </ol>
    </nav>

    <div class="mt-5 mb-2 p-3 lg:p-10 bg-slate-50 flex flex-col rounded-lg">
      <div class="pb-4 flex">
        <div class="relative w-1/2">
          <div
            class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <span class="material-icons text-gray-500 dark:text-gray-400"
              >search</span
            >
          </div>
          <input
            type="text"
            id="table-search"
            class="block h-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
            placeholder="Search for events"
            v-model="searchKeyword"
            @input="searchAndSortEvents"
          />
        </div>
        <div class="relative ml-4">
          <button
            @click="toggleFilterByType"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            <span>Filter by type</span>
            <span class="material-icons ms-1" v-show="!openFilterByType"
              >arrow_drop_down</span
            >
            <span class="material-icons ms-1" v-show="openFilterByType"
              >arrow_drop_up</span
            >
          </button>
          <div
            v-show="openFilterByType"
            class="absolute z-10 w-36 p-3 bg-white rounded-lg shadow dark:bg-gray-700 mt-2"
          >
            <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
              Event Type
            </h6>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center">
                <input
                  id="purchased"
                  type="checkbox"
                  value="PURCHASED"
                  v-model="selectedTypes"
                  @change="searchAndSortEvents"
                  :checked="selectedTypes.includes('PURCHASED')"
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <div class="rounded-full bg-green-500 w-2.5 h-2.5 ml-1"></div>
                <label
                  for="purchased"
                  class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Purchased
                </label>
              </li>
              <li class="flex items-center">
                <input
                  id="add-to-cart"
                  type="checkbox"
                  value="ADD_TO_CART"
                  v-model="selectedTypes"
                  @change="searchAndSortEvents"
                  :checked="selectedTypes.includes('ADD_TO_CART')"
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <div class="rounded-full bg-yellow-500 w-2.5 h-2.5 ml-1"></div>
                <label
                  for="add-to-cart"
                  class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Add to cart
                </label>
              </li>
              <li class="flex items-center">
                <input
                  id="refunded"
                  type="checkbox"
                  value="REFUNDED"
                  v-model="selectedTypes"
                  @change="searchAndSortEvents"
                  :checked="selectedTypes.includes('REFUNDED')"
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <div class="rounded-full bg-red-500 w-2.5 h-2.5 ml-1"></div>
                <label
                  for="refunded"
                  class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Refunded
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="overflow-y-scroll">
          <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption class="sr-only">
            Event
          </caption>
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr class="bg-gray-200">
              <th scope="col" class="px-6 py-3">NO</th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  CUSTOMER
                  <span
                    class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                    @click="toogleSortBy('customerName')"
                    >swap_vert</span
                  >
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  PRODUCT
                  <span
                    class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                    @click="toogleSortBy('productName')"
                    >swap_vert</span
                  >
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  QUANTITY
                  <span
                    class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                    @click="toogleSortBy('quantity')"
                    >swap_vert</span
                  >
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  TOTAL PRICE
                  <span
                    class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                    @click="toogleSortBy('totalPrice')"
                    >swap_vert</span
                  >
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  EVENT TYPE
                  <span
                    class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                    @click="toogleSortBy('eventType')"
                    >swap_vert</span
                  >
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  REFERRER
                  <span
                    class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                    @click="toogleSortBy('referrer')"
                    >swap_vert</span
                  >
                </div>
              </th>
              <th scope="col" class="px-6 py-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(event, index) in events"
              :key="event.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ event.customer }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ event.product }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ event.quantity }}</td>
              <td class="px-6 py-4 whitespace-nowrap">${{ event.totalPrice }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getTypeClass(event.eventType)">{{
                  event.eventType.split("_").join(" ")
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ event.referrer }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  type="button"
                  class="text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-xs p-1 text-blue inline-flex items-center me-2 dark:border-sky-500 dark:text-sky-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-sky-500"
                >
                  <span class="material-icons cursor-pointer">info</span>
                </button>
                <button
                  type="button"
                  @click="deleteEvent(event.id)"
                  class="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
                >
                  <span class="material-icons cursor-pointer">delete</span>
                </button>
              </td>
            </tr>
            <tr v-if="isNotFoundResults">
              <td
                colspan="8"
                class="text-center py-4 text-gray-500 dark:text-gray-400"
              >
                No matching records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      >
        <div class="sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div clas="pb-2 lg:pb-0">
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ displayStart }}</span>
              to
              <span class="font-medium">{{ displayEnd }}</span>
              of
              <span class="font-medium">{{ totalResults }}</span>
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
                class="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-1 lg:py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span class="material-icons text-sm" aria-hidden="true"
                  >arrow_back_ios_new</span
                >
              </a>
              <template v-if="totalPages < 6">
                <a
                  @click="goToPage(page)"
                  v-for="page in totalPages"
                  :key="page"
                  class="font-semibold cursor-pointer text-xs lg:text-sm px-2 py-1 lg:px-4 lg:py-2 relative inline-flex items-center"
                  :class="{
                    'z-10 bg-blue-600  text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600':
                      currentPage === page,
                    'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                      currentPage !== page,
                  }"
                >
                  {{ page }}
                </a>
              </template>
              <template v-else>
                <a
                  @click="goToPage(page)"
                  v-for="page in 3"
                  :key="page"
                  class="cursor-pointer"
                  :class="{
                    'relative z-10 inline-flex items-center bg-blue-600 px-2 py-1 lg:px-4 lg:py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600':
                      currentPage === page,
                    'relative inline-flex items-center px-2 py-1 lg:px-4 lg:py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                      currentPage !== page,
                  }"
                >
                  {{ page }}
                </a>
                <a
                  class="relative inline-flex items-center px-2 py-1 lg:px-4 lg:py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >...</a
                >
                <a
                  @click="goToPage(totalPages)"
                  class="cursor-pointer"
                  :class="{
                    'relative z-10 inline-flex items-center bg-blue-600 px-2 py-1 lg:px-4 lg:py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600':
                      currentPage === totalPages,
                    'relative inline-flex items-center px-2 py-1 lg:px-4 lg:py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                      currentPage !== totalPages,
                  }"
                  >{{ totalPages }}</a
                >
              </template>

              <a
                @click="nextPage"
                class="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-1 lg:px-4 lg:py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span class="material-icons text-sm" aria-hidden="true"
                  >arrow_forward_ios</span
                >
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventService from "../../services/EventService";
export default {
  setup() {
    document.title = "Events";
  },
  data() {
    return {
      selectedTypes: ["PURCHASED", "ADD_TO_CART", "REFUNDED"],
      openFilterByType: false,
      events: [],
      currentPage: 1,
      pageSize: 5,
      totalResults: 0,
      searchKeyword: "",
      isNotFoundResults: false,
      sortField: "",
      sortOrder: "asc",
    };
  },
  computed: {
    displayStart() {
      return (this.currentPage - 1) * this.pageSize + 1;
    },
    displayEnd() {
      const end = this.currentPage * this.pageSize;
      return end > this.totalResults ? this.totalResults : end;
    },
    totalPages() {
      return Math.ceil(this.totalResults / this.pageSize);
    },
  },
  mounted() {
    this.getListEvents();
  },
  methods: {
    toggleFilterByType() {
      this.openFilterByType = !this.openFilterByType;
    },
    getTypeClass(status) {
      switch (status) {
        case "ADD_TO_CART":
          return "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-yellow-400 border border-yellow-400";
        case "PURCHASED":
          return "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400";
        case "REFUNDED":
          return "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400";
        default:
          return "";
      }
    },
    async getListEvents() {
      try {
        const response = await eventService.getListEvents(
          this.currentPage,
          this.pageSize
        );
        this.events = response.data.data.content;
        this.totalResults = response.data.data.totalElements;
      } catch (error) {
        this.isNotFoundResults = true;
      }
    },
    async searchAndSortEvents() {
      try {
        const types = this.selectedTypes.join(",");
        const response = await eventService.searchAndSortEvents(
          this.currentPage,
          this.pageSize,
          this.searchKeyword,
          types,
          this.sortField,
          this.sortOrder
        );
        if (!response.data.data.content.length) {
          this.isNotFoundResults = true;
        } else {
          this.isNotFoundResults = false;
        }
        this.events = response.data.data.content;
        this.totalResults = response.data.data.totalElements;
        if (!this.events.length && this.currentPage > 1) {
          this.currentPage--;
          this.searchAndSortEvents();
        }
      } catch (error) {
        this.isNotFoundResults = true;
      }
    },
    toogleSortBy(field) {
      this.sortField = field;
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      this.searchAndSortEvents();
    },
    deleteEvent(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            eventService
              .deleteEvent(id, this.notify)
              .then((check) => {
                if (check) {
                  this.getListEvents();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.searchAndSortEvents();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.searchAndSortEvents();
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.searchAndSortEvents();
      }
    },
    notify({ title, text, type }) {
      this.$notify({
        title,
        text,
        type,
      });
    },
  },
};
</script>

<style scoped></style>
