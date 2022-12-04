import Vue from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import store from './store'
import Fragment from 'vue-fragment';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faRightLeft, faSun, faMoon,
    faEnvelope, faStar, faQuestion,
    faHouse, faList, faGear,
    faStore, faChartLine, faEdit,
    faCircle, faComments, faTrash, faSearch,
    faAdd, faUser, faCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import vueDebounce from 'vue-debounce';
import { SERVER_URL } from './env';


axios.defaults.baseURL = SERVER_URL;


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
    faAdd, faWpexplorer, faCircleCheck
)

// plugins
Vue.use(Fragment.Plugin);
Vue.use(vueDebounce)


// import fontawesome component as a global component
Vue.component("font-awesome-icon", FontAwesomeIcon);
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
