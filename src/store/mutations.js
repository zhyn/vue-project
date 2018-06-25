import Vue from 'vue'
const mutations = {
    petIdHandle(state, obj){   //选择宠物品种
        for(var i in obj){
            Vue.set(state.petIdData, i, obj[i]);
        }
    },
	editOrderData(state, obj){
        for(var i in obj){
            Vue.set(state.orderData, i, obj[i]);
        }
    },
    setValue(state, obj){
        let types = Object.prototype.toString.call(state[obj.name])
        if( types === '[object Array]' ){
            state[obj.name].push(obj.val);
        }
        if(types === '[object Object]'){
            Vue.set(state, obj.name, obj.val);
        }
    },
    
}

export default mutations
