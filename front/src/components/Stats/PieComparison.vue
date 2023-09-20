<template>
    <v-container class="justify-center align-center">
        <v-row>
            <v-col class="text-center">
                <div class="text-h3">Entry count pie chart</div>
            </v-col>

            <v-btn
            @click="flag = !flag"></v-btn>

            <p>{{ flag }}</p>
        </v-row>
        
        <v-row class="justify-center align-center">
            <v-col
            style="max-height: 600px;"
            lg="6" 
            cols="12"
            class="d-flex align-center justify-center">
                <circle-chart
                :loading="!flag"
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
                    v-for="(item, index, key) in checks" :key="item">
                        <v-checkbox
                        v-model="checks[index]"
                        :color="colors[key]"
                        :label="index"></v-checkbox>

                        <div>{{ index  }}{{ item }}{{ key }}</div>
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

        <v-row>
            {{ data }}
        </v-row>

        <v-row>
            {{ checks }}
        </v-row>

        <v-row>
            {{ count }}
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
    import {watch} from "vue"

    const {mobile} = useDisplay
    var flag = ref(true)
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

    var count = {}

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

        count = res.data.value;
        console.log(count);
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

    async function test(){
        var nData = [];
        for(let i in checks.value){
            let index = labels.value.indexOf(i);
            if(checks.value[i] == false){
                //data.value[index] = 0;
                nData[index] = 0;
            }else{
                //data.value[index] = count[i];
                nData[index] = count[i]
            }
        }
        data.value = [];
        data.value = nData;
        return nData;
    }

    watch(checks.value,async ()=>{
        flag.value = false;
        await test();
        flag.value = true;
    })



    getEntryCount();

</script>