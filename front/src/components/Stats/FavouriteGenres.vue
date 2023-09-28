<template>
    <v-card
 
    max-height="520px"
    class=" pa-5"
    width="800px"
    min-width="300px">
        <v-card-title 
        class="text-center">favourite genres</v-card-title>

        <v-container 
        fluid
        class="overflow-auto">
            <v-row
            no-gutters 
            style="height:300px; margin:0; padding:0;">
                <v-col class="overflow-auto">
                    <div
                    style="text-align: ;"
                    wrap
                    class="pa-2 overflow-auto "
                    v-for="(item, key) in genres" :key="key">
                        <label>{{ item[0] }}: {{ item[1] }}</label>
                        <v-progress-linear
                        
                        rounded
                        height="9"
                        class="rounded"
                        color="green"
                        v-model="values[key]">

                        </v-progress-linear>
                    </div>                    
                </v-col>
            </v-row>
        </v-container>

        <v-card-text
        class="text-center"
        v-if="!genres">not enough data</v-card-text>

        <v-divider class="mt-5"></v-divider>
        <v-card-actions 
        location="bottom"
        class="pt-5 mt5">
            <v-row>
            <v-col>
                <v-select
                clearable
                v-model="typeFilter"
                :items="filterTypes"
                :density="mobile ? 'compact':'default'"
                variant="solo-filled"></v-select>
            </v-col>
            <v-col>
                <v-select
                label="year"
                :items="years"
                clearable
                v-model="date"
                type="year"
                :density="mobile ? 'compact':'default'"
                variant="solo-filled"></v-select>
            </v-col>
        </v-row>
        </v-card-actions>

    </v-card>

    <Modal 
    ref="modal"></Modal>
</template>

<script setup>
    import axios from "axios";
    import {ref, watch} from "vue";
    import {useStore} from "vuex"
    import apiConf from "@/apiConf.json"
    import Modal from "../Modal.vue";
    import { useDisplay } from "vuetify";

    var years = ref([])
    var date = ref();
    const {mobile} = useDisplay();
    var genres = ref();
    var values = ref([]);
    const store = useStore();
    var modal = ref();
    var filterTypes = ['Videogame','Film','Book','Comic','Anime','TVShow','Other']
    var typeFilter = ref();

    async function getGenreCount(){
        values.value = []
        let {id, token} = store.getters.getUser;
        let res = await axios.post(apiConf.host + apiConf.port + apiConf.stats.getGenres + id,{
            type:typeFilter.value,
            date:date.value
        },{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","get genre count",err.response.data.msg,true,"/")
            }else{
                modal.value.createModal("Error","get genre count","An unknown error ocurred",true,"/")
            }
            console.log(err);
            return undefined;
        })

        let arr = res.data.value
        if(arr instanceof Array && arr.length > 10){
            genres.value = []
            for(let i=0;i<10;i++){
                genres.value[i] = arr[i];
            }
        }else{
            genres.value = res.data.value;       
        }

        if(arr.length >= 0 ){
        //we make a proportion
        let len = genres.value.length;
        let max = genres.value[0][1]; //it is sorted so the first is max
            for(let i =0; i<len; i++){
                let aux = (genres.value[i][1] * 100) / max;
                values.value.push(aux)
            }
        }


    }

    function yearIterator(){
        let today = new Date();
        var currentY = today.getFullYear()

        for(let i=2000;i<=currentY;i++){
            years.value.push(i);
        }
    }

    yearIterator();

    getGenreCount();

    watch([typeFilter,date],()=>{
        getGenreCount()
    })

</script>