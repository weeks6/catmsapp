<template>
    <v-container fluid>
        <v-row>
            <v-col xl="4" lg="3" md="4" sm="6" xs="12" v-for="cat in filteredCats(filterOptions).slice(pageNumber, prevRange)" :key="cat._id">
                <CatCard :cat="cat" :editable="editable"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters} from 'vuex';
import CatCard from './CatCard';

export default {
    components: {
        CatCard
    },
    props: {
        pageNumber: Number,
        prevRange: Number,
        editable: Boolean
    },
    computed: {
        ...mapGetters(['filteredCats', 'filterOptions']),
    },
}
</script>

<style scoped>

</style>