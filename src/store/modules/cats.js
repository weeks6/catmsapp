import axios from 'axios'

const LOCALHOST_IP = "http://192.168.1.5:3000"

const state = {
    cats: [],

    filterOptions: {
        gender: "Все",
        breed: "Все",
        color: "Все"
    }
}

const getters = {
    allCats: state => [state.cats, state.cats.length],
    oneCat: state => id => state.cats.find(cat => cat._id === id),
    breeds: state => ['Все', ...new Set(state.cats.map(cat => cat.breed).filter(breed => breed != ""))],
    colors: state => ['Все', ...new Set(state.cats.map(cat => cat.color).filter(color => color != ""))],
    genders: () => ['Все', 'Мальчик', 'Девочка'],
    filteredCats: state => filterOptions => state.cats.filter(cat => {
        if ((filterOptions.gender == cat.gender || filterOptions.gender == "Все") &&
            (filterOptions.breed == cat.breed || filterOptions.breed == "Все") &&
            (filterOptions.color == cat.color || filterOptions.color == "Все")) {
                return cat
            }
    }),
    filterOptions: state => state.filterOptions
}

const actions = {
    async fetchCats({ commit }) {
        const response = await axios.get(`${LOCALHOST_IP}/api/cats`)
        commit('setCats', response.data)
    },

    async postCat({commit}, catObj) {
        try {
           const postedCat = await axios.post(`${LOCALHOST_IP}/api/newcat/`, {
                name: catObj.name,
                breed: catObj.breed,
                color: catObj.color,
                gender: catObj.gender,
                age: catObj.age,
                description: catObj.description,
                pictures: catObj.pictures
            })
            
            commit('addCat', postedCat.data)
        }
        catch(e) {
            console.log(e)
        }
    },

    async deleteCat({commit}, id) {
        await axios.delete(`${LOCALHOST_IP}/api/deletecat/${id}`)
        commit('deleteCat', id)
    },

    async editCat({commit}, editedCatObj) {

        try {
            const editedCat = await axios.patch(`${LOCALHOST_IP}/api/editcat/${editedCatObj.id}`, {
                name: editedCatObj.name,
                breed: editedCatObj.breed,
                color: editedCatObj.color,
                gender: editedCatObj.gender,
                age: editedCatObj.age,
                description: editedCatObj.description,
                pictures: editedCatObj.pictures
            })
            commit('editCat', editedCat.data)
        } catch (e) {
            console.log(e)
        }
        
        
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