<template>
    <v-dialog>
        <v-container class="fill-height justify-center align-center">
            <v-card
            class="pa-5"
            min-width="300px"
            width="600px">
                <v-card-title class="text-center">Add Entry</v-card-title>
                <v-card-subtitle
                class="text-subtitle-1 text-center">{{ name }}</v-card-subtitle>
                <v-form
                validate-on="input"
                @submit.prevent = "addEntry">
                    <v-select
                    class="mb-3"
                    :rules="rules"
                    v-model="state"
                    :items="states"
                    variant="outlined"
                    label="state"></v-select>

                    <v-text-field
                    clearable
                    :disabled="disableSDate"
                    variant="outlined"
                    type="date"
                    label="start date"
                    v-model="s_date"></v-text-field>

                    <v-text-field
                    clearable
                    :rules="dateRules"
                    variant="outlined"
                    type="date"
                    label="finish date"
                    :disabled="disableFDate"
                    v-model="f_date"></v-text-field>

                    <v-divider></v-divider>
                    <v-card-actions class="justify-center">
                        <v-btn
                        @click="emit('hide')">Cancel</v-btn>
                        <v-btn
                        type="submit"
                        :disabled="btnTrigger">Accept</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>

            <modal 
            @submit="emit('hide')"
            ref="modal"></modal>

            <loading-modal v-model="triggerLoading"></loading-modal>
        </v-container>
    </v-dialog>
</template>

<script setup>
    import {ref} from "vue";
    import axios from "axios";
    import {watch} from "vue"
    import {useStore} from "vuex"
    import apiConf from "../apiConf.json"
    import Modal from "./Modal.vue";
    import LoadingModal from "./LoadingModal.vue";

    const props = defineProps(['name','media_id','type','genre','description','cover']);
    var trigger = ref(false);
    var states = ref(['finished','on hold','to date','bookmarked','repeating','repeated']);
    var state = ref();
    var disableFDate = ref(false);
    var f_date = ref();
    var s_date = ref();
    var btnTrigger = ref(true);
    const store = useStore();
    var modal = ref();
    var triggerLoading = ref();
    var disableSDate = ref();
    const emit = defineEmits(['hide'])

    watch(state,()=>{
        console.log(['finished','repeated'].includes(state.value));
        if( !(['finished','repeated','bookmarked'].includes(state.value))){
            disableFDate.value = true;
            disableSDate.value = false;
            f_date.value = undefined;
        }else if(state.value == 'bookmarked'){
            disableFDate.value = true;
            disableSDate.value = true;
            s_date.value = undefined
            f_date.value = undefined
        }
        else{
            disableSDate.value = false;
            disableFDate.value = false;
        }
    })

    var rules = ref([
        value =>{
            if(value){
                btnTrigger.value = false
                return true
            } 
            console.log("disabling button")
            btnTrigger.value = true
            return "A state is required"
        }
    ])

    var dateRules = ref([
        value=>{
            if(value < s_date.value){
                btnTrigger.value = true
                return "Start date cannot be after finish date"
            } 
            btnTrigger.value = false
            return true;
        }
    ]);

    async function addEntry(){
        console.log(s_date.value)
        triggerLoading.value = true;
        let {id,token} = store.getters.getUser;
        let res = await axios.post(apiConf.host + apiConf.port + apiConf.entry.create + id,{
            media_id:props.media_id,
            state:state.value,
            start_d:s_date.value,
            finish_d:f_date.value,
        },{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            triggerLoading.value = false
            if(err.response){
                modal.value.createModal("Error","entry error",err.response.data.msg,true)
            }else{
                modal.value.createModal("Error","entry error","An unknown error ocurred while trying to add entry",true)
            }
            console.log(err);
            return undefined
        });

        if(res){
            triggerLoading.value = false
            modal.value.createModal("Success","entry","entry added succesfully",false,undefined,true)
            return undefined
        }
    }

</script>