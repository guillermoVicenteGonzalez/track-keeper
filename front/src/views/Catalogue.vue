<template>
    <v-app-bar
    class=" pt-4 px-4 align-center"
    elevation="3"
    location="top">
        <v-row class="d-flex align-center justify-center">
            <v-col cols="8">
                <v-text-field
                    v-model="search"
                    clearable
                    variant="solo-filled" append-inner-icon="mdi-magnify"></v-text-field>
            </v-col>

            <v-col cols="4">
                <v-select
                item-title="name"
                item-value="value"
                clearable
                v-model="typeFilter"
                :items="filterOptions"
                variant="solo-filled"></v-select>
            </v-col>
        </v-row>
    </v-app-bar>

    <v-container 
    class="justify-center mt-5 w-80">
    
        <v-row
        class="overflow-auto scroll-x-transition-move">
            <v-col 
            xs6
            cols="12" class="overflow-auto justify-center d-flex flex-wrap">
                    <MediaCard
                    @updated="loadMedia()"
                    class="ma-3"
                    v-for="i in filterMedia()"
                    v-bind="i"
                    :key="i.media_id"></MediaCard>
            </v-col>
        </v-row>



        <v-bottom-navigation>
            <v-btn 
            @click="triggerCreate = true">
                <v-icon>mdi-plus</v-icon>

                <span>New media</span>
            </v-btn>
        </v-bottom-navigation>

    </v-container>


    <CreateMedia 
    :types="filterOptions"
    @hide="triggerCreate = false"
    @created="loadMedia()"
    v-model="triggerCreate"></CreateMedia>

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
    const emit = defineEmits(['reloadUser'])

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
            emit('reloadUser')
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
