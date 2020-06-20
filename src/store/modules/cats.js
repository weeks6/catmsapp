// import axios from 'axios'

const state = {
    // mockup cats for the ability to click through the app without backend
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
    breeds: state => ['Все', ...new Set(state.cats.map(cat => cat.breed).filter(breed => breed != " "))],
    colors: state => ['Все', ...new Set(state.cats.map(cat => cat.color).filter(color => color != " "))],
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
        // const response = await axios.get("http://192.168.1.3:3000/api/cats")

        const mockCats = [
            {_id: 1, name: "bruh", gender:"Мальчик", breed:"breed1", color: "color1"},
            {_id: 2, name: "bruh2", gender:"Мальчик", breed:"breed2", color: "color3"},
            {_id: 3, name: "bruh3", gender:"Мальчик", breed:"breed1", color: "color1"},
            {_id: 4, name: "bruh4", gender:"Мальчик", breed:"blah blah blah", color: "color2"},
            {_id: 5, name: "bruh5", gender:"Девочка", breed:"blah blah blah", color: "color2"},
        ]

        // commit('setCats', response.data)
        commit('setCats', mockCats)
    },

    async postCat({commit}, catObj) {
        // const postedCat = await axios.post("http://192.168.1.3:3000/api/newcat/", {
        //     name: catObj.name,
        //     breed: catObj.breed,
        //     color: catObj.color,
        //     gender: catObj.gender,
        //     age: catObj.age,
        //     description: catObj.description,
        //     pictures: catObj.pictures
        // })
        catObj._id = state.cats.length+1
        commit('addCat', catObj)
    },

    async deleteCat({commit}, id) {
        // await axios.delete(`http://192.168.1.3:3000/api/deletecat/${id}`)
        commit('deleteCat', id)
    },

    async editCat({commit}, {id, editedCatObj}) {
        console.log(id)
        
        // const editedCat = await axios.patch(`http://192.168.1.3:3000/api/editcat/${id}`, {
        //     name: editedCatObj.name,
        //     breed: editedCatObj.breed,
        //     color: editedCatObj.color,
        //     gender: editedCatObj.gender,
        //     age: editedCatObj.age,
        //     description: editedCatObj.description,
        //     pictures: editedCatObj.pictures
        // })
        // commit('editCat', editedCat.data)
        editedCatObj._id = id
        commit('editCat', editedCatObj)
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