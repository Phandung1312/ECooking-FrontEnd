<template>
  <div class="p-4">
    <div class="w-full">
      <div class="mt-5 mb-2 p-10 bg-slate-50 flex flex-col rounded-lg">
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
              v-model="filterParameters.keyword"
              class="block h-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
              placeholder="Search for recipe"
            />
          </div>
          <button
            @click="getListRecipes(true)"
            class="lg:min-w-24 btn ml-2 mr-2 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            <span>Search</span>
          </button>
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

              <th scope="col" class="px-4 py-3">Image</th>

              <th scope="col" class="px-4 py-4 w-[15%]">Content</th>

              <th scope="col" class="px-4 py-4 w-[20%]">Author</th>
              <th scope="col" class="px-4 py-3 w-1/12">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(recipe, index) in recipes"
              :key="recipe.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td
                class="px-4 py-4 w-[5%] font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <span>#{{ index + 1 }}</span>
              </td>
              <td class="px-4 py-4 w-[15%]">
                <div class="flex items-center">
                  <div class="h-48 w-48 rounded-md relative overflow-hidden">
                    <img
                      class="w-full h-full object-cover rounded-md brightness-50 hover:brightness-100 transition duration-200 ease-in-out"
                      alt="Recipe Image"
                      :src="recipe.imageUrl"
                    />
                    <div
                      class="absolute bottom-0 left-0 bg-white bg-opacity-0 px-1 py-1 text-xs flex justify-between w-full"
                    >
                      <div class="flex items-center justify-center gap-1">
                        <font-awesome-icon
                          :icon="['far', 'eye']"
                          class="text-white"
                          size="lg"
                        />
                        <span class="text-sm text-white font-thin">{{
                          recipe.views
                        }}</span>
                      </div>
                      <div class="flex items-center justify-center gap-1">
                        <font-awesome-icon
                          :icon="['far', 'heart']"
                          class="text-white"
                          size="lg"
                        />
                        <span class="text-sm text-white font-thin">{{
                          recipe.likeCount
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>

              <td class="px-4 py-4 w-[30%]">
                <div class="flex flex-col">
                  <span class="font-bold mb-2">Title : {{ recipe.title }}</span>
                  <span
                    >Post Date :
                    {{ formatTimestampToDateString(recipe.createdAt) }}</span
                  >
                </div>
              </td>
              <td class="px-4 py-4 w-[30%]">
                <div class="flex items-center h-full">
                  <img
                    class="w-10 h-10 rounded-full"
                    :src="recipe.author.avatarUrl"
                    alt="Author Avatar"
                  />
                  <span class="ml-2 whitespace-nowrap overflow-ellipsis">{{
                    recipe.author.displayName
                  }}</span>
                </div>
              </td>
              <td class="px-4 py-4 w-[5%]">
                 <div class = "flex items-center h-full" >
                  <button type="button" v-if="recipe.status === 2" @click="handleBlock(recipe.id)"
                     class="btn text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  class="h-4 w-4 lg:h-6 lg:w-6"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                         <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                         <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                     </svg>
                 </button>
                 <button type="button" v-else @click="handleUnBlock(recipe.id)"
                     class="btn text-green-500 border border-green-500 hover:bg-green-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                         class="h-4 w-4 lg:h-6 lg:w-6" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                         <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                         <path d="M7 11V7a5 5 0 0 1 9.9-1" />
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
import recipeService from "../../services/RecipeService";
import utils from "../../services/Utils";

export default {
  setup() {
    document.title = "List Recipes - ECooking";
  },
  data() {
    return {
      recipes: [],

      paginationSizes: [5, 10, 15, 30].map((value) => ({ key: value, value })),

      filterParameters: {
        keyword: "",
        sortType: "",
        sortField: "",
        status: "",
        page: 1,
        size: 20,
      },
      statusOptions: [
        { key: "all", value: "All" },
        { key: "true", value: "Public" },
        { key: "false", value: "Block" },
      ],
      pages: {
        totalElements: 0,
        totalPages: 0,
      },
      isLoading: false,
    };
  },
  methods: {
    async getListRecipes(isSearchMethod = true) {
      try {
        this.isLoading = true;
        if (isSearchMethod) {
          this.filterParameters.page = 1;
        }
        const response = await recipeService.getListRecipe(
          this.filterParameters,
          this.notify
        );
        this.isLoading = false;
        this.recipes = response.data;
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
        this.getListRecipes(false);
      }
    },

    nextPage() {
      if (this.filterParameters.page < this.pages.totalPages) {
        this.filterParameters.page++;
        this.getListRecipes(false);
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.pages.totalPages) {
        this.filterParameters.page = page;
        this.getListRecipes(false);
      }
    },
    handleBlock(recipeId) {
      this.$swal
                .fire({
                    title: "Are you sure?",
                    text: "Delete recipe with id: " + recipeId,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!",
                })
                .then((result) => {
                    if (result.isConfirmed)
                        recipeService.blockRecipe(recipeId, this.notify).then(response => {
                            if (response === "ok") {
                                this.getListRecipes(false);
                            }
                        }).catch(e => {
                            console.log(e);
                        })
                });
    },
    handleUnBlock(recipeId) {
      this.$swal
                .fire({
                    title: "Are you sure?",
                    text: "Unblock recipe with id: " + recipeId,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Unblock it!",
                    cancelButtonText: "No, cancel!"
                })
                .then((result) => {
                    if (result.isConfirmed)
                        recipeService.unblockRecipe(recipeId, this.notify).then(response => {
                            if (response === "ok") {
                                this.getListRecipes(false);
                            }
                        }).catch(e => {
                            console.log(e);
                        })
                });
    },
    handlePaginationSelected(option) {
      this.filterParameters.size = option;
      this.getListRecipes();
    },

    handleSortFieldSelected(option) {
      this.filterParameters.sortField = option;
    },
    handleStatusSelected(option) {
      if (option === "all") {
        this.filterParameters.status = option;
      } else {
        this.filterParameters.status = option === "true" ? 2 : 0;
      }
      this.getListRecipes();
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

    sortTable(column) {
      if (this.filterParameters.sortField === column) {
        this.filterParameters.sortType =
          this.filterParameters.sortType === "asc" ? "desc" : "asc";
      } else {
        this.filterParameters.sortField = column;
        this.filterParameters.sortType = "asc";
      }
      this.getListRecipes(true);
    },

    arrowClasses(sortField, sortType) {
      return {
        hidden:
          this.filterParameters.sortField === sortField &&
          this.filterParameters.sortType !== sortType,
        "inline-block":
          this.filterParameters.sortField !== sortField &&
          this.filterParameters.sortType === sortType,
      };
    },

    notify({ title, text, type }) {
      this.$notify({
        title,
        text,
        type,
      });
    },
  },

  computed: {
    // formattedPrices() {
    //     return this.recipes.map(p => utils.formatCurrencyVND(p.price));
    // },
  },

  components: {
    DropMenu,
  },

  async mounted() {
    await this.getListRecipes(true);
    this.filterParameters.searchField = "";
  },
};
</script>

<style></style>

<style></style>