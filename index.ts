import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import { AddForm } from './components/add-form.component'
import { TodoList } from './components/todo-list.component'
import {GitUser} from './components/git-user.component'

import './style';
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  // { path: '/', component: TodoList },
  { path: '/add', component: AddForm },
  { path: '/', component: GitUser }
];
const router = new VueRouter({ routes });

new Vue({
  router: router
}).$mount('#app');