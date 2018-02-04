<template>
	<div class="ratings" ref="ratings">
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
			<!-- 评论选择组件 -->
			<rating-select
				:select-type="selectType"
				:only-content="onlyContent"
				:desc="desc"
				:ratings="ratings"
				@selectType="acceptType"
				@onlyContent="acceptOnlyContent">
			</rating-select>
			<div class="rating-wrap">
				<ul>
					<li class="rating-item" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrap">
								<v-star class="star" :size="24" :score="rating.score"></v-star>
								<span class="delivery" v-show="rating.deliverTime">{{rating.deliverTime}}</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="icon-thumb_up"></span>
								<span class="item" v-for="(item, index) in rating.recommend" :key="index">
									{{item}}
								</span>
							</div>
							<div class="time">{{rating.rateTime | datefmt('YYYY-MM-DD HH:mm:ss')}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import VStar from 'components/star/star';
import split from 'components/split/split';
import RatingSelect from 'components/ratingselect/rating-select';

const POSITIVE = 0; // 好评
const NEGATIVE = 1; // 吐槽
const ALL = 2;
export default {
	components: {VStar, split, RatingSelect},
	props: {
		seller: {type: Object}
	},
	data() {
		return {
			ratings: [],
			showFlag: false,
        	selectType: ALL,
        	onlyContent: true,
        	desc: {
        		all: '全部',
        		positive: '满意',
        		negative: '不满意'
        	}
		};
	},
	created() {
		this.getRatings();
	},
	methods: {
		getRatings() {
			const url = '/api/ratings';
			this.$axios.get(url).then(response => {
				let data = response.data;
				if (data.status === 1) {
					this.ratings = data.data;
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.ratings, {
							click: true
						});
					});
				}
			});
		},
		acceptType(data) {
    		this.selectType = data;
    	},
    	acceptOnlyContent(data) {
    		this.onlyContent = data;
    	},
		needShow(type, text) {
			if (this.onlyContent && !text) {
				return false;
			}
			if (this.selectType == ALL) {
				return true;
			} else {
				return type === this.selectType;
			}
		}
	}
}
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin'
	.ratings
		position: absolute
		top: 174px
		bottom: 0
		left: 0
		right: 0
		overflow: hidden
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
		.rating-wrap
			padding: 0 18px
			.rating-item
				display: flex
				padding: 18px 0
				border-1px(rgba(7, 17, 27, .2))
				.avatar
					flex: 0 0 28px
					width: 28px
					margin-right: 12px
					img
						border-radius: 50%
				.content
					position: relative
					flex: 1
					.name
						margin-bottom: 4px
						line-height: 12px
						font-size: 10px
						color: rgb(7, 17, 27)
					.star-wrap
						margin-bottom: 6px
						font-size: 0
						.star
							display: inline-block
							margin-right: 6px
							vertical-align: middle
						.delivery
							display: inline-block
							line-height: 12px
							font-size: 10px
							color: rgb(147, 153, 160)
					.text
						margin-bottom: 8px
						line-height: 18px
						color: rgb(7, 17, 27)
						font-size: 12px
					.recommend
						line-height: 16px
						font-size: 0
						.icon-thumb_up, .item
							display: inline-block
							margin: 0 8px 4px 0
							font-size: 9px
						.icon-thumb_up
							color: rgb(0, 160, 220)
						.item
							padding: 0 6px
							border: 1px solid rgba(7, 17, 27, .1)
							background: #fff
							color: rgb(147, 153, 160)
						.time
							position: absolute
							top: 0
							right: 0
							line-height: 12px
							font-size: 10px
							color: rgb(147, 153, 160)
</style>