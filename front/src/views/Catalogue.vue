<template>
    <v-app-bar
    :density="mobile ? 'compact':'default'"
    class=" pt-4 px-4 align-center"
    elevation="3"
    location="top">
        <v-row class="d-flex align-center justify-center">
            <v-col 
            lg="9"
            cols="7">
                <v-text-field
                    :density="mobile ? 'compact':'default'"
                    v-model="search"
                    clearable
                    variant="solo-filled" append-inner-icon="mdi-magnify"></v-text-field>
            </v-col>

            <v-col 
            lg="3"
            cols="5">
                <v-select
                :density="mobile ? 'compact':'default'"
                item-title="value"
                clearable
                persistent-clear
                v-model="typeFilter"
                :items="filterOptions"
                variant="solo-filled">
                    <template v-slot:selection="{ item}">
                        <span v-if="mobile">
                            <v-icon class="mr-2">{{ filterIcon(item.value) }}</v-icon>
                        </span>

                        <span v-else>
                            <v-icon class="mr-2">{{ filterIcon(item.value) }}</v-icon>
                            {{item.title }}
                        </span>
                    </template>
                </v-select>
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



        <v-bottom-navigation
        class="bg-primary">
            <v-btn 
            @click="triggerCreate = true">
                <v-icon>mdi-plus</v-icon>

                <span>New media</span>
            </v-btn>
        </v-bottom-navigation>

    </v-container>

    <v-pagination
    v-model="currentPage"
    total-visible="10"
    :length="pages"></v-pagination>

    <CreateMedia 
    :types="filterOptions"
    @hide="triggerCreate = false"
    @created="loadMedia()"
    v-model="triggerCreate"></CreateMedia>

    <Modal ref="modal"></Modal>

    <LoadingModal v-model="loading"></LoadingModal>
</template>

<script setup>
    import apiConf from "../apiConf.json"
    import {ref, watch} from "vue"
    import {useStore} from "vuex"
    import axios from "axios"
    import Modal from "@/components/Modal.vue";
    import MediaCard from "@/components/MediaCard.vue";
    import CreateMedia from "@/components/CreateMedia.vue";
    import {useDisplay} from "vuetify"
    import LoadingModal from "@/components/LoadingModal.vue";

    let currentPage = ref();
    let pages = ref();
    let loading = ref();
    const {mobile} = useDisplay();
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

    function test(page){
        alert(page);
    }

    watch(currentPage,()=>{
        loadMedia(currentPage.value -1);
    });

    watch(search, ()=>{
        if([undefined,"", " "].includes(search.value)){
            loadMedia(currentPage.value -1);
        }else{
            searchMedia(search.value)
            // loadMedia(currentPage.value -1)
        }
    })


    async function searchMedia(query=""){
        let {id,token} = store.getters.getUser;
        loading.value = true;
        let response = await axios.get(apiConf.host + apiConf.port + apiConf.media.search + id + "/" + query,{
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
            loading.value = false;
            return undefined;
        });

        if(response){
            console.log(response)
            loading.value = false;
            let {count, page} = response.data;
            // media.value = list.data.value;
            media.value = page;
            pages.value = count
            console.log(media.value)
        }
    }

    async function loadMedia(page=0){
        let {id,token} = store.getters.getUser;
        loading.value = true;
        let response = await axios.get(apiConf.host + apiConf.port + apiConf.media.getPaginated + id + "/" + page,{
            headers:{
                'Authorization':'Bearer ' + token,
            }
        })
        // let list = await axios.get(apiConf.host + apiConf.port + apiConf.media.getAll + id,{
        //     headers:{
        //         'Authorization':'Bearer ' + token,
        //     }
        // })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","media error",err.response.data.msg,true);
            }else{
                modal.value.createModal("Error","media error","An unknown error ocurred",true);
            }
            emit('reloadUser')
            console.log(err);
            loading.value = false;
            return undefined;
        });

        if(response){
            loading.value = false;
            console.log(response);
            let {count, page} = response.data;
            // media.value = list.data.value;
            media.value = page;
            pages.value = count
            console.log(media.value)
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

    // function searchMedia(media){
    //     if(media instanceof Array){
    //         return media.filter(item =>{
    //             if(search.value != " " && search.value != undefined){
    //                 let regex = new RegExp(search.value);

    //                 if(regex.test(item.name)){
    //                     return item
    //                 }
    //             }else{
    //                 return item
    //             }
    //         })
    //     }
    // }

    function filterMedia(){
        let filtered = filterByType(media.value);
        // return searchMedia(filtered)
        return filtered;
    }

    function filterIcon(type){
        switch(type){
            case 'Comic':
                return 'mdi-arm-flex'

            case 'Videogame':
                return 'mdi-nintendo-game-boy';

            case 'Film':
                return "mdi-film";

            case 'TVShow':
                return "mdi-television";

            case 'Book':
                return "mdi-book-open";

            case 'Anime':
                return "mdi-syllabary-hiragana"
        }
    }

    loadMedia();
</script>
