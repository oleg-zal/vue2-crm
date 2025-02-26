import {db, ref, push} from "@/firebase";

export default {
  actions: {
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
