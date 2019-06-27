<template>
    <canvas ref="indexBackground" id="index-background"></canvas>
</template>
<script>
export default {
    mounted(){
        window.xl = this
        if(typeof window === 'object'){
            var c = this.$refs.indexBackground,
                x = c.getContext('2d'),
                w = window.innerWidth*3,
                h = window.innerHeight*2,
                f = 50,
                q,
                r = 0,
                u = Math.PI * 2,
                v = Math.cos,
                z = Math.random
                c.width = w
                c.height = h
                x.scale(1, 1)
                x.globalAlpha = 0.8;

            this.config = {
                c,x,w,h,f,q,r,u,v,z,
            }
            this.do()
        }
    },
    // watch:{
    //     $route(){
    //         this.do()
    //     }
    // },
    methods:{
        do(){
            let { x,w,h,f } = this.config;
            x.clearRect(0, 0, w, h)
            this.config.q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }]
            let q = this.config.q
            while (q[1].x < w + f) this.draw(q[0], q[1])
        },
        draw(i,j){
            let { x,u,v,z,f } = this.config;
            x.beginPath()
            x.moveTo(i.x, i.y)
            x.lineTo(j.x, j.y)
            var k = j.x + (z() * 2 - 0.25) * f,
            n = this.y(j.y)
            x.lineTo(k, n)
            x.closePath()
            this.config.r -= u / -50
            let r = this.config.r

            x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
            x.fill()

            this.config.q[0] = this.config.q[1]
            this.config.q[1] = { x: k, y: n }
        },
        y(p){
            let { z,f,h } = this.config;
            var t = p + (z() * 2 - 1.1) * f
            return (t > h || t < 0) ? this.y(p) : t
        }
    }

}
</script>
<style lang="stylus">
#index-background
    position absolute
    max-width 100%
    max-height calc(100vh - 60px)
    z-index 10
    left 0
    box-sizing border-box
    pointer-events: none
</style>
