<template>

    <v-navigation-drawer
    v-if="!mobile"
    permanent
    rail
    elevation="5"
    location="right"></v-navigation-drawer>

    <v-bottom-navigation>
        <v-btn>click</v-btn>
    </v-bottom-navigation>

    <v-layout>
        <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
            <v-lazy>
                <v-main class="justify-center align-center h-100-lg">
                    <v-row no-gutters class="bg-white"
>
                        <v-col >
                            <PieComparison></PieComparison>
                        </v-col>
                    </v-row>

                    <v-row 
                    class="d-flex justify-center align-center pa-5"
                    style="height: 100vh; width: 100%;">
                    <v-container class="d-flex justify-center align-center">
                        <FavouriteGenres></FavouriteGenres>
                    </v-container>
                    </v-row>

                    <v-row no-gutters class="bg-white">
                        <v-col>
                            <PieComparison></PieComparison>
                        </v-col>
                    </v-row>
                </v-main>
            </v-lazy>
        </v-parallax>
    </v-layout>

</template>

<script setup>
    import FavouriteGenres from '@/components/Stats/FavouriteGenres.vue';
    import PieComparison from '@/components/Stats/PieComparison.vue';
    import {useDisplay} from "vuetify";

    const {mobile} = useDisplay()

</script>