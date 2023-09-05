<template>
    <v-dialog
    persistent :overlay="false"
    max-width="300px"
    transition="dialog-transition">
            <v-card 
            min-height="100px"
            height="100" class="justify-center align-center text-center">
                <v-progress-circular
                    indeterminate
                    color="primary"
                    class="justify-center"
                ></v-progress-circular>
            </v-card>
    </v-dialog>
</template>
