<template>
    <div class="row q-mb-sm">
        <q-input 
        outlined 
        :value="due_date" 
        label="Due date" 
        :rules="['date']"
        @input="$emit('update:due_date', $event)">
            <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date :value="due_date" @input="$emit('update:due_date', $event)">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                    </q-date>
                </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div>  
</template>

<script>
export default {
    props: ["due_date"]
}
</script>

<style>

</style>