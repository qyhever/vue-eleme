<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc border-1px">
					<v-star :size="36" :score="seller.score"></v-star>
					<span class="text">（{{seller.ratingCount}}）</span>
					<span class="text">月售{{seller.sellerCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<b class="stress">{{seller.minPrice}}元</b>
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<b class="stress">{{seller.deliveryPrice}}元</b>
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<b class="stress">{{seller.deliveryTime}}分钟</b>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import VStar from 'components/star/star';
export default {
	components: {VStar},
	props: {
		seller: {type: Object}
	},
	data() {
		return {

		};
	}
}
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin'
	.seller
		position: absolute
		top: 174px
		bottom: 0
		left: 0
		right: 0
		overflow: hidden
		.overview
			position: relative
			padding: 18px
			.title
				margin-bottom: 8px
				line-height: 14px
				color: rgb(7, 17, 27)
				font-size: 14px
			.desc
				padding-bottom: 18px
				border-1px(rgba(7, 17, 27, .2))
				font-size: 0
				.star
					display: inline-block
					margin-right: 8px
					vertical-align: top
				.text
					display: inline-block
					margin-right: 12px
					line-height: 18px
					font-size: 10px
					color: rgb(77, 85, 93)
			.remark
				display: flex
				padding-top: 18px
				.block
					flex: 1
					text-align: center
					border-right: 1px solid rgba(7, 17, 27, .1)
					&:last-of-type
						border: none
					h2
						margin-bottom: 4px
						line-height: 10px
						font-size: 10px
						color: rgb(147, 153, 159)
					.content
						line-height: 24px
						font-size: 10px
						color: rgb(7, 17, 27)
						.stress
							font-size: 24px
</style>