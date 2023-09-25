<template>
  <v-app-bar
  location="top"
  elevation="5"
  color="primary">
        <v-app-bar-title
        class="font-weight-bold">Track-keeper</v-app-bar-title>
        <template v-slot:append >
          
          
          <v-btn
          :text="mobile ? false:'Sign up'"
          :icon="mobile ? 'mdi-account-plus':false"
          color="secondary"
          class="mr-2"
          variant="elevated"
          @click="router.push('/signup')"></v-btn>

          <v-btn
          :text="mobile ? false:'Sign in'"
          :icon="mobile ? 'mdi-login':false"
          color="background"
          class="ml-2"
          variant="elevated"
          @click="toLoginScreen"></v-btn>

          <v-switch
          v-model="switchBtn"
          @click="toggleTheme"
          color="secondary"
          append-icon="mdi-theme-light-dark"
          class="d-flex align-center ml-2"
          ></v-switch>

        </template>
    </v-app-bar>

  <v-container fluid>
    <v-row
    :class="switchBtn ? 'titleDark':'title'"
    color="primary" 
    class="align-center justify-center bg-background h-screen">
      <v-col 
      lg="7"
      cols="10"
      color="secondary"
      class="">
        <h1
        style="text-decoration:;"
        class="text-xl-h2 text-start font-weight-bold 
        text-fade text-h4 text-text">{{ title }}</h1>

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
        class="text-center text-h5 text-lg-h4 font-weight-black text-text">What is  track-keeper ?</h1>

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
            color="primary"
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
      v-for="(icon, key) in icons"
      :key="icon"
      class="mx-3"
      :icon="icon"
      :href="links[key]"
      target="_blank"
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

  var switchBtn = ref();
  const theme = useTheme();
  const {mobile} = useDisplay();
  var router = useRouter()
  const store = useStore();
  var titleText = "Track-keeper"
  var subtitleText = "Keep track of everything you watch, play and read"
  var title = ref(titleText)
  var subtitle = ref(subtitleText);
  var icons = ref(['mdi-linkedin', 'mdi-github']);
  var links = ref(['https://linkedin.com/in/guillermo-vicente-gonzález','https://github.com/guillermoVicenteGonzalez'])

  function toLoginScreen(){
    let user = store.getters.getUser;
    if(user.id != undefined){
      router.push("/home/"+user.id);
    }
    else{
      router.push("/login")
    } 
  }




  function toggleTheme (){
    theme.global.name.value = switchBtn.value ? 'lightTheme2':'darkTheme'  
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
.title{
  color: #999;
  /* img size is 50x50 */
  
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC") repeat 0 0;

  
  /*
  background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAA0GVYSWZJSSoACAAAAAoAAAEEAAEAAAAyAAAAAQEEAAEAAAAyAAAAAgEDAAMAAACGAAAAEgEDAAEAAAABAAAAGgEFAAEAAACMAAAAGwEFAAEAAACUAAAAKAEDAAEAAAADAAAAMQECAA0AAACcAAAAMgECABQAAACqAAAAaYcEAAEAAAC+AAAAAAAAAAgACAAIADcCAAAUAAAANwIAABQAAABHSU1QIDIuMTAuMzQAADIwMjM6MDk6MjUgMTQ6MzE6MzgAAQABoAMAAQAAAAEAAAAAAAAAnOFfigAAAYRpQ0NQSUNDIHByb2ZpbGUAAHicfZE9SMNAHMVfW6UqFQULfuCQoTrZRUUcaxWKUCHUCq06mFz6BU0akhQXR8G14ODHYtXBxVlXB1dBEPwAcXVxUnSREv+XFFrEeHDcj3f3HnfvAH+9zFSzIwaommWkEnEhk10Vgq/oxjBC6MegxEx9ThST8Bxf9/Dx9S7Ks7zP/Tl6lZzJAJ9AHGO6YRFvEM9sWjrnfeIwK0oK8TnxhEEXJH7kuuzyG+eCw36eGTbSqXniMLFQaGO5jVnRUImniSOKqlG+P+OywnmLs1qusuY9+QtDOW1lmes0R5HAIpYgQoCMKkoow0KUVo0UEynaj3v4Rxy/SC6ZXCUwciygAhWS4wf/g9/dmvmpSTcpFAc6X2z7YwwI7gKNmm1/H9t24wQIPANXWstfqQOzn6TXWlrkCOjbBi6uW5q8B1zuAENPumRIjhSg6c/ngfcz+qYsMHAL9Ky5vTX3cfoApKmr5A1wcAiMFyh73ePdXe29/Xum2d8Pb9NypdZ0bCsAAA14aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjBlYjAzZmU1LTBhM2UtNGFjYy05ZWE0LTdlOTg2YTQ4ZjNlYyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphNWU5M2I4Zi1lYTAwLTQ0OTAtYjZjMC1jZTc0OWRkMDVjZjgiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjNjJjZjAwZS0wNjAwLTRlNmMtODQwMS1kZTA2M2YxNTEzMGEiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE2OTU2NDUxMDA3OTk2OTMiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zNCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjM6MDk6MjVUMTQ6MzE6MzgrMDI6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDIzOjA5OjI1VDE0OjMxOjM4KzAyOjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjMxM2YzZmUtNzNlNy00ZGNhLTg4MWQtNDcxZWNkNDdjZTk0IgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMy0wOS0yNVQxNDozMTo0MCswMjowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz7k7fOdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wkZDB8oFmGk/gAAAGhJREFUWMPtzkENACEQBMEFlKBhrPBZKxhCzbggwcapuGQfXQqqrbVsZ2aUcc5pc05Jtuu0JPXMLHWKCNs9SqJFixYtWrRo0aJFixYtWrRo0aJFixYtWrRo0aJF6yfj3ivpvVfntPf+AEDiGAS+d7rLAAAAAElFTkSuQmCC') repeat 0 0;
  */
  
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


.titleDark{
  color: #999;
  /* img size is 50x50 */

  
  
  background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAA0GVYSWZJSSoACAAAAAoAAAEEAAEAAAAyAAAAAQEEAAEAAAAyAAAAAgEDAAMAAACGAAAAEgEDAAEAAAABAAAAGgEFAAEAAACMAAAAGwEFAAEAAACUAAAAKAEDAAEAAAADAAAAMQECAA0AAACcAAAAMgECABQAAACqAAAAaYcEAAEAAAC+AAAAAAAAAAgACAAIADcCAAAUAAAANwIAABQAAABHSU1QIDIuMTAuMzQAADIwMjM6MDk6MjUgMTU6MDc6MjAAAQABoAMAAQAAAAEAAAAAAAAAzCl3YwAAAYRpQ0NQSUNDIHByb2ZpbGUAAHicfZE9SMNAHMVfW6UqFQULfuCQoTrZRUUcaxWKUCHUCq06mFz6BU0akhQXR8G14ODHYtXBxVlXB1dBEPwAcXVxUnSREv+XFFrEeHDcj3f3HnfvAH+9zFSzIwaommWkEnEhk10Vgq/oxjBC6MegxEx9ThST8Bxf9/Dx9S7Ks7zP/Tl6lZzJAJ9AHGO6YRFvEM9sWjrnfeIwK0oK8TnxhEEXJH7kuuzyG+eCw36eGTbSqXniMLFQaGO5jVnRUImniSOKqlG+P+OywnmLs1qusuY9+QtDOW1lmes0R5HAIpYgQoCMKkoow0KUVo0UEynaj3v4Rxy/SC6ZXCUwciygAhWS4wf/g9/dmvmpSTcpFAc6X2z7YwwI7gKNmm1/H9t24wQIPANXWstfqQOzn6TXWlrkCOjbBi6uW5q8B1zuAENPumRIjhSg6c/ngfcz+qYsMHAL9Ky5vTX3cfoApKmr5A1wcAiMFyh73ePdXe29/Xum2d8Pb9NypdZ0bCsAAA14aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOmIzM2Q0ZjQ4LWRhOTMtNGM1NC04YzBiLThiMjAzMTZlZjJhMiIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1YWMyMTI5MC0xY2M3LTQ4MTctYjA0Yi00ODNhZjJjN2VjNjkiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5ZTNhNjMyMy0xYjVjLTQ5NzYtOWNiZC1mYzRhNjY0YWZjZWYiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE2OTU2NDcyNDQ4NDgxOTciCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zNCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjM6MDk6MjVUMTU6MDc6MjArMDI6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDIzOjA5OjI1VDE1OjA3OjIwKzAyOjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzgxYjJmYjQtZWVjOC00YzYwLTliM2MtN2Y5OTMyMTIxMWU1IgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMy0wOS0yNVQxNTowNzoyNCswMjowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz6h1fDeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wkZDQcYs2FmPAAAAF9JREFUWMPtzjERADEMA8HkmbgPlbQCKSpuBSgofsbFLYLd3S3pnLPGSLKryrakOS3b+96bZA3zrZFo0aJFixYtWrRo0aJFixYtWrRo0aJFixYtWrRo0fqrlcT2qJPtB0U3FgHaj+lTAAAAAElFTkSuQmCC') repeat 0 0;

  
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