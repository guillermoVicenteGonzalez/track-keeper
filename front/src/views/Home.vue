<template>
    <NavBar
    v-bind="user"></NavBar>
    <v-container 
    fluid
    class="d-block fill-height  pt-0">

        <RouterView></RouterView>
    </v-container>

    <Modal ref="modal"></Modal>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
    import {onMounted, ref} from "vue"
    import {useStore} from "vuex"
    import axios from "axios"
    import apiConf from "../apiConf.json"
    import Modal from "@/components/Modal.vue";

    const store = useStore();
    var user = ref();
    var modal = ref();
    //user.value = store.getters.getUser

    async function getUserData(){
        let {id,token} = store.getters.getUser;
        let result = await axios.get(apiConf.host + apiConf.port + apiConf.users.getData + id,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            if(err.response){
                modal.value.createModal("Error","Authentication error",err.response.data.msg,true,'/')
            }else{
                modal.value.createModal("Error","Authentication error","An unexpected error ocurred","/")
            }
            store.commit('deleteUser')
            console.log(err);
            return undefined
        });

        if(result){
            let u = result.data.user;
            user.value = u;
        }
    }
    
    onMounted(()=>{
        getUserData()
    })

</script>