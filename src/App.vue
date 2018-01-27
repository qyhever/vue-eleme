<template>
    <div>
        <!-- header组件 -->
        <v-header :seller="seller"></v-header>
        <!-- tab栏 -->
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <!-- 占位（路由外链） -->
        <router-view :seller="seller" />
    </div>
</template>

<script>
    // import '@/common/stylus/mixin.styl';
    import VHeader from 'components/header/header.vue';
    export default {
        components: {
            VHeader
        },
        data() {
            return {
                seller: {}
            };
        },
        created() {
            this.getSeller();
        },
        methods: {
            getSeller() {
                const url = '/api/seller';
                this.$axios.get(url).then((response) => {
                    let data = response.data;
                    if(data.status === 1) {
                        this.seller = data.data;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="stylus">
@import './common/stylus/mixin.styl';
    .tab
        display: flex
        width: 100%
        height: 40px
        line-height: 40px
        border-1px(#eee)
        .tab-item
            flex: 1
            text-align: center
            & > a 
                display: block
                font-size: 14px
                color: rgb(77,85,93)
                &.active 
                    color: #e92322
</style>
