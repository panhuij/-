import { addSign, getSignList, getInterviewDetail,upInterviewDetail } from '../../service'

const state = {
};

const mutations = {

};

const actions = {
  async addSign({ commit }, params) {
    let data = await addSign(params);
    return data;
  },
  async getSignList({ commit }, params) {
    let data = await getSignList(params);
    return data;
  },
  async getInterviewDetail({ commit }, params) {
    let data = await getInterviewDetail(params);
    return data;
  },
  async upInterviewDetail({ commit }, params) {
    let data = await upInterviewDetail(params);
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