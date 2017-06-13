<template>
<div class="mains">
    <ul class="lists">
        <li class="info" v-for="item in dataLists" @click="selectHandle(item)">{{item.name}}</li>
    </ul>
    <!-- <router-link to="/">确定</router-link> -->
    <div class="tip">
        选中项：{{petIdData}}
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data(){
        return {
            dataLists:[],
        }
    },
    computed:mapState({
        petIdData: 'petIdData',
    }),
    created(){
        // this.axios.get(`/api/chart?selectValue=${this.selectValue}&timetype=${this.timetype}&time=${this.time}&type=3`).then((response)=> {
        //     if(response.data.error_no == 200){
        //         this.dataLists = arr;
        //     }
        // }).catch(function(e){
        //     console.log(e);
        // });
        let arr=[
            {id:2, name: '皇家'},
            {id:3, name: '泰迪'},
            {id:13, name: '阿拉斯加'},
        ];
        this.dataLists = arr;
    },
    watch:{
        petIdData(value){

        }
    },
    updated(){
        console.log(this.$store.state.petIdData.name ,333);
    },
    methods:{
        selectHandle(obj){
            this.$store.commit('petIdHandle', obj);
            this.$router.push({path: '/'});
        }
    }
}
</script>

<style lang="scss">
.mains{
    font-size:.24rem;
}
.lists {
    width: 90%;
    margin:0 auto;
    .info{
        background:#f4f8ff;
        margin:.2rem 0;
        padding:0 .2rem;
        box-sizing: border-box;
        line-height: .6rem;
    }
}
.tip{
    padding:.2rem;
    background:#f2f2f2;
}
</style>
