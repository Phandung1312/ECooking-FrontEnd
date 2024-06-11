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
            <span class="material-icons text-sm font-bold text-gray-500">arrow_forward_ios</span>
            <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Customer</span>
          </div>
        </li>
      </ol>
    </nav>

    <div class="mt-5 mb-2 p-10 bg-slate-50 flex flex-col rounded-lg">
      <div class="pb-4 flex">
        <div class="relative w-1/2">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <span class="material-icons text-gray-500 dark:text-gray-400">search</span>
          </div>
          <input
            type="text"
            id="table-search"
            class="block h-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
            placeholder="Search for customer"
            v-model="searchKeyword"
            @input="getListCustomers"
          />
        </div>
      </div>
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <caption class="sr-only">
          Event
        </caption>
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr class="bg-gray-200">
            <th scope="col" class="px-6 py-3">
              <div class="flex items-center">
                CUSTOMER NAME
                <span
                  class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                  @click="toogleSortBy('fullname')">swap_vert</span>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="flex items-center">
                EMAIL
                <span
                  class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                  @click="toogleSortBy('email')">swap_vert</span>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="flex items-center">
                GENDER
                <span
                  class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                  @click="toogleSortBy('gender')">swap_vert</span>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="flex items-center">
                DATE OF BIRTH
                <span
                  class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                  @click="toogleSortBy('dateOfBirth')"
                  >swap_vert</span
                >
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              <div class="flex items-center">
                PHONE NUMBER
                <span
                  class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                  @click="toogleSortBy('phoneNumber')">swap_vert</span>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="customer in customers"
            :key="customer.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="px-6 py-4 whitespace-nowrap">{{ customer.fullname }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ customer.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ customer.gender }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ formatedDate(customer.dateOfBirth) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ customer.phoneNumber }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                type="button"
                @click="showCustomerDetail(customer.id)"
                class="text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-xs p-1 text-blue inline-flex items-center me-2 dark:border-sky-500 dark:text-sky-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-sky-500"
              >
                <span class="material-icons cursor-pointer">info</span>
              </button>
              <button
                type="button"
                @click="deleteCustomer(customer.id)"
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

      <div
        class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      >
        <div class="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >Previous</a>
          <a
            href="#"
            class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >Next</a>
        </div>
        <div
          class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"
        >
          <div>
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
                class="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span class="material-icons text-sm" aria-hidden="true">arrow_back_ios_new</span>
              </a>
              <template v-if="totalPages < 6">
                <a
                  @click="goToPage(page)"
                  v-for="page in totalPages"
                  :key="page"
                  class="cursor-pointer"
                  :class="{
                    'relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600':
                      currentPage === page,
                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
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
                    'relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600':
                      currentPage === page,
                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                      currentPage !== page,
                  }"
                >
                  {{ page }}
                </a>
                <a
                  class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >...</a
                >
                <a
                  @click="goToPage(totalPages)"
                  class="cursor-pointer"
                  :class="{
                    'relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600':
                      currentPage === totalPages,
                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                      currentPage !== totalPages,
                  }"
                  >{{ totalPages }}</a
                >
              </template>

              <a
                @click="nextPage"
                class="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span class="material-icons text-sm" aria-hidden="true">arrow_forward_ios</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isShowCustomerDetail"
      class="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
    >
      <div
        class="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700"
      >
        <div class="relative">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Customer Detail
            </h3>
            <button
              type="button"
              @click="isShowCustomerDetail = false"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <div class="p-4 md:p-5" v-if="customerDetail">
            <div class="grid gap-5 mb-4 grid-cols-2">
              <div>
                <label class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                  {{ customerDetail.fullname }}
                </label>
              </div>
              <div>
                <span
                  class="material-icons text-blue-500 text-3xl"
                  v-if="customerDetail.gender == 'Male'">male</span>
                <span
                  class="material-icons text-pink-500 text-3xl"
                  v-if="customerDetail.gender == 'Female'">female</span>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-yellow-500">email</span>
                <label class="block ml-2 text-sm font-medium text-gray-400 dark:text-white">
                  {{ customerDetail.email }}
                </label>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-orange-500">cake</span>
                <label class="block ml-2 text-sm font-medium text-gray-400 dark:text-white">
                  {{ formatedDate(customerDetail.dateOfBirth) }}
                </label>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-green-500">phone</span>
                <label class="block ml-2 text-sm font-medium text-gray-400 dark:text-white">
                  {{ customerDetail.phoneNumber }}
                </label>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-red-500">location_on</span>
                <label class="block ml-2 text-sm font-medium text-gray-400 dark:text-white">
                  {{ customerDetail.address }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import customerService from "../../services/CustomerService";
import moment from "moment";
export default {
  setup() {
    document.title = "Customers";
  },
  data() {
    return {
      customers: [],
      currentPage: 1,
      pageSize: 5,
      totalResults: 0,
      searchKeyword: "",
      isNotFoundResults: false,
      sortField: "",
      sortOrder: "desc",
      isShowCustomerDetail: false,
      customerDetail: {},
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
    this.getListCustomers();
  },
  methods: {
    formatedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    async getListCustomers() {
      try {
        const response = await customerService.getListCustomers(
          this.currentPage,
          this.pageSize,
          this.searchKeyword,
          this.sortField,
          this.sortOrder
        );
        this.isNotFoundResults = !response.data.data.content.length;
        this.customers = response.data.data.content;
        this.totalResults = response.data.data.totalElements;
        if (!this.customers.length && this.currentPage > 1) {
          this.currentPage--;
          this.getListCustomers();
        }
      } catch (error) {
        this.isNotFoundResults = true;
      }
    },
    toogleSortBy(field) {
      this.sortField = field;
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      this.getListCustomers();
    },
    async showCustomerDetail(id) {
      this.isShowCustomerDetail = true;
      const response = await customerService.getCustomerDetail(id);
      this.customerDetail = response.data.data;
      console.log(this.customerDetail);
    },
    deleteCustomer(id) {
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
            customerService
              .deleteCustomer(id, this.notify)
              .then((check) => {
                if (check) {
                  this.getListCustomers();
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
        this.getListCustomers();
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.getListCustomers();
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
