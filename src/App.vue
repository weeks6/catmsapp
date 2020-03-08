<template>
    <md-app md-mode="reveal" id="app">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button">
            <router-link class="rt-link" to="/home"><md-icon>home</md-icon></router-link>
        </md-button>
        <md-button class="md-icon-button">
            <router-link class="rt-link" to="/edit"><md-icon>edit</md-icon></router-link>
        </md-button>
        <md-button class="md-icon-button" v-if="$route.name!=='Home'" @click="openDialog({type: 'addDialog', id: null})">
          <md-icon>add</md-icon>
        </md-button>

        <MutationDialog />
        <DeleteCatDialog />

      </md-app-toolbar>

      <md-app-content >
        <div class="md-layout md-alignment-center">
          <FilteredCats class="md-layout-item md-xlarge-size-60 md-large-size-60 md-medium-size-100 md-small-size-100 md-xsmall-size-100"/>
        </div>
          
          <div class="pagenation-wrapper">
              <div v-for="num in Math.ceil(allCats[1]/10)" :key="num" class="page-link">
                  <router-link :to="`${pathRegExp.exec($route.path + '/')}` + num.toString()" class="page-link"> {{num}} </router-link>
              </div>
          </div>

          <router-view />
          
          <div class="pagenation-wrapper">
              <div v-for="num in Math.ceil(allCats[1]/10)" :key="num" class="page-link">
                  <router-link :to="`${pathRegExp.exec($route.path + '/')}` + num.toString()" class="page-link"> {{num}} </router-link>
              </div>
          </div>
      </md-app-content>
    
    </md-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MutationDialog from './components/MutationDialog'
import DeleteCatDialog from './components/DeleteCatDialog'
import FilteredCats from './components/FilteredCats'

export default {
  components: {
    MutationDialog,
    DeleteCatDialog,
    FilteredCats
  },
  data: () => ({
      // handling route matching for home and edit page
      pathRegExp: /\/.+?\//
  }),
  methods: {
    ...mapActions(['fetchCats', 'openDialog']),
  },
  created() {
      this.fetchCats()
  },
  computed: mapGetters(['allCats']),
}
</script>

<style>
  #app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    font-size: 16px;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  
  /* Hiding arrows of number input */
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .pagenation-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .page-link {
    padding: .5rem;
  }

  .rt-link {
    padding: 1rem;
  }

</style>
