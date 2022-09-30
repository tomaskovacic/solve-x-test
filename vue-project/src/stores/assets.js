
export default {
    namespaced: true,
    state: {
        assets: [{ id: 1, title: 'Chair Red Dragon', location: 'A204', land: 'A' }, { id: 2, title: 'Desk', location: 'A204' }, { id: 3, title: 'Keyboard', location: 'B304' }, { id: 4, title: 'Laptop', location: 'C404' }, { id: 5, title: 'Phone', location: 'A504' }, { id: 6, title: 'Monitor', location: 'N44' }, { id: 7, title: 'Chair', location: 'A204' }, { id: 8, title: 'Monitor', location: 'B604' }, { id: 9, title: 'Mouse', location: 'B24' }, { id: 10, title: 'Fridge', location: 'C64' }, { id: 11, title: 'Desk', location: 'M04' }, { id: 12, title: 'PC', location: 'A34' }],
        role: 'admin',
        id: 13,
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
        }
    },
    mutations: {
        INCREASE_ID(state) {
            state.id = state.id + 1
        }
    },
    actions: {
        async insertAsset({ commit, state }, obj) {
            console.log(obj);
            await commit('INCREASE_ID', this.increaseID)
            state.assets[state.id-2] = obj;
        },
    }
};