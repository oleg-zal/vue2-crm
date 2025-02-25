import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase/app'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
      } catch (e) {
        throw e
      }
    }
  }
}
