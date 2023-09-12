<template>
  <v-toolbar
    sticky
    class="d-block pa-5 bg-background sticky">
        <v-col cols="8">
            <v-text-field
                v-model="search"
                clearable
                variant="outlined" append-inner-icon="mdi-magnify"></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-select
                item-title="name"
                item-value="value"
                clearable
                v-model="typeFilter"
                :items="filterOptions"
                variant="outlined"></v-select>
            </v-col>
    </v-toolbar>

    <v-container 
    class="justify-center overflow-hidden ">
    
        <v-row>
            <v-col 
            cols="12" class="overflow-auto justify-center d-flex flex-wrap">
                    <MediaCard
                    class="ma-3"
                    v-for="i in filterMedia()"
                    v-bind="i"
                    :key="i.media_id"></MediaCard>
            </v-col>
        </v-row>


<!--
        <div class="test">


            <MediaCard 
            class="ma-2"
            v-for="i in filterMedia()"
            v-bind="i"
            :key="i.media_id"></MediaCard>
        </div>
-->

<!--    
        <v-virtual-scroll
        style="background-color: green;"
        height="700px"
        :items="filterMedia()">

            <template v-slot:default="{item}">
                <MediaCard 
                class="ma-2"
                v-bind="item"></MediaCard>
            </template>
        </v-virtual-scroll>-->

<!--
        <v-virtual-scroll
        class="d-flex justify-space-evently"
        height="700px"
        :items="filterMedia()">
            <template v-slot:default="{item}">
                <MediaCard 
                class="ma-2"
                v-bind="item"></MediaCard>
            </template>
        </v-virtual-scroll>
-->

    <!--
        <v-row 
        class="justify-space-evenly">
            <MediaCard 
            class="ma-2 fill-height "
            v-for="i in filterMedia()" v-bind="i"></MediaCard>-
        </v-row>-->

        <v-row class="justify-center bg-white pa-3 align-center" id="addMediaBtn">
            <v-btn
            icon="mdi-plus"
            @click="triggerCreate = true"></v-btn>
        </v-row>
    </v-container>

    <CreateMedia 
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

<style>

    .sticky{
        position: sticky;
        top:60px;
        z-index: 1;
    }

    #addMediaBtn{
        margin:0;
        position: fixed;
        width: 100%;
        bottom: 0px;
        left: 0px;
        z-index: 1;
    }


    #addMediaBtn2{
        position:sticky;
        width:100%;
        bottom:0px;
        z-index:1;
    }

    #searchBar{
        margin:0;
        background-color: red;
        position: fixed;
        width: 100%;
        top: 70px;
        left:0px;
        z-index: 1;
    }

    .fixedRow{
        height: 60px;
        width: 100%;
        position: fixed;
        bottom: 0;
        z-index: 1;
        background-color: blue;
    }

    .catalogueContainer{
        background-color: green;
        height: 100px;
    }

    .test{
        justify-content: center;
        display: flex;
        flex-wrap: wrap !important;
        background-color: green;
        height: 80%;
        overflow:scroll;
    }

</style>