<template>
    <v-dialog>
        <v-container class="d-flex justify-center align center text-center">
            <v-card 
            min-width="800px"
            max-width="1000px"
            class="pa-5">
                <v-card-title>Create media</v-card-title>
                <v-text-field
                variant="outlined"
                label="name"
                v-model="name"></v-text-field>

                <v-text-field
                label="type"
                v-model="type"
                variant="outlined"></v-text-field>

                <v-text-field
                label="genre"
                v-model="genre"
                variant="outlined"></v-text-field>

                <v-text-field
                label="duration"
                variant="outlined"></v-text-field>

                <v-textarea
                label="description"
                variant="outlined"></v-textarea>

                <v-file-input></v-file-input>

            </v-card>
        </v-container>
    </v-dialog>
</template>

<script setup>
    import {ref} from "vue"
    import axios from "axios"

    var name = ref();
</script>