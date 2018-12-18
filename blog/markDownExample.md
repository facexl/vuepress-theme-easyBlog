---
title: markdown示例
date: 2018/06/25
category: study
---

### markdown示例

!> 一段重要的内容

?> _TODO_ 完善示例

***
23453
***

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__


```javascript
 var queue = vm._hooks[hook];
    
      var step = function (index) {
        var hook = queue[index];
        if (index >= queue.length) {
          next(data);
        } else if (typeof hook === 'function') {
          if (hook.length === 2) {
            hook(data, function (result) {
              data = result;
              step(index + 1);
            });
          } else {
            var result = hook(data);
            data = result === undefined ? data : result;
            step(index + 1);
          }
        } else {
          step(index + 1);
        }
      };
```

\*this text is surrounded by literal asterisks\*

![这是张图片](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532669382451&di=128d5e2f36bd9899f1e840c43d8d14cc&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201412%2F12%2F20141212185006_vcMns.jpeg)

123
***
23453
* * *
~~asdasd~~
*a
*b
*c
1 哈哈
2 呵呵
3 嘻嘻
* a
* v
* c
### sdfsdf
~~~~SDfsdf~~~
asdjsoadljasdasjldasd
{% highlight javascript linenos %}
function xx(){
    let z = 1;
    console.log(z.split('.'))
    let x = new Object(a)
}
{% endhighlight %}
1. Item 1
  1. A corollary to the above item.
  2. Yet another point to consider.
2. Item 2
  * A corollary that does not need to be ordered.
    * This is indented four spaces, because it's two spaces further than the item above.
    * You might want to consider making a new list.
3. Item 3

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

* * *
***
*****

---
[markdown-syntax](http://daringfireball.net/projects/markdown/syntax)
*内容*
**内容**
_内容_
__内容__


| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

| Name | Description          |
| ------------- | ----------- |
| Help      | ~~Display the~~ help window.|
| Close     | _Closes_ a window     |

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |





| Function name | Description                    |
| ------------- | ------------------------------ |
| `help()`      | Display the help window.       |
| `destroy()`   | **Destroy your computer!**     |



| Function name | Description                    |Description                    |
| ------------- | ------------------------------ |------------------------------ |
| 1      | Display the help window.       |Display the help window.       |
| 2   | **Destroy your computer!**     |Display the help window.       |
| 2   | **Destroy your computer!**     |Display the help window.       |
| 2   | **Destroy your computer!**     |Display the help window.       |
| 2   | **Destroy your computer!**     |Display the help window.       |





