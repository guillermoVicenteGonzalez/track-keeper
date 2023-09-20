<template>
    <v-container>
        <v-row>
            <v-col>
                <circle-chart
                :label="label"
                :labels="labels"
                :colors="colors"
                :data="data"></circle-chart>
            </v-col>
            <v-col>
                <ul>
                    <li><v-chip>videogames</v-chip></li>
                    <li><v-chip>videogames</v-chip></li>
                </ul>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import CircleChart from '../CircleChart.vue';
    import {ref} from "vue";

    var labels = ref(['blue','red','yellow']);
    var colors = ref([                
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)']);
    var data = ref([300,50,100]);
    var label = ref(['count'])

</script>