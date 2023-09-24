<template>
  <v-app-bar
  location="top"
  elevation="5"
  color="primary">
        <v-app-bar-title
        class="font-weight-bold">Track-keeper</v-app-bar-title>
        <template v-slot:append>
          <v-btn
          color="secondary"
          class="mr-2"
          variant="elevated"
          @click="router.push('/signup')">Sign up</v-btn>

          <v-btn
          class="ml-2"
          variant="elevated"
          @click="toLoginScreen">Sign in</v-btn>
        </template>
    </v-app-bar>

  <v-container fluid>
    <v-row
    id="title"
    color="primary" 
    class="align-center justify-center bg-background h-screen">
      <v-col 
      lg="7"
      cols="10"
      color="secondary"
      class="">
        <h1
        style="text-decoration:;"
        class="text-h2 text-start font-weight-bold 
        text-fade text-h4">{{ title }}</h1>

        <v-divider
        style="opacity: 100%;"
        color="secondary"
        thickness="7"
        class="rounded  my-2"></v-divider>

        <h1 class="text-lg-h2 text-h5"
        >{{ subtitle }}</h1>

        <div class="d-flex my-5 ">
          <v-btn
          @click="router.push('/signup')"
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
  

    <div id="content" class="pa-5 bg-background">

      <v-row class="justify-center mt-15">
        <v-col 
        lg="4"
        cols="12">
        <h1 
        color="text"
        class="text-center text-h5 text-lg-h4 font-weight-black">What is  track-keeper ?</h1>

        <v-divider
        class="my-5"></v-divider>

        <p 
        style="text-align: justify;"
        class="text-body-1"
        >Track keeper was born because of my obssession of keeping a record of every media i enjoy, be it film, book or videogame.<br><br>
          There are numerous solution that do so better than this project but none do it in a centralized way where you can easily keep all of your collections in one place.
        </p>
      </v-col>
      </v-row>

      <v-row 
      class="d-flex overflow-auto justify-space-around align-center py-15 px-3">  
      <v-col
        lg="3"
        cols="12">
          <v-card
          class="pa-5"
          elevation="5">
            <v-icon
            color="secondary-darken"
            size="40"
            style="width:100%;">mdi-file-cabinet</v-icon>
            <h1
            color="text"
            class="text-center truncate text-truncateb text-h6 ">Organize your media record</h1>
            
            <v-divider></v-divider>

            <v-card-text>Clasify the media you consume as finished, watching, rewatching 
              to keep track of what you've done this year</v-card-text>
          </v-card>
        </v-col>

        <v-col
        lg="3"
        cols="12">
          <v-card
          class="pa-5"
          elevation="5">
            <v-icon
            color="secondary-darken"
            size="40"
            style="width:100%;">mdi-book-open-page-variant</v-icon>
            <v-card-title
            color="text"
            class="text-center">Contribute to our catalogue</v-card-title>
            
            <v-divider></v-divider>

            <v-card-text>Our database of media is still growing. Create data for shows you want to add but have not yet been added to our catalogue</v-card-text>
          </v-card>
        </v-col>

        <v-col
        lg="3"
        cols="12">
          <v-card
          class="pa-5"
          elevation="5"
          min-height="230px"
          height="230px"
          max-height="300px">
            <v-icon
            color="secondary-darken"
            size="40"
            style="width:100%;">mdi-chart-pie</v-icon>
            <v-card-title
            color="text"
            class="text-center">Get in depth stats</v-card-title>
            
            <v-divider></v-divider>

            <v-card-text>Analise you habits and your progress with numerous custom made charts</v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </div>
  
  </v-container>


  <v-footer 
  elevation="5"
  location="bottom"
  class="bg-primary d-block pt-5">

    <div class="d-flex justify-center">

      <v-btn 
      size="small"
      color="secondary-darken"
      v-for="icon in icons"
      :key="icon"
      class="mx-3"
      :icon="icon"
      ></v-btn>
    </div>

    <v-spacer></v-spacer>

    <div class="w-100 text-center pt-2">
      2023-<strong>Guillermo Vicente Gonzalez</strong>
    </div>
  </v-footer>



</template>

<script setup>
  import {ref} from "vue";
  import { useRouter } from 'vue-router';
  import {useStore} from "vuex"
  import { useTheme } from "vuetify";
  import { useDisplay } from "vuetify";

  const {mobile} = useDisplay();
  var router = useRouter()
  const store = useStore();
  var titleText = "Track-keeper"
  var subtitleText = "Keep track of everything you watch, play and read"
  var title = ref(titleText)
  var subtitle = ref(subtitleText);
  var icons = ref(['mdi-linkedin', 'mdi-github']);

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
  overflow: auto !important;
}

body{
  scroll-behavior: smooth  !important;

}

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

/**********************************************
* TEXT ANIMATIONS
**********************************************/


@keyframes fadeIn{
  0%{opacity: 0;}
  100%{opacity:1;}
}


.text-fade{
  animation:fadeIn 5s;
}




</style>