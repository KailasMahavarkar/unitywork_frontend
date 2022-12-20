// @ts-nocheck
import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from "../views/homeView.vue";
import store from '@/store';
import { refreshToken } from '@/api';
import { customToast } from '@/helper'


Vue.use(VueRouter)

async function guardMyroute(to, from, next) {
    if (store.state.authenicated) {
        return next();
    }

    const user = store.state.user;

    if (!user) {
        return next('/login');
    }

    // check if refresh token is expired
    const refreshTokenTimeInSeconds = (user.refreshExp - (Date.now() / 1000)).toFixed(0);
    const refreshTokenTimeInMinutes = refreshTokenTimeInSeconds / 60;
    const refreshTokenExpired = refreshTokenTimeInMinutes < 0;

    if (refreshTokenExpired) {
        // set authenicated to false
        store.commit('setAuthentication', false);

        // reset user data
        store.commit('resetUser');

        customToast({
            message: 'Your session has expired',
            icon: 'error'
        })

        return next('/login');
    }


    const accessTokenTimeInSeconds = (user.exp - (Date.now() / 1000)).toFixed(0);
    const accessTokenTimeInMinutes = accessTokenTimeInSeconds / 60;
    const tokenExpired = accessTokenTimeInMinutes < 0;

    if (!tokenExpired) {
        return next();
    } else {
        // refresh token
        const hasRefreshed = await refreshToken();

        if (!hasRefreshed) {
            return next('/login');
        }

        return next();
    }

}

function guardAdminRoute(to, from, next) {

    // authenicate user
    const user = store.state.user;

    // check if user is admin
    if (user['role'] !== 'admin') {
        return next('/login');
    }

    return guardMyroute(to, from, next);
}

const waitForStorageToBeReady = async (to, from, next) => {
    await store.restored
    next()
}

const sellerDashboardRoutes = [
    {
        path: "/seller-dashboard/create-gig",
        name: "sellerGigCreateEditorView",
        beforeEnter: guardMyroute,
        component: () => import("../views/sellerGigCreateEditorView.vue"),
    },
    {
        path: "/seller-dashboard/edit/:gigId",
        name: "sellerGigEditView",
        beforeEnter: guardMyroute,
        component: () => import("../views/sellerGigEditView.vue"),
    },
    {
        path: "/seller-dashboard/verification",
        name: "sellerVerificationEditorView",
        beforeEnter: guardMyroute,
        component: () => import("../views/sellerVerificationEditorView.vue"),
    },
    {
        // seller profile editor view
        path: "/seller-dashboard/profile",
        name: "sellerProfileEditorView",
        beforeEnter: guardMyroute,
        component: () => import("../views/sellerProfileEditorView.vue"),
    },
    {

        // seller socials view
        path: "/seller-dashboard/socials",
        name: "sellerSocialsEditorView",
        beforeEnter: guardMyroute,
        component: () => import("../views/sellerSocialsEditorView.vue"),
    },
    {
        // main admin dashboard
        path: "/seller-dashboard",
        name: "sellerDashboardView",
        beforeEnter: guardMyroute,
        component: () => import("../views/sellerDashboardView.vue"),
    },

]


const adminDashboardRoutes = [
    {
        // admin dashboard
        path: "/admin-dashboard",
        name: "adminDashboardView",
        beforeEnter: guardAdminRoute,
        component: () => import("../views/adminSellersView.vue"),
    },
    {
        // show all sellers
        path: "/admin-dashboard/sellers",
        name: "adminSellersView",
        beforeEnter: guardAdminRoute,
        component: () => import("../views/adminSellersView.vue"),
    },

    {
        // show all gigs
        path: "/admin-dashboard/gigs",
        name: "adminGigsView",
        beforeEnter: guardAdminRoute,
        component: () => import("../views/adminGigsView.vue"),
    }
]


export const baseRoutes = [
    {
        path: '/',
        name: 'homeView',
        component: HomeView
    },
    {
        path: "/test",
        name: "testView",
        component: () => import("../views/testView.vue")
    },
    {
        path: "/login",
        name: "loginView",
        component: () => import("../views/loginView.vue")
    },
    {
        path: "/sellers",
        name: "sellersView",
        component: () => import("../views/sellersView.vue"),
    },
    {
        path: "/sellers/:username",
        name: "sellerView",
        component: () => import("../views/sellerView.vue"),
    },

    {
        path: "/register",
        name: "registerView",
        component: () => import("../views/registerView.vue")
    },
    {
        path: "/reset-password",
        name: "passwordResetView",
        component: () => import("../views/passwordResetView.vue")
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
        ...baseRoutes,
        ...sellerDashboardRoutes,
        ...adminDashboardRoutes
    ]
})


router.beforeEach(waitForStorageToBeReady)


export default router
