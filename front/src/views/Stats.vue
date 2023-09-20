<template>
        <v-layout>
            <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">

            <v-navigation-drawer
            permanent
            rail
            elevation="5"
            location="right"></v-navigation-drawer>
            <v-main>
                <v-row no-gutters class="bg-white h-100"
                style="height: 100vh !important;">
                    <v-col >
                        <PieComparison></PieComparison>
                    </v-col>
                </v-row>

                <v-row style="height: 100vh;">
                    <v-card>
                        Generos favoritos (con animacion)
                    </v-card>
                </v-row>

                <v-row no-gutters class="bg-white">
                    <v-col >
                        <PieComparison></PieComparison>
                    </v-col>
                </v-row>
            </v-main>
        </v-parallax>

        </v-layout>
</template>

<script setup>
    import PieComparison from '@/components/Stats/PieComparison.vue';

</script>