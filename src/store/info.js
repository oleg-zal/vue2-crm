import { db, ref, onValue, update } from '@/firebase.js'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = { locale: state.info.locale }
    }
  },
  actions: {
    async updateInfo({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updateData = {...getters.info, ...toUpdate}
        const userRef = ref(db, `/users/${uid}/info`);
        await update(userRef, updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const userRef = ref(db, `/users/${uid}/info`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data)
          commit('setInfo', data)
        });
      } catch (e) {

      }
    }
  },
  getters: {
    info: s => s.info
  }
}
