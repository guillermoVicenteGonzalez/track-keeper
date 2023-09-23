<template>

<v-app-bar
    location="top"
      elevation="5"
      color="primary">
        <v-app-bar-title>Track-keeper</v-app-bar-title>
        <template v-slot:append>
          <v-btn
          @click="router.push('/signup')">Sign up</v-btn>

          <v-btn
          variant="solo-filled"
          @click="toLoginScreen">Sign in</v-btn>
        </template>
    </v-app-bar>

  <v-layout
  style="margin: 0%; padding:0%;"
  fluid
  class="d-block   align-center justify-center ">

      <v-row
      id="title"
      color="primary" 
      class="h-screen align-center justify-center bg-background">
        <v-col 
        lg="7"
        cols="10"
        color="secondary"
        class="">
          <h1
          style="text-decoration:;"
          class="text-h2 text-start font-weight-bold">{{ title }}</h1>

          <v-divider
          style="opacity: 100%;"
          color="secondary"
          thickness="7"
          class="rounded  my-2"></v-divider>

          <h1 class="text-lg-h2"
          >{{ subtitle }}</h1>

          <div class="d-flex my-5 ">
            <v-btn
            elevation="5"
            class="mr-5"
            color="primary"
            >Get started</v-btn>

            <v-btn
            href="#content"
            color="secondary"
            variant="flat"
            >Learn more</v-btn>
          </div>

        </v-col>
      </v-row>
  

      <v-row 
      style="min-height: 300px;"
      id="content" 
      class="fill-height justify-center align-center bg-surface">
        <v-col cols="3">
          <v-card>hola</v-card>
        </v-col>

        <v-col cols="3">
          <v-card
          elevation="5">Hola</v-card>
        </v-col>

        <v-col cols="3">
          <v-card>HOla</v-card>
        </v-col>
      </v-row>



    </v-layout>

    <!--
                <v-btn
          @click="router.push('/signup')">Sign up</v-btn>
          <v-btn
          @click="toLoginScreen">Sign in</v-btn>
    -->
</template>

<script setup>
  import {ref} from "vue";
  import { useRouter } from 'vue-router';
  import {useStore} from "vuex"
  import { useTheme } from "vuetify";

  var router = useRouter()
  const store = useStore();
  var titleText = "Track-keeper"
  var subtitleText = "Keep track of everything you watch, play and read"
  var title = ref(titleText)
  var subtitle = ref(subtitleText);

  function toLoginScreen(){
    let user = store.getters.getUser;
    if(user.id != undefined){
      router.push("/home/"+user.id);
    }
    else{
      router.push("/login")
    } 
  }





</script>

<style>

html{
    scroll-behavior: smooth !important;
}


@import url(https://fonts.googleapis.com/css?family=Exo:100);
/* Background data (Original source: https://subtlepatterns.com/grid-me/) */
/* Animations */
@-webkit-keyframes bg-scrolling-reverse {
  100% {
    background-position: 50px 50px;
  }
}
@-moz-keyframes bg-scrolling-reverse {
  100% {
    background-position: 50px 50px;
  }
}
@-o-keyframes bg-scrolling-reverse {
  100% {
    background-position: 50px 50px;
  }
}
@keyframes bg-scrolling-reverse {
  100% {
    background-position: 50px 50px;
  }
}
@-webkit-keyframes bg-scrolling {
  0% {
    background-position: 50px 50px;
  }
}
@-moz-keyframes bg-scrolling {
  0% {
    background-position: 50px 50px;
  }
}
@-o-keyframes bg-scrolling {
  0% {
    background-position: 50px 50px;
  }
}
@keyframes bg-scrolling {
  0% {
    background-position: 50px 50px;
  }
}
/* Main styles */
#title{
  color: #999;
  /* img size is 50x50 */
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC") repeat 0 0;
  -webkit-animation: bg-scrolling-reverse 0.92s infinite;
  /* Safari 4+ */
  -moz-animation: bg-scrolling-reverse 0.92s infinite;
  /* Fx 5+ */
  -o-animation: bg-scrolling-reverse 0.92s infinite;
  /* Opera 12+ */
  animation: bg-scrolling-reverse 0.92s infinite;
  /* IE 10+ */
  -webkit-animation-timing-function: linear;
  -moz-animation-timing-function: linear;
  -o-animation-timing-function: linear;
  animation-timing-function: linear;
}
#title::before {
}



</style>