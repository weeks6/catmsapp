<template>
  <div class="edit">
      <Page :pageNumber="0" :prevRange="10" :editable="true"/>
  </div>
</template>

<script>
import Page from '../components/Page'

export default {
    name: "Edit",
    components: {
      Page
    }
}
</script>

<style>

</style>