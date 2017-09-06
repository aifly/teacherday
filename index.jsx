import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import IScroll from 'iscroll';
import './assets/css/index.css';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
import Obserable from './components/public/obserable';


import ZmitiIndexApp from './index/index.jsx'
import ZmitiChooseApp from './choose/index.jsx'
import ZmitiChooseBorderApp from './chooseborder/index.jsx'
import ZmitiInputApp from './input/index.jsx'
import ZmitiResultApp from './result/index.jsx'

var obserable = new Obserable();
var worksid = '1797800906';
var data = {
	wxappid: 'wxec2401ee9a70f3d9',
	wxappsecret: 'fc2c8e7c243da9e8898516fa5da8cbbb'
}


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nickname: ""
		}

		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
		window.s = this;
	}
	render() {

		var data = {
			obserable,
			wxConfig: this.wxConfig,
			changeURLPar: this.changeURLPar,
			nickname: this.state.nickname
		}
		return <div className='zmiti-main-ui'>

			<ZmitiIndexApp {...data}></ZmitiIndexApp>
			<ZmitiChooseApp {...data}></ZmitiChooseApp>
			<ZmitiChooseBorderApp {...data}></ZmitiChooseBorderApp>
			<ZmitiInputApp {...data}></ZmitiInputApp>
			<ZmitiResultApp {...data}></ZmitiResultApp>

		</div>
	}
	wxConfig(title, desc, img, url) {
		var s = this;
		var appId = 'wxfacf4a639d9e3bcc'; //'wxfacf4a639d9e3bcc'; // data.wxappid; // 'wxfacf4a639d9e3bcc'; //data.wxappid;

		var durl = url || location.href.split('#')[0];


		var code_durl = encodeURIComponent(durl);



		$.ajax({
			type: 'get',
			url: "http://api.zmiti.com/weixin/jssdk.php?type=signature&durl=" + code_durl,
			dataType: 'jsonp',
			jsonp: "callback",
			jsonpCallback: "jsonFlickrFeed",
			error() {

			},
			success(data) {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: appId, // 必填，公众号的唯一标识
					timestamp: '1488558145', // 必填，生成签名的时间戳
					nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
					signature: data.signature, // 必填，签名，见附录1
					jsApiList: ['checkJsApi',
							'onMenuShareTimeline',
							'onMenuShareAppMessage',
							'onMenuShareQQ',
							'onMenuShareWeibo',
							'hideMenuItems',
							'showMenuItems',
							'hideAllNonBaseMenuItem',
							'showAllNonBaseMenuItem'
						] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});

				wx.ready(() => {

					//朋友圈

					wx.onMenuShareTimeline({
						title: title, // 分享标题
						link: durl, // 分享链接
						imgUrl: img, // 分享图标
						desc: desc,
						success: function() {},
						cancel: function() {}
					});
					//朋友
					wx.onMenuShareAppMessage({
						title: title, // 分享标题
						link: durl,
						imgUrl: img, // 分享图标
						type: "link",
						dataUrl: "",
						desc: desc,
						success: function() {},
						cancel: function() {}
					});
					//qq
					wx.onMenuShareQQ({
						title: title, // 分享标题
						link: durl, // 分享链接
						imgUrl: img, // 分享图标
						desc: desc,
						success: function() {},
						cancel: function() {}
					});
				});
			}
		});

	}
	log(opt) {

		$.ajax({
			url: 'http://api.zmiti.com/v2/msg/send_msg',
			data: {
				type: opt.key || 'log',
				content: JSON.stringify(opt),
				to: ''
			}
		})
	}
	getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	}
	getOauthurl() {
		var s = this;



		$.ajax({
			type: 'post',
			url: 'http://api.zmiti.com/v2/weixin/getwxuserinfo/',
			data: {
				code: s.getQueryString('code'),
				wxappid: data.wxappid,
				wxappsecret: data.wxappsecret
			},
			error(e) {},
			success(dt) {

				if (dt.getret === 0) {

					s.openid = dt.userinfo.openid;
					s.nickname = dt.userinfo.nickname;
					s.headimgurl = dt.userinfo.headimgurl;

					s.wxConfig(s.nickname + '的最美笑脸和祝福送老师！', 'XX的最美笑脸和祝福送老师！', 'http://h5.zmiti.com/public/teacherday/assets/images/300.jpg');
					s.state.nickname = s.nickname;
					s.forceUpdate();

				} else {
					if (s.isWeiXin()) {
						var nickname = s.getQueryString('data');

						var redirect_uri = window.location.href.split('?')[0];

						var symbol = redirect_uri.indexOf('?') > -1 ? '&' : '?';
						if (nickname) {
							redirect_uri = s.changeURLPar(redirect_uri, 'data', (nickname));
						}

						//url = s.changeURLPar(url, 'nickname', 'zmiti');

						s.log({
							aa: redirect_uri
						})
						$.ajax({
							url: 'http://api.zmiti.com/v2/weixin/getoauthurl/',
							type: 'post',
							data: {
								redirect_uri: redirect_uri,
								scope: 'snsapi_userinfo',
								worksid: worksid,
								state: new Date().getTime() + ''
							},
							error() {},
							success(dt) {
								if (dt.getret === 0) {
									window.location.href = dt.url;
								}
							}
						})
					} else {}
				}
			}
		});
	}
	changeURLPar(url, arg, val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + val;
		return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
	}
	componentDidMount() {
		this.getOauthurl();
	}
	isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}

}


ReactDOM.render(<App></App>, document.getElementById('fly-main-ui'));