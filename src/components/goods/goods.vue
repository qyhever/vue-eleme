<template>
    <div class="goods">
		<div class="menu-wrap">
			<ul>
				<li class="menu-item" v-for="(item, index) in goods" :key="index">
					<span class="text border-1px">
						<span class="icon" :class="classMap[item.type]" v-show="item.type > 0"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>

		<div class="foods-wrap">
			<ul>
				<li class="food-list" v-for="(item,index) in goods" :key="index">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li class="food-item" v-for="(food, index) in item.foods" :key="index">
							<div class="icon">
								<img :src="food.icon" alt="">
							</div>
							<div class="content">
								<h1 class="name">{{food.name}}</h1>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span>￥{{food.price}}</span>
									<span v-show="food.oldPrice">{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
    </div>
</template>
<script>
export default {
	props: {
		seller: {
			type: Object,
			required: true
		}
	},
    data() {
        return {
        	goods: [],
        	classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        };
    },
	created() {
		this.getGoods();
	},
	methods: {
		getGoods() {
			const url = '/api/goods';
			this.$axios.get(url).then((response) => {
				let data = response.data;
				if (data.status === 1) {
					this.goods = data.data;
					// console.info('this.goods', this.goods);
				}
			});
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
				padding-left: 14px;
				height: 54px
				line-height: 14px
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
</style>