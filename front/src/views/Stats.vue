<template>
    <v-navigation-drawer
    v-if="!mobile"
    permanent
    rail
    elevation="5"
    location="right">
        <v-list-item
        class="py-5"
        href="#pieChart">
            <v-icon>mdi-chart-pie</v-icon>
        </v-list-item>

        <v-list-item
        class="py-5"
        href="#genreCount">
            <v-icon>mdi-poll</v-icon>
        </v-list-item>

        <v-list-item
        class="py-5"
        href="#evolution">
            <v-icon>mdi-chart-line</v-icon>
        </v-list-item>
    </v-navigation-drawer>

    <v-bottom-navigation v-else>
        <v-btn
        icon="mdi-chart-pie"
        href="#pieChart"></v-btn>

        <v-btn
        icon="mdi-poll"
        href="#genreCount"></v-btn>
    </v-bottom-navigation>

    <v-layout>
        <v-parallax 
        src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1098%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='rgba(166%2c 190%2c 220%2c 1)'%3e%3c/rect%3e%3cpath d='M57 1080L1137 0L1317 0L237 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient1099%26quot%3b)'%3e%3c/path%3e%3cpath d='M723.6 1080L1803.6 0L2517.6 0L1437.6 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient1099%26quot%3b)'%3e%3c/path%3e%3cpath d='M1888 1080L808 0L86.5 0L1166.5 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient1100%26quot%3b)'%3e%3c/path%3e%3cpath d='M1257.4 1080L177.4000000000001 0L49.90000000000009 0L1129.9 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient1100%26quot%3b)'%3e%3c/path%3e%3cpath d='M916.346273700141 1080L1920 76.34627370014096L1920 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient1099%26quot%3b)'%3e%3c/path%3e%3cpath d='M0 1080L1003.653726299859 1080L 0 76.34627370014096z' fill='url(%26quot%3b%23SvgjsLinearGradient1100%26quot%3b)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1098'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='0%25' y1='100%25' x2='100%25' y2='0%25' id='SvgjsLinearGradient1099'%3e%3cstop stop-color='rgba(255%2c 142%2c 148%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(255%2c 142%2c 148%2c 1)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='100%25' y1='100%25' x2='0%25' y2='0%25' id='SvgjsLinearGradient1100'%3e%3cstop stop-color='rgba(255%2c 142%2c 148%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(255%2c 142%2c 148%2c 1)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
        id="parallax">
            <v-lazy>
                <v-main 
                id="pieChart"
                class="justify-center align-center fill-height">
                    <v-row no-gutters class="bg-background" style="">
                        <v-col>
                            <PieComparison></PieComparison>
                        </v-col>
                    </v-row>

                    <v-row 
                    id="genreCount"
                    class="d-flex justify-center align-center pa-5"
                    style="height: 100vh; width: 100%;">
                        <v-container class="d-flex justify-center align-center">
                            <FavouriteGenres></FavouriteGenres>
                        </v-container>
                    </v-row>

                    <v-row 
                    id="evolution"
                    no-gutters class="bg-background">
                        <v-col class="d-flex justify-center align-center">
                            <EvolutionLineChart
                            class="rounded bg-surface mt-10"
                            ></EvolutionLineChart>
                        </v-col>
                    </v-row>

                    <v-row>
                        <!--Maybe summary (favourite genre, general count, fav type and a custom)-->
                    </v-row>
                </v-main>
            </v-lazy>
        </v-parallax>
    </v-layout>

</template>

<script setup>
    import EvolutionLineChart from '@/components/Stats/EvolutionLineChart.vue';
    import FavouriteGenres from '@/components/Stats/FavouriteGenres.vue';
    import PieComparison from '@/components/Stats/PieComparison.vue';
    import {useDisplay} from "vuetify";

    const {mobile} = useDisplay()
    const emit = defineEmits(['reloadUser'])

</script>

<style>

#parallax{
    color: #999;
  /* img size is 50x50 */
  
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC") repeat 0 0;

  
  /*
  background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAA0GVYSWZJSSoACAAAAAoAAAEEAAEAAAAyAAAAAQEEAAEAAAAyAAAAAgEDAAMAAACGAAAAEgEDAAEAAAABAAAAGgEFAAEAAACMAAAAGwEFAAEAAACUAAAAKAEDAAEAAAADAAAAMQECAA0AAACcAAAAMgECABQAAACqAAAAaYcEAAEAAAC+AAAAAAAAAAgACAAIADcCAAAUAAAANwIAABQAAABHSU1QIDIuMTAuMzQAADIwMjM6MDk6MjUgMTQ6MzE6MzgAAQABoAMAAQAAAAEAAAAAAAAAnOFfigAAAYRpQ0NQSUNDIHByb2ZpbGUAAHicfZE9SMNAHMVfW6UqFQULfuCQoTrZRUUcaxWKUCHUCq06mFz6BU0akhQXR8G14ODHYtXBxVlXB1dBEPwAcXVxUnSREv+XFFrEeHDcj3f3HnfvAH+9zFSzIwaommWkEnEhk10Vgq/oxjBC6MegxEx9ThST8Bxf9/Dx9S7Ks7zP/Tl6lZzJAJ9AHGO6YRFvEM9sWjrnfeIwK0oK8TnxhEEXJH7kuuzyG+eCw36eGTbSqXniMLFQaGO5jVnRUImniSOKqlG+P+OywnmLs1qusuY9+QtDOW1lmes0R5HAIpYgQoCMKkoow0KUVo0UEynaj3v4Rxy/SC6ZXCUwciygAhWS4wf/g9/dmvmpSTcpFAc6X2z7YwwI7gKNmm1/H9t24wQIPANXWstfqQOzn6TXWlrkCOjbBi6uW5q8B1zuAENPumRIjhSg6c/ngfcz+qYsMHAL9Ky5vTX3cfoApKmr5A1wcAiMFyh73ePdXe29/Xum2d8Pb9NypdZ0bCsAAA14aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjBlYjAzZmU1LTBhM2UtNGFjYy05ZWE0LTdlOTg2YTQ4ZjNlYyIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphNWU5M2I4Zi1lYTAwLTQ0OTAtYjZjMC1jZTc0OWRkMDVjZjgiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjNjJjZjAwZS0wNjAwLTRlNmMtODQwMS1kZTA2M2YxNTEzMGEiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJMaW51eCIKICAgR0lNUDpUaW1lU3RhbXA9IjE2OTU2NDUxMDA3OTk2OTMiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zNCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjM6MDk6MjVUMTQ6MzE6MzgrMDI6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDIzOjA5OjI1VDE0OjMxOjM4KzAyOjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjMxM2YzZmUtNzNlNy00ZGNhLTg4MWQtNDcxZWNkNDdjZTk0IgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMy0wOS0yNVQxNDozMTo0MCswMjowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz7k7fOdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5wkZDB8oFmGk/gAAAGhJREFUWMPtzkENACEQBMEFlKBhrPBZKxhCzbggwcapuGQfXQqqrbVsZ2aUcc5pc05Jtuu0JPXMLHWKCNs9SqJFixYtWrRo0aJFixYtWrRo0aJFixYtWrRo0aJF6yfj3ivpvVfntPf+AEDiGAS+d7rLAAAAAElFTkSuQmCC') repeat 0 0;
  */
  
  
}


html{
    scroll-behavior: smooth !important;
}

</style>