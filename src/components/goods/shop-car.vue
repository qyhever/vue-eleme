<template>
    <div class="shopcar">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrap">
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
    </div>
</template>
<script>
export default {
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
    	}
    },
    created() {
    	// console.info(this.deliveryPrice, this.minPrice)
    },
}
</script>
<style scoped lang="stylus">
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
				&.not-enough
					background: #2B333B
				&.enough
					background: #00b43c
					color: #fff
				.pay
					font-size: 12px
					font-weight: 700
</style>