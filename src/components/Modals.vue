<!--
# 弹窗组件
例如：
import Modal from "../../components/Modals.vue";
<Modal :isShow="showTip" @cancleModal="cancleModal">
    <div class="modal-body">
        only test!
    </div>
</Modal>
-->
<template>
<div class="modal-wrap1" :class="{wrapshow: isShow}">
    <div class="modal-backdrop1"></div>
    <div class="modal-content1">
        <div class="modal-bodys">
            <slot>
                确定删除吗？
            </slot>
        </div>
        <div class="modal-foot-com">

        </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        isShow:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        suc(){
            this.$emit("success");
        },
        close(){
            this.$emit('cancleModal');
        }
    }
}
</script>

<style lang="scss">
.modal-wrap1{display: none;}
.modal-backdrop1{
    // display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index:50;
    background-color:rgba(255,255,255,0);
}
.modal-content1{
    position: absolute;
    z-index:55;
    top:20%;
    left:30%;
    width: 30%;
    max-height: 300px;
    background-color:rgba(0,0,0,.7);
    border-radius:2px;
    text-align: center;
    padding:20px 10px;
    font-size:20px;
    .modal-bodys{
        font-size:14px;
        color:#fff;
    }
    .modal-foot-com{

    }
}
.wrapshow{
    display: block;
}
</style>
