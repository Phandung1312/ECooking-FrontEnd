import { createApp } from "vue";
import "./style.css";
import router from "./router";
import App from "./App.vue";
import Notifications from '@kyvg/vue3-notification'
import Swal from 'sweetalert2'
import axios from "./plugins/axios";
import store from "./stores/store";

const app = createApp(App);

app.use(Notifications);
app.use(router);
app.use(store); 
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$swal = Swal;
app.mount("#app");
