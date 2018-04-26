import './mayDay.less';
import Vue from 'vue';
import shareToApp from './shareImageToOtherAPP.vue'

new Vue({
	components:{
		'share_to_app':shareToApp,
	},
	el:'#md',
	data:{
		shareOptions:{}
	},
	methods:{
		shareTop () {
		    const _self = this;
		    this.$refs.shareToApp.show();
		    this.shareOptions = {
		    	options: {
		            shareType: 2,
		            webPageUrl: `/dh-apph5/mayDay/index.html`,
		            imageUrl: 'https://test.hsop.komect.com:10443/attachment/mayDay.jpg',
		            title: '3款应用助你顺利出游',
		            descr: '#和家亲应用知多少#  五一正当时，畅游美丽风景，和家亲来帮你'
		       },
		        successCallback (msg) {
		             
		        },
		        failCallback (msg) {
		            
		        },
		       
	    };
},
	}
})
