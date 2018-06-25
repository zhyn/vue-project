import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Order from '../views/order/Page.vue';
import PetName from '../views/petid/Page.vue';
import Pages from '../views/index/Page.vue';

Vue.use(Router)

export default  [
    // {path: '/order', component: Order},
    // {path: '/petname', component: PetName},
    {path: '/', name:'index', component: Pages},


]
