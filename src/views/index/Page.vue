<template>
	<div>
		<div class="add-pet" @click="addHandle">添加宠物</div>
		<div class="line">{{message}}</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			message: 'hello',
		}
	},
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
.line{
	width:80%;
	margin:0 auto;
	background:#eee;
	padding: .2rem;
}
</style>