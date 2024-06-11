<template>
    <div class="p-4 ">
        <div class="w-full">
            <nav class="flex" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li class="inline-flex items-center">
                        <a href="/"
                            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white">
                            <span class="material-icons text-sm font-bold mr-1">home</span>
                            <span>Home</span>
                        </a>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">
                            <span class="material-icons text-sm font-bold text-gray-500">arrow_forward_ios</span>
                            <span
                                class="ms-1 text-sm font-medium text-gray-700 md:ms-2 dark:text-gray-400 dark:hover:text-white">Product</span>
                        </div>
                    </li>
                </ol>
            </nav>


            <div class="mt-5 mb-2 p-10 bg-slate-50 flex flex-col rounded-lg">
                <div class="pb-4 flex">
                    <div class="relative w-1/2">
                        <div
                            class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <span class="material-icons text-gray-500 dark:text-gray-400">search</span>
                        </div>
                        <input type="text" id="table-search" v-model="filterParameters.keyword"
                            class="block h-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                            placeholder="Search for product" />
                    </div>
                    <button @click="getListProducts(true)"
                        class="lg:min-w-24 btn ml-2 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button">
                        <span>Search</span>
                    </button>
                    <DropMenu class="mx-3" :options="paginationSizes" :title="'Page Size: '"
                        @option-selected="handlePaginationSelected"></DropMenu>
                </div>


                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption class="sr-only">
                        Files
                    </caption>
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="bg-gray-200">

                            <th scope="col" class="pl-4 pr-2 py-3 min-w-16 w-[1%]">No
                            </th>

                            <th scope="col" class="px-4 py-3 w-[15%]">IMAGE
                            </th>


                            <th @click="sortTable('name')" scope="col" class="px-4 py-3 w-[15%]">NAME
                                <span class="text-lg" :class="arrowClasses('name', 'asc')">&#8593;</span>
                                <span class="text-lg" :class="arrowClasses('name', 'desc')">&#8595;</span>
                            </th>

                            <th @click="sortTable('price')" scope="col" class="px-4 py-3 w-[13%]">Price
                                <span class="text-lg" :class="arrowClasses('price', 'asc')">&#8593;</span>
                                <span class="text-lg" :class="arrowClasses('price', 'desc')">&#8595;</span>
                            </th>

                            <th @click="sortTable('category')" scope="col" class="px-4 py-3 w-2/12">Category
                                <span class="text-lg" :class="arrowClasses('category', 'asc')">&#8593;</span>
                                <span class="text-lg" :class="arrowClasses('category', 'desc')">&#8595;</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in products" :key="product.id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-4 py-4 w-[5%] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span>#{{ index + 1 }}</span>
                            </td>
                            <td class="px-4 py-4 w-[15%]">
                                <span class="flex items-center">
                                    <span class="h-12.5 w-15 rounded-md">
                                        <img class="w-4/6" alt="Product Image" :src="product.imgUrl" />
                                    </span>
                                </span>
                            </td>

                            <td class="px-4 py-4 w-[15%]">
                                <span>{{ product.name }}</span>
                            </td>
                            <td class="px-4 py-4 w-2/12">{{ formattedPrices[index] }}</td>
                            <td class="px-6 py-4 ">
                                <span
                                    class="text-center inline-block w-[80px] bg-blue-100 text-blue-400 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{{
                            product.categoryName }}</span>
                            </td>

                        </tr>
                    </tbody>
                </table>

                <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div class="flex flex-1 justify-between sm:hidden">
                        <a href="#"
                            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                        <a href="#"
                            class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                    </div>
                    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"
                        v-if="pages.totalElements > 0">
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
                            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <a @click="prevPage"
                                    class="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                    <span class="material-icons text-sm" aria-hidden="true">arrow_back_ios_new</span>
                                </a>
                                <a @click="goToPage(page - 1)" v-for="page in pages.totalPages" :key="page"
                                    class="cursor-pointer" :class="{
                            'relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600':
                                filterParameters.page === page - 1,
                            'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                                filterParameters.page !== page - 1,
                        }">
                                    {{ page }}
                                </a>
                                <a @click="nextPage"
                                    class="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                    <span class="material-icons text-sm" aria-hidden="true">arrow_forward_ios</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center" v-else>
                        <span class="text-sm">Not found</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DropMenu from '../../components/DropMenu.vue';
import productService from '../../services/ProductService';
import utils from '../../services/Utils';


export default {
    setup() {
        document.title = "List Products";
    },
    data() {
        return {
            products: [],

            paginationSizes: [5, 10, 15, 30].map(value => ({ key: value, value })),

            filterParameters: {
                keyword: "",
                sortType: "",
                sortField: "",
                page: 0,
                size: 5
            },

            pages: {
                totalElements: 0,
                totalPages: 0
            },
            isLoading: false
        };
    },
    methods: {

        async getListProducts(isSearchMethod = true) {
            try {
                this.isLoading = true;
                if (isSearchMethod) {
                    this.filterParameters.page = 0;
                }
                const response = await productService.getListProducts(this.filterParameters, this.notify);
                this.isLoading = false;
                this.products = response.data.content;
                this.filterParameters.size = parseInt(response.data.size);
                this.pages.totalElements = parseInt(response.data.totalElements);
                this.pages.totalPages = parseInt(response.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        },

        prevPage() {
            if (this.filterParameters.page > 0) {
                this.filterParameters.page--;
                this.getListProducts(false);
            }
        },

        nextPage() {
            if (this.filterParameters.page < this.pages.totalPages - 1) {
                this.filterParameters.page++;
                this.getListProducts(false);
            }
        },

        goToPage(page) {
            if (page >= 0 && page <= this.pages.totalPages - 1) {
                this.filterParameters.page = page;
                this.getListProducts(false);
            }
        },

        handlePaginationSelected(option) {
            this.filterParameters.size = option;
            this.getListProducts();
        },

        handleSortFieldSelected(option) {
            this.filterParameters.sortField = option;
        },

        getShowElementFrom() {
            return this.filterParameters.size * (this.filterParameters.page + 1) - this.filterParameters.size + 1;
        },

        getShowElementTo() {
            const nextPageEnd = this.filterParameters.size * (this.filterParameters.page + 1);
            return Math.min(nextPageEnd,  this.pages.totalElements);
        },

        sortTable(column) {
            if (this.filterParameters.sortField === column) {
                this.filterParameters.sortType = this.filterParameters.sortType === 'asc' ? 'desc' : 'asc';
            } else {
                this.filterParameters.sortField = column;
                this.filterParameters.sortType = 'asc';
            }
            this.getListProducts(true);
        },

        arrowClasses(sortField, sortType) {
            return {
                'hidden': this.filterParameters.sortField === sortField && this.filterParameters.sortType !== sortType,
                'inline-block': this.filterParameters.sortField !== sortField && this.filterParameters.sortType === sortType,
            }
        },

        notify({ title, text, type }) {
            this.$notify({
                title,
                text,
                type,
            });
        }
    },

    computed: {
        formattedPrices() {
            return this.products.map(p => utils.formatCurrencyVND(p.price));
        },
    },

    components: {
        DropMenu
    },

    async mounted() {
        await this.getListProducts(true);
        this.filterParameters.searchField = "";
    },
};
</script>

<style></style>

<style></style>