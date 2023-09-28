<template>
    <NavBar
    v-bind="user"></NavBar>


        <RouterView
        @reloadUser="getUserData">

        </RouterView>


    <LoadingModal
    @timeout="handleTimeout"
    v-model="loading"></LoadingModal>

    <Modal ref="modal"></Modal>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
    import {onMounted, ref} from "vue"
    import {useStore} from "vuex"
    import axios from "axios"
    import apiConf from "../apiConf.json"
    import Modal from "@/components/Modal.vue";
    import LoadingModal from "@/components/LoadingModal.vue";

    var loading = ref();
    const store = useStore();
    var user = ref();
    var modal = ref();
    //user.value = store.getters.getUser

    async function getUserData(){
        loading.value = true;
        let {id,token} = store.getters.getUser;
        let result = await axios.get(apiConf.host + apiConf.port + apiConf.users.getData + id,{
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .catch((err)=>{
            loading.value = false
            if(err.response){
                modal.value.createModal("Error","Authentication error",err.response.data.msg,true,'/')
            }else{
                modal.value.createModal("Error","Authentication error",true,"An unexpected error ocurred","/")
            }
            store.commit('deleteUser')
            console.log(err);
            return undefined
        });

        loading.value = false;
        if(result){
            let u = result.data.user;
            user.value = u;
        }
    }
    
    function handleTimeout(){
        modal.value.createModal("Error","Authentication error","An unexpected error ocurred",true,"/");
        loading.value = false;
    }

    getUserData();

    /*
    onMounted(()=>{
        getUserData()
    })*/

</script>