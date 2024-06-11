<template>
  <div class="w-full p-4">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
          <a href="/"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white">
            <span class="material-icons text-sm font-bold mr-1">home</span>
            <span>Home</span>
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <span class="material-icons text-sm font-bold text-gray-500">arrow_forward_ios</span>
            <span
              class="ms-1 text-sm font-medium text-gray-700 md:ms-2 dark:text-gray-400 dark:hover:text-white">File</span>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <span class="material-icons text-sm font-bold text-gray-500">arrow_forward_ios</span>
            <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">List Files</span>
          </div>
        </li>
      </ol>
    </nav>

    <div class="mt-5 mb-2 p-3 lg:p-10 bg-slate-50 flex flex-col rounded-lg">
      <div class="pb-4 flex">
        <div class="relative w-1/2">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <span class="material-icons text-gray-500 dark:text-gray-400">search</span>
          </div>
          <input type="text" id="table-search"
            class="block h-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
            placeholder="Search for files" v-model="searchKeyword" @input="searchAndFilterFile" />
        </div>
        <div class="relative">
          <button @click="toggleFilterByStatus"
            class="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button">
            <span class="hidden sm:block">Filter by status</span>
            <span class="sm:hidden">Filter</span>
            <span class="material-icons ms-1" v-show="!openFilterByStatus">arrow_drop_down</span>
            <span class="material-icons ms-1" v-show="openFilterByStatus">arrow_drop_up</span>
          </button>

          <div v-show="openFilterByStatus"
            class="absolute z-10 w-[150px] lg:w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 mt-2">
            <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
              Status
            </h6>
            <ul class="space-y-2 text-sm">
              <li class="flex items-center">
                <input id="completed" type="checkbox" value="COMPLETED" v-model="selectedStatuses"
                  @change="searchAndFilterFile" :checked="selectedStatuses.includes('COMPLETED')"
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <div class="rounded-full bg-green-500 w-2.5 h-2.5 ml-1"></div>
                <label for="completed" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Completed
                </label>
              </li>
              <li class="flex items-center">
                <input id="pending" type="checkbox" value="PENDING" v-model="selectedStatuses"
                  @change="searchAndFilterFile" :checked="selectedStatuses.includes('PENDING')"
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <div class="rounded-full bg-yellow-500 w-2.5 h-2.5 ml-1"></div>
                <label for="pending" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Pending
                </label>
              </li>
              <li class="flex items-center">
                <input id="running" type="checkbox" value="RUNNING" v-model="selectedStatuses"
                  @change="searchAndFilterFile" :checked="selectedStatuses.includes('RUNNING')"
                  class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <div class="rounded-full bg-red-500 w-2.5 h-2.5 ml-1"></div>
                <label for="running" class="ml-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Running
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="overflow-y-scroll">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption class="sr-only">
            Files
          </caption>
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr class="bg-gray-200">
              <th scope="col" class="px-6 py-3 w-[5%]">
                <div class="flex items-center">
                  NO
                </div>
              </th>
              <th scope="col" class="px-6 py-3 w-1/4">
                <div class="flex items-center">
                  NAME
                  <span class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                    @click="toogleSortBy('name')">swap_vert</span>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 w-1/6">
                <div class="flex items-center">
                  STATUS
                  <span class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                    @click="toogleSortBy('status')">swap_vert</span>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  SIZE
                  <span class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                    @click="toogleSortBy('size')">swap_vert</span>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  DATE ADDED
                  <span class="material-icons text-base text-gray-500 dark:text-gray-400 cursor-pointer"
                    @click="toogleSortBy('createdAt')">swap_vert</span>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(file, index) in files" :key="file.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[5%]">
                <div class="flex items-center">
                  <span>#{{ index + 1 }}</span>
                </div>
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/4">
                <div class="flex items-center">
                  <span class="material-icons text-gray-400 mr-1">description</span>
                  <span>{{ file.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 w-1/6">
                <span :class="getStatusClass(file.status)">
                  {{ file.status }}
                </span>
              </td>
              <td class="px-6 py-4">{{ file.size }}</td>
              <td class="px-6 py-4">{{ file.createdAt }}</td>
              <td class="flex flex-wrap gap-1 px-6 py-4">
                <button type="button" @click="downloadFile(file.id, file.name)"
                  class="text-green-500 border border-green-500 hover:bg-green-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center me-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500">
                  <span class="material-icons cursor-pointer">file_download</span>
                </button>
                <button type="button" @click="deleteFile(file.id)"
                  class="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                  <span class="material-icons cursor-pointer">delete</span>
                </button>
              </td>
            </tr>
            <tr v-if="isNotFoundResults">
              <td colspan="5" class="text-center py-4 text-gray-500 dark:text-gray-400">
                No matching records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div class="pb-2 lg:pb-0">
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
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a @click="prevPage"
                class="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-1 lg:px-4 lg:py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span class="material-icons text-sm" aria-hidden="true">arrow_back_ios_new</span>
              </a>
              <a @click="goToPage(page)" v-for="page in totalPages" :key="page" class="cursor-pointer" :class="{
                  'relative z-10 inline-flex items-center bg-blue-600 px-2 py-1 lg:px-4 lg:py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600':
                    currentPage === page,
                  'relative inline-flex items-center px-2 py-1 lg:px-4 lg:py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                    currentPage !== page,
                }">
                {{ page }}
              </a>

              <a @click="nextPage"
                class="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-1 lg:px-4 lg:py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span class="material-icons text-sm" aria-hidden="true">arrow_forward_ios</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import fileService from "../../services/FileService";
export default {
  setup() {
    document.title = "Files";
  },
  data() {
    return {
      openFilterByStatus: false,
      files: [],
      currentPage: 1,
      pageSize: 5,
      totalResults: 0,
      searchKeyword: "",
      isNotFoundResults: false,
      sortField: "",
      sortOrder: "asc",
      selectedStatuses: ["PENDING", "COMPLETED", "RUNNING"],
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
    this.getListFiles();
  },
  methods: {
    toggleFilterByStatus() {
      this.openFilterByStatus = !this.openFilterByStatus;
    },
    getStatusClass(status) {
      switch (status) {
        case "PENDING":
          return "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-yellow-400 border border-yellow-400";
        case "COMPLETED":
          return "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400";
        case "RUNNING":
          return "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400";
        default:
          return "";
      }
    },
    async getListFiles() {
      try {
        const response = await fileService.getListFiles(
          this.currentPage,
          this.pageSize
        );
        this.files = response.data.data.content;
        this.totalResults = response.data.data.totalElements;
      } catch (error) {
        console.error(error);
      }
    },
    downloadFile(id, fileName) {
      fileService.downloadFile(id, fileName, this.notify);
    },
    deleteFile(id) {
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
            fileService
              .deleteFile(id, this.notify)
              .then((check) => {
                if (check === true) {
                  this.getListFiles();
                }
              })
              .catch((error) => {
                console.error("Error deleting file:", error);
              });
          }
        });
    },
    async searchAndFilterFile() {
      try {
        const statusString = this.selectedStatuses.join(",");
        const response = await fileService.searchAndFilterFile(
          this.currentPage,
          this.pageSize,
          this.searchKeyword,
          statusString
        );
        if (!response.data.data.content.length) {
          this.isNotFoundResults = true;
        } else {
          this.isNotFoundResults = false;
        }
        this.files = response.data.data.content;
        this.totalResults = response.data.data.totalElements;
        if (!this.files.length && this.currentPage > 1) {
          this.currentPage--;
          this.searchAndFilterFile();
        }
      } catch (error) {
        console.error(error);
      }
    },
    toogleSortBy(field) {
      this.sortField = field;
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        if (this.searchKeyword) {
          this.searchAndFilterFile();
        } else {
          this.getListFiles();
        }
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        if (this.searchKeyword) {
          this.searchAndFilterFile();
        } else {
          this.getListFiles();
        }
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        if (this.searchKeyword) {
          this.searchAndFilterFile();
        } else {
          this.getListFiles();
        }
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
<style></style>
