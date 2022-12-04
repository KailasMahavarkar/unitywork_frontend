// @ts-nocheck
import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from "../views/homeView.vue";
import store from '@/store';

Vue.use(VueRouter)

function guardMyroute(to, from, next) {
    if (store.state.authenicated) {
        return next();
    }

    const user = store.state.user;
    if (user) {
        // check if token iat is more than exp
        if (user['iat'] < user['exp']) {
            // token is valid
            return next();
        }
    }

    next('/login');
}

const waitForStorageToBeReady = async (to, from, next) => {
    await store.restored
    next()
}

export const baseRoutes = [
    {
        path: '/',
        name: 'homeView',
        component: HomeView
    },
    {
        path: "/login",
        name: "loginView",
        component: () => import("../views/loginView.vue")
    },
    {
        path: "/seller-dashboard",
        name: "sellerDashboardView",
        beforeEnter: guardMyroute,
        component: () => import("../views/sellerDashboardView.vue"),
    },
    {
        path: "/seller-dashboard/create-gig",
        name: "sellerGigCreateView",
        component: () => import("../views/sellerGigCreateView.vue"),
    },
    {
        path: "/register",
        name: "registerView",
        component: () => import("../views/registerView.vue")
    },
    {
        path: "/gigs/:id",
        name: "gigView",
        component: () => import("../views/gigView.vue")
    },
    {
        path: "/gigs",
        name: "gigsView",
        component: () => import("../views/gigsView.vue"),
        children: []
    },
    {
        path: "*",
        name: "notFoundView",
        component: () => import("../views/notFoundView.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...baseRoutes
    ]
})


router.beforeEach(waitForStorageToBeReady)


export default router
