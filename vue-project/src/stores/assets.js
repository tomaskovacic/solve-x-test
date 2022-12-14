
export default {
    namespaced: true,
    state: {
        assets: [{ id: 1, title: 'Chair Red Dragon', location: 'A204', land: 'A' }, { id: 2, title: 'Desk', location: '203' }, { id: 3, title: 'Chair Red Dragon',  location: 'A204' }, { id: 4, title: 'Laptop', location: 'B304' }, { id: 5, title: 'Phone', location: 'A204' }, { id: 6, title: 'Monitor', location: 'N44' }, { id: 7, title: 'Chair', location: 'A204' }, { id: 8, title: 'Monitor', location: 'B604' }, { id: 9, title: 'Mouse', location: 'B24' }, { id: 10, title: 'Fridge', location: 'C64' }, { id: 11, title: 'Desk', location: 'M04' }, { id: 12, title: 'PC', location: 'A34' }],
        role: 'technician',
        //      technician      admin
        id: 13,
        selectedAsset: {},
        damagedAsset: [],
        demagedId: 0,
    },
    getters: {
        data(state) {
            return state.assets
        },
        role(state) {
            return state.role
        },
        id(state) {
            return state.id
        },
        selected(state){
            return state.selectedAsset
        },
        damaged(state){
            return state.damagedAsset
        }
    },
    mutations: {
        INCREASE_ID(state) {
            state.id = state.id + 1
        },
        SET_SELECTED(state, temp){
            state.selectedAsset = temp
        },
        UPDATE_ASSET(state, array){
            state.damagedAsset.push(array)
        },
        UPDATE_DAMAGED_ID(state, id){
            state.demagedId = id
        }
    },
    actions: {
        async insertAsset({ commit, state }, obj) {
            await commit('INCREASE_ID', this.increaseID)
            state.assets[state.id-2] = obj;
        },
        async setSelected ({commit, state}, id){
            const temp = state.assets.find(asset => asset.id === id)
            await commit('SET_SELECTED', temp)
        },
        async damagedAsset ({commit},array ){
            await commit('UPDATE_ASSET', array)
            // await commit('UPDATE_DAMAGED_ID', id)
        }
    }
};