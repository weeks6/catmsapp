<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="gender">Пол</label>
          <md-select v-model="gender" name="gender" id="gender" md-dense>
            <md-option value="Any">Все</md-option>
            <md-option value="Male">Мальчик</md-option>
            <md-option value="Female">Девочка</md-option>
          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item">
        <md-field>
          <label for="breed">Порода</label>
          <md-select v-model="breed" name="breed" id="breed" md-dense>
            <md-option value="Any">Все</md-option>
            <div v-for="(breed, idx) of breedArray" :key="idx">
              <md-option :value="breed">{{breed}}</md-option>
            </div>
          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item">
        <md-field>
          <label for="color">Цвет</label>
          <md-select v-model="color" name="color" id="color" md-dense>
            <md-option value="Any">Все</md-option>
            <div v-for="(color, idx) of colorArray" :key="idx">
              <md-option :value="color">{{color}}</md-option>
            </div>
          </md-select>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "FilteredCats",
    data: function() {
      return {
        filterOptions: {
          gender: "Any",
          breed: "Any",
          color: "Any"
        },
        gender: "Any",
        breed: "Any",
        color: "Any",
        breedArray: [],
        colorArray: []
      }
    },
    computed: {
      ...mapGetters(['genders', 'breeds', 'colors']),
    },
    methods: {
      ...mapActions(['setFilterOptions'])
    },
    watch: {
      gender: function() {
        this.filterOptions.gender = this.gender
        this.setFilterOptions(this.filterOptions)
      },
      breed: function() {
        this.filterOptions.breed = this.breed
        this.setFilterOptions(this.filterOptions)
      },
      color: function() {
        this.filterOptions.color = this.color
        this.setFilterOptions(this.filterOptions)
      },
      breeds: function() {
        if (this.breeds) {
          this.breedArray = this.breeds
        }
      },
      colors: function() {
        if (this.colors) {
          this.colorArray = this.colors
        }
      }
    }
}
</script>

<style>

</style>