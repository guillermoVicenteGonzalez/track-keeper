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
        persistent
        v-model="triggerDetails">
            <v-container
            class="d-flex justify-center align-center">
                <v-card
                elevation="3"
                class="pa-3 d-block border-b border b--hot-pink overflow-auto"
                min-width="300px"
                width="700px"
                
                max-height="650px">
        
                <v-container>
                    <v-row
                    class="d-flex ">
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
                        v-if="isEntry"
                        md="10 text-start"
                        cols="12 text-center">
                            <v-card-title 
                            class="text-lg-h4  text-sm-subtitle-1 text-center text-md-start">
                                {{ name }}
                            </v-card-title>
                            
                            <v-card-subtitle
                            class="text-subtitle-2 text-center text-md-start">
                                type: {{ type }}
                            </v-card-subtitle>
                                
                            <v-card-subtitle class="text-subtitle-2 text-center text-md-start">
                                genre: {{ genre }}
                            </v-card-subtitle>

                        </v-col>

                        <v-col 
                        v-else
                        style="height: 50px;"
                        md="10 text-start"
                        cols="12 text-center">
                            <v-card-title 
                            class="text-overline text-lg-h4  text-sm-subtitle-1 ">{{ name }}</v-card-title>
                        </v-col>

                    </v-row>
                </v-container>
                    <v-form validate-on="input">
                        <v-divider></v-divider>
                        <div v-if="isEntry">
                            <v-card-text
                            style="max-height: 100px;"
                            class="border rounded ma-3 overflow-auto"> description: {{ description }}</v-card-text>
                    
                            <v-divider class="mb-3"></v-divider>
                            <v-select
                            clearable
                            :rules="rules"
                            class="ma-3"
                            v-model="nState"
                            :items="states"
                            variant="solo-filled"></v-select>

                            <v-text-field
                            clearable
                            :disabled="disableSDate"
                            class="ma-3"
                            label="start date"
                            :placeholder="start_date"
                            v-model="nStartD"
                            variant="solo-filled"
                            type="date"></v-text-field>

                            <v-text-field
                            clearable
                            :rules="dateRules"
                            :disabled="disableFDate"
                            class="ma-3"
                            label="finish date"
                            :placeholder="finish_date"
                            v-model="nFinishD"
                            variant="solo-filled"
                            type="date"></v-text-field>

                            <v-divider></v-divider>
                            <v-card-actions class="justify-center">
                                <v-btn
                                @click="triggerDetails = false">Cancel</v-btn>

                                <v-btn
                                :disabled="btnTrigger"
                                @click="updateEntry">Update</v-btn>
                            </v-card-actions>
                        </div>

                        <div v-else>
                            <v-text-field
                            variant="outlined"
                            label="name"
                            :placeholder="name"
                            v-model="nName"></v-text-field>

                            <v-select
                            label="type"
                            variant="outlined"
                            :items="types"
                            :placeholder="type"
                            v-model="nType"></v-select>

                            <v-text-field
                            variant="outlined"
                            label="genre"
                            :placeholder="genre"
                            v-model="nGenre"></v-text-field>

                            <v-textarea
                            variant="outlined"
                            label="description"
                            :placeholder="description"
                            v-model="nDescription"></v-textarea>

                            <v-divider></v-divider>
                            <v-card-actions class="justify-center">
                                <v-btn
                                @click="cancelBtn">Cancel</v-btn>
                                <v-btn
                                @click="updateMedia">Update</v-btn>
                            </v-card-actions>
                        </div>
                    </v-form>
                </v-card>

                <modal 
                @submit="cancelBtn"
                ref="modal"></modal>

                <loading-modal v-model="loading"></loading-modal>
            </v-container>
        </v-dialog>
    </v-card>
</template>

<script setup>
    import {onMounted, ref} from "vue"
    import apiConf from "../apiConf.json"
    import {useStore} from "vuex"
    import AddEntry from "./AddEntry.vue";
    import axios from "axios"
    import Modal from "./Modal.vue";
    import LoadingModal from "./LoadingModal.vue";
    import {watch} from "vue"

    const emit = defineEmits('updated')
    const props = defineProps(['name','media_id','type','genre','description','cover',
    'entry_id','review','state','start_date','finish_date','isEntry']);
    var url = ref();
    const store = useStore();
    let {id} = store.getters.getUser; 
    url.value = apiConf.host + apiConf.port + apiConf.media.getCover + id + "/";
    var addEntryTrigger = ref();
    var triggerDetails = ref(false);
    var states = ref(['finished','on hold','to date','bookmarked','repeating','repeated']);
    var types = ref([
        'book',
        'Videogame',
        'Film',
        'TVShow',
        'Comic',
        'Anime',
        'Other'
    ]);
    var loading = ref();
    var modal = ref();


    /**
     * Upadate stuff
     */
    var nName = ref();
    var nType = ref();
    var nGenre = ref();
    var nState = ref();
    var nStartD = ref();
    var nFinishD = ref();
    var nDescription = ref();

    /**
     * Entry form rules (primarily dates and stuff)
     */
    var btnTrigger = ref();
    var disableFDate = ref();
    var disableSDate = ref();
    watch(nState,()=>{
        if( !(['finished','repeated'].includes(nState.value))){
            disableFDate.value = true;
            disableSDate.value = false;
            nFinishD.value = undefined;
            nStartD.value = props.start_date
        }else if(nState.value == 'bookmarked'){
            disableFDate.value = true;
            disableSDate.value = true;
            nStartD.value = undefined
            nFinishD.value = undefined
        }
        else{
            disableSDate.value = false;
            disableFDate.value = false;
            nStartD.value = props.start_date;
            nFinishD.value = props.finish_date;
        }
    })

    var rules = ref([
        value =>{
            if(value){
                btnTrigger.value = false
                return true
            } 
            btnTrigger.value = true
            return "A state is required"
        }
    ])

    var dateRules = ref([
        value=>{
            if(value < nStartD.value){
                btnTrigger.value = true
                return "Start date cannot be after finish date"
            } 
            btnTrigger.value = false
            return true;
        }
    ]);
    

    function mediaCardBtn(){
        addEntryTrigger.value = true
    }



    async function updateMedia(){
        let fields ={};
        let {id, token} = store.getters.getUser;

        loading.value = true
        if(! ([" ",undefined].includes(nName.value)) || nName.value != props.name){
            fields.name = nName.value;
        }

        if(! ([" ",undefined].includes(nType.value)) || nType.value != props.type){
            fields.type = nType.value;
        }

        if(! ([" ",undefined].includes(nGenre.value)) || nGenre.value != props.genre){
            fields.genre = nGenre.value;
        }

        if(! ([" ",undefined].includes(nDescription.value)) || nDescription.value != props.description){
            fields.description = nDescription.value;
        }

        if(Object.keys(fields).length == 0){
            modal.value.createModal("Error","update media","changes where either empty or equal to the previous values",true);
            loading.value = false;
            return undefined;
        }

        let res = await axios.put(apiConf.host + apiConf.port + apiConf.media.update + id +"/" + props.media_id,fields,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","update media",err.response.data.msg,true)
            }else{
                modal.value.createModal("Error","update media","an unknown error ocurred",true)
            }
            console.log(err);
            return undefined
        });


        loading.value = false;
        
        if(res){
            emit("updated")
            modal.value.createModal("Success","update media","update was successfull",false,undefined,true)
            return true
        }
    }


    async function updateEntry(){
        let fields = {}
        let {id, token} = store.getters.getUser;

        loading.value = true

        if(! ([" ",undefined].includes(nState.value)) || nState.value != props.state){
            fields.state = nState.value;
        }

        if(! ([" ",undefined].includes(nStartD.value)) || nStartD.value != props.start_date){
            fields.start_date = nStartD.value;
        }

        if(! ([" ",undefined].includes(nFinishD.value)) || nFinishD.value != props.finish_date){
            fields.finish_date = nFinishD.value;
        }

        if(Object.keys(fields).length == 0){
            modal.value.createModal("Error","update media","changes where either empty or equal to the previous values",true);
            loading.value = false;
            return undefined;
        }

        let res = await axios.put(apiConf.host + apiConf.port + apiConf.entry.update + id + "/" + props.entry_id, fields,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","update entry",err.response.data.msg,true)
            }else{
                modal.value.createModal("Error","update entry","an unknown error ocurred",true)
            }
            console.log(err);
            return undefined
        });

        loading.value = false

        if(res){
            emit("updated")
            modal.value.createModal("Success","update entry","update was successfull",false,undefined,true)
            return true
        }

    }



    function setValues(){
        nName.value = props.name;
        nType.value = props.type;
        nGenre.value = props.genre;
        nState.value = props.state;
        nDescription.value = props.description;
        nFinishD.value = props.finish_date;
        nStartD.value = props.start_date;
    }

    function cancelBtn(){
        triggerDetails.value = false
        setValues();
    }

    onMounted(()=>{
        setValues();
    })
</script>

<style>
    .colorBorder{
        border-bottom: 5px;
    }
</style>

