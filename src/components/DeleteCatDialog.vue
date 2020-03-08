<template>
  <md-dialog :md-active.sync="deleteDialog.active">
      <md-dialog-title>Удалить котика?</md-dialog-title>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog({type: 'deleteDialog', id: null})">Отмена</md-button>
        <md-button class="md-accent" @click="submitDeletion">Удалить</md-button>
      </md-dialog-actions>
    </md-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "DeleteCatDialog",
    methods: {
        ...mapActions(['deleteCat', 'closeDialog']),
        submitDeletion() {
            this.deleteCat(this.deleteDialog.id)
            this.closeDialog({type: 'deleteDialog', id: null})
        }
    },
    computed: mapGetters(['deleteDialog']),
}
</script>

<style>

</style>