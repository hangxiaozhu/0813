// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Resource from 'vue-resource'
Vue.use(Resource)
import Vuex from 'vuex'
Vue.use(Vuex)
    // 引入vant 组件
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
import { NavBar } from 'vant';
Vue.use(NavBar);
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);

// 全局的时间过滤器
import moment from "moment"

Vue.filter("dateFormate", function(dataStr) {
        return moment(dataStr).format('YYYY-MM-DD HH:mm:ss')
    })
    //设置请求跟路径
Vue.http.options.root = "http://api.cms.liulongbin.top";
// 全局设置post 时候表单数据格式组织形式
Vue.http.options.emulateJson = true;
Vue.config.productionTip = false
var car = JSON.parse(localStorage.getItem('car') || '[]');

var store = new Vuex.Store({
    state: {
        car: car

    },
    mutations: {
        addToCar(state, goodsinfo) {
            // 点击加入购物车，把商品信息，保存到 store 中的 car 上
            // 分析：
            // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
            // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

            // 假设 在购物车中，没有找到对应的商品
            var flag = false

            state.car.some(item => {
                    if (item.id == goodsinfo.id) {
                        item.count += parseInt(goodsinfo.count)
                        flag = true
                        return true
                    }
                })
                // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {

                state.car.push(goodsinfo)
            }
            // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            // 分析：
            state.car.some(item => {
                    if (item.id == goodsinfo.id) {
                        item.count = parseInt(goodsinfo.count)
                        return true
                    }
                })
                // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state, id) {
            // 根据Id，从store 中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
                    if (item.id == id) {
                        state.car.splice(i, 1)
                        return true;
                    }
                })
                // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                    if (item.id == info.id) {
                        item.selected = info.selected
                    }
                })
                // 把最新的 所有购物车商品的状态保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        checkAllCar(state, inck) {
            console.log(inck.checked, "inck")
            if (inck.checked == true) {
                state.car.some(item => {
                    item.selected = false
                })
            } else {
                state.car.some(item => {
                    item.selected = true
                })
            }




            localStorage.setItem('car', JSON.stringify(state.car))
        }




    },
    getters: {

        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        },
        getAllCheck(state) {
            var checkeds = '';
            var arrCheck = []
            state.car.some(item => {
                if (item.selected == true) {
                    arrCheck.push(item.selected)
                } else {
                    checkeds = false
                }
            })
            console.log(arrCheck.length, "1234")
            if (arrCheck.length == state.car.length && arrCheck.length > 0) {
                checkeds = true
            } else {
                checkeds = false
            }
            console.log(checkeds, '全选');
            return checkeds





        }
    }


})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
