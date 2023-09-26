<template>
    <v-container
    fluid
    class="fill-height d-block">
        <v-row class="justify-center align-center my-5">
            <v-col
            lg="6" 
            cols="12">
                <h1 class="text-center text-text">Welcome back {{ username }}</h1>
                <v-divider class="my-3"></v-divider>
            </v-col>
        </v-row>

        <v-row>
            <v-col 
            class="d-block bg-surface pt-5 rounded">
                <h1 
                class="text-center my-5">Recently added to catalogue</h1>
                <div class="d-flex justify-center">
                    <div
                    class="d-flex"
                    :key="index"
                    v-for="(item , index) in media">
                    <v-slide-x-transition>
                        <MediaCard
                        class="mx-3"
                        :key="index"
                        v-if="cardsToShow(index)"
                        
                        v-bind="item">
                        </MediaCard>
                    </v-slide-x-transition>
                    </div>
                </div>


                <v-pagination
                class="py-5"
                :length="mobile ? media.length:pages"
                v-model="page">

                </v-pagination>
            </v-col>
        </v-row>

        <v-row>
            <v-col  class="d-block bg-surface  rounded">
                <h1 class="text-center">Entries you recently added</h1>
                
                <div class="d-flex justify-center my-10">
                    <div v-for="(i, index) in entries"
                    :key="index">
                    <MediaCard
                    @updated="getRecentActivity()"
                    class="mx-3"
                    :key="key"
                    isEntry="true"
                    v-bind="i.Media"
                    :entry_id="i.entry_id"
                    :review="i.review"
                    :state="i.state"
                    :start_date="i.start_date"
                    :finish_date="i.finish_date"></MediaCard>
                    </div>
                </div>

                <v-pagination
                :length="mobile ? entries.length:entryPages">

                </v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import {ref} from "vue";
    import apiConf from "@/apiConf.json"
    import axios from "axios";
    import {useStore} from "vuex"
    import MediaCard from "./MediaCard.vue";
    import { useDisplay } from "vuetify";

    var entryPages = ref();
    var loading = ref();
    const store = useStore();
    var pages = ref(3);
    var page = ref(1);
    var entryPages = ref();
    const {mobile} = useDisplay();
    var entries = ref();
    var media = ref();
    var username = ref("user");
    let {name} = store.getters.getUser;
    if(name){
        username.value = name;
    }

    async function getRecentActivity(){
        loading.value = false
        let {id,token} = store.getters.getUser;

        let res = await axios.get(apiConf.host + apiConf.port + apiConf.stats.recent + id,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            console.log(err);
            return undefined;
        });

        if(res){
            console.log(res);
            media.value = res.data.media;
            entries.value = res.data.entries;
            pages.value = Math.round(media.value.length/3);
            entryPages.value = Math.round(entries.value.length/3)
            console.log(pages.value);
        }
    }

    function cardsToShow(index){
        if(mobile == true){
            if(index == page.value){
                return true;
            }else{
                return false
            }
        }else{
            if(page.value -1 <= index/3 && index/3 < page.value){
                return true;
            }else{
                return false;
            }
        }
    }

    getRecentActivity();
</script>