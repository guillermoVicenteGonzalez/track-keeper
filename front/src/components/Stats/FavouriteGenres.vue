<template>

    <v-card
    max-height="600px"
    class="overflow-auto"
    width="800px"
    min-width="600px">
        <v-card-title 
        class="text-center">favourite genres</v-card-title>

        <v-card-text>generos{{ genres }}</v-card-text>
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

    var genres = ref();
    const store = useStore();
    var modal = ref();

    async function getGenreCount(){
        let {id, token} = store.getters.getUser;
        let res = await axios.get(apiConf.host + apiConf.port + apiConf.stats.getGenres + id,{
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

        genres.value = res.data.value;       
    }

    getGenreCount();

</script>