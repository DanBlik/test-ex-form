import Vue from 'vue'
import VueRouter from 'vue-router'
import AppForm from "./components/AppForm";
import AppModalSuccess from "./components/AppModalSuccess";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: AppForm
        },
        {
            path: '/success',
            component: AppModalSuccess
        }
        ]
})