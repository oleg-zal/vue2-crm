import { auth, db, ref, set,
  signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@/firebase.js'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        const uid = await dispatch('getUid')
        console.log(email, password, name, uid)
        await set(ref(db, `/users/${uid}/info`),{
          bill: 10000,
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid() {
      const user = auth.currentUser
      return user ? user.uid : null
    },
    async logout({commit}) {
      await signOut(auth)
      commit('clearInfo')
    }
  }
}
