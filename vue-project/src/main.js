import { createApp } from "vue";
import axios from 'axios'

import store from './stores/index'

import App from "./App.vue";
import router from "./router";


axios.defaults.baseURL = 'http://localhost:3000'

import "./assets/main.css";

store.subscribe((mutation, state) => {
    switch (mutation.type) {
        case 'auth/SET_TOKEN':
            if (mutation.payload) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                localStorage.setItem('token', mutation.payload)
            } else {
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token')
            }
            break;
    }
})

store.dispatch('auth/attempt', localStorage.getItem('token'))


const app = createApp(App);

app.use(router);
app.use(store)

app.mount("#app");



