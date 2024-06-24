import { createApp } from "vue";
import "./style.css";
import router from "./router";
import App from "./App.vue";
import Notifications from '@kyvg/vue3-notification'
import Swal from 'sweetalert2'
import axios from "./plugins/axios";
import store from "./stores/Store";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas} from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Thêm các icon bạn muốn sử dụng vào thư viện
library.add(fas);

library.add(far);
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(Notifications);
app.use(router);
app.use(store); 
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$swal = Swal;
app.mount("#app");
