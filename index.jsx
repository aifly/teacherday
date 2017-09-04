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

var obserable = new Obserable();

class App extends Component {
	constructor(props) {
		super(props);


		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
		window.s = this;
	}
	render() {

		var data = {
			obserable
		}
		return <div className='zmiti-main-ui'>

			<ZmitiIndexApp {...data}></ZmitiIndexApp>
			<ZmitiChooseApp {...data}></ZmitiChooseApp>
			<ZmitiChooseBorderApp {...data}></ZmitiChooseBorderApp>

		</div>
	}

}


ReactDOM.render(<App></App>, document.getElementById('fly-main-ui'));