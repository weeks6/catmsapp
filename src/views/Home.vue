<template>
  <div>
    <Page :pageNumber="0" :prevRange="10"/>
  </div>
</template>

<script>
import Page from '../components/Page'

export default {
  name: 'Home',
  components: {
    Page
  }
}
</script>
