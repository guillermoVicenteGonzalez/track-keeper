<template>

    <v-navigation-drawer
    v-if="!mobile"
    permanent
    rail
    elevation="5"
    location="right">
        <v-list-item
        class="py-5"
        href="#pieChart">
            <v-icon>mdi-chart-pie</v-icon>
        </v-list-item>

        <v-list-item
        class="py-5"
        href="#genreCount">
            <v-icon>mdi-poll</v-icon>
        </v-list-item>
    </v-navigation-drawer>

    <v-bottom-navigation v-else>
        <v-btn
        icon="mdi-chart-pie"
        href="#pieChart"></v-btn>

        <v-btn
        icon="mdi-poll"
        href="#genreCount"></v-btn>
    </v-bottom-navigation>

    <v-layout>
        <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
            <v-lazy>
                <v-main 
                id="pieChart"
                class="justify-center align-center fill-height">
                    <v-row no-gutters class="bg-white" style=""
>
                        <v-col>
                            <PieComparison></PieComparison>
                        </v-col>
                    </v-row>

                    <v-row 
                    id="genreCount"
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

<style>

html{
    scroll-behavior: smooth !important;
}

</style>