<template>
    <v-list>
      <v-list-item>
          <v-select
            :items="genders"
            v-model="gender"
            label="Пол">
          </v-select>
      </v-list-item>

      <v-list-item>
          <v-select
            v-model="breed"
            :items ="breeds"
            label="Порода">
          </v-select>
      </v-list-item>

      <v-list-item>
        <v-select
          v-model="color"
          :items="colors"
          label="Окрас">
        </v-select>
      </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "FilteredCats",
    data: function() {
      return {
        filterOptions: {
          gender: "Все",
          breed: "Все",
          color: "Все"
        },
        gender: "Все",
        breed: "Все",
        color: "Все",
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
      }
    }
}
</script>

<style>

</style>