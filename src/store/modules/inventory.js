import axios from "axios";

const state = {
    items: [],
};

const getters = {
    allItems: (state) => state.items,
}

const actions = {
    async fetchItems({ commit }) {
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.get("inventory")
            commit("setItems", response.data);
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
    async removeItem({commit,dispatch}, itemId){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.delete(`inventory/${itemId}`)
            commit("deleteItem", itemId)
            dispatch("fetchItems")
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
    async addItem({commit}, item){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.post('inventory', {...item})
            commit('setItem', response.data)
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    },
    async updateItem({dispatch}, item){
        try {
            axios.defaults.headers.common[
                "Authorization"
                ] = `Bearer ${localStorage.getItem("access_token")}`;
            const response = await axios.patch(`inventory/${item._id}`, {...item})
            dispatch('fetchItems')
            return response.status
        }catch (error){
            console.log(error)
            return error.response
        }
    }
}

const mutations = {
    setItems: (state, items) => (state.items = items),
    setItem: (state, item) => (state.items.push(item)),
    deleteItem: (state, itemId) =>(state.items = state.items.filter((item) => item.id !== itemId)),
}

export default {
    state,
    getters,
    actions,
    mutations,
};