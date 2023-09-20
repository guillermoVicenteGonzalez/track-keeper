<template>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-container fluid>
            <v-row no-gutters class="bg-white">
                <v-col >
                    <PieComparison></PieComparison>
                </v-col>
            </v-row>
    </v-container>
</v-parallax>
</template>

<script setup>
    import CircleChart from '@/components/CircleChart.vue';
import PieComparison from '@/components/Stats/PieComparison.vue';

</script>