<template>
    <div class="wrap">
        <div class="select-main">
            <router-link to="/petname" class="btn">选择宠物</router-link>
            <p class="text" v-if="petIdData.id">已选择宠物信息：{{petIdData.name}}</p>
        </div>
        <div class="name">
            <ul>
                <li>{{datas}}</li>
            </ul>
        </div>
        <p v-for="(item, index) in aFlow" :key="index">{{item}}</p>
        <button type="button" name="button" class="edit-btn" @click="edit">点击测试弹出</button>
        <Modal :isShow="showTip" @cancleModal="cancleModal">
            <div class="modal-body">
                {{tipText}}
            </div>
        </Modal>
    </div>
</template>


<script>
import '../../assets/base.css';
import Modal from "../../components/Modals.vue";
import {mapState, mapMutations, mapGetters, mapActions} from 'vuex';
export default {
    components:{Modal},
    data(){
        return {
            showTip: false,
            tipText: '',
        }
    },
    computed:{
        ...mapState({
            datas: 'orderData',
            petIdData: 'petIdData',
            aFlow: 'aFlow',
        }),
        ...mapGetters(['getPetId']),
        ...mapActions(['getData', 'getPetData']),
        ...mapMutations(['editOrderData','setValue']),
    },
    mounted(){
        let obj={
            name: 'Tom',
            age: 234,
        }
        this.$store.commit('editOrderData', obj);
        this.$store.dispatch('getData', {param:'1'}).then(()=>{
            console.log(3);
            this.$store.commit('setValue', {name: 'aFlow', val: '返回页面'})
        });
        this.$store.dispatch('getPetData').then(()=>{
            console.log('success');
        })
    },
    watch:{
        showTip(val){
            if(val){
                setTimeout(()=>{
                    this.showTip = false;
                    this.tipText = '';
                }, 2000)
            }
        }
    },
    methods:{
        cancleModal(){
            this.showTip = false;
        },
        edit(){
            this.showTip = true;
            this.tipText = '2秒后消失';
        }
    }
}
</script>

<style lang="scss">
.wrap{
    font-size:0.3rem;
}
.select-main{
    .btn{
        display: block;
        background:#f2f2f2;
        width: 90%;
        margin:0 auto;
        padding:.2rem;
        text-align: center;
    }
    .text{
        padding:.2rem 0;
        text-align: center;

    }
}
.edit-btn{
    background:#00b3d5;
    border:none;
    border-radius:4px;
    padding:.15rem .3rem;
    margin:.2rem;
    color:#fff;
}
</style>
