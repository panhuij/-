import { code2session, fingerVerify, userDecrypt } from '../../service'

const state = {
    openid: '',
    phone: ""
};

const mutations = {
    updateOpenid(state, payload) {
        state.openid = payload;
    },
    updatePhone(state, payload) {
        state.phone = payload;
    }
};

const actions = {
    async login({ commit }, params) {
        let data = await code2session(params);
        // console.log('登录接口请求回来的数据...', data);
        if (data.openid) {
            commit('updateOpenid', data.openid);
        }
        if (data.phone) {
            commit('updatePhone', data.phone);
        }
    },
    //用于指纹验证
    async fingerVerify({ state: { openid } }, params) {
        params.openid = openid;
        console.log(params,"fingerVerify...params...")
        let data = await fingerVerify(params);
        console.log(data,"fingerVerify")
        return data;
    },
    //用于手机号验证
    async userDecrypt({ commit }, params) {
        let data = await userDecrypt(params);
        if (data.phoneNumber) {
            commit('updatePhone', data.phoneNumber);
        }
        return data;
    }
};
const getters = {
    phone: state => state.phone
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}