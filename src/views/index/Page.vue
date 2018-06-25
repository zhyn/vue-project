<template>
	<div class="add-pet" @click="addHandle">添加宠物</div>
</template>
<script>
export default {
	methods:{
		addHandle(){
			console.log('add click')
		}
	}
}
</script>
<style lang="scss">
.add-pet{
	width:80%;
	margin:0 auto;
	text-align:center;
	font-size:.3rem;
}
</style>