<template>
    <v-container 
    class="justify-center align-center" >
        <v-row>
            <v-col class="text-center">
                <div class="text-h3">Entry count pie chart</div>
            </v-col>
        </v-row>
        
        <v-row class="justify-between align-center">
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

            <v-col 
            cols="12"
            lg="6 d-inline"
            class="py-5">
                <v-card 
                elevation="2"
                class="pa-5" v-if="!mobile">
                    <v-card-title class="text-center">Count</v-card-title>
                    <div 
                    class="d-flex justify-around align-center px-4"
                    v-for="(item, index, key) in checks" :key="item">
                        <v-checkbox
                        v-model="checks[index]"
                        :color="colors[key]"
                        :label="index">
                            <template v-slot:label>
                                <div
                                class="d-flex "
                                style="width: 100%;">
                                <v-card-text class="text-start">{{ index }}</v-card-text>
                                <v-card-text class="text-end">{{ data[key] }}</v-card-text>
<!--
                                <v-card-text class="text-end">{{ count[index] }}</v-card-text>
-->                          
                                </div>
                            </template>
                        </v-checkbox>
                    </div>
                </v-card>

                <v-card 
                elevation="5"
                v-else>
                    <v-container class="justify-center">
                        <v-row class="">
                            <v-col>
                                <v-card-title class="text-center">Count</v-card-title>
                            </v-col>
                        </v-row>

                        <v-row>

                            <v-col>
                                <div
                                v-for="(item, index, key) in checks" :key="item">
                                    <v-checkbox
                                    v-if="key%3==0"
                                    v-model="checks[index]"
                                    :color="colors[key]"
                                    :label="index">
                                        <template v-slot:label>
                                            <p 
                                            style="font-size: 15px;"
                                            class="text-sm-subtitle-1">{{ index }}</p>
                                        </template>
                                    </v-checkbox>                                    
                            </div>                                
                            </v-col>

                            
                            <v-col>
                                <div
                                class="d-block"
                                v-for="(item, index, key) in checks" :key="item">
                                    <v-checkbox
                                    class="text-sm-subtitle-1"
                                    v-if="key%3==1"
                                    v-model="checks[index]"
                                    :color="colors[key]"
                                    :label="index">
                                    <template v-slot:label>
                                            <p 
                                            style="font-size: 15px;"
                                            class="text-sm-subtitle-1">{{ index }}</p>
                                        </template>
                                    </v-checkbox>                                    
                            </div>                                
                            </v-col>

                            <v-col>
                                <div
                                v-for="(item, index, key) in checks" :key="item">
                                    <v-checkbox
                                    v-if="key%3==2"
                                    v-model="checks[index]"
                                    :color="colors[key]"
                                    :label="index">
                                    <template v-slot:label>
                                            <p 
                                            style="font-size: 14px;"
                                            class="text-sm-subtitle-1">{{ index }}</p>
                                        </template>
                                    </v-checkbox>                                    
                            </div>                                
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
                
            </v-col>
        </v-row>

        <v-expand-transition>
            <v-row
            v-if="checkNoData()">
                <v-col>
                    <v-card-text 
                    class="text-center text-error">No data</v-card-text>
                </v-col>
            </v-row>
        </v-expand-transition>

        <v-row>
            <v-col>
                <v-select
                v-model="year"
                clearable
                label="year"
                variant="solo-filled"
                :items="years"
                ></v-select>

                <!--
                <v-text-field
                v-model="date1"
                type="date"
                clearable
                label="date interval"
                variant="solo-filled"></v-text-field>-->
            </v-col>
            <v-col>
                <v-select
                v-model="month"
                clearable
                label="month"
                variant="solo-filled"
                :items="months"
                ></v-select>
                <!--<v-text-field
                v-model="date2"
                type="date"
                clearable
                label="date interval"
                variant="solo-filled"></v-text-field>-->
            </v-col>
        </v-row>

        <v-row>
            <v-col class="d-flex justify-center align-center">

                <v-switch

                color="primary"
                style="max-width:200px;"
                class="justify-center"
                v-model="finishedFilter">
                    <template v-slot:label>
                        <p v-if="finishedFilter">Only Finished</p>
                        <p v-else>Finished & repeated</p>
                    </template>
                </v-switch>

            </v-col>
        </v-row>

        <Modal
        ref="modal"></Modal>

        <loading-modal
        v-model="loading"></loading-modal>
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
    import Modal from '../Modal.vue';
    import LoadingModal from '../LoadingModal.vue';

    var finishedFilter = ref();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var years = ref([]);
    var year =ref()
    var month = ref()
    const {mobile} = useDisplay()
    var flag = ref(true)
    var modal= ref();
    var loading = ref();
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
        let {id,token} = store.getters.getUser;
        let auxMonth = month.value ? months.indexOf(month.value):undefined

        let res = await axios.post(apiConf.host + apiConf.port + apiConf.stats.getCount + id,{
            year:year.value,
            month:auxMonth,
            only_finished:finishedFilter.value
        },{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            console.log(err);
            if(err.response){
                modal.value.createModal("Error","get entries",err.response.data.msg,true,"/");
            }else{
                modal.value.createModal("Error","get entries","An unknown error ocurred",true,"/");
            }
            return undefined;
        });

        if(res){
            count = res.data.value;
            var nLabels =[]
            var nData = [];
            for(let i in count){
                nLabels.push(i);
                nData.push(count[i])
                checks.value[i] = true;
            }

            labels.value = nLabels,
            data.value = nData;
        }
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

    function getYears(){
        var today = new Date();
        today = today.getFullYear();
        for(let i = today; i >= 2000; i--){
            years.value.push(i);
        }

    }


    function checkNoData(){
        return data.value.every(item => item === 0)
    }

    getYears()

    watch([year,month,finishedFilter],()=>{
            getEntryCount()
        
    })

    watch(checks.value,async ()=>{
        flag.value = false;
        await test();
        flag.value = true;
    })



    getEntryCount();

</script>