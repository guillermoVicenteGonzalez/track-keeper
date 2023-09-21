<template>
        <v-layout>
            <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">

            <v-navigation-drawer
            permanent
            rail
            elevation="5"
            location="right"></v-navigation-drawer>

            <v-lazy>
                <v-main class="justify-center align-center">
                    <v-row no-gutters class="bg-white h-100"
                    style="height: 100vh !important;">
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

</script>