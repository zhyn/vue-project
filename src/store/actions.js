import axios from 'axios'
const actions = {
    baseData(context, str){
        console.log('获得基础数据!参数：', str)
    },
    getData({ dispatch, commit }, str){
        return dispatch('baseData', str).then(()=>{
            console.log('基础数据back');
        })
    },
    getBaseData(context){
    	axios.get(`/bridge/baseData`,).then((response)=> { //配置信息
            if(response.data.code === 0 || response.data.error_no == 0){
                
                // context.commit('')
            }
        }).catch(function(e){
            console.log('h5_default_info'+ e);
        });
    }
}
export default actions
