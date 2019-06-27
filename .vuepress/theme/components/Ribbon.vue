<template>
    <canvas ref="indexBackground" id="index-background"></canvas>
</template>
<script>
export default {
    mounted(){
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
                x.globalAlpha = 0.8
                function i() {
                    x.clearRect(0, 0, w, h)
                    q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }]
                    while (q[1].x < w + f) d(q[0], q[1])
                }
                function d(i, j) {
                    x.beginPath()
                    x.moveTo(i.x, i.y)
                    x.lineTo(j.x, j.y)
                    var k = j.x + (z() * 2 - 0.25) * f,
                    n = y(j.y)
                    x.lineTo(k, n)
                    x.closePath()
                    r -= u / -50
                    x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
                    x.fill()
                    q[0] = q[1]
                    q[1] = { x: k, y: n }
                }
                function y(p) {
                    var t = p + (z() * 2 - 1.1) * f
                    return (t > h || t < 0) ? y(p) : t
                }
                i()
        }
    },

}
</script>
<style lang="stylus">
#index-background
    position absolute
    max-width 100%
    max-height calc(100vh - 60px)
    z-index -1
    left 0
    background #fff
    box-sizing border-box
</style>
