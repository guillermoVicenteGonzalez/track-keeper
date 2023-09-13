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
                <v-form>
                    <v-select
                    class="mb-3"
                    :rules="rules"
                    v-model="state"
                    :items="states"
                    variant="outlined"
                    label="state"></v-select>

                    <v-text-field
                    variant="outlined"
                    type="date"
                    label="start date"
                    v-model="s_date"></v-text-field>

                    <v-text-field
                    :rules="dateRules"
                    variant="outlined"
                    type="date"
                    label="finish date"
                    :disabled="disableFDate"
                    v-model="f_date"></v-text-field>

                    <v-divider></v-divider>
                    <v-card-actions class="justify-center">
                        <v-btn>Cancel</v-btn>
                        <v-btn
                        :disabled="btnTrigger">Accept</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-container>
    </v-dialog>
</template>

<script setup>
    import {ref} from "vue";
    import axios from "axios";
    import {watch} from "vue"

    const props = defineProps(['name','media_id','type','genre','description','cover']);
    var trigger = ref(false);
    var states = ref(['finished','on hold','to date','bookmarked','repeating','repeated']);
    var state = ref();
    var disableFDate = ref(false);
    var f_date = ref();
    var s_date = ref();
    var btnTrigger = ref(true);

    watch(state,()=>{
        console.log(['finished','repeated'].includes(state.value));
        if( !(['finished','repeated'].includes(state.value))){
            disableFDate.value = true;
            f_date.value = undefined;
        }else{
            disableFDate.value = false
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
            if(value < s_date.value){
                btnTrigger.value = true
                return "Start date cannot be after finish date"
            } 
            btnTrigger.value = true
            return true;
        }
    ])

</script>