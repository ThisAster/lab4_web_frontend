//import Vue from 'vue';
import { createApp } from 'vue'
import App from "./App.vue"
import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/components/MainPage/MainPage.vue"
import UserForm from "@/components/MainPage/UserForm.vue"
import RegistrationForm from "@/components/MainPage/RegistrationForm.vue"

const app = createApp({});



app.mount('#app');

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [

        {
            path: "/create-account",
            name: "create-account",
            component: RegistrationForm
        },
        {
            path: "/check-point",
            name: "check-point",
            component: MainPage
        },
        {
            path: "/",
            name: "login",
            component: UserForm
        }
    ]
})

createApp(App).use(router).mount("#app")
