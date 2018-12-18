---
title: canvas实现小球沿椭圆轨迹运动
date: 2018/08/08
category: practice
---

### canvas实现小球沿椭圆轨迹运动

###### 前言

最近在学习canvas，决定先掌握原生api，再去拥抱让人眼花缭乱的框架

###### 效果

希望实现小球以椭圆轨迹绕圆球运动

###### 分析

- 绘制椭圆
- 利用绘制顺序 达到运动过程被遮挡的效果

##### 代码

```javascript


(function(){



let cas = document.getElementById('canvas')
let ctx = cas.getContext('2d');
const deg = Math.PI/180

ctx.translate(220,100)


const params = {
    centerX:0, //中心点
    centerY:0,
    bigBallR:100,//大圆半径
    ovalLong:200,//椭圆长轴
    ovalShort:50,//椭圆短轴
    smallBallR:20,//小球半径
}


/**
 * 下半圆
 */
const drowBallBottom = ()=>{
    ctx.beginPath();
    ctx.arc(params.centerX, params.centerY, params.bigBallR,0,Math.PI);
    ctx.fillStyle = '#666'
    ctx.fill();
    ctx.closePath()
}

/**
 * 上半圆
 */
const drowBallTop = ()=>{
    ctx.beginPath();
    ctx.arc(params.centerX, params.centerY, params.bigBallR,Math.PI,Math.PI*2);
    ctx.fillStyle = '#666'
    ctx.fill();
    ctx.closePath();
}


/**
 * 上半椭圆
 * @param {*} ctx 
 * @param {*} x 中点x
 * @param {*} y 中点y
 * @param {*} a 长轴
 * @param {*} b 短轴
 */
const drawOvalTop = (context,x,y,a,b,rolateDeg)=>{

   //max是等于1除以长轴值a和b中的较大者
   //i每次循环增加1/max，表示度数的增加
   //这样可以使得每次循环所绘制的路径（弧线）接近1像素
   var step = (a > b) ? 1 / a : 1 / b;
   context.beginPath();
   context.rotate(rolateDeg)
   //context.moveTo(x + a, y); //从椭圆的右端点开始绘制
   for (var i = Math.PI; i < 2* Math.PI; i += step)
   {
       
      //参数方程为x = a * cos(i), y = b * sin(i)，
      //参数为i，表示度数（弧度）
      context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
 
   }
   context.strokeStyle = '#f00'
   context.stroke();
   context.rotate(-rolateDeg)

}

/**
 * 下半椭圆
 * @param {*} ctx 
 * @param {*} x 中点x
 * @param {*} y 中点y
 * @param {*} a 长轴
 * @param {*} b 短轴
 */
const drawOvalBottom = (context,x,y,a,b,rolateDeg)=>{

    //max是等于1除以长轴值a和b中的较大者
    //i每次循环增加1/max，表示度数的增加
    //这样可以使得每次循环所绘制的路径（弧线）接近1像素
    var step = (a > b) ? 1 / a : 1 / b;
    context.beginPath();

   // context.translate(-70,-70);
    context.rotate(rolateDeg)
    //context.moveTo(x + a, y); //从椭圆的右端点开始绘制
    for (var i = 0; i <  Math.PI; i += step)
    {
       //参数方程为x = a * cos(i), y = b * sin(i)，
       //参数为i，表示度数（弧度）
       context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    
    context.stroke();
    context.rotate(-rolateDeg)
    //context.translate(70,70);
 
 }


/**
 * 小球
 * @param {*} context 
 * @param {*} x 
 * @param {*} y 
 * @param {*} a 
 * @param {*} b 
 */
function drawSmallBall(context, x, y, a, b,flag,rolateDeg)
{
   //max是等于1除以长轴值a和b中的较大者
   //i每次循环增加1/max，表示度数的增加
   //这样可以使得每次循环所绘制的路径（弧线）接近1像素
   var step = (a > b) ? 1 / a : 1 / b;
   context.beginPath();
   
   context.rotate(rolateDeg)
   context.moveTo(x + a, y); //从椭圆的左端点开始绘制
//    for (var i = 0; i < 2 * Math.PI; i += step)
//    {
      let  i = flag
      //参数方程为x = a * cos(i), y = b * sin(i)，
      //参数为i，表示度数（弧度）
      ctx.arc(x + a * Math.cos(i), y + b * Math.sin(i), params.smallBallR,0,Math.PI*2);
      ctx.fillStyle = '#f00'
      ctx.fill();

      //console.log(flag)
      
   //}
   context.closePath();
   context.rotate(-rolateDeg)
   

};



const init = (flag)=>{

    console.log(flag)

    if(flag<Math.PI){
        ctx.clearRect(-220,-100,800,800)
        drowBallBottom()
        drawOvalBottom(ctx,params.centerX,params.centerY,params.ovalLong,params.ovalShort,10*flag*deg)
        drawOvalTop(ctx,params.centerX,params.centerY,params.ovalLong,params.ovalShort,10*flag*deg)
        drowBallTop()
        drawSmallBall(ctx,params.centerX,params.centerY,params.ovalLong,params.ovalShort,flag,10*flag*deg)
    }else{
        ctx.clearRect(-220,-100,800,800) 
        drawOvalTop(ctx,params.centerX,params.centerY,params.ovalLong,params.ovalShort,-10*(flag-2*Math.PI)*deg)
        drawSmallBall(ctx,params.centerX,params.centerY,params.ovalLong,params.ovalShort,flag,-10*(flag-2*Math.PI)*deg)
        drowBallBottom()
        drowBallTop()
        drawOvalBottom(ctx,params.centerX,params.centerY,params.ovalLong,params.ovalShort,-10*(flag-2*Math.PI)*deg)
    }

}

let flag = 0;
const step = 1 / 50 


setInterval(()=>{
    
    if(flag<2 * Math.PI){
        init(flag)
        flag+=step
    }else{
        flag = 0
        init(flag)
    }
},10)

// init(flag)


})()


```

#### demo
