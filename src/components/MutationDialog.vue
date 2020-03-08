<template>
  <md-dialog :md-active="addDialog.active || editDialog.active">
    <md-dialog-title v-if="addDialog.active">Добавить котика</md-dialog-title>
    <md-dialog-title v-if="editDialog.active">Редактировать котика</md-dialog-title>
    <md-dialog-content>
    <form novalidate class="md-layout" @submit.prevent="validateCat">
    
        <div class="md-layout-item md-large-size-90">
        <md-field :class="getValidationClass('name')">
            <label for="name">Имя</label>
            <md-input v-model="mutateForm.name" name="name" id="name" autocomplete="given-name" required/>
            <span class="md-error" v-if="!$v.mutateForm.name.required">Имя необходимо</span>
            <span class="md-error" v-else-if="!$v.mutateForm.name.minlength">Слишком короткое имя</span>
        </md-field>
        </div>

        <div class="md-layout-item md-large-size-90">
            
            <md-field :class="getValidationClass('gender')">
                <label for="gender">Пол</label>
                <md-select name="gender" id="gender" v-model="mutateForm.gender" md-dense required>
                  <md-option value="Мальчик">Мальчик</md-option>
                  <md-option value="Девочка">Девочка</md-option>
                </md-select>
                <span class="md-error">Пол необходим</span>
              </md-field>
            
        </div>

        <div class="md-layout-item md-large-size-90">
        <md-field :class="getValidationClass('age')">
            <label for="age">Возраст</label>
            <md-input v-model="mutateForm.age" type="number" id="age" name="age" autocomplete="age" required />
            <span class="md-error" v-if="!$v.mutateForm.age.required">Возраст необходим</span>
            <span class="md-error" v-else-if="!$v.mutateForm.age.maxlength || !$v.mutateForm.age.number">Invalid age</span>
        </md-field>
        </div>

        <div class="md-layout-item md-large-size-90">
        <md-field>
            <label for="color">Цвет</label>
            <md-input v-model="mutateForm.color" type="text" name="color" id="color" />
        </md-field>
        </div>

        <div class="md-layout-item md-large-size-90">
        <md-field>
            <label for="breed">Порода</label>
            <md-input v-model="mutateForm.breed" type="text" name="breed" id="breed" />
        </md-field>
        </div>

        <div class="md-layout-item md-large-size-90">
        <md-field :class="getValidationClass('description')">
            <label>Комментарий</label>
            <md-textarea v-model="mutateForm.description" md-counter="240" md-autogrow></md-textarea>
            <span class="md-error" v-if="!$v.mutateForm.description.maxlength">Слишком длинный комментарий</span>
        </md-field>
        </div>

        <div class="md-layout-item md-large-size-90">
            <md-field>
            <label>Фото</label>
                <md-file accept="image/*" />
            </md-field>
        </div>
        
        <md-dialog-actions>

            <md-button class="md-primary" @click="closeDialog({type: addDialog.active ? 'addDialog' : 'editDialog', id: null})">Отмена</md-button>
            <md-button class="md-accent" type="submit">Сохранить</md-button>
            <md-progress-spinner v-if="loading" :md-diameter="30" :md-stroke="3" md-mode="indeterminate" class="md-accent"></md-progress-spinner>
        </md-dialog-actions>
    </form>

    </md-dialog-content>  
    </md-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import {
    required,
    minLength,
    maxLength,
    between
} from 'vuelidate/lib/validators'


export default {
    methods: {
        ...mapActions(['editCat', 'postCat', 'closeDialog']),
        getValidationClass (fieldName) {
            const field = this.$v.mutateForm[fieldName]
                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
        },
        validateCat () {
            this.$v.$touch()

            if (!this.$v.$invalid && this.addDialog.active) {
                // post the cat
                this.loading = true
                this.postCat(this.mutateForm).then(()=> {
                        this.loading = false
                        this.closeDialog({type: "addDialog", id: null})
                        this.clearForm()
                    }
                )
            } else if (!this.$v.$invalid && this.editDialog.active) {
                this.laoding = true
                this.editCat({id: this.editDialog.id, editedCatObj: this.mutateForm}).then(() => {
                    this.loading = false
                    this.closeDialog({type: "editDialog", id: null})
                    this.clearForm()
                })
            }
        },
        clearForm() {
            this.mutateForm = {
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
    computed: {
        ...mapGetters(['oneCat', 'addDialog', 'editDialog']),
    },
    mixins: [validationMixin],
    data: () => ({
      mutateForm: {
        name: null,
        gender: null,
        age: null,
        color: "",
        breed: "",
        description: "",
        pictures: ""
      },
      loading: false
    }),
    watch: {
        editDialog: function() {
            if (this.editDialog.active) {
                const cat = this.oneCat(this.editDialog.id)
                this.mutateForm = {
                    name: cat.name,
                    gender: cat.gender,
                    age: cat.age,
                    color: cat.color,
                    breed: cat.breed,
                    description: cat.description,
                    pictures: ""
                }
            }
            
        }
    },
    validations: {
        mutateForm: {
            name: {
                required,
                minLength: minLength(2)
            },
            gender: {
                required
            },
            age: {
                required,
                maxLength: maxLength(2),
                between: between(0, 99)
            },
            description: {
                maxLength: maxLength(240)
            }
        }
    },
}
</script>

<style>

</style>