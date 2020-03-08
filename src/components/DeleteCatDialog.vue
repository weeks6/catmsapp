<template>
  <md-dialog :md-active.sync="deleteDialog.active">
      <md-dialog-title>Удалить котика?</md-dialog-title>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog({type: 'deleteDialog', id: null})">Отмена</md-button>
        <md-button class="md-accent" @click="submitDeletion">Удалить</md-button>
        <md-progress-spinner v-if="loading" :md-diameter="30" :md-stroke="3" md-mode="indeterminate" class="md-accent"></md-progress-spinner>
      </md-dialog-actions>
    </md-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "DeleteCatDialog",
    data: () => ({
      loading: false
    }),
    methods: {
        ...mapActions(['deleteCat', 'closeDialog']),
        submitDeletion() {
            this.loading = true
            this.deleteCat(this.deleteDialog.id).then(() => {
              this.closeDialog({type: 'deleteDialog', id: null})
              this.loading = false
            })
        }
    },
    computed: mapGetters(['deleteDialog']),
}
</script>

<style>

</style>