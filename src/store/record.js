import {db, ref, push, get, child} from "@/firebase";

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
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const dbRef = ref(db)
        const snapshot = await get(child(dbRef, `/users/${uid}/records`))
        let records = []
        if (snapshot.exists()) {
          const data = snapshot.val();
          records = Object.keys(data).map(key => ({...data[key], id: key}))
        }
        return records
        //const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        //return Object.keys(records).map(key => ({...records[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid')
        const dbRef = ref(db)
        const snapshot = await get(child(dbRef, `/users/${uid}/records/${id}`))
        let record = {}
        if (snapshot.exists()) {
          const data = snapshot.val();
          record = {...data, id}
        }
        return record
        /*const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
        return {...record, id}*/
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
