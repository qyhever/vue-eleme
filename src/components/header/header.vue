<template>
    <div class="header">
    	<!-- 头部上部内容 -->
        <div class="content-wrap">
        	<div class="avatar">
        		<img :src="seller.avatar" width="64" height="64">
        	</div>
        	<div class="content">
        		<div class="title">
        			<span class="brand"></span>
        			<span class="name">{{seller.name}}</span>
        		</div>
        		<div class="description">
        			{{seller.description}}/{{seller.deliveryTime}}分钟送达
        		</div>
        		<div class="support" v-if="seller.supports">
        			<span class="icon" :class="classMap[ seller.supports[0].type ]"></span>
        			<span class="text">{{seller.supports[0].description}}</span>
        		</div>
        	</div>
        	<div class="support-count" v-if="seller.supports" @click="showDetail">
        		<span class="count">{{seller.supports.length}}个</span>
        		<i class="icon-keyboard_arrow_right"></i>
        	</div>
        </div>
        <!-- 头部底部公告 -->
        <div class="bulletin-wrap" @click="showDetail">
        	<span class="bulletin-title"></span>
        	<span class="bulletin-text">{{seller.bulletin}}</span>
        	<i class="icon-keyboard_arrow_right"></i>
        </div>
        <!-- 头部背景图片 -->
        <div class="background">
        	<img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <!-- 详情页遮罩 -->
        <transition name="fade">
        	<div class="detail" v-show="detailShow">
	        	<div class="detail-wrap clearfix">
	        		<div class="detail-main">
	        			<h1 class="name">{{seller.name}}</h1>
	        			<div class="star-wrap">
	        				<!-- 使用star组件 -->
	        				<v-star :size="48" :score="seller.score"></v-star>
	        			</div>
	        			<div class="title">
	        				<div class="line"></div>
	        				<div class="text">优惠信息</div>
	        				<div class="line"></div>
	        			</div>
	        			<ul class="supports" v-if="seller.supports">
	        				<li class="support-item" v-for="(item, index) in seller.supports" :key="index">
	        					<span class="icon" :class="classMap[seller.supports[index].type]"></span>
	        					<span class="text">{{seller.supports[index].description}}</span>
	        				</li>
	        			</ul>
	        			<div class="title">
	        				<div class="line"></div>
	        				<div class="text">商家公告</div>
	        				<div class="line"></div>
	        			</div>
	        			<div class="bulletin">
	        				<p class="content">{{seller.bulletin}}</p>
	        			</div>
	        		</div>
	        	</div>
	        	<div class="detail-close" @click="hideDetail">
	        		<i class="icon-close"></i>
	        	</div>
	        </div>
        </transition>
    </div>
</template>

<script>
	import VStar from 'components/star/star';
    export default {
    	components: { VStar },
    	props: {
    		seller: {
    			type: Object,
    			required: true
    		}
    	},
    	created() {
    		
    	},
        data(){
            return {
            	// 根据seller.supports[0].type在classMap数组中取到对应的类名
            	classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            	detailShow: false
            };
        },
        methods: {
        	showDetail() {
        		this.detailShow = !this.detailShow;
        	},
        	hideDetail() {
        		this.detailShow = !this.detailShow;
        	}
        }
    }
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixin'
	.header
		position: relative
		color: #fff
		background: rgba(7,17,27,.5)
		overflow: hidden
		.content-wrap
			position: relative
			padding: 24px 12px 18px 24px
			font-size: 0
			// 左边头像
			.avatar
				display: inline-block
				vertical-align: top
				img
					border-radius: 4px
			// 右边文字
			.content
				display: inline-block
				margin-left: 16px
				font-size: 14px
				.title
					margin: 2px 0 8px 0
					.brand
						display: inline-block
						vertical-align: top
						width: 30px
						height: 18px
						bg-image('brand')
						background-size: 30px 18px
						background-repeat: no-repeat
					.name
						margin-left: 6px
						font-size: 16px
						line-height: 18px
						font-weight: 700
				.description
					margin-bottom: 10px
					line-height: 12px
					font-size: 12px
				.support
					font-size: 0
					.icon
						display: inline-block
						vertical-align: top
						width: 12px
						height: 12px
						margin-right: 4px
						background-size: 12px 12px
						background-repeat: no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
					.text
						line-height: 12px
						font-size: 10px
			.support-count
				position: absolute
				right: 12px
				bottom: 14px
				height: 24px
				padding: 0 8px
				border-radius: 14px
				background: rgba(0, 0, 0, .2)
				line-height: 24px
				text-align: center
				.count
					vertical-align: top
					font-size: 10px
				.icon-keyboard_arrow_right
					margin-left: 2px
					line-height: 24px
					font-size: 10px
		.bulletin-wrap
			position: relative
			height: 28px
			line-height: 28px
			padding: 0 22px 0 12px
			background: rgba(7,17,27,.2)
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
			.bulletin-title
				display: inline-block
				vertical-align: top
				width: 22px
				height: 12px
				margin-top: 10px
				bg-image('bulletin')
				background-size: 22px 12px
				background-repeat: no-repeat
			.bulletin-text
				font-size: 10px
				margin: 0 4px
			.icon-keyboard_arrow_right
				position: absolute
				font-size: 10px
				right: 12px
				top: 10px
		.background
			z-index: -1
			position: absolute
			top: 0
			left: 0
			right: 0
			bottom: 0
			filter: blur(10px)
		.detail
			z-index: 100
			position: fixed
			top: 0
			left: 0
			right: 0
			bottom: 0
			overflow: auto
			background: rgba(7,17,27,.8)
			transform: translate3D(0,0,0)
			// ios背景模糊
			backdrop-filter: blur(10px)
			// 过渡动画
			&.fade-enter-active, &.fade-leave-active
				transition: opacity .5s
				opacity: 1
			&.fade-enter, &.fade-leave-to
				opacity: 0
			.detail-wrap
				width: 100%
				min-height: 100%
				.detail-main
					margin-top: 64px
					padding-bottom: 64px
					.name
						line-height: 16px
						text-align: center
						font-size: 16px
						font-weight: 700
					.star-wrap
						margin-top: 18px
						padding: 2px 0
						text-align: center
					.title
						display: flex
						align-items: center
						width: 80%
						margin: 28px auto 24px
						.line
							flex: 1
							border-bottom: 1px solid rgba(255,255,255,.2)
						.text
							padding: 12px
							font-size: 14px
							font-weight: 700
					.supports
						width: 80%
						margin: 0 auto
						.support-item
							font-size: 0
							padding: 0 12px
							margin-bottom: 12px
							&:last-of-type
								margin-bottom: 0
							.icon
								display: inline-block
								width: 16px
								height: 16px
								vertical-align: top
								margin-right: 6px
								background-size: 16px 16px
								background-repeat: no-repeat
								&.decrease
									bg-image('decrease_2')
								&.discount
									bg-image('discount_2')
								&.guarantee
									bg-image('guarantee_2')
								&.invoice
									bg-image('invoice_2')
								&.special
									bg-image('special_2')
							.text
								line-height: 16px
								font-size: 12px
					.bulletin
						width: 80%
						margin: 0 auto
						.content
							padding: 0 12px
							line-height: 24px
							font-size: 12px
							
			.detail-close
					position: relative
					width: 32px
					height: 32px
					margin: -64px auto 0
					font-size: 32px
</style>
