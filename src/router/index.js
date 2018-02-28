import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';


export default new VueRouter({
    linkActiveClass: 'active', // 激活高亮显示
    routes: [
        { path: '/', redirect: '/goods' },
        { path: '/goods', component: goods },
        { path: '/ratings', component: ratings },
        { path: '/seller', component: seller },
    ]
});
