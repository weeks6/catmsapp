import axios from 'axios'

const state = {
    cats: [],
    filterOptions: {
        gender: "Any",
        breed: "Any",
        color: "Any"
    }
}

const getters = {
    allCats: state => [state.cats, state.cats.length],
    oneCat: state => id => state.cats.find(cat => cat._id === id),
    breeds: state => new Set(state.cats.map(cat => cat.breed).filter(breed => breed != " ")),
    colors: state => new Set(state.cats.map(cat => cat.color).filter(color => color != " ")),
    filteredCats: state => filterOptions => state.cats.filter(cat => {
        if ((filterOptions.gender == cat.gender || filterOptions.gender == "Any") &&
            (filterOptions.breed == cat.breed || filterOptions.breed == "Any") &&
            (filterOptions.color == cat.color || filterOptions.color == "Any")) {
                return cat
            }
    }),
    filterOptions: state => state.filterOptions
}

const actions = {
    async fetchCats({ commit }) {
        const response = await axios.get("http://192.168.1.3:3000/api/cats")
        commit('setCats', response.data)
    },

    async postCat({commit}, catObj) {
        const postedCat = await axios.post("http://192.168.1.3:3000/api/newcat/", {
            name: catObj.name,
            breed: catObj.breed,
            color: catObj.color,
            gender: catObj.gender,
            age: catObj.age,
            description: catObj.description,
            pictures: catObj.pictures
        })
        
        commit('addCat', postedCat.data)
    },

    async deleteCat({commit}, id) {
        await axios.delete(`http://192.168.1.3:3000/api/deletecat/${id}`)
        commit('deleteCat', id)
    },

    async editCat({commit}, {id, editedCatObj}) {
        const editedCat = await axios.patch(`http://192.168.1.3:3000/api/editcat/${id}`, {
            name: editedCatObj.name,
            breed: editedCatObj.breed,
            color: editedCatObj.color,
            gender: editedCatObj.gender,
            age: editedCatObj.age,
            description: editedCatObj.description,
            pictures: editedCatObj.pictures
        })
        commit('editCat', editedCat.data)
    },

    setFilterOptions({commit}, filterOptions) {
        commit('setFilterOptions', filterOptions)
    }
}

const mutations = {
    setCats: (state, cats) => state.cats = cats.reverse(),
    addCat: (state, cat) => state.cats.unshift(cat),
    editCat: (state, changedCat) => {
        // Замена 1 элемента state.cats с таким же id как и у changedCat на changedCat
        state.cats.splice(state.cats.indexOf(state.cats.find(cat => cat._id == changedCat._id)), 1, changedCat)
        return state    
    },
    deleteCat: (state, id) => state.cats = state.cats.filter(cat => cat._id !== id),
    setFilterOptions: (state, filterOptions) => state.filterOptions = filterOptions
}

export default {
    state,
    getters,
    actions,
    mutations
}