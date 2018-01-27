<template>
    <div class="car-control">
		<transition name="move">
			<div class="car-decrease" v-show="food.count > 0" @click="decreaseCount($event)">
				<i class="icon-remove_circle_outline inner"></i>
			</div>
		</transition>
		<div class="car-count" v-show="food.count > 0">{{food.count}}</div>
		<div class="car-add icon-add_circle" @click="addCount($event)"></div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
	props: {
		food: {
			type: Object
		}
	},
    data() {
        return {

        };
    },
    created() {
    	// console.info(this.food);
    },
    methods: {
    	addCount(event) {
    		if (!event._constructed) { // 解决pc触发两次点击事件的问题
    			return;
    		}
    		if (!this.food.count) {
    			// this.food.count = 1;
    			// vue不能监听在实例中没有的属性
    			Vue.set(this.food, 'count', 1);
    		} else {
    			this.food.count++;
    		}
    	},
    	decreaseCount(event) {
    		if (!event._constructed) {
    			return;
    		}
    		if (this.food.count) {
    			this.food.count--;
    		}
    	}
    }
}
</script>
<style scoped lang="stylus">
	.car-control
		font-size: 0
		.car-decrease, .car-add
			display: inline-block
			padding: 6px
			transition: all .4s linear
			// 过渡动画
			&.move-enter, &.move-leave-to
				opacity: 0
				transform: translate3d(24px, 0, 0)
				.inner
					transform: rotate(180deg)
			.inner
				display: inline-block
				line-height: 24px
				font-size: 24px
				color: rgb(0, 160, 220)
				transition: all .4s linear
				transform: rotate(0)
		.car-count
			display: inline-block
			vertical-align: top
			width: 12px 
			padding-top: 6px
			line-height: 24px
			text-align: center
			font-size: 10px
			color: rgb(147, 153, 159)
		.car-add
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: rgb(0, 160, 220)
</style>