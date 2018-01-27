<template>
    <div class="shopcar">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrap">
					<div class="logo">
						<i class="icon-shopping_cart"></i>
					</div>
				</div>
				<div class="price">￥0</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}</div>
			</div>
			<div class="content-right">
				<p class="pay">
					￥{{minPrice}}元起送
				</p>
			</div>
		</div>
    </div>
</template>
<script>
export default {
	props: {
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
    created() {
    	// console.info(this.deliveryPrice, this.minPrice)
    }
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
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						background: #2b343c
						text-align: center
						.icon-shopping_cart
							font-size: 24px
							line-height: 44px
							color: #80858a
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
				background: #2B333B
				.pay
					font-size: 12px
					font-weight: 700
</style>