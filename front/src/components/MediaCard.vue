<template>
    <v-card 
    elevation="3"
    :height="isEntry ? '200px':'170px' "
    class="colorBorder border-b border b--hot-pink"
    width="400px">
        <v-container 
        fluid
        class="align-center">
            <v-row 
            cursor
            @click="triggerDetails = true"
            no-gutters class="justify-space-between">
                <v-col 
                style="height: 90px;"
                cols="2"
                class="d-flex justify-center align-center">
                    <v-img
                    class="bg-grey-darken-2 rounded"
                    style="width: 100%; height: 100%;"
                    cover
                    :src="url + media_id">
                        <template v-slot:error>
                            <v-icon 
                            style="
                            width: 100%;
                            height:100%;">mdi-image</v-icon>
                        </template>
                    </v-img>
                </v-col>
                <v-col cols="9">
                    <v-card-title class="text-h5">{{ name }}</v-card-title>
                    <v-card-subtitle class="text-subtitle-1">{{ type}} ({{ genre }})</v-card-subtitle>
                    <div v-if="isEntry">
                        <v-card-subtitle>{{ state }}</v-card-subtitle>

                    </div>
                </v-col>
            </v-row>

            <v-divider class="mt-2"></v-divider>
            <div
            v-if="!isEntry"
            class="justify-center text-center align-center mt-2 mb-0">
                <v-btn
                class="mx-1"
                size="small"
                icon="mdi-delete"></v-btn>
                
                <v-btn
                size="small"
                class="mx-1 pa-0"
                icon="mdi-plus"
                @click="mediaCardBtn"></v-btn>

                <v-btn
                class="mx-1"
                size="small"
                icon="mdi-cog"></v-btn>
            </div>

            <add-entry 
            @hide="addEntryTrigger = false"
            v-bind="props"
            v-model="addEntryTrigger"></add-entry>
        </v-container>

<!---------------------------------------------DIALOG-->

        <v-dialog 
        v-model="triggerDetails">
            <v-container
            class="d-flex justify-center align-center">
                <v-card
                elevation="3"
                class="pa-3  border-b border b--hot-pink overflow-auto"
                min-width="300px"
                width="700px"
                
                max-height="650px">

                <v-container>
                    <v-row
                    sm="bg-red"
                    class="d-md-flex justify-around">
                        <v-col 
                        style="height: 130px;"
                        xl="2"
                        lg="2"
                        md="2"
                        cols="12"
                        xs="12"
                        class="justify-center align-center text-center">
                            <v-img
                            class="bg-grey-darken-2 rounded"
                            style="width: 100%; height: 100%;"
                            cover
                            :src="url + media_id">
                                <template v-slot:error>
                                    <v-icon 
                                    style="
                                    width: 100%;
                                    height:100%;">mdi-image</v-icon>
                                </template>
                            </v-img>
                    </v-col>

                        <v-col 
                        md="10"
                        cols="12 justify-center text-center align-center">
                            <v-card-title 
                            class="text-overline text-lg-h4 ma-2 pa-4 text-sm-subtitle-1 ">{{ name }}</v-card-title>
                        </v-col>
                    </v-row>
                </v-container>
                    <v-divider></v-divider>
                    <div v-if="isEntry">
                        <v-card-text 
                        class="text-subtitle-1">type: {{ type }}</v-card-text>
                        <v-card-text class="text-subtitle-1">genre: {{ genre }}</v-card-text>
                        <v-card-text 
                        class="border rounded ma-3 text-subtitle-1"> description: {{ description }}</v-card-text>
                    
                
                        <v-divider class="mb-3"></v-divider>
                        <v-select
                        class="ma-3"
                        @change="updateState"
                        v-model="props.state"
                        variant="solo-filled"></v-select>

                        <v-text-field
                        class="ma-3"
                        variant="solo-filled"
                        type="date"></v-text-field>

                        <v-text-field
                        class="ma-3"
                        variant="solo-filled"
                        type="date"></v-text-field>

                        <v-divider></v-divider>
                        <v-card-actions class="justify-center">
                            <v-btn
                            @click="triggerDetails = false">Cancel</v-btn>
                            <v-btn>Update</v-btn>
                        </v-card-actions>
                    </div>

                    <div v-else>
                        <v-text-field
                        variant="outlined"
                        label="name"
                        :placeholder="name"
                        :value="name"></v-text-field>

                        <v-select
                        variant="outlined"
                        :placeholder="type"></v-select>

                        <v-text-field
                        variant="outlined"
                        label="genre"
                        :placeholder="genre"
                        :value="genre"></v-text-field>

                        <v-divider></v-divider>
                        <v-card-actions class="justify-center">
                            <v-btn
                            @click="triggerDetails = false">Cancel</v-btn>
                            <v-btn>Update</v-btn>
                        </v-card-actions>
                    </div>
                </v-card>
            </v-container>
        </v-dialog>
    </v-card>
</template>

<script setup>
    import {ref} from "vue"
    import apiConf from "../apiConf.json"
    import {useStore} from "vuex"
    import AddEntry from "./AddEntry.vue";

    const props = defineProps(['name','media_id','type','genre','description','cover',
    'entry_id','review','state','start_date','finish_date','isEntry']);
    var url = ref();
    const store = useStore();
    let {id} = store.getters.getUser; 
    url.value = apiConf.host + apiConf.port + apiConf.media.getCover + id + "/";
    var addEntryTrigger = ref();
    var triggerDetails = ref(false);

    function mediaCardBtn(){
        addEntryTrigger.value = true
    }

    async function updateState(){

    }

</script>

<style>
    .colorBorder{
        border-bottom: 5px;
    }
</style>

