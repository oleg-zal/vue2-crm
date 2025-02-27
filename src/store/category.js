import {db, ref, push, update, onValue} from "@/firebase";

export default {
  state: {
    categories: []
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories
    }
  },
  getters: {
    categories: s => s.categories
  },
  actions: {
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid')
        const categoryRef = ref(db, `/users/${uid}/categories`);
        onValue(categoryRef, (snapshot) => {
          const categories = snapshot.val();
          let ret = [];
          if (categories) {
            ret = Object.keys(categories).map(key => ({...categories[key], id: key}))
            console.log('ret', ret);
          }
          commit('setCategories', ret)
        });
        //const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        //return Object.keys(categories).map(key => ({...categories[key], id: key}))
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
