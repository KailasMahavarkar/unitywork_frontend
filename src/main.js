import Vue from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import store from './store'
import Fragment from 'vue-fragment';
import dashboardComponent from "./components/layouts/dashboardComponent.vue";
import pageComponent from "./components/layouts/pageComponent.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faRightLeft, faSun, faMoon,
    faEnvelope, faStar, faQuestion,
    faHouse, faList, faGear,
    faStore, faChartLine, faEdit,
    faCircle, faComments, faTrash, faSearch,
    faAdd, faUser, faCircleCheck,
    faThumbsUp, faThumbsDown,
    faEye, faTimes, faCheck,
    faCloudUpload, faBars
} from '@fortawesome/free-solid-svg-icons';


import {
    faGithub, faTwitter, faInstagram, faDribbble, faBehance,
    faYoutube, faLinkedin, faDiscord,
    faFacebook
} from '@fortawesome/free-brands-svg-icons';


// import vue-debounce
import vueDebounce from 'vue-debounce';

// custom stylesheet
import './styles/main.css';
import { faWpexplorer } from '@fortawesome/free-brands-svg-icons';


// import fontawesome library
library.add(
    faRightLeft, faSun, faMoon,
    faEnvelope, faStar, faQuestion,
    faHouse, faList, faGear,
    faSearch, faUser,
    faStore, faChartLine, faTrash,
    faEdit, faCircle, faComments,
    faAdd, faWpexplorer, faCircleCheck,
    faEnvelope,
    faThumbsUp, faThumbsDown,
    faEye, faTimes, faCheck,
    faCloudUpload, faBars,

    // brands
    faGithub, faTwitter, faInstagram, faDribbble, faBehance, faYoutube,

    faFacebook,
    faLinkedin, faDiscord

)


// plugins
Vue.use(Fragment.Plugin);
Vue.use(vueDebounce);
Vue.component("font-awesome-icon", FontAwesomeIcon);


// custom components
Vue.component("dashboard-component",dashboardComponent);
Vue.component("page-component",pageComponent);


Vue.config.productionTip = false

// vue filter to support max length of 20 for string
Vue.filter('truncate', (/** @type {string} */ text) => {
    if (text.length > 20) {
        return text.substring(0, 20) + '...';
    } else {
        return text;
    }
});



// create a new Vue instance
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
