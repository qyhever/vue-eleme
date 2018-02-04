<template>
	<div class="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}</div>
				</div>
				<div class="overview-right">
					<div class="score-wrap">
						<span class="title">服务态度</span>
						<v-star :size="36" :score="seller.serviceScore"></v-star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrap">
						<span class="title">商品评分</span>
						<v-star class="star" :size="36" :score="seller.foodScore"></v-star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrap">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<!-- 分割组件 -->
			<split></split>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import VStar from 'components/star/star';
import split from 'components/split/split';
import RatingSelect from 'components/ratingselect/rating-select';
export default {
	components: {VStar, split, RatingSelect},
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
	.ratings
		position: absolute
		top: 174px
		bottom: 0
		left: 0
		right: 0
		.overview
			display: flex
			padding: 18px 0
			.overview-left
				flex: 0 0 137px
				border-right: 1px solid rgb(7, 17, 27)
				text-align: center
				 @media only screen and (max-width: 320px)
					flex: 0 0 120px
				.score
					margin-bottom: 6px
					line-height: 28px
					font-size: 24px
					color: rgb(255, 153, 0)
				.title
					margin-bottom: 8px
					line-height: 12px
					font-size: 12px
					color: rgb(7, 17, 27)
				.rank
					line-height: 10px
					font-size: 10px
					color: rgb(147, 153, 159)
			.overview-right
				flex: 1
				padding: 6px 0 6px 24px
				@media only screen and (max-width: 320px)
					padding-left: 6px
				.score-wrap
					margin-bottom: 8px
					font-size: 0
					.title
						display: inline-block
						line-height: 18px
						vertical-align: top
						font-size: 12px
					.star
						display: inline-block
						margin: 0 12px
						vertical-align: top
					.score
						display: inline-block
						line-height: 18px
						font-size: 12px
						color: rgb(255, 153, 0)
				.delivery-wrap
					font-size: 0
					.title
						line-height: 18px
						font-size: 12px
						color: rgb(7, 17, 27)
					.delivery
						margin-left: 12px
						font-size: 12px
						color: rgb(147, 153, 159)
</style>