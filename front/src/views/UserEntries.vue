<template>
        <v-layout class="rounded fill-height ma-0 pa-0">
            <v-app-bar
            class="pt-4 px-4 align-center"
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
                        v-model="stateFilter"
                        :items="filterOptions"
                        variant="solo-filled"></v-select>
                    </v-col>
                </v-row>
            </v-app-bar>



            <v-main class=" " style="min-height: 300px;">
                <v-container class="d-flex flex-wrap justify-center">
                 
                    <media-card
                    @updated="getUserEntries()"
                    class="ma-3"
                    v-for="i in filterEntries()"
                    :key="i.entry_id"
                    v-bind="i.Media"
                    :entry_id="i.entry_id"
                    :review="i.review"
                    :state="i.state"
                    :start_date="i.start_date"
                    :finish_date="i.finish_date"
                    isEntry="true"
                    ></media-card>

                </v-container>
            </v-main>

            <modal ref = "modal"></modal>

        </v-layout>
</template>

<script setup>
    import {ref} from "vue";
    import {useStore} from "vuex"
    import axios from "axios"
    import apiConf from "../apiConf.json"
    import MediaCard from "@/components/MediaCard.vue";
    import Modal from "@/components/Modal.vue";

    const store = useStore();
    var genre
    var modal = ref();
    var search = ref();
    //va a ser genero
    const filterOptions = ['finished','on hold','to date','bookmarked','repeating','repeated'];

    var entries = ref();
    var stateFilter = ref();


    function searchEntry(entries){
        if(entries instanceof Array){
            return entries.filter(item =>{
                if(search.value != " " && search.value != undefined){
                    let regex = new RegExp(search.value);

                    if(regex.test(item.Media.name)){
                        return item;
                    }


                }else{
                    return item;
                }
            })
        }
    }

    function filterByState(entries){
        if(entries instanceof Array){
            return entries.filter(item =>{
                if(stateFilter.value != undefined){
                    if(item.state == stateFilter.value){
                        return item
                    }
                }else{
                    return item
                }
            })
        }
    }

    function filterEntries(){
        let filtered = filterByState(entries.value);
        return searchEntry(filtered);
    }


    async function getUserEntries(){
        let {id, token} = store.getters.getUser;
        let res = await axios.get(apiConf.host + apiConf.port + apiConf.entry.getAll + id,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","entries error",err.response.data.msg,true,'/')
            }else{
                modal.value.createModal("Error","entries error","An unexpected error ocurred",true,'/')   
            }
            console.log(err);
            return undefined;
        });

        entries.value = res.data.value;
        console.clear();
        console.log(entries.value)
    }

    getUserEntries();
</script>
