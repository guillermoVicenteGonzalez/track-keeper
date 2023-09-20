<template>
        <v-layout>
            <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">

            <v-navigation-drawer
            permanent
            rail
            elevation="5"
            location="right"></v-navigation-drawer>
            <v-main>
                <v-row no-gutters class="bg-white">
                    <v-col >
                        <PieComparison></PieComparison>
                    </v-col>
                </v-row>

                <v-row style="height: 300px;">
                    
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
    import CircleChart from '@/components/CircleChart.vue';
import PieComparison from '@/components/Stats/PieComparison.vue';

</script>