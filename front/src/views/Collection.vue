<template>
    <v-layout class="rounded fill-height ma-0 pa-0">
        <v-app-bar
        :density="mobile ? 'compact':'default'"
        class="pt-4 px-4 align-center"
        elevation="3"
        location="top">
            <v-text-field
            v-model="searchBar"
            :density="mobile ? 'compact':'default'"
            append-inner-icon="mdi-magnify"
            variant="solo-filled"></v-text-field>
        </v-app-bar>

        <v-main class="justify-center align-start">
            <v-container class="align-start">
                <v-row>
                    <v-col>
                        <EntryList
                        @updated="loadEntries()"
                        :list="filterEntries()"
                        :type="route.params.type"></EntryList>
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-center">
                    <v-chip
                    :text="'count: ' + length"
                    class="rounded"
                    ></v-chip>
                </v-row>
            </v-container>
        </v-main>

        <v-app-bar
        class="pa-3"
        :density="mobile ? 'compact':'default'"
        elevation="5"
        location="bottom">
            <v-row class="mt-2 align-center">
                <v-col>
                    <v-select
                    clearable
                    :items="filterOptions"
                    label="state"
                    v-model="state"
                    :density="mobile ? 'compact':'default'"
                    variant="solo-filled"></v-select>
                </v-col>
                <v-col>
                    <v-select
                    clearable
                    :items="sortYears(list)"
                    v-model="yearFilter"
                    :density="mobile ? 'compact':'default'"
                    variant="solo-filled"></v-select>
                </v-col>
                </v-row>
        </v-app-bar>

        <LoadingModal v-model="loading"></LoadingModal>

        <Modal ref="modal"></Modal>
    </v-layout>
</template>

<script setup>
    import apiConf from "../apiConf.json"
    import {useStore} from "vuex"
    import axios from "axios";
    import {onMounted, ref} from "vue"
    import { useRoute } from "vue-router";
    import EntryList from "@/components/EntryList.vue";
    import Modal from "@/components/Modal.vue";
    import LoadingModal from "@/components/LoadingModal.vue";
    import {watch} from "vue"
    import {useDisplay} from "vuetify"

    var length = ref(0)
    const {mobile} = useDisplay()
    const store = useStore();
    const route = useRoute()
    var yearFilter = ref();
    var list = ref();
    var modal = ref();
    var loading = ref();
    var searchBar = ref();
    var state = ref("finished");
    const filterOptions = ['finished','on hold','to date','bookmarked','repeating','repeated'];

    watch(route,()=>{
        console.log(route.params.type);
        loadEntries();
    })

    async function loadEntries(){
        let {id,token} = store.getters.getUser;
        let type = route.params.type;

        loading.value = true
        let res = await axios.get(apiConf.host + apiConf.port + apiConf.entry.getType + id +"/"+type,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","media error",err.response.data.msg,true);
            }else{
                modal.value.createModal("Error","entries error",err.response.data.msg,true)
            }
            console.log(err);
            return undefined
        });

        loading.value = false;
        if(res){
            list.value = res.data.value;
        }
    }


    function searchEntry(list){
        if(list instanceof Array){
            return list.filter(item =>{
                if(![" ",undefined].includes(searchBar.value)){
                    let regex = RegExp(searchBar.value);

                    if(regex.test(item.Media.name)){
                        return item;
                    }
                }else{
                    return item
                }
            })
        }
    }

    function filterByState(list){
        if(list instanceof Array){
            return list.filter(item =>{
                if(state.value != undefined){
                    if(state.value== item.state){
                        return item
                    }
                }else{
                    return item;
                }
            })
        }
    }

    function sortYears(list){
        if(list instanceof Array){
            var prev = undefined;
            let years = list.map(item=>{
                let y = item.finish_date;
                y = y.split('-')[0];
                if(y!= prev){
                    prev = y;
                    return y
                }
            });

            return years;
        }
    }

    function filterByDate(list){
        if(list instanceof Array){
            return list.filter(item =>{
                if(yearFilter.value != undefined){
                    let fDate = item.finish_date.split('-')[0];
                    if(yearFilter.value== fDate){
                        return item
                    }
                }else{
                    return item;
                }
            })
        }
    }

    function filterEntries(){
        let stateFiltered = filterByState(list.value)
        let dateFiltered = filterByDate(stateFiltered)
        let search = searchEntry(dateFiltered)
        if(search instanceof Array){
            length.value = search.length
        }else{
            length.value = 0;
        }
        return search;
    }

    loadEntries()

</script>