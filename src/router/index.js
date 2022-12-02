// @ts-nocheck
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "../views/homeView.vue";

Vue.use(VueRouter)

function guardMyroute(to, from, next) {


    console.log(localStorage.getItem('accessToken'))

    var isAuthenticated = false;
    //this is just an example. You will have to find a better or 
    // centralised way to handle you localstorage data handling 
    if (localStorage.getItem('LoggedUser'))
        isAuthenticated = true;
    else
        isAuthenticated = false;


    if (isAuthenticated) {
        next(); // allow to enter route
    }
    else {
        next('/login'); // go to '/login';
    }
}


export const baseRoutes = [
    {
        path: '/',
        name: 'homeView',
        component: HomeView
    },
    {
        path: '/buddies',
        name: 'buddiesView',
        component: () => import('../views/buddiesView.vue')
    },
    {
        path: "/login",
        name: "loginView",
        component: () => import("../views/loginView.vue")
    },
    {
        path: "/auth/seller",
        name: "sellerRegisterView",
        component: () => import("../views/sellerRegisterView.vue")
    },
    {
        path: "/register",
        name: "registerView",
        component: () => import("../views/registerView.vue")
    },
    // {
    //     path: "/analytics",
    //     name: "buyerAnalyticsView",
    //     component: () => import("../views/buyerAnalyticsView.vue")
    // },
    // {
    //     path: "/analytics/seller",
    //     name: "sellerAnalyticsView",
    //     component: () => import("../views/sellerAnalyticsView.vue")
    // },
    {
        path: "/gigs",
        name: "gigsView",
        beforeEnter : guardMyroute,
        component: () => import("../views/gigsView.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...baseRoutes
    ]
})

export default router
