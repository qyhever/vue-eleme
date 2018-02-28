<template>
	<div>
	    <div class="shopcar">
			<div class="content">
				<div class="content-left">
					<div class="logo-wrap" @click="toggleList">
						<div class="logo" :class="{'high-light': totalCount > 0}">
							<i class="icon-shopping_cart" :class="{'high-light': totalCount > 0}"></i>
						</div>
						<div class="num" v-show="totalCount > 0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'high-light': totalPrice > 0}">￥{{totalPrice}}</div>
					<div class="desc">另需配送费￥{{deliveryPrice}}</div>
				</div>
				<div class="content-right" :class="payClass">
					<p class="pay">
						{{payDesc}}
					</p>
				</div>
			</div>

			<transition name="fold">
				<div class="shopcar-list" v-show="listShow">
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref="list-content">
						<ul>
							<li class="food" v-for="(food, index) in selectFoods" :key="index">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>￥{{food.price * food.count}}</span>
								</div>
								<div class="car-control-wrap">
									<!-- 输入数量组件 -->
									<car-control :food="food"></car-control>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
	    </div>

		<transition name="fade">
	    	<div class="list-mask" v-show="listShow" @click="hideList"></div>
	    </transition>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import CarControl from 'components/carcontrol/car-control';
export default {
	components: { CarControl },
	props: {
		selectFoods: {
			type: Array,
			default() {
				return [];
			},
			// required: true
		},
		deliveryPrice: {
			type: Number,
			default: 0,
			required: true
		},
		minPrice: {
			type: Number,
			default: 0,
			required: true
		}
	},
    data() {
        return {
        	fold: true // 是否折叠
        };
    },
    computed: {
    	totalPrice() {
    		let total = 0;
    		this.selectFoods.forEach((item) => {
    			total += item.price * item.count;
    		});
    		return total;
    	},
    	totalCount() {
    		let count = 0;
    		this.selectFoods.forEach((item) => {
    			count += item.count;
    		});
    		return count;
    	},
    	payDesc() {
    		if (this.totalPrice === 0) {
    			return `￥${this.minPrice}元起送`;
    		} else if (this.totalPrice < this.minPrice) {
    			let difference = this.minPrice - this.totalPrice;
    			return `还差￥${difference}元起送`;
    		} else {
    			return `去结算`;
    		}
    	},
    	payClass() {
    		// if (this.totalPrice < this.minPrice) {
    		// 	return 'not-enough';
    		// } else {
    		// 	return 'enough';
    		// }
    		return this.totalPrice < this.minPrice ? 'not-enough' : 'enough'; 
    	},
    	listShow() {
    		if (!this.totalCount) { // 如果没有商品，应该折叠，不显示
    			this.fold = true;
    			return false;
    		}
    		let show = !this.fold;
    		if (show) { // 展示列表的时候就初始化
    			this.$nextTick(() => {
    				if (!this.scroll) {
    					this.scroll = new BScroll(this.$refs['list-content'], {
	    					click: true
	    				});
    				} else {
    					this.scroll.refresh();
    				}
    			});
    		}
    		return show;
    	}

    },
    created() {
    	// console.info(this.deliveryPrice, this.minPrice)
    },
    methods: {
    	toggleList() {
    		if (!this.totalCount) { // 没有商品，直接退出
    			return;
    		}
    		this.fold = !this.fold;
    	},
    	empty() {
    		this.selectFoods.forEach((item) => {
    			item.count = 0; // 把每个商品的数量置为0
    		});
    	},
    	hideList() {
    		this.fold = true;
    	}
    }
}
</script>
<style scoped lang="stylus">
@import '../../common/stylus/mixin';
	.shopcar
		z-index: 50
		position: fixed
		left: 0
		bottom: 0
		width: 100%
		height: 48px
		.content
			display: flex
			background: #141d27
			color: rgba(255,255,255,.4)
			height: 100%
			.content-left
				flex: 1
				font-size: 0
				.logo-wrap
					display: inline-block
					box-sizing: border-box
					vertical-align: top
					position: relative
					top: -10px
					width: 56px
					height: 56px
					margin: 0 18px
					padding: 6px
					border-radius: 50%
					background: #141d27
					.num
						position: absolute
						top: 0
						right: 0
						width: 24px
						height: 16px
						border-radius: 16px
						background: #f00
						box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
						line-height: 16px
						text-align: center
						font-size: 9px
						font-weight: 700
						color: #fff
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						background: #2b343c
						text-align: center
						&.high-light
							background: rgb(0,160,220)
						.icon-shopping_cart
							font-size: 24px
							line-height: 44px
							color: #80858a
							&.high-light
								color: #fff
				.price
					display: inline-block
					box-sizing: border-box
					vertical-align: top
					margin-top: 12px
					padding-right: 12px
					border-right: 1px solid rgba(255,255,255,.1)
					line-height: 24px
					font-size: 16px
					font-weight: 700
					&.high-light
						color: #fff
				.desc
					display: inline-block
					vertical-align: top
					margin: 12px 0 0 12px
					line-height: 24px
					font-size: 10px
			.content-right
				flex: 0 0 105px
				display: flex
				justify-content: center
				align-items: center
				width: 105px
				height: 100%
				&.not-enough
					background: #2B333B
				&.enough
					background: #00b43c
					color: #fff
				.pay
					font-size: 12px
					font-weight: 700
		.shopcar-list
			z-index: -1 
			position: absolute
			top: 0
			left: 0
			width: 100%
			transition: all .5s
			transform: translate3d(0, -100%, 0)
			&.fold-enter, &.fold-leave-to
				transform: translate3d(0, 0, 0)
			.list-header
				height: 40px
				padding: 0 18px
				border-bottom: 1px solid rgba(7,17,27,.1)
				background: #f3f5f7
				line-height: 40px
				.title
					float: left
					font-size: 14px
					color: rgb(7,17,27)
				.empty
					float: right
					font-size: 12px
					color: rgb(0,160,220)
			.list-content
				max-height: 217px
				overflow: hidden
				padding: 0 18px
				background: #fff
				.food
					display: flex
					align-items: center
					box-sizing: border-box
					padding: 12px 0
					border-1px(rgba(7,17,27,.1))
					.name
						flex: 1
						font-size: 14px
						color: rgb(7,17,27)
					.price
						flex: 0 0 40px
						font-size: 14px
						font-weight: 700
						color: #e92322
						.car-control-wrap
							flex: 0 0 120px
	.list-mask
		z-index: 40
		position: fixed
		top: 0
		left: 0
		right: 0
		bottom: 0
		background: rgba(7,17,27,.6)
		transition: all .4s
		&.fade-enter, &.fade-leave-to
			opacity: 0
			background: rgba(7,17,27,0)
</style>