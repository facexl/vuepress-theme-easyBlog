(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{175:function(t,e,a){"use strict";a.r(e);var _=a(5),v=Object(_.a)({},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h3",{attrs:{id:"js正则知识梳理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#js正则知识梳理","aria-hidden":"true"}},[t._v("#")]),t._v(" js正则知识梳理")]),t._v(" "),a("h5",{attrs:{id:"_1、元字符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、元字符","aria-hidden":"true"}},[t._v("#")]),t._v(" 1、元字符")]),t._v(" "),a("p",[t._v("即在正则表达式中有特殊含义的字符，使用前必须转义"),a("br"),t._v(" "),a("code",[t._v("* + ? $ ^ . | \\ ( ) {} [ ]")])]),t._v(" "),a("h5",{attrs:{id:"_2、类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、类","aria-hidden":"true"}},[t._v("#")]),t._v(" 2、类")]),t._v(" "),a("h6",{attrs:{id:"_2-1-普通类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-普通类","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.1 普通类")]),t._v(" "),a("p",[a("code",[t._v("[abc]")]),t._v(" 表示匹配a或b或c")]),t._v(" "),a("h6",{attrs:{id:"_2-2-反向类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-反向类","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.2 反向类")]),t._v(" "),a("p",[a("code",[t._v("[^abc]")]),t._v(" ^在前面则表示非a或者非b或者非c\n"),a("code",[t._v("[a^bc]")]),t._v(" ^不在前面 则失去特殊意义 表示 a或^或b或c")]),t._v(" "),a("h6",{attrs:{id:"_2-3-范围类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-范围类","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.3 范围类")]),t._v(" "),a("p",[a("code",[t._v("[a-z]")]),t._v(" 表示a-z的小写字母"),a("br"),t._v(" "),a("code",[t._v("[a-zA-Z]")]),t._v(" 表示a-z或A-Z的字母"),a("br"),t._v(" "),a("code",[t._v("[a-z1-5]")]),t._v("表示a-z或1-5的字符"),a("br"),t._v(" "),a("code",[t._v("[0-9-]")]),t._v('表示0-9或"-"')]),t._v(" "),a("h6",{attrs:{id:"_2-4-预定义类"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-预定义类","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.4 预定义类")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("预定义类")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("等价类")]),t._v(" "),a("th",{staticStyle:{"text-align":"right"}},[t._v("description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v(".")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("[^\\r\\n]")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("除换行和回车的所有字符")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("\\d")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("[0-9]")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}})]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("\\D")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("[^0-9]")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}})]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("\\s")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("[\\t\\n\\v\\f\\r]")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("所有的空白符(制表符、换行符、垂直制表符、换页符、回车符)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("\\S")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("[^\\t\\n\\v\\f\\r]")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("非空白符")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("\\w")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("[a-zA-Z_0-9]")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("单词字符（字母数字下划线）")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("\\W")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("[^a-zA-Z_0-9]")]),t._v(" "),a("td",{staticStyle:{"text-align":"right"}},[t._v("非单词字符")])])])]),t._v(" "),a("h5",{attrs:{id:"_3、边界"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、边界","aria-hidden":"true"}},[t._v("#")]),t._v(" 3、边界")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("边界")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("^")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("以xx开始（类中表示取反）")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("$")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("以xx结束")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("\\b")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("单词边界")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("\\B")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("非单词边界")])])])]),t._v(" "),a("h5",{attrs:{id:"_4、量词"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、量词","aria-hidden":"true"}},[t._v("#")]),t._v(" 4、量词")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("边界")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("?")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("出现0次或1次（最多一次）")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("+")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("出现一次或多次（至少一次）")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("*")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("出现0次或多次（任意次）")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("{n}")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("出现n次")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("{n,m}")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("出现n到m次")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("{n,}")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("至少出现n次")])])])]),t._v(" "),a("h5",{attrs:{id:"_5、贪婪模式与非贪婪模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5、贪婪模式与非贪婪模式","aria-hidden":"true"}},[t._v("#")]),t._v(" 5、贪婪模式与非贪婪模式")]),t._v(" "),a("p",[t._v("正则表达式会尽可能多的匹配直到匹配失败"),a("br"),t._v("\n举个🌰:"),a("br"),t._v(" "),a("code",[t._v("'123456789'.match(/\\d{3,6}/g)")]),t._v('=>"123456","789"'),a("br"),t._v("\n量词加?关闭贪婪模式:"),a("br"),t._v(" "),a("code",[t._v("'123456789'.match(/\\d{3,6}?/g)")]),t._v('=>"123","456","789"')]),t._v(" "),a("h5",{attrs:{id:"_6、-或"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6、-或","aria-hidden":"true"}},[t._v("#")]),t._v(" 6、| 或")]),t._v(" "),a("p",[a("code",[t._v("abc|def")]),t._v(' => "abc"或"def"'),a("br"),t._v(" "),a("code",[t._v("ab(c|d)ef")]),t._v(" => ab c或d ef")]),t._v(" "),a("h5",{attrs:{id:"_7、分组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7、分组","aria-hidden":"true"}},[t._v("#")]),t._v(" 7、分组")]),t._v(" "),a("p",[t._v("量词可作用于分组"),a("br"),t._v("\n举个🌰:"),a("br"),t._v(" "),a("code",[t._v("(123){3}")]),t._v("匹配出现了三次123"),a("br"),t._v(" "),a("code",[t._v("$")]),t._v("表示分组的变量 ("),a("code",[t._v("$&")]),t._v("可以表示匹配到的字符串)"),a("br"),t._v('\n"2017-11-20"替换为"20/11/2017":'),a("br"),t._v('\n"2017-11-20".replace('),a("code",[t._v("/(\\d{4})-(\\d{2})-(\\d{2})/g")]),t._v(',"$3/$2/$1")'),a("br"),t._v("\n忽略分组 不需要捕获某些分组 只需在分组内加上?:"),a("br"),t._v('\n"2017-11-20".replace('),a("code",[t._v("/(?:\\d{4})-(\\d{2})-(\\d{2})/g")]),t._v(",\"$2/$1\")=>'20/10'")]),t._v(" "),a("h5",{attrs:{id:"_8、前瞻与后顾-或称先行断言-后行断言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8、前瞻与后顾-或称先行断言-后行断言","aria-hidden":"true"}},[t._v("#")]),t._v(" 8、前瞻与后顾(或称先行断言/后行断言)")]),t._v(" "),a("p",[t._v("?> 正则表达式从文本头部向尾部解析，文本尾部方向，称为‘前’，前瞻就是正则表达式匹配到符号规则的时候， 向前检查是否符合断言。后顾与前瞻方向相反。符合断言称为肯定/正向匹配，不符合断言称为否定/负向匹配(js不支持后顾) 在未来将发布es2018版本，js正则已经支持后顾了~而且现在的chrome64已经全面支持")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("类别")]),t._v(" "),a("th",{staticStyle:{"text-align":"center"}},[t._v("语法")])])]),t._v(" "),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("正向前瞻")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("reg(?=assert)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("负向前瞻")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("reg(?!assert)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("正向后顾")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("reg(?<=assert)")])]),t._v(" "),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("负向后顾")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("reg(?< !assert)")])])])]),t._v(" "),a("p",[t._v("举个🌰:"),a("br"),t._v("\n'a2b'.match("),a("code",[t._v("/[a-z](?=\\d)/g")]),t._v(") => 'a'"),a("br"),t._v("\n'a2b'.match("),a("code",[t._v("/[a-z](?!\\d)/g")]),t._v(") => 'b'")]),t._v(" "),a("h5",{attrs:{id:"_9、一些🌰"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_9、一些🌰","aria-hidden":"true"}},[t._v("#")]),t._v(" 9、一些🌰")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\\u4E00"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("\\u9FFF"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("$"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//匹配汉字开头")]),t._v("\n\n")])])])])},[],!1,null,null,null);v.options.__file="regExpCombing.md";e.default=v.exports}}]);