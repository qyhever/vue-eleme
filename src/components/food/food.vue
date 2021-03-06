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

				<split v-show="food.info"></split>

				<div class="rating">
					<h1 class="title">商品评价</h1>
					<rating-select
						:select-type="selectType"
						:only-content="onlyContent"
						:desc="desc"
						:ratings="food.ratings"
						@selectType="acceptType"
						@onlyContent="acceptOnlyContent">
					</rating-select>

					<div class="rating-wrap">
						<ul v-show="food.ratings && food.ratings.length">
							<li class="rating-item border-1px"
							v-show="needShow(rating.reteType, rating.text)"
							v-for="(rating, index) in food.ratings" :key="index">
								<div class="user">
									<div class="name">{{rating.username}}</div>
									<img class="avatar" :src="rating.avatar" width="12" height="12" alt="">
								</div>
								<div class="time">{{rating.rateTime | datefmt('YYYY-MM-DD HH:mm:ss')}}</div>
								<p class="text">
									<span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || food.ratings.length">
							暂无评价
						</div>
					</div>
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
import RatingSelect from 'components/ratingselect/rating-select';

const POSITIVE = 0; // 好评
const NEGATIVE = 1; // 吐槽
const ALL = 2;
export default {
	components: { CarControl, split, RatingSelect },
	props: {
		food: { type: Object }
	},
    data() {
        return {
        	showFlag: false,
        	selectType: ALL,
        	onlyContent: true,
        	desc: {
        		all: '全部',
        		positive: '推荐',
        		negative: '吐槽'
        	}
        };
    },
    methods: {
    	show() {
    		this.showFlag = true;
    		this.selectType = ALL;
    		this.onlyContent = true;
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
    		if (this.selectType === ALL) {
    			return true;
    		} else {
    			return type === this.selectType;
    		}
    	}
    },
    events: {
    	acceptType(type) {
    		this.selectType = type;
    		this.$nextTick(() => {
    			this.scroll.refresh();
    		});
    	},
    	acceptOnlyContent(onlyContent) {
    		this.onlyContent = onlyContent;
    		this.$nextTick(() => {
    			this.scroll.refresh();
    		});
    	}
    }
}
</script>
<style scoped lang="stylus">
@import '../../common/stylus/mixin'
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
		.rating
			padding-top: 18px
			.title
				line-height: 14px
				margin-left: 18px
				font-size: 14px
				color: rgb(7,17,27)
			.rating-wrap
				padding: 0 18px
				.rating-item
					position: relative
					padding: 16px 0
					border-1px(bottom, rgba(7, 17, 27, .1))
					.user
						position: absolute
						right: 0
						top: 16px
						line-height: 12px
						font-size: 0
						.name
							display: inline-block
							vertical-align: top
							margin-right: 6px
							font-size: 10px
							color: rgb(147, 153, 160)
						.avatar
							border-radius: 50%
					.time
						margin-bottom: 6px
						line-height: 12px
						font-size: 10px
						color: rgb(147, 153, 160)
					.text
						line-height: 16px
						font-size: 12px
						color: rgb(7, 17, 27)
						.icon-thumb_up, .icon-thumb_down
							margin-right: 4px
							line-height: 24px
							font-size: 12px
						.icon-thumb_up
							color: rgb(0, 160, 220)	
						.icon-thumb_down
							color: rgb(7, 17, 27)
				.no-rating
					padding: 16px 0
					font-size: 12px
					color: rgb(147, 153, 160)
</style>