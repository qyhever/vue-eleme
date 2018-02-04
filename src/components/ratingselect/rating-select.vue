<template>
    <div class="rating-select">
		<div class="rating-type border-1px">
			<div class="block positive" :class="{'active': selectType === 2}" @click="select(2, $event)">
				{{desc.all}}
				<span>{{ratings.length}}</span>
			</div>
			<div class="block positive" :class="{'active': selectType === 0}" @click="select(0, $event)">
				{{desc.positive}}
				<span>{{positives.length}}</span>
			</div>
			<div class="block negative" :class="{'active': selectType === 1}" @click="select(1, $event)">
				{{desc.negative}}
				<span>{{negatives.length}}</span>
			</div>
		</div>
		<div class="switch" :class="{'on': onlyContent}" @click="toggleContent($event)">
			<span class="icon-check_circle"></span>
			<span class="text">只看有评价的内容</span>
		</div>
    </div>
</template>
<script>
const POSITIVE = 0; // 好评
const NEGATIVE = 1; // 吐槽
const ALL = 2;
export default {
	props: {
		ratings: {
			type: Array,
			default() {
				return [];
			}
		},
		selectType: {
			type: Number,
			default: ALL
		},
		onlyContent: {
			type: Boolean,
			default: false
		},
		desc: {
			type: Object,
			default() {
				return {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				};
			}
		}
	},
    data() {
        return {
        	_selectType: ALL,
        	_onlyContent: false
        };
    },
    created() {
    	// console.log(this.selectType)
    	this._selectType = this.selectType;
    	this._onlyContent = this.onlyContent;
    },
    computed: {
    	// 好评的数据条数
    	positives() {
    		return this.ratings.filter(rating => {
    			return rating.rateType === POSITIVE;
    		});
    	},
    	negatives() {
    		return this.ratings.filter( rating => {
    			return rating.rateType === NEGATIVE;
    		})
    	}
    },
    methods: {
    	select(type, event) {
    		if (!event._constructed) {
    			return;
    		}
    		this._selectType = type;
    		this.$emit('selectType', this._selectType);
    	},
    	toggleContent(event) {
    		if (!event._constructed) {
    			return;
    		}
    		this._onlyContent = !this.onlyContent;
    		this.$emit('onlyContent', this._onlyContent);
    	}
    }
}
</script>
<style scoped lang="stylus">
@import '../../common/stylus/mixin'
.rating-select
	.rating-type
		margin: 0 18px
		padding: 18px 0
		border-1px(rgba(7, 17, 27, .2))
		font-size: 0
		.block
			display: inline-block
			padding: 8px 12px
			margin-right: 8px
			border-radius: 2px
			line-height: 16px
			color: rgb(77, 85, 93)
			font-size: 12px
			&.active
				color: #fff
			&.positive
				background: rgba(0, 160, 220, .2)
				&.active
					background: rgb(0, 160, 220)
			&.negative
				background: rgba(77, 85, 93, .2)
				&.active
					background: rgb(77, 85, 93)
			.count
				margin-left: 2px
				font-size: 8px
	.switch
		padding: 12px 18px
		line-height: 24px
		border-bottom: 1px solid rgba(7, 17, 27, .1)
		color: rgb(147, 153, 160)
		&.on
			.icon-check_circle
				color: #26da5f
		.icon-check_circle
			display: inline-block
			vertical-align: middle
			font-size: 24px
		.text
			margin-left: 4px
			font-size: 12px
</style>