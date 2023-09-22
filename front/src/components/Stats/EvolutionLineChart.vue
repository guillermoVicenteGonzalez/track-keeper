<template>
    <v-container class="pa-5 ma-5">
        <v-row>
            <v-col>
                <v-card-title class="text-center">Evolution</v-card-title>
            </v-col>
        </v-row>
            <v-row class="d-flex justify-center pa-5 ma-5">
                <v-expand-transition>

                <v-col 
                v-if="flag"

                style="max-height: 600px;"
                class="d-flex justify-center">
                        <Line
                    style="width: 100% height:100%;"
                    :options="options"
                    :data="data"></Line>
                </v-col>

            </v-expand-transition>

            </v-row>


        <v-row>
            <v-col>
                <v-select
                clearable
                label="filter by year"
                variant="solo-filled"
                v-model="year"
                :items="years"
                ></v-select>
            </v-col>

            <v-col>
                <v-select
                :items="types"
                clearable
                label="filter by type"
                variant="solo-filled"
                v-model="type"></v-select>
            </v-col>
        </v-row>

        <v-row>
        </v-row>

        <Modal
        ref="modal"></Modal>
    </v-container>

</template>

<script setup>
    import apiConf from "@/apiConf.json"
    import {useStore} from "vuex"
    import axios from "axios"
    import {ref} from "vue"
    import { Line } from 'vue-chartjs';
    import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js'
    import Modal from "../Modal.vue";
    import {watch} from "vue"


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    var types = ['Videogame','Film','Book','Comic','TVShow','Anime','Other']
    var years = ref([]);
    var flag = ref(true)
    var modal = ref();
    const options = {
        responsive: true,
        maintainAspectRatio: true
    }
    const store = useStore();
    var count = ref();
    var year = ref();
    var type = ref();

    const data = ref({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
        label: 'Entries added',
        backgroundColor: '#f87979',
        data: [40, 39, 10, 40, 39, 80, 40]
        }
    ]
    })

    async function getEvolution(){
        flag.value = false
        let {id,token} = store.getters.getUser;

        let res = await axios.post(apiConf.host + apiConf.port + apiConf.stats.evolution + id,{
            year:year.value,
            type:type.value
        },{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","evolution chart",err.response.data.msg,true,"/");
            }else{
                modal.value.createModal("Error","evolution chart","An unexpected error ocurred",true,"/");
            }
            console.log(err);
            return undefined;
        });

        if(res){
            count.value = res.data.value;
            let tempLabels = count.value.map((item)=>{
                return item[0]
            })

            let tempDatasets = count.value.map((item)=>{
                return item[1]
            });

            console.log(tempLabels, tempDatasets)
            data.value.labels = tempLabels;
            data.value.datasets[0].data = tempDatasets

            flag.value = true;
        }
    }

    function getYears(){
        let today = new Date();
        today = today.getFullYear()
        for(let i =today;i>=2000;i--){
            years.value.push(i)
        }
    }

    getYears();
    getEvolution();

    watch([year,type],()=>{
        getEvolution();
    })
</script>