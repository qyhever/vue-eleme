<template>
    <div class="star" :class="starType">
		<span class="star-item" :class="itemClass" v-for="(itemClass,index) in itemClasses" :key="index">
		</span>
    </div>
</template>
<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
	props: {
		// 星星尺寸
		size: {
			type: Number,
			required: true
		},
		// 评分
		score: {
			type: Number,
			required: true
		}
	},
    data() {
        return {
        	
        };
    },
    computed: {
    	starType() {
    		return 'star-' + this.size;
    	},
    	itemClasses() {
    		let result = [];
    		/**
    		 * score：4.6转换成4.5, 4.4转换成4
    		 * 先将socre乘2，再向下取整，再除以2
    		 * 最后的结果只有整数(4)和半数(4.5)
    		 */
    		// let score = Math.floor(this.score * 2) / 2;
    		let score = ( (this.score * 2) | 0 ) / 2;
    		// 是否有小数
    		let hasDecimal = score % 1 !== 0;
    		// 整数部分 Math.floor(score)或者 score | 0
    		let integer = score | 0;
    		for (let i = 0; i < integer; i++) {
    			result.push(CLS_ON); // 放全星
    		}
    		if(hasDecimal){ // 有小数，放半星
    			result.push(CLS_HALF);
    		}
    		while(result.length < LENGTH){ // 长度不够，用灰星补齐
    			result.push(CLS_OFF);
    		}
    		return result;
    	}
    }
}
</script>
<style scoped lang="stylus">
@import '../../common/stylus/mixin.styl';
	.star
		font-size: 0
		.star-item
			display: inline-block
			background-repeat: no-repeat
		&.star-48
			.star-item
				width: 20px
				height: 20px
				margin-right: 22px
				background-size: 20px 20px
				&:last-of-type
					margin-right: 0
				&.on
					bg-image('star48_on')
				&.half
					bg-image('star48_half')
				&.off
					bg-image('star48_off')
		&.star-36
			.star-item:not(:last-of-type)
				width: 15px
				height: 15px
				margin-right: 6px
				background-size: 15px 15px
				&:last-of-type
					margin-right: 0
				&.on
					bg-image('star36_on')
				&.half
					bg-image('star36_half')
				&.off
					bg-image('star36_off')
		&.star-24
			.star-item:not(:last-of-type)
				width: 10px
				height: 10px
				margin-right: 3px
				background-size: 10px 10px
				&:last-of-type
					margin-right: 0
				&.on
					bg-image('star24_on')
				&.half
					bg-image('star24_half')
				&.off
					bg-image('star24_off')
			
</style>