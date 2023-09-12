<template>
    <v-container class="justify-center d-block" style="background-color: red;">
        <v-row class="">
            <v-col cols="8">
                <v-text-field
                v-model="search"
                clearable
                variant="outlined" append-inner-icon="mdi-magnify"></v-text-field>
            </v-col>
            <v-col>
                <v-select
                item-title="name"
                item-value="value"
                clearable
                v-model="typeFilter"
                :items="filterOptions"
                variant="outlined"></v-select>
            </v-col>
        </v-row>

        <v-row class="justify-space-evenly">
            <MediaCard 
            class="ma-2"
            v-for="i in filterMedia()" v-bind="i"></MediaCard>
        </v-row>

        <v-row class="justify-center">
            <v-btn
            icon="mdi-plus"
            @click="triggerCreate = true"></v-btn>
        </v-row>
    </v-container>

    <CreateMedia v-model="triggerCreate"></CreateMedia>

    <Modal ref="modal"></Modal>
</template>

<script setup>
    import apiConf from "../apiConf.json"
    import {ref} from "vue"
    import {useStore} from "vuex"
    import axios from "axios"
    import Modal from "@/components/Modal.vue";
    import MediaCard from "@/components/MediaCard.vue";
    import CreateMedia from "@/components/CreateMedia.vue";

    var triggerCreate = ref()
    const store = useStore();
    var media = ref();
    var modal = ref();
    const filterOptions = [
        {name:'books',value:'Book',},
        {name:'Games',value:'Videogame'},
        {name:'Movies',value:'Film'},
        {name:'TV shows',value:'TVShow'},
        {name:'Comics',value:'Comic'},
        {name:'Anime',value:'Anime'},
        {name:'Other',value:'Other'}]
    var typeFilter = ref();
    var search = ref();

    async function loadMedia(){
        let {id,token} = store.getters.getUser;
        let list = await axios.get(apiConf.host + apiConf.port + apiConf.media.getAll + id,{
            headers:{
                'Authorization':'Bearer ' + token,
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","media error",err.response.data.msg,true);
            }else{
                modal.value.createModal("Error","media error","An unknown error ocurred",true);
            }
            console.log(err);
            return undefined;
        });

        if(list){
            media.value = list.data.value;
        }
    }


    function filterByType(media){
        if(media instanceof Array){
            return media.filter(item =>{
                if(typeFilter.value != undefined){
                    if(item.type == typeFilter.value){
                        return item
                    }
                }else{
                    return item;
                }
            })
        }
    }

    function searchMedia(media){
        if(media instanceof Array){
            return media.filter(item =>{
                if(search.value != " " && search.value != undefined){
                    let regex = new RegExp(search.value);

                    if(regex.test(item.name)){
                        return item
                    }
                }else{
                    return item
                }
            })
        }
    }

    function filterMedia(){
        let filtered = filterByType(media.value);
        return searchMedia(filtered)
    }

    loadMedia();
</script>