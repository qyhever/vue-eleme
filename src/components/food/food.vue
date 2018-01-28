<template>
	<transition name="move">
	    <div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="">
					<div class="back" @click="back">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<div class="title">{{food.name}}</div>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>

					<div class="car-cartrol-wrap">
						<!-- 数量组件 -->
						<car-control :food="food"></car-control>
					</div>
					<div class="buy" @click.stop="addFirst" v-show="!food.count || food.count===0">加入购物车</div>
				</div>
			
				<split v-show="food.info"></split>

				<div class="info">
					<div class="title" v-show="food.info">商品信息</div>
					<p class="text">{{food.info}}</p>
				</div>
			</div>
	    </div>
    </transition>
</template>
<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import CarControl from 'components/carcontrol/car-control';
import split from 'components/split/split';
export default {
	components: { CarControl, split },
	props: {
		food: { type: Object }
	},
    data() {
        return {
        	showFlag: false
        };
    },
    methods: {
    	show() {
    		this.showFlag = true;
    		this.$nextTick(() => {
    			if (!this.scroll) {
    				this.scroll = new BScroll(this.$refs.food, {
    					click: true
    				});
    			} else {
    				this.scroll.refresh();
    			}
    		});
    	},
    	back() {
    		this.showFlag = false;
    	},
    	addFirst(event) {
    		if(!event._constructed) {
    			return;
    		}
    		Vue.set(this.food, 'count', 1);
    	}
    }
}
</script>
<style scoped lang="stylus">
	.food
		z-index: 30
		position: fixed
		top: 0
		left: 0
		bottom: 48px
		width: 100%
		background: #fff
		overflow: hidden
		transform: translate3d(0,0,0)
		transition: all .2s linear
		&.move-enter, &.move-leave-to
			transform: translate3d(100%,0,0)
		.image-header
			position: relative
			width: 100%
			height: 0
			padding-top: 100%
			img
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
			.back
				position: absolute
				top: 10px
				left: 0
				.icon-arrow_lift
					display: block
					padding: 10px
					font-size: 20px
					color: #fff
		.content
			position: relative
			padding: 18px
			.title
				margin-bottom: 8px
				line-height: 14px
				font-size: 14px
				font-weight: 700
				color: rgb(7,17,27)
			.detail
				margin: 10px 0 16px
				line-height: 10px
				font-size: 0
				.sell-count, .rating
					font-size: 10px
					color: rgb(147,153,159)
				.sell-count
					margin-right: 12px
			.price
				font-weight: 700
				line-height: 24px
				.now
					margin-right: 8px
					font-size: 14px
					color: #e92322
				.old
					font-size: 10px
					color: rgb(147,153,159)
			.car-cartrol-wrap
				position: absolute
				right: 12px
				bottom: 12px
			.buy
				z-index: 10
				box-sizing: border-box
				position: absolute
				right: 18px
				bottom: 18px
				height: 24px
				border-radius: 12px
				background: rgb(0,160,220)
				line-height: 24px
				padding: 0 12px
				font-size: 10px
				color: #fff
		.info
			padding: 18px
			.title
				line-height: 14px
				margin-bottom: 16px
				font-size: 14px
				color: rgb(7,17,27)
			.text
				line-height: 24px
				padding: 0 8px
				font-size: 12px
				color: rgb(77,85,93)
</style>