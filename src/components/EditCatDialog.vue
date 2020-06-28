<template>
    <v-card>
        <v-card-title>
          <span class="headline">Редактировать котика</span>
        </v-card-title>
        <v-form @submit.prevent="commitForm"
                v-model="valid"
                ref="editForm">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field label="Кличка"
                                    required
                                    :rules="[rules.required]"
                                    v-model="editFormObj.name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Возраст"
                                    hint="0-99"
                                    type="number"
                                    required
                                    :rules="[rules.required]"
                                    v-model="editFormObj.age"></v-text-field>
                    </v-col>
                </v-row>
                <v-radio-group v-model="editFormObj.gender"
                               row
                               :rules="[rules.required]">

                    <v-radio label="Мальчик" value="Мальчик"></v-radio>
                    <v-radio label="Девочка" value="Девочка"></v-radio>
                </v-radio-group>
                <v-row>
                <v-col cols="12" sm="6" md="6">
                        <v-text-field label="Окрас"
                                      v-model="editFormObj.color"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field label="Порода"
                                      v-model="editFormObj.breed"></v-text-field>
                    </v-col>
                </v-row>
                <v-textarea counter="240"
                            label="Описание"
                            clearable
                            v-model="editFormObj.description">
                </v-textarea>
                <v-file-input></v-file-input>
            </v-container>
            
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" icon @click="$emit('edit-dialog-close')">
                <v-icon>close</v-icon>
            </v-btn>
            <v-btn color="blue darken-1"
                    icon
                    type="submit"
                    :disabled="valid ? false : false">
                    <v-icon>save</v-icon>
            </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        dialog: Boolean,
        cat: Object
    },
    methods: {
        ...mapActions(['editCat']),
        commitForm () {
            if (this.$refs.editForm.validate()) {
                console.log(this.editFormObj)
                this.editCat(this.editFormObj).then(() => {
                            this.$emit('edit-dialog-close')
                        })  
            }
        },
    },
    data: function() {
        return {
            editFormObj: {
                id: this.cat._id,
                name: this.cat.name,
                gender: this.cat.gender,
                age: this.cat.age,
                color: this.cat.color,
                breed: this.cat.breed,
                description: this.cat.description,
                pictures: ""
            },
            rules: {
                required: value => !!value || 'Обязательное поле',
                counter: value => value.lenght <= 240,
            },
            valid: false
        }
    }
}
</script>