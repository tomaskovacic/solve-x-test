
export default {
    namespaced: true,
    state: {
        assets: [{ id: 1, title: 'Chair Red Dragon', location: 'A204', land: 'A' }, { id: 2, title: 'Desk', location: 'A204' }, { id: 3, title: 'Keyboard', location: 'B304' }, { id: 4, title: 'Laptop', location: 'C404' }, { id: 5, title: 'Phone', location: 'A504' }, { id: 6, title: 'Monitor', location: 'N44' }, { id: 7, title: 'Chair', location: 'A204' }, { id: 8, title: 'Monitor', location: 'B604' }, { id: 9, title: 'Mouse', location: 'B24' }, { id: 10, title: 'Fridge', location: 'C64' }, { id: 11, title: 'Desk', location: 'M04' }, { id: 12, title: 'PC', location: 'A34' }],
        role: 'admin'
    },
    getters: {
        data(state) {
            return state.assets
        },
        role(state) {
            return state.role
        },
    },
    mutations: {

    },
    actions: {

    }
};