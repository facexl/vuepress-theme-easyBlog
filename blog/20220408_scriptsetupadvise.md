---
title: 关于 vue3 改成 script setup 的写法  
category: study  
---

## 关于 vue3 改成 script setup 的写法    

`script setup` 让 vue3 项目代码更加简洁了，于是准备把以前的代码重构一下，发现一个小毛病。原来的 `reactive` 结合`toRefs`解构做法不好用了。  

```javascript
// 形如这种代码：
<script>
import { reactive,toRefs } from 'vue';
export default {
  setup () {
    const state = reactive({
      loading: false,
    })
  }
  return {
      ...toRefs(state),
  }
}
</script>  
// 这样写的好处是操作数据可以 state.loading = true,而不需要 loading.value。加字段也很方便  

// 改成script setup
// 这种情况确实简洁了，但是随着字段增加 会越来越麻烦  
<script setup>
import { ref } from 'vue'
const loading = ref(false)
</script>
```

### 可能的改进方式  

其实`setup`是一种语法糖，编译阶段会处理成标准代码，查阅`vue`源码的`compileScript`文件，发现已经有了4种编译器宏  
```javascript
// Special compiler macros
const DEFINE_PROPS = 'defineProps'
const DEFINE_EMITS = 'defineEmits'
const DEFINE_EXPOSE = 'defineExpose'
const WITH_DEFAULTS = 'withDefaults'
```
设想可否加一种 比如就叫 `defineReactive`,形如下面的代码:  

```javascript
<script setup>
import { reactive } from 'vue'
const state = defineReactive({
    foo:'',
    bar:''
})
</script>
// after compile:
<script setup>
import { reactive,toRefs } from 'vue'
const state = reactive({
    foo:'',
    bar:''
})
const { foo,bar } = toRefs(state)
</script>
```
接下来我尝试写个这个  