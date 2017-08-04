import axios from 'axios'
const actions = {
    baseData(context, str){
        console.log('获得基础数据!参数：', str)
    },
    getData({ dispatch, commit }, str){
        return dispatch('baseData', str).then(()=>{
            console.log('基础数据back');
        })
    }
}
export default actions
