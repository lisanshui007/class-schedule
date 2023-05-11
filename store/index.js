import Vue form 'vue';
import Vuex from 'vuex';

import home from '@/store'


Vue.use(Vuex);

import creatPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
	plugins:[creatPersistedState({
		storage: sessionStorage
	})],
	state:{token:'',userInfo:{}},
	mutations:{
		SET_TOKEN(state, token){
		state.token = token
	},
	SET_USERINFO(state,userInfo){
		state.userInfo = userInfo
	}
	},
	actions:{},
	getters:{},
})