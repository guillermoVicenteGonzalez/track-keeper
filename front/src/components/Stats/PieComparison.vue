<template>
    <v-container class="justify-center align-center">
        <v-row>
            <v-col class="text-center">
                <div class="text-h3">Entry count pie chart</div>
            </v-col>
        </v-row>
        
        <v-row class="justify-center">
            <v-col class="d-flex align-center">
                <circle-chart
                v-if="flag"
                :label="label"
                :labels="labels"
                :colors="colors"
                :data="data"></circle-chart>
            </v-col>

            <v-col class="pa-5 ma-5">
                <v-card class="pa-5">
                    <v-card-title class="text-center">Count</v-card-title>
                    <div 
                    class="d-flex justify-around align-center px-4"
                    v-for="(item, index) in labels" :key="item">
                        <v-checkbox
                        v-model="checks[item]"
                        :color="colors[index]"
                        :label="item"></v-checkbox>

                        <div class="">{{  data[index], item}}</div>
                    </div>
                </v-card>
                
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-text-field
                type="date"
                clearable
                label="start date"
                variant="solo-filled"></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                type="date"
                clearable
                label="finish date"
                variant="solo-filled"></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import CircleChart from '../CircleChart.vue';
    import {ref} from "vue";
    import axios from "axios";
    import {useStore} from "vuex";
    import apiConf from "@/apiConf.json"
    import { useDisplay } from 'vuetify';

    const {mobile} = useDisplay
    var flag = ref(false)
    const store = useStore();
    var labels = ref([]);
    var colors = ref([                
                '#F44336',
                '#FFEB3B',
                '#E91E63',
                '#4CAF50',
                '#03A9F4',
                '#673AB7',
                '#607D8B']);
    var data = ref([]);
    var label = ref(['count'])
    var checks=ref({})

    async function getEntryCount(){
        flag.value = false;
        console.log("getEntryCount")
        let {id,token} = store.getters.getUser;

        let res = await axios.get(apiConf.host + apiConf.port + apiConf.stats.getCount + id,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            console.log(err);
            alert("error");
        });

        let count = res.data.value;
        var nLabels =[]
        var nData = [];
        for(let i in count){
            nLabels.push(i);
            nData.push(count[i])
            checks.value[i] = true;
        }

        labels.value = nLabels,
        data.value = nData;

        flag.value = true;
    }


    function test(){
        console.log(checks.value)
    }

    getEntryCount();

</script>