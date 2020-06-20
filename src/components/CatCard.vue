<template>
    <v-card> 
        <v-img
            src="../assets/cat.png"
            alt="Cat"
            height="200px"
            class="white--text align-end">
           <v-card-title>{{ cat.name }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">
            <div class="md-subhead">{{cat.age}}, {{cat.gender}}</div>
        </v-card-subtitle>

        <v-card-text class="text--primary">>
            <div v-if="cat.color !==' '"> Цвет: {{cat.color}} </div>
            <div v-if="cat.breed !==' '"> Порода: {{cat.breed}} </div>
            <span v-if="cat.description !==' '"> {{cat.description}} </span>
        </v-card-text>

        <v-card-actions v-if="editable">
            <v-spacer></v-spacer>
            <v-btn icon
                   @click="openDialog({type: 'editDialog', id: cat._id})">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon
                   @click="openDialog({type: 'deleteDialog', id: cat._id})"
                   color="red">
                <v-icon>delete</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
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