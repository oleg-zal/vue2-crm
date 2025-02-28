import {db, ref, push, update, get, child} from "@/firebase";

export default {
  getters: {
    categories: s => s.categories
  },
  actions: {
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid')
        const dbRef = ref(db)
        const snapshot = await get(child(dbRef, `/users/${uid}/categories`))
        let categories = []
        if (snapshot.exists()) {
          const data = snapshot.val();
          categories = Object.keys(data).map(key => ({...data[key], id: key}))
        }
        return categories
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getUid')
        const dbRef = ref(db)
        const snapshot = await get(child(dbRef, `/users/${uid}/categories/${id}`))
        let category = {}
        if (snapshot.exists()) {
          const data = snapshot.val();
          category = {...data, id}
        }
        return category

        /*const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return {...category, id}*/
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({commit, dispatch}, {title, limit, id}) {
      try {
        const uid = await dispatch('getUid')
        const categoryRef = ref(db, `/users/${uid}/categories/${id}`);
        await update(categoryRef, {title, limit} )
        //await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({commit, dispatch}, {title, limit}) {
      try {
        const uid = await dispatch('getUid')
        const categoryRef = ref(db, `/users/${uid}/categories`);
        const category = await push(categoryRef, {title, limit})
        return {title, limit, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
