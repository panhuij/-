import Vue from 'vue'
import Vuex from 'vuex'


// 引入子模块
import user from './modules/user'
import sign from './modules/sign'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user,
		sign
	},
	plugins: []
})

export default store
