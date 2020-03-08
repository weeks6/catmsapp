<template>
    <div>
    <md-card md-with-hover>
        <md-card-media>
        <img src="../assets/cat.png" alt="Cat">
        </md-card-media>

        <md-card-header>
            <div class="md-title">{{ cat.name }}</div>
            <div class="md-subhead">{{cat.age}}, {{cat.gender}}</div>
        </md-card-header>

        <md-card-content>
            <div v-if="cat.color !==' '"> Цвет: {{cat.color}} </div>
            <div v-if="cat.breed !==' '"> Порода: {{cat.breed}} </div>
            <span v-if="cat.description !==' '"> {{cat.description}} </span>
        </md-card-content>

        <md-card-actions v-if="editable">
            <md-button  class="md-icon-button" @click="openDialog({type: 'editDialog', id: cat._id})"><md-icon>edit</md-icon></md-button>
            <md-button class="md-icon-button md-accent" @click="() => {openDialog({type: 'deleteDialog', id: cat._id}); }"><md-icon>delete</md-icon></md-button>
        </md-card-actions>
    </md-card>
    
    </div>
    
</template>

<script>
import { mapActions } from 'vuex'


export default {
    name: "CatCard",
    props: {
        cat: Object,
        editable: Boolean,
    },
    methods: {
        ...mapActions(['openDialog']),
    }
}
</script>

<style>
    .md-card {
        margin-bottom: 1rem;
    }
</style>