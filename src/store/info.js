import { child, db, ref, get, onValue } from '@/firebase.js'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
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
