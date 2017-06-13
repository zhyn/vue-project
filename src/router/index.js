import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Order from '../views/order/Page.vue';
import PetName from '../views/petid/Page.vue';

Vue.use(Router)

export default  [
    {path: '/', component: Order},
    {path: '/petname', component: PetName},

]
