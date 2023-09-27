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

        <v-row classs="bg-red">
            <v-col 
            class="d-block bg-surface pt-5 rounded bg-red">
                <h1 
                class="text-center my-5 text-lg-h4 text-h5">Recently added to catalogue</h1>
                <div class="d-flex justify-center">
                        <MediaCard
                        @updated="getRecentActivity()"
                        v-for="(item , index) in filterMedia(media,page-1)"
                        class="mx-3"
                        :key="index"
                        v-bind="item">
                        </MediaCard>
                </div>



                <v-pagination
                :density="mobile ? 'compact':'default'"
                class="py-5 "
                :length="mobile ? length:pages"
                v-model="page">

                </v-pagination>
            </v-col>
        </v-row>

        <v-row class="my-10">
            <v-col  class="d-block bg-surface  rounded">
                <h1 
                class="text-center my-5 text-lg-h4 text-h5">Entries you recently added</h1>
                
                <div class="d-flex justify-center my-10">

                    <MediaCard
                    v-for="(i, index) in filterMedia(entries,entryPage -1)"
                    @updated="getRecentActivity()"
                    class="mx-3"
                    :key="index"
                    isEntry="true"
                    v-bind="i.Media"
                    :entry_id="i.entry_id"
                    :review="i.review"
                    :state="i.state"
                    :start_date="i.start_date"
                    :finish_date="i.finish_date"></MediaCard>
                </div>

                <v-pagination
                :density="mobile ? 'compact':'default'"
                v-model="entryPage"
                :length="mobile ? entriesL:entryPages">

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

    var entryPages = ref(3);
    var loading = ref();
    const store = useStore();
    var pages = ref(3);
    var page = ref(1);
    var entryPage = ref(1);
    const {mobile} = useDisplay();
    var entries = ref();
    var media = ref([]);
    var username = ref("user");
    var length = ref(10);
    var entriesL = ref(10);
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
            length.value = media.value.length;
            entriesL.value = entries.value.length;
            console.log(pages.value);
        }
    }

    function filterMedia(array, currentP){
        if(array instanceof Array)
        return  array.filter((item)=>{
            let index = array.indexOf(item);
            if(mobile.value == true){
                if(index == currentP){
                    return item;
                }
            }else{
                if(currentP <= index/3 && index/3 < currentP +1){
                    return item;
                }
            }
        })
    }


    getRecentActivity();
</script>