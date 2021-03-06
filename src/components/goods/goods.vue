<template>
	<div>
	    <div class="goods">
			<div class="menu-wrap" ref="menu-wrap">
				<ul>
					<li class="menu-item" :class="{'current': currentIndex === index}" v-for="(item, index) in goods" :key="index" @click="selectMenu(index, $event)">
						<span class="text border-1px">
							<span class="icon" :class="classMap[item.type]" v-show="item.type > 0"></span>
							{{item.name}}
						</span>
					</li>
				</ul>
			</div>

			<div class="foods-wrap" ref="foods-wrap">
				<ul>
					<li class="food-list food-list-hook" v-for="(item,index) in goods" :key="index">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li class="food-item" @click="selectFood(food, $event)" v-for="(food, index) in item.foods" :key="index">
								<div class="icon">
									<img :src="food.icon" alt="" width="57" height="57">
								</div>
								<div class="content">
									<h1 class="name">{{food.name}}</h1>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span>
										<span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span>
										<s class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</s>
									</div>
									<div class="car-control-wrap">
										<!-- 数量组件 -->
										<car-control :food="food"></car-control>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<!-- 购物车组件 -->
			<shop-car :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shop-car>
	    </div>
		
		<!-- 商品详情组件 -->
	    <food :food="selectedFood" ref="food"></food>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import ShopCar from 'components/shopcar/shop-car';
import CarControl from 'components/carcontrol/car-control';
import food from 'components/food/food';
export default {
	components: { ShopCar, CarControl, food },
	props: {
		seller: {
			type: Object,
			required: true
		}
	},
    data() {
        return {
        	goods: [],
        	classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        	listHeight: [], // 存放高度
        	scrollY: 0,
        	selectedFood: {}
        };
    },
	created() {
		this.getGoods();
	},
	computed: {
		currentIndex() {
			for (let i = 0; i < this.listHeight.length; i++) {
				let curHeight = this.listHeight[i];
				let nextHeight = this.listHeight[i + 1];
				if ( !nextHeight || (this.scrollY >= curHeight && this.scrollY < nextHeight) ) {
					return i;
				}
			}
			return 0;
		},
		selectFoods() {
			let foods = [];
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if (food.count) {
						foods.push(food);
					}
				});
			});
				return foods;
		}
	},
	methods: {
		getGoods() {
			const url = '/api/goods';
			this.$axios.get(url).then((response) => {
				let data = response.data;
				if (data.status === 1) {
					this.goods = data.data;
					// console.info('this.goods', this.goods);
					this.$nextTick(() => {
						this.initScroll();
						this.calcHeight();
					});
				}
			});
		},
		initScroll() {
			this.menuScroll = new BScroll(this.$refs['menu-wrap'], {
				click: true
			});

			this.foodsScroll = new BScroll(this.$refs['foods-wrap'], {
				probeType: 3, // 表示BScroll监听滚动
				click: true
			});
			this.foodsScroll.on('scroll', (pos) => {
				this.scrollY = Math.abs(Math.round(pos.y));
			});
		},
		calcHeight() {
			let foodList = this.$refs['foods-wrap'].querySelectorAll('.food-list-hook');
			let height = 0;
			this.listHeight.push(height);
			for (let i = 0; i < foodList.length; i++) {
				let item = foodList[i];
				height += item.clientHeight; // 得到每个元素的高度
				this.listHeight.push(height); // 放到数组中保存
			}
		},
		selectMenu(index, event) {
			// console.info(index);
			// console.info(event);
			if(!event._constructed){ // pc端，直接return，不然会触发两次
				return;
			}
			let foodList = this.$refs['foods-wrap'].querySelectorAll('.food-list-hook');
			let el = foodList[index];
			this.foodsScroll.scrollToElement(el, 300);
		},
		selectFood(food, event) {
			if(!event._constructed){
				return;
			}
			this.selectedFood = food;
			this.$refs.food.show();
		}
	}
}
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin';
	.goods
		display: flex
		position: absolute
		top: 174px
		bottom: 46px
		width: 100%
		overflow: hidden
		.menu-wrap
			flex: 0 0 80px
			width: 80px // 兼容android
			background: #f3f5f7
			.menu-item
				display: table
				width: 56px
				padding: 0 14px;
				height: 54px
				line-height: 14px
				&.current
					z-index: 10
					position: relative
					margin-top: -1px
					background: #fff
					font-weight: 700
				.icon
					display: inline-block
					vertical-align: top
					width: 12px
					height: 12px
					margin-right: 2px
					background-size: 12px 12px
					background-repeat: no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
				.text
					display: table-cell
					width: 56px
					vertical-align: middle
					border-1px(rgba(7,17,27,.1))
					font-size: 12px
		.foods-wrap
			flex: 1
			.title
				padding-left: 14px
				height: 26px
				border-left: 2px solid #d9dde1
				line-height: 26px
				font-size: 12px
				color: rgb(147,153,159)
				background: #f3f4f7
			.food-item
				display: flex
				margin: 18px
				padding-bottom: 18px
				&:not(:last-of-type)
					border-1px(rgba(7,17,27,.1))
				&:last-of-type
					margin-bottom: 0
				.icon
					flex: 0 0 57px
					margin-right: 10px
					img
						border-radius: 2px
				.content
					flex: 1
					.name
						height: 14px
						margin: 2px 0 8px 0
						line-height: 14px
						font-size: 14px
						color: rgb(7,17,27)
					.desc, .extra
						line-height: 10px
						font-size: 10px
						color: rgb(147,153,159)
					.desc
						margin-bottom: 8px
						
					.extra
						.count
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
					.car-control-wrap
						position: absolute
						right: 0
						bottom: 12px
</style>