<template>
    <v-layout class="rounded fill-height ma-0 pa-0">
        <v-app-bar
        density="compact"
        class="pt-4 px-4 align-center"
        elevation="3"
        location="top">
            <v-text-field
            density="compact"
            append-inner-icon="mdi-magnify"
            variant="solo-filled"></v-text-field>
        </v-app-bar>

        <v-main>
            <v-container class="d-flex justify-center">
                <EntryList
                class="mt-3"
                :list="list"
                :type="route.params.type"></EntryList>
            </v-container>
        </v-main>

        <v-app-bar
        elevation="5"
        location="bottom">
            <v-row class="px-3 mt-2 align-center">
                <v-col>
                    <v-select
                    density="compact"
                    variant="solo-filled"></v-select>
                </v-col>
                <v-col>
                    <v-select
                    density="compact"
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
    import {ref} from "vue"
    import { useRoute } from "vue-router";
    import EntryList from "@/components/EntryList.vue";
    import Modal from "@/components/Modal.vue";
    import LoadingModal from "@/components/LoadingModal.vue";

    const store = useStore();
    const route = useRoute()
    var list = ref();
    var modal = ref();
    var loading = ref();

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
                modal.value.createModal("Error","entries error",err.response.data.msg,true)
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

    loadEntries()

</script>