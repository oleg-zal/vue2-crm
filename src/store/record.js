import {db, ref, push} from "@/firebase";

export default {
  actions: {
    async createRecord({dispatch, commit}, payloadRecord) {
      try {
        const uid = await dispatch('getUid')
        const recordsRef = ref(db,`/users/${uid}/records`)
        //const record = await push(recordsRef, payloadRecord)
        return await push(recordsRef, payloadRecord)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
