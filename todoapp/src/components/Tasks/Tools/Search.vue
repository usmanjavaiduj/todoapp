<template>
    <q-input outlined v-model="search_field" label="Search">
        <template v-slot:append>
            <q-icon v-if="search_field !== ''" name="close" @click="search_field = ''" class="cursor-pointer" />
            <q-icon name="search" />
        </template>
    </q-input>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
    methods: {
        ...mapActions("tasks", ["set_search"])
    },
    computed: {
        ...mapState("tasks", ["search"]),
        search_field: {
            get(){
                return this.search
            },
            set(value){
                this.set_search(value)
            }
        }
    }
    
}
</script>

<style>

</style>