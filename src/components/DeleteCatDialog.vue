<template>
  <v-card>
    <v-card-title class="headline">Удалить котика?</v-card-title>
    <v-card-text>Котик удаляется навсегда (очень долго)</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" icon @click="$emit('delete-dialog-close')">
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn color="red" icon @click="removeCat">
        <v-icon>done</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: "DeleteCatDialog",
    props: {
      dialog: Boolean,
      catId: String
    },
    methods: {
        ...mapActions(['deleteCat']),
        removeCat() {
            this.deleteCat(this.catId).then(() => {
              this.$emit('delete-dialog-close')
            })
        }
    }
}
</script>

<style>

</style>