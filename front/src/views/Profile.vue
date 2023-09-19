<template>
    <v-container class="fill-height justify-center align-center">
        <v-card 
        min-width="300px" 
        width="600px" 
        elevation="3">
            <v-avatar>
                <v-img></v-img>
            </v-avatar>
            
            <v-card-title
            class="text-center">Nombre</v-card-title>
            
            <v-card-subtitle
            class="text-center">Email</v-card-subtitle>
        </v-card>
    </v-container>
</template>

<script setup>
    import {ref} from "vue";
    import {useStore} from "vuex"


</script>