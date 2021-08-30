<template>
    <div class="row q-mb-sm">
        <q-input 
        outlined 
        :value="due_time" 
        label="Due time" 
        :rules="['time']"
        @input="$emit('update:due_time', $event)">
            <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time :value="due_time" @input="$emit('update:due_time', $event)">
                        <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                    </q-time>
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div> 
</template>

<script>
export default {
    props: ["due_time"],
}
</script>

<style>

</style>