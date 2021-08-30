<template>
    <div class="row q-mb-sm">
        <q-input 
        outlined
        :value="name"
        autofocus
        label="Name"
        @input="$emit('update:name', $event)" 
        class="col" 
        :rules="[val => !!val || 'Field is required']"> 
        <template v-slot:append>
            <q-icon
            v-if="name"
            @click="$emit('update:name', '')"
            name="close"
            class="cursor-pointer"
            />
        </template>
        </q-input>    
    </div>
</template>

<script>
export default {
    props: ["name"],
}
</script>

<style>

</style>