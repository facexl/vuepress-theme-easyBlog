(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{187:function(t,a,s){"use strict";s.r(a);var e=s(6),n=Object(e.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"一个特别的登录需求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一个特别的登录需求","aria-hidden":"true"}},[t._v("#")]),t._v(" 一个特别的登录需求")]),t._v(" "),s("h3",{attrs:{id:"场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#场景","aria-hidden":"true"}},[t._v("#")]),t._v(" 场景")]),t._v(" "),s("p",[t._v("使用"),s("code",[t._v("vue、vuex、vux、vue-router")]),t._v("搭建的移动端网站")]),t._v(" "),s("h3",{attrs:{id:"需求描述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#需求描述","aria-hidden":"true"}},[t._v("#")]),t._v(" 需求描述")]),t._v(" "),s("ul",[s("li",[t._v("登录为弹窗形式，不要跳页")]),t._v(" "),s("li",[t._v("检测到登录状态失效，当前页面直接需弹出登录框，登录完成后，页面重新渲染")])]),t._v(" "),s("p",[t._v("痛点：由于用了vuex状态管理，登录完成，直接刷新页面会导致vuex数据丢失，用户体验也很差，不可取。也不可能每个页面都去写登录的逻辑，这样开发体验不好")]),t._v(" "),s("h3",{attrs:{id:"实现过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现过程","aria-hidden":"true"}},[t._v("#")]),t._v(" 实现过程")]),t._v(" "),s("p",[t._v("1、先在App.vue塞一个写好的登录组件，子组件登录成功派发一个事件给父组件这里是"),s("code",[t._v("@logined")])]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Login")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@logined")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("refresh"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("Login")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("2、"),s("code",[t._v("store")]),t._v("里设置一个变量来控制"),s("code",[t._v("login")]),t._v("弹窗的显示还是隐藏。检查到未登录，改变这个字段即可"),s("br"),t._v("\n3、那么"),s("code",[t._v("refresh")]),t._v("怎么来实现呢")]),t._v(" "),s("ul",[s("li",[t._v("方案1：每个页面组件都包装一个调用所有接口并且渲染数据的"),s("code",[t._v("refresh")]),t._v("方法。检测到未登录时，改变"),s("code",[t._v("store")]),t._v("中控制显示登录框的字段同时存一个回调函数在"),s("code",[t._v("store")]),t._v("里面，"),s("code",[t._v("App.vue")]),t._v("的"),s("code",[t._v("refresh")]),t._v("调用"),s("code",[t._v("store")]),t._v("里存的回调。这样确实可以，但是每个页面组件都要写这种代码，开发体验不好且难维护")]),t._v(" "),s("li",[t._v("方案2：给"),s("code",[t._v("router-view")]),t._v("外面包裹一层"),s("code",[t._v("div")]),t._v("并给一个"),s("code",[t._v("key")])])]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("class")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("all-container"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":key")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("pageKey"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("router-view")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[s("code",[t._v("pageKey")]),t._v("存在"),s("code",[t._v("store")]),t._v("里面，"),s("code",[t._v("App.vue")]),t._v("的"),s("code",[t._v("refresh")]),t._v("方法写成")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("refresh")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'change key'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    store"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("pageKey"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("这样每次登陆成功后，"),s("code",[t._v("key")]),t._v("的值改变，迫使"),s("code",[t._v("diff")]),t._v("算法认为这是一个全新的组件，重新走一遍生命周期，达到我们"),s("code",[t._v("刷新")]),t._v("的目的")])])},[],!1,null,null,null);n.options.__file="20180726_login.md";a.default=n.exports}}]);