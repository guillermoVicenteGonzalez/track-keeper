<template>
    <v-dialog
    max-width="700px"
    persistent :overlay="false"
    transition="dialog-transition"
    v-model="dialog">
        <v-container>
            <v-card
            class="text-center"
            :class="dialogClass">
                <v-card-title>{{ cardTitle }}</v-card-title>
                <v-card-subtitle>{{ cardSubtitle }}</v-card-subtitle>
                <v-card-text>{{ cardText }}</v-card-text>

                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <v-btn
                    variant="outlined"
                    :color="dialogClass == 'text-error' ? 'errror':'success'"
                    @click="dialog=false"
                    >Accept</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-dialog>
</template>

<script setup>
import {ref} from "vue"
import { useRouter } from "vue-router";

const router = useRouter();
var cardTitle = ref();
var cardSubtitle = ref();
var cardText = ref();
var dialog = ref(false);
var dialogClass = ref();

function createModal(title, subtitle, text, error,route){
    dialog.value = true
    cardTitle.value = title;
    cardSubtitle.value = subtitle;
    cardText.value = text;

    if(error){
        dialogClass.value = "text-error"
    }else{
        dialogClass.value = "text-success"
    }

    if(route != undefined){
        router.push(route)
    }
}

defineExpose({
    createModal
});
</script>