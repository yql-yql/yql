let baseUrl = ""
// console.log(process.env);
// if(process.env.NODE_ENV === 'development'){
//     // 开发环境
// 	console.log('开发环境');
//     baseUrl = '/api';
// }else{
//    if (NODE_ENV === 'test') {
//    		//测试环境
//    		console.log('测试环境');
// 		baseUrl = 'http://192.168.56.1:3000'
//    	}else{
//    		//生产环境
//    		console.log('生产环境');
// 		baseUrl = 'http://localhost:3000'
//    	}
// }
/* #ifdef MP-WEIXIN || APP-PLUS */
baseUrl = 'http://192.168.56.1:3000'
/* #endif */
/* #ifdef H5*/
baseUrl = '/api'
/* #endif */
export default baseUrl