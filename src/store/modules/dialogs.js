const state = {
    addDialog: {
        active: false,
        id: null
    },
    deleteDialog: {
        active: false,
        id: null
    },
    editDialog: {
        active: false,
        id: null
    }
}

const getters = {
    addDialog: state => state.addDialog,
    deleteDialog: state => state.deleteDialog,
    editDialog: state => state.editDialog
}

const actions = {
    // Пришлось немного усложнить стейт диалогов,
    // чтобы можно было более менее адекватно передавать
    // id для удаления и изменения карточки
    openDialog({commit}, dialog) {
        if (dialog.type != 'addDialog') {  
            commit('openDialog', dialog)
        } else {
            dialog.id = null
            commit('openDialog', dialog)
        }
    },

    closeDialog({commit}, dialog) {
        if (dialog.type != 'addDialog') {  
            commit('closeDialog', dialog)
        } else {
            dialog.id = null
            commit('closeDialog', dialog)
        }
    }
}

const mutations = {
    openDialog: (state, dialog) => state[dialog.type] = {
        active: true,
        id: dialog.id
    },
    closeDialog: (state, dialog) => state[dialog.type] = {
        active: false,
        id: null
    }  
}

export default {
    state,
    getters,
    actions,
    mutations
}