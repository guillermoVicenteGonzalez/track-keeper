<template>
    <v-card
    max-height="600px"
    class="overflow-auto pa-5"
    width="800px"
    min-width="300px">
        <v-card-title 
        class="text-center">favourite genres</v-card-title>

        <div 
        class="pa-2 overflow-auto"
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

        <v-divider class="mt-5"></v-divider>
        <v-card-actions class="pt-5 mt5">
            <v-row>
            <v-col>
                <v-select
                v-model="typeFilter"
                :items="filterTypes"
                :density="mobile ? 'compact':'default'"
                variant="solo-filled"></v-select>
            </v-col>
            <v-col>
                <v-select
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
    import {ref} from "vue";
    import {useStore} from "vuex"
    import apiConf from "@/apiConf.json"
    import Modal from "../Modal.vue";
    import { useDisplay } from "vuetify";

    const {mobile} = useDisplay();
    var genres = ref();
    var values = ref([]);
    const store = useStore();
    var modal = ref();
    var filterTypes = ['Videogame','Film','Book','Comic','Anime','TVShow','Other']
    var typeFilter = ref();

    async function getGenreCount(){
        let {id, token} = store.getters.getUser;
        let res = await axios.post(apiConf.host + apiConf.port + apiConf.stats.getGenres + id,{
            type:typeFilter.value
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

        //we make a proportion
        let len = genres.value.length;
        let max = genres.value[0][1]; //it is sorted so the first is max
        console.log(max)
        for(let i =0; i<len; i++){
            let aux = (genres.value[i][1] * 100) / max;
            values.value.push(aux)
        }

        console.log(res.data)
    }

    getGenreCount();

</script>