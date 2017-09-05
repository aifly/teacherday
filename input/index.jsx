import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './assets/css/index.css';
import {
  PubCom
} from '../components/public/pub.jsx';


import ZmitiToastApp from '../components/toast/index.jsx'


class ZmitiInputApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      className: 'right',

    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;

  }
  render() {
    var mainStyle = {
      background: 'url(./assets/images/bg1.jpg) no-repeat center center ',
      backgroundSize: 'cover'
    };

    var inputStyle = {
      background: 'url(./assets/images/input-bg.png) no-repeat center',
      backgroundSize: 'contain'
    }

    return <div className={'zmiti-input-main-ui '+ this.state.className} style={mainStyle}>
      <div className='zmiti-input-main-content'>
        <div className='zmiti-input-C' style={inputStyle}>
          <textarea value={this.state.words} onChange={this.onChange.bind(this)}></textarea>
        </div>
        <div className='zmiti-btn-group'>
          <aside>
            <img src='./assets/images/next.png'/>
          </aside>
        </div>
      </div>

      {this.state.toast && <ZmitiToastApp toast={this.state.toast}></ZmitiToastApp>}
    </div>

  }

  onChange(e) {
    if (e.target.value.length >= 30) {
      this.showToast('最多可输入30个字');
      return;
    }
    this.setState({
      words: e.target.value
    })
  }



  showToast(msg) {
    this.setState({
      toast: msg
    });

    setTimeout(() => {
      this.setState({
        toast: ''
      });
    }, 2000)
  }


  componentDidMount() {
    var {
      obserable
    } = this.props;


    obserable.on('toggleInput', (e) => {
      this.setState({
        className: e
      })
    })
  }


}

export default PubCom(ZmitiInputApp);