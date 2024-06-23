<template>
  <section class="p-5 md:px-10 lg:p-14 xl:p-20 bg-gray-50 dark:bg-gray-900 h-[100vh]">
    <div>
      <!-- Left column container with background-->
      <div class="flex flex-col lg:flex-row flex-wrap md:pt-5 items-center justify-center gap-10">
        <!-- <div class="mb-12 md:mb-0 md:w-8/12 lg:pr-10 lg:w-5/12 xl:w-5/12">
          <h1 class="text-center text-lg md:text-2xl lg:text-3xl xl:text-5xl font-bold text-blue-500">
            Welcome to E-commerce Analytics
          </h1>
          <div class="">
            <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="w-full"
              alt="Sample image" />
          </div>
        </div> -->

        <!-- Right column container -->
        <div
          class="mb-12 md:mb-0 w-[80%] md:w-8/12 lg:w-5/12 xl:w-[30%] border-2 border-slate-300 rounded-xl drop-shadow-lg bg-white">
          <form class="flex-col justify-center w-5/6 mx-auto px-3 py-10" @submit.prevent="login()">
            <!--Sign in section-->
            <div
              class="flex flex-row items-center justify-center lg:justify-start mb-2 md:mb-4 lg:mb-6 xl:mb-8 text-blue-500">
              <p class="mb-0 mr-4 text-2xl lg:text-4xl xl:text-5xl font-bold">Login</p>
            </div>

            <!-- User input -->
            <div class="mb-4 lg:mb-6 mx-auto flex-col" data-te-input-wrapper-init>
              <div class="flex items-center gap-1">
                <span class="material-icons ">
                  person
                </span>
                <label for="username" class="block text-base lg:text-lg xl:text-xl bold">Username</label>
              </div>
              <input type="text" v-model="loginRequest.username" required
                class="mt-3 border-2 border-slate-300 hover:border-blue-500 
                peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] 
                leading-[2.15] outline-none transition-all duration-200 ease-linear 
                focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-100"
                id="username" placeholder="Username" />
            </div>

            <!-- Password input -->
            <div class="mb-6 lg:mb-12 mx-auto flex-col" data-te-input-wrapper-init>
              <div class="flex items-center gap-1">
                <span class="material-icons">
                  lock
                </span>
                <label for="password" class="text-base lg:text-lg xl:text-xl bold">Password</label>
              </div>
              <input type="password" v-model="loginRequest.password" required
                class="mt-3 border-2 border-slate-300 hover:border-blue-500 peer block min-h-[auto] w-full 
                rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all 
                duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
                motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
                [&:not([data-te-input-placeholder-active])]:placeholder:opacity-100"
                id="password" placeholder="Password" />
            </div>

            <!-- Login button -->
            <div class="text-center lg:text-left">
              <button type="submit"
                class="btn inline-block rounded bg-[#005CE8] w-full 
                px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal 
                text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 
                ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
                dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init data-te-ripple-color="light">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import authService from "../../services/AuthService";

export default {
  name: "UserLogin",
  components: {},
  data() {
    return {
      user: {
        id: null,
        username: null,
        email: null,
        firstName: null,
        lastName: null,
        phone: null,
        isActive: null,
        roles: [],
        accessToken: null,
        refreshToken: null,
        createAt: null,
        createBy: null,
      },
      loginRequest: {
        username: "",
        password: "",
      },
    };
  },
  setup() {
    document.title = "Login";
  },
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() { },
  methods: {
    notify({ title, text, type }) {
      this.$notify({
        title,
        text,
        type,
      });
    },

    login() {
      authService.login(this.loginRequest.username, this.loginRequest.password, this.notify)
        .then(data => {
          this.user.id = data.id;
          this.user.username = data.username;
          this.user.email = data.email;
          this.user.roles = data.roles;
        }).catch(error => {
          console.error('Login error:', error);
        });
    },
  },
};
</script>

<style scoped></style>
