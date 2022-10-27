(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/found/swiperTop"],{"44ac":function(n,t,e){"use strict";e.r(t);var a=e("5eea"),c=e.n(a);for(var u in a)"default"!==u&&function(n){e.d(t,n,(function(){return a[n]}))}(u);t["default"]=c.a},"4d2c":function(n,t,e){"use strict";e.r(t);var a=e("9a4e"),c=e("44ac");for(var u in c)"default"!==u&&function(n){e.d(t,n,(function(){return c[n]}))}(u);e("b92a");var r,o=e("f0c5"),i=Object(o["a"])(c["default"],a["b"],a["c"],!1,null,"ca2ec4cc",null,!1,a["a"],r);t["default"]=i.exports},"5eea":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=e("09f5"),c={data:function(){return{interval:2e3,duration:500,images:[]}},methods:{_getBanners:function(){var n=this;(0,a.getBanners)().then((function(t){200===t.data.code&&(n.images=t.data.banners)})).catch((function(n){console.log("出错啦")}))}},mounted:function(){this._getBanners()}};t.default=c},"9a4e":function(n,t,e){"use strict";var a;e.d(t,"b",(function(){return c})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return a}));var c=function(){var n=this,t=n.$createElement;n._self._c},u=[]},b92a:function(n,t,e){"use strict";var a=e("ebba"),c=e.n(a);c.a},ebba:function(n,t,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/found/swiperTop-create-component',
    {
        'components/found/swiperTop-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4d2c"))
        })
    },
    [['components/found/swiperTop-create-component']]
]);
