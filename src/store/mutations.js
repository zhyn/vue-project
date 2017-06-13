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
    }
}

export default mutations
