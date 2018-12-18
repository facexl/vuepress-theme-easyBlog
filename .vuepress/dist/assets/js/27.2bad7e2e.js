(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{171:function(t,a,s){"use strict";s.r(a);var n=s(5),e=Object(n.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h3",{attrs:{id:"docker"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker","aria-hidden":"true"}},[t._v("#")]),t._v(" docker")]),t._v(" "),s("h5",{attrs:{id:"_1-docker是什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-docker是什么","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.docker是什么")]),t._v(" "),s("p",[t._v("要了解docker首先要知道Linux的一种虚拟化技术："),s("code",[t._v("Linux 容器（Linux Containers，缩写为 LXC）")]),t._v("。,Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离。或者说，在正常进程的外面套了一个保护层。对于容器里面的进程来说，它接触到的各种资源都是虚拟的，从而实现与底层系统的隔离。\n"),s("code",[t._v("docker属于 Linux 容器的一种封装，提供简单易用的容器使用接口")])]),t._v(" "),s("h5",{attrs:{id:"_2-image"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-image","aria-hidden":"true"}},[t._v("#")]),t._v(" 2.image")]),t._v(" "),s("p",[s("code",[t._v("image")]),t._v("就是"),s("code",[t._v("Docker")]),t._v("的容器模板，只有通过"),s("code",[t._v("image")]),t._v("才能生产"),s("code",[t._v("docker")]),t._v("容器。")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("\ndocker image "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ls")]),t._v(" //列出本机所有image文件\n\ndocker image "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("imageName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" //删除image\n\n")])])]),s("h5",{attrs:{id:"_3-docker-run-🌰"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-docker-run-🌰","aria-hidden":"true"}},[t._v("#")]),t._v(" 3.docker run 🌰")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("\ndocker pull nginx\n\ndocker run "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("p "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("d nginx "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -p端口映射，让docker容器的80端口映射到本地8080端口，-d是允许程序直接返回(即把这个container作为守护进程执行)  访问locahost:8080可以看到nginx的首页")]),t._v("\n\ndocker ps "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//可以看到正在运行的container")]),t._v("\ndocker ps "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//可以看到所有的container（包括已关闭）")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//事先编写一个index.html")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//docker cp用与在Host和contaier之间拷贝文件")]),t._v("\ndocker cp index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("html "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("790")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("d34f7885f")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("容器id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("usr"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("share"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nginx"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("html "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//再次访问locahost:8080可以看到index.html已经修改(cp=拷贝)")]),t._v("\n\ndocker stop "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("790")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("d34f7885f")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("容器id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//停止该container的运行")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//这个时候再次")]),t._v("\n\ndocker run "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("p "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("d nginx "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//会发现还是Nginx的首页，因为docker在容器内做的改动都是暂时的 要想保存原来的index.html 可以如下操作")]),t._v("\n\ndocker cp index"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("html  "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("198")]),t._v("f43ae56bf"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("usr"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("share"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("nginx"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("html  \ndocker commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("m "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("198")]),t._v("f43ae56bf nginx"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("test "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//事实上会产生一个新的叫做nginx-test的imgae")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//下次")]),t._v("\ndocker run "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("p "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8080")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("d nginx"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("test "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//即可以访问编写的Index.html")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//删除Image")]),t._v("\ndocker rmi "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("ImageId"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//删除container")]),t._v("\ndocker rm "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("ContainerId"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n")])])]),s("h5",{attrs:{id:"_4-dockerfile文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-dockerfile文件","aria-hidden":"true"}},[t._v("#")]),t._v(" 4.Dockerfile文件")]),t._v(" "),s("p",[t._v("先编写"),s("code",[t._v(".dockerignore")]),t._v("忽略一些不需要打包进"),s("code",[t._v("image")]),t._v("的文件")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("\n.git\nnode_modules\nnpm-debug.log\n\n")])])]),s("p",[t._v("新建文件"),s("code",[t._v("Dockerfile")]),t._v(",编写")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("\nFROM node:8.4\nCOPY "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v(".")]),t._v(" /app\nWORKDIR /app\nRUN "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" --registry"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("https://registry.npm.taobao.org\nEXPOSE 3000\n\n")])])]),s("ul",[s("li",[t._v("FROM node:8.4：该 image 文件继承官方的 node image，冒号表示标签，这里标签是8.4，即8.4版本的 node。")]),t._v(" "),s("li",[t._v("COPY . /app：将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入 image 文件的/app目录。")]),t._v(" "),s("li",[t._v("WORKDIR /app：指定接下来的工作路径为/app。")]),t._v(" "),s("li",[t._v("RUN npm install：在/app目录下，运行npm install命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件。")]),t._v(" "),s("li",[t._v("EXPOSE 3000：将容器 3000 端口暴露出来， 允许外部连接这个端口。")])])])},[],!1,null,null,null);e.options.__file="useDocker.md";a.default=e.exports}}]);