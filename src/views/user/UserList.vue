<template>
    <div class="p-4">
        <div class="w-full">
           


            <div class="mt-5 mb-2 p-3 lg:p-10 bg-slate-50 flex flex-col rounded-lg">
                <UserDetail ref="userDetail" @close="closeModal" @reload="getListUsers"></UserDetail>
                <div class="pb-4 flex flex-col md:flex-col lg:flex-col xl:flex-row gap-1 md:gap-2 lg:gap-4  xl:gap-5">
                    <div class="flex w-full md:w-full lg:w-full xl:w-1/2 gap-1 md:gap-2 lg:gap-4  xl:gap-5">
                        <div class="relative w-[60%] md:w-[80%] lg:w-[85%]">
                            <div
                                class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <span class="material-icons text-gray-500 dark:text-gray-400">search</span>
                            </div>
                            <input type="text" id="table-search" v-model="filterParameters.keyword"
                                class="block h-full p-1.5 ps-10 text-xs lg:text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
                                placeholder="Search for user" />
                        </div>
                        <button @click="getListUsers(true)"
                            class="w-[40%] md:w[20%] lg:w-[15%] lg:min-w-24 text-xs lg:text-sm btn text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-3 py-1 lg:px-4 lg:py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button">
                            <span>Search</span>
                        </button>
                    </div>
                    <div class="flex flex-row gap-1 md:gap-2 lg:gap-4 xl:gap-5 flex-grow">
                        <DropMenu class="sm:w-[60%] md:w-[60%] lg:w-[60%]" :options="searchOption.list"
                            :title="searchOption.title" @option-selected="handleOptionSelected"></DropMenu>
                        <DropMenu class="sm:w-[40%] md:w-[40%] lg:w-[40%]" :options="statusOptions" :title="'Filter: '"
                            @option-selected="handleStatusSelected">
                        </DropMenu>
                        <DropMenu class="w-[60%] md:w-[80%] lg:w-[40%]" :options="paginationSizes"
                            :title="'Page Size: '" @option-selected="handlePaginationSelected"></DropMenu>

                    </div>
                 
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <caption class="sr-only">
                            Users
                        </caption>
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr class="bg-gray-200">
                                <th scope="col" class="pl-4 pr-2 py-3 min-w-16 w-[1%]">NO
                                </th>

                                <th @click="sortTable('firstName')" scope="col" class="px-4 py-3 w-[15%]">NAME
                                    <span class="text-lg" :class="arrowClasses('firstName', 'asc')">&#8593;</span>
                                    <span class="text-lg" :class="arrowClasses('firstName', 'desc')">&#8595;</span>
                                </th>

                                <th @click="sortTable('username')" scope="col" class="px-4 py-3 w-[15%]">USERNAME
                                    <span class="text-lg" :class="arrowClasses('username', 'asc')">&#8593;</span>
                                    <span class="text-lg" :class="arrowClasses('username', 'desc')">&#8595;</span>
                                </th>

                                <th @click="sortTable('email')" scope="col" class="px-4 py-3">EMAIL
                                    <span class="text-lg" :class="arrowClasses('email', 'asc')">&#8593;</span>
                                    <span class="text-lg" :class="arrowClasses('email', 'desc')">&#8595;</span>
                                </th>
                
                                <th scope="col" class="px-4 py-3 w-1/12">ROLE</th>
                                <th scope="col" class="px-4 py-3 w-1/12">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="user.id"
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td
                                    class="px-4 py-4 w-[1%] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <span>#{{ index + 1 }}</span>
                                </td>
                                <!-- name -->
                                <td class="px-4 py-4 w-[15%]">
                                    <span>{{ user.displayName}}</span>
                                </td>
                                <td class="px-4 py-4 w-[13%]">{{ user.username }}</td>
                                <td class="px-4 py-4 w-[13%]">{{ user.email }}</td>
                                <!-- role -->
                                <td class="px-4 py-4 ">
                                    <span v-if="user.role === 2"
                                        class="inline-block text-center w-[75px] bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                                        ADMIN
                                    </span>
                                    <span v-else
                                        class="inline-block text-center w-[75px] bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                                        USER
                                    </span>
                                </td>
                                <td class="px-4 py-4 flex flex-wrap gap-1">
                 
                                    <button type="button" v-if="user.status === 1" @click="handleBlock(user)"
                                        class="btn text-red-500 border border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  class="h-4 w-4 lg:h-6 lg:w-6"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </button>
                                    <button type="button" v-else @click="handleUnBlock(user)"
                                        class="btn text-green-500 border border-green-500 hover:bg-green-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs p-1 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                            class="h-4 w-4 lg:h-6 lg:w-6" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div class="flex flex-col lg:flex-row sm:flex-1 sm:items-center sm:justify-between"
                        v-if="pages.totalElements > 1">
                        <div class="pb-2 lg:pb-0">
                            <p class="text-xs lg:text-sm text-gray-700">
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
                                    class="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-1 lg:py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                    <span class="material-icons text-sm" aria-hidden="true">arrow_back_ios_new</span>
                                </a>
                                <a @click="goToPage(page )" v-for="page in pages.totalPages" :key="page"
                                    class="cursor-pointer text-xs lg:text-sm px-2 py-1 lg:px-4 lg:py-2 font-semibold relative inline-flex items-center"
                                    :class="{
                                            'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600':
                                                filterParameters.page === page ,
                                            'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                                                filterParameters.page !== page ,
                                        }">
                                    {{ page }}
                                </a>
                                <a @click="nextPage"
                                    class="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-1 lg:py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
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

import userService from '../../services/UserService';
import DropMenu from '../../components/DropMenu.vue';
import UserDetail from './UserDetail.vue';


export default {
    setup() {
        document.title = "List Users";
    },
    data() {
        return {
            searchOption: {
                title: "Search by:",
                list: [
                    { key: 'displayName', value: "Name" },
                    { key: 'username', value: "Username" },
                    { key: 'email', value: "Email" },
                ]
            },

            sortOption:
            {
                title: "Sort: default ID",
                list: [
                    { key: 'id', value: "User ID" },
                    { key: 'username', value: "Username" },
                    { key: 'email', value: "Email" },
                    { key: 'firstName', value: "First name" },
                    { key: 'phoneNumber', value: "Phone number" }
                ]
            },
            statusOptions:
                [
                    { key: 'all', value: "All" },
                    { key: 'true', value: "Active" },
                    { key: 'false', value: "Block" }
                ]
            ,

            paginationSizes: [5, 10, 15, 30].map(value => ({ key: value, value })),

            openFilterByStatus: false,
            filterParameters: {
                keyword: "",
                searchField: "",
                status: "all",
                sortType: "",
                sortField: "",
                page: 1,
                size: 20
            },


            pages: {
                totalElements: 0,
                totalPages: 0
            },

            users: [],
            showChildModal: false,
            modalId: null,
            isLoading: false
        };
    },
    methods: {

        async getListUsers(isSearchMethod = true) {
            try {
                this.isLoading = true;
                if (isSearchMethod) {
                    this.filterParameters.page =1;
                }
                const response = await userService.getUserList(this.filterParameters, this.notify);
                this.isLoading = false;
                this.users = response.data;
                this.filterParameters.size = parseInt(response.perPage);
                this.pages.totalElements = parseInt(response.total);
                this.pages.totalPages = parseInt(response.total/response.perPage) + 1;
            } catch (error) {
                console.error(error);
            }
        },

        prevPage() {
            if (this.filterParameters.page > 1) {
                this.filterParameters.page--;
                this.getListUsers(false);
            }
        },

        nextPage() {
            if (this.filterParameters.page < this.pages.totalPages ) {
                this.filterParameters.page++;
                this.getListUsers(false);
            }
        },

        goToPage(page) {
            if (page >= 1 && page <= this.pages.totalPages ) {
                this.filterParameters.page = page;
                this.getListUsers(false);
            }
        },

        handleOptionSelected(option) {
            this.filterParameters.searchField = option;
        },

        handlePaginationSelected(option) {
            this.filterParameters.size = option;
            this.getListUsers();
        },

        handleSortFieldSelected(option) {
            this.filterParameters.sortField = option;
        },

        handleStatusSelected(option) {
            console.log(option);
            if(option === 'all'){
                this.filterParameters.status = option;
            }
            else{
                this.filterParameters.status = option === 'true' ? 1 : 0;
            }
            this.getListUsers();
        },

        formatTimestampToDateString(timestampInMilliseconds) {
            const dateObject = new Date(timestampInMilliseconds);

            const day = dateObject.getDate();
            const month = dateObject.getMonth() + 1;
            const year = dateObject.getFullYear();

            return `${day}/${month}/${year}`;
        },

        getShowElementFrom() {
            return this.filterParameters.size * (this.filterParameters.page ) - this.filterParameters.size + 1;
        },

        getShowElementTo() {
            return this.filterParameters.size * (this.filterParameters.page ) <
                this.pages.totalElements ? this.filterParameters.size * (this.filterParameters.page ) :
                this.pages.totalElements
        },

        closeModal() {
            this.modalId = null;
        },

        moreInfo(id) {
            this.modalId = id;
            this.sendDataToChild();
        },

        sendDataToChild() {
            this.$nextTick(() => {
                this.$refs.userDetail.updateData(this.modalId);
            });
        },

        updateDataInParent(data) {
            this.dataToSend = data;
        },

        sortTable(column) {
            if (this.filterParameters.sortField === column) {
                this.filterParameters.sortType = this.filterParameters.sortType === 'asc' ? 'desc' : 'asc';
            } else {
                this.filterParameters.sortField = column;
                this.filterParameters.sortType = 'asc';
            }
            this.getListUsers(true);
        },

        handleBlock(user) {
            this.$swal
                .fire({
                    title: "Are you sure?",
                    text: "Delete user: " + user.displayName,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!",
                })
                .then((result) => {
                    if (result.isConfirmed)
                        userService.blockUser(user.id, this.notify).then(response => {
                            if (response === "ok") {
                                this.getListUsers(false);
                            }
                        }).catch(e => {
                            console.log(e);
                        })
                });
        },

        handleUnBlock(user) {
            this.$swal
                .fire({
                    title: "Are you sure?",
                    text: "Unblock user: " + user.displayName,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Unblock it!",
                    cancelButtonText: "No, cancel!"
                })
                .then((result) => {
                    if (result.isConfirmed)
                        userService.unBlockUser(user.id, this.notify).then(response => {
                            if (response === "ok") {
                                this.getListUsers(false);
                            }
                        }).catch(e => {
                            console.log(e);
                        })
                });
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
        formattedDateOfBirth() {
            return (timestampInMilliseconds) => this.formatTimestampToDateString(timestampInMilliseconds);
        },
    },
    components: {
        DropMenu,
        UserDetail
    },

    async mounted() {
        await this.getListUsers(true);
        this.filterParameters.searchField = this.searchOption.list[0].key;
    },
};
</script>

<style></style>
