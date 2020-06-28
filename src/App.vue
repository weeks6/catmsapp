<template>
    <v-app>

      <v-app-bar app color="primary">
        <v-btn icon color="grey lighten-4" @click="goTo('Home')">
          <v-icon>home</v-icon>
        </v-btn>
        
        <v-btn icon color="grey lighten-4" @click="goTo('Edit')">
          <v-icon>edit</v-icon>
        </v-btn>

        <v-dialog v-model="dialog"
                  max-width="600px"
                  v-if="$route.name == 'Edit'"
                  transition="fade-transition"
                  @dialog-close="this.dialog = false">
          <template v-slot:activator="{ on, attrs }">
      
          <v-btn icon
                color="grey lighten-4"
                v-bind="attrs"
                v-on="on">
            <v-icon>add</v-icon>
          </v-btn>
          </template>
          <AddCatDialog :dialog="dialog" @add-dialog-close="dialog=false"/>
        </v-dialog>

        <v-menu 
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="grey lighten-4"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>filter_alt</v-icon>
            </v-btn>
          </template>

          <FilteredCats/>
        </v-menu>
      </v-app-bar>

      <v-main >
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
      </v-main>
    
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AddCatDialog from './components/AddCatDialog'
import FilteredCats from './components/FilteredCats'

export default {
  components: {
    AddCatDialog,
    FilteredCats
  },
  data: () => ({
      dialog: false,
      // handling route matching for home and edit page
      pathRegExp: /\/.+?\//
  }),
  methods: {
    ...mapActions(['fetchCats']),
    goTo: function (path) {
      if (this.$route.name !== path) {
          this.$router.replace({
          name: path
        })
      }
    }
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
    margin-top: .5em;
  }

  .page-link {
    padding: .5rem;
  }

  .rt-link {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .rt-link:hover {
    text-decoration: none;
  }

</style>
