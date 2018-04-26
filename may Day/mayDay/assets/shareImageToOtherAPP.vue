<template>
    <transition name="fade">
        <div class="g-shareModal" v-if="shareShow">
            <div class="g-bshare">
                <p> - 炫耀一下 - </p>
                <ul class="sharelist" @click="shareApp">
                    <li>
                        <img src="data:image/png;base64,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" data-stype="1" data-code="TBeanExchange_Share_WeChat" data-type="亲密豆兑换分享微信">
                    </li>
                    <li>
                        <img src="data:image/png;base64,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" data-stype="2" data-code="BeanExchange_Share_Zone" data-type="亲密豆兑换分享好友圈">
                    </li>
                    <li>
                        <img src="data:image/png;base64,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" data-stype="4" data-code="BeanExchange_Share_QQ" data-type="亲密豆兑换分享QQ">
                    </li>
                    <li>
                        <img src="data:image/png;base64,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" data-stype="5" data-code="BeanExchange_Share_QQZone" data-type="亲密豆兑换分享_QQZone">
                    </li>
                </ul>
            </div>
            <div class="close" @click="shareShow = false"></div>
        </div>
    </transition>
</template>
<script>


export default {
    name: 'ShareImageToOtherAPP',
    props: {
        bridge: {
            type: Boolean,
            default: true
        },
        shareConfig: {
            type: Object,
            default: () => {
                return { message: 'hello' };
            }
        }
    },
    data () {
        return {
            shareShow: false
        };
    },
    created () {
        if (this.bridge) {
            (function (callback) {
                if (window.WebViewJavascriptBridge) {
                    return callback(WebViewJavascriptBridge);
                } else {
                    document.addEventListener('WebViewJavascriptBridgeReady',
                        () => {
                            callback(WebViewJavascriptBridge);
                        }, false);
                }
                if (window.WVJBCallbacks) {
                    return window.WVJBCallbacks.push(callback);
                }
                window.WVJBCallbacks = [callback];
                const WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'https://__bridge_loaded__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(() => {
                    document.documentElement.removeChild(WVJBIframe);
                }, 0);
            })((bridge) => {
                window.bridge = bridge;
            });
        }
    },
    methods: {
        shareApp (event) {
            const _self = this, _t = event.target;
            if (_t.nodeName.toLowerCase() !== 'img') {
                return false;
            }
            const stype = parseInt(_t.dataset.stype, 10);
            /*
            Type = 1 //微信聊天
            Type = 2 //微信朋友圈
            Type = 4,//QQ聊天
            Type = 5,//QQ空间
            */
            const shareOptions = {};
            for (const p in _self.shareConfig.options) {
                if (!Object.prototype.hasOwnProperty.call(_self.shareConfig.options, p)) {
                    continue;
                }
                shareOptions[p] = _self.shareConfig.options[p];
            }
            shareOptions.platformType = stype;
            window.bridge.callHandler('shareImageToOtherAPP', shareOptions, (responseData) => {
                const resData = parseInt(responseData, 10);
                if (resData === 1) {
                    _self.shareOptions.successCallback('分享成功');
                } else {
                    _self.shareOptions.failCallback('分享失败');
                }
            });
        },
        show () {
            this.shareShow = true;
        }
    }
};
</script>
<style lang="less">
    .g-shareModal {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 999; background-color: rgba(0, 0, 0, .8);
        display: flex; justify-content: center; align-items: center; flex-direction: column;
        .close { display: block; position: relative; width: 24px; height: 24px; margin: 0 auto; line-height: 1px; font-size: 12px; border: 2px solid #FFF; border-radius: 24px; background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE2NzQxOTZDQkY3NzExRTdBQjFDQzYxNzIwNUM2NUJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE2NzQxOTZEQkY3NzExRTdBQjFDQzYxNzIwNUM2NUJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTY3NDE5NkFCRjc3MTFFN0FCMUNDNjE3MjA1QzY1QkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTY3NDE5NkJCRjc3MTFFN0FCMUNDNjE3MjA1QzY1QkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5fETB1AAAAqklEQVR42uyYSwqFQAwEJ+L9rxwRXImfMelBhlTDWypF2YTmmbu3GbO0SQM44IADDngI3I/fiHx697TG14SdPSYyTcfvYsLOXz1rdPzBugc77x1fEuMK8xLTpY33mpeaxnineZlpZi3gP4L3bA/Zni99Vd7udHbbYDy6PaTmSxnPbg+J+VL/q5ztRS+D3dx5Ot6SnY50Xg5uAyXayI6zDgEHHHDAAZdkE2AAAJ0oaAQP8GgAAAAASUVORK5CYII="); -webkit-background-size: 100%; background-size: 100%;
        }
        .g-bshare { flex-grow: 0;; width: 72%; font-size: 12px; color: #FFF; text-align: center; padding-top: 20px;
            .sharelist { width: 100%;
                display: flex; justify-content: space-between; align-items: center;
                li { width: 18%; padding: 20px 0;
                    line-height: 2em;
                    img { display: block; width: 100%; }
                }
            }

        }
    }
    &.fade-enter-active,
    &.fade-leave-active { transition: all .3s; }
    &.fade-enter,
    &.fade-leave-active { opacity: 0; }
</style>
