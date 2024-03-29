---
title: emoji 替换  
category: practice  
---  

## emoji 替换  

### 需求  

关于这个奇怪的需求：后台用户给自家商品添加评论的时候，会用到 emoji 表情，但是不希望在不同平台展示不一致(emoji版权问题)，评论还要支持移动端用户一键复制发朋友圈。

### 实践  

- 决定使用微信表情作为全平台统一展示样式  
- 后台评论由原来的纯文本+emoji 改为富文本(只额外支持插入图片，用于插入表情图)，保存时存两个字段，一个叫 content 储存富文本原文，一个叫 emoji_content 储存纯文本：
```javascript
    getEmojiContent(){
        const temp_content = this.content
            .replace(/<p>|<\/p>|<span>|<\/span>|<br>|<br \/>/g,'') // 去除文本标签
            .replace(/(<img[^>]*>)/g,(target)=>{
                const imgUrl = target.replace(/.* src="([^"]*)".*/,'$1')
                const item = emojiConfig.find(it=>it.value===imgUrl)
                return item?item.key:target
        })
        // 以下操作为了去除html特殊字符 比如 &nbsp，&hellip; 等等
        if(!el){
            el = document.createElement('div')
        }
        el.innerHTML = temp_content
        return el.innerText
    }
// eg:
{
    content:`<p>某猫正装50ml740元<br />找我下2️⃣单4️⃣瓶，共60ml<br />省下更多银子，不香吗<img src=\"https://xxx.com/3.0e53120262a3b-497.0157cbbe4f07\" width=\"20\" /></p>`,
    emoji_content:`某猫正装50ml740元 找我下2️⃣单4️⃣瓶，共60ml 省下更多银子，不香吗[让我看看]`
}
```
客户端展示使用富文本，一键复制就把`emoji_content`赋值给粘贴板，用户在粘贴到微信聊天或朋友圈会自动转换为表情

### 总结  

非常 `hack` ，仅作记录，不做推荐。