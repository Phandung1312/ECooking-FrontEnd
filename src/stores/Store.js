import Vuex from 'vuex';
import { createApp } from "vue";

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      username: '',
      email: '',
      avatarUrl: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
    },
  },
  mutations: {
    updateUserProfile(state, userData) {
      state.user = { ...state.user, ...userData };
    },
  },
});
