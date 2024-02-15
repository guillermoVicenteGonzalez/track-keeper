import {createStore} from "vuex"
import VuexPersistence from "vuex-persist"

const store = createStore({
    state:{
        user:{
            id:undefined,
            token:undefined,
            name:undefined
        },
        unverified:{
            id:undefined,
            name:undefined,
            token:undefined
        }
    },

    getters:{
        getUser(state){
            return state.user
        },
        getUnverifiedUser(state){
            return state.unverified
        },
    },

    mutations:{
        setUser(state,payload){
            state.user.id = payload.id;
            state.user.name = payload.name;
            state.user.token = payload.token;
        },

        deleteUser(state){
            state.user.id = undefined;
            state.user.name = undefined;
            state.user.token = undefined;
        },

        setUnverifiedUser(state, payload){
            state.unverified.id = payload.id;
            state.unverified.name = payload.name;
            state.unverified.token = payload.token;            
        },

        deleteUnverifiedUser(state){
            state.unverified.id= undefined;
            state.unverified.name = undefined;
            state.unverified.token = undefined;
        },
    },
    plugins:[new VuexPersistence().plugin]
});

export default store