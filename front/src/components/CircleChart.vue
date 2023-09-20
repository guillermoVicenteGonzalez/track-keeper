<template>
    <Pie 
    :data="data" 
    :options="options" />
</template>
  
<script setup>
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
    import { Pie } from 'vue-chartjs'
    import {ref} from "vue";

    ChartJS.register(ArcElement, Tooltip, Legend)
    
    /*
    var data = ref({
        labels:[
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label:'My first dataset',
            data:[300,50,100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset:4
        }]
    });
    */

    var data = ref({
        labels:props.labels,
        datasets:[{
            label:props.label,
            data:props.data,
            backgroundColor:props.colors,
            hoverOffset:4
        }]
    })

    var options =ref({
        responsive:true
    })

    const props = defineProps({
        labels:undefined,
        colors:undefined,
        data:undefined,
        label:undefined,
        loading:undefined
    })


</script>