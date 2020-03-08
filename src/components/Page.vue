<template>
<div>   
    <div class="md-layout md-alignment-center">
        <div class="md-layout-item md-xlarge-size-50 md-large-size-33 md-medium-size-33 md-small-size-50 md-xsmall-size-100" v-for="cat in filteredCats(filterOptions).slice(pageNumber, prevRange)" :key="cat._id">
            <CatCard :cat="cat" :editable="editable"/>
        </div>
    </div>
</div>

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