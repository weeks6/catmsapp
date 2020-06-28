<template>
    <v-card>
        <v-card-title>
          <span class="headline">Добавить котика</span>
        </v-card-title>
        <v-form @submit.prevent="commitForm"
                v-model="valid"
                ref="addForm">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field label="Кличка"
                                    required
                                    :rules="[rules.required]"
                                    v-model="addFormObj.name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Возраст"
                                    hint="0-99"
                                    type="number"
                                    required
                                    :rules="[rules.required]"
                                    v-model="addFormObj.age"></v-text-field>
                    </v-col>
                </v-row>
                <v-radio-group v-model="addFormObj.gender"
                               row
                               :rules="[rules.required]">

                    <v-radio label="Мальчик" value="Мальчик"></v-radio>
                    <v-radio label="Девочка" value="Девочка"></v-radio>
                </v-radio-group>
                <v-row>
                <v-col cols="12" sm="6" md="6">
                        <v-text-field label="Окрас"
                                      v-model="addFormObj.color"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field label="Порода"
                                      v-model="addFormObj.breed"></v-text-field>
                    </v-col>
                </v-row>
                <v-textarea counter="240"
                            label="Описание"
                            clearable
                            v-model="addFormObj.description">
                </v-textarea>
                <v-file-input></v-file-input>
            </v-container>
            
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" icon @click="$emit('add-dialog-close')">
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
        dialog: Boolean
    },
    methods: {
        ...mapActions(['postCat']),
        commitForm () {
            if (this.$refs.addForm.validate()) {
                this.postCat(this.addFormObj).then(() => {
                            this.clearForm()
                            this.$emit('add-dialog-close')
                        })  
            }
        },
        clearForm() {
            this.addFormObj = {
                name: null,
                gender: null,
                age: null,
                color: "",
                breed: "",
                decription: "",
                pictures: ""
            }
        }
    },
    data: () => ({
      addFormObj: {
        name: null,
        gender: null,
        age: null,
        color: "",
        breed: "",
        description: "",
        pictures: ""
      },
      rules: {
          required: value => !!value || 'Обязательное поле',
          counter: value => value.lenght <= 240,
      },
      valid: false
    })
}
</script>
