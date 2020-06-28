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

        <v-card-text class="text--primary">
            <div v-if="cat.color"> Окрас: {{cat.color}} </div>
            <div v-if="cat.breed"> Порода: {{cat.breed}} </div>
            <span v-if="cat.description"> {{cat.description}} </span>
        </v-card-text>

        <v-card-actions v-if="editable">
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogEdit"
                    max-width="600px"
                    transition="fade-transition">

            <template v-slot:activator="{ on, attrs }">
                <v-btn icon
                        v-bind="attrs"
                        v-on="on">
                    <v-icon>edit</v-icon>
                </v-btn>
            </template>
            <EditCatDialog :dialog="this.dialogEdit"
                           @edit-dialog-close="dialogEdit=false"
                           :cat="cat"/>
            </v-dialog>
            
            <v-dialog v-model="dialogDelete"
                    max-width="290px"
                    persistent
                    transition="fade-transition">

            <template v-slot:activator="{ on, attrs }">
                <v-btn icon
                        v-bind="attrs"
                        v-on="on"
                        color="red">
                    <v-icon>delete</v-icon>
                </v-btn>
            </template>
            <DeleteCatDialog :dialog="this.dialogDelete"
                           @delete-dialog-close="dialogDelete=false"
                           :catId="cat._id"/>
            </v-dialog>
        </v-card-actions>
    </v-card>
</template> 

<script>
import EditCatDialog from './EditCatDialog'
import DeleteCatDialog from './DeleteCatDialog'

export default {
    name: "CatCard",
    data: () => ({
        dialogEdit: false,
        dialogDelete: false
    }),
    components: {
        EditCatDialog,
        DeleteCatDialog
    },
    props: {
        cat: Object,
        editable: Boolean,
    }
}
</script>
