import request from "./http"
import mock from  "@/mock"

class Apis {
    // 获取首页数据
    // json1811.ashx?v=1562741893374&c=NewIndexController&m=index
    // https://m.bestcake.com/json1811.ashx?v=1563189648009&c=NewIndexController&m=index
    getIndexData() {
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params: {
                "v": new Date().getTime(),
                "c": "NewIndexController",
                "m": "index"
            }
        });
    }

    getNsCakeCenter(){
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params: {
                "v": new Date().getTime(),
                "c": "NsCakeCenter",
                "m": "GetJdListNew"
            }
        });
    }
    getShowData(params){
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params
        });
    }

    login(data){
        
        return mock.get('/login',{params:data})
    }

    register(data){

        return mock.post('/register',{data})
    }
}
export default new Apis();