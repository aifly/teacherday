import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './assets/css/index.css';
import {
  PubCom
} from '../components/public/pub.jsx';



class ZmitiResultApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      className: 'right',
      wish: ''
    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;

  }
  render() {
    var mainStyle = {
      background: 'url(./assets/images/bg1.jpg) no-repeat center center ',
      backgroundSize: 'cover'
    };

    var wishStyle = {
      background: "url(./assets/images/wish-bg.png) no-repeat center ",
      backgroundSize: 'contain'

    }

    var resultBg = {

    }
    if (this.state.border && this.state.file) {
      resultBg.background = 'url(' + this.state.border + ') no-repeat center,url(' + this.state.file + ') no-repeat center',
        resultBg.backgroundSize = 'contain'
    }

    var maskStyle = {
      background: 'url(./assets/images/arron1.png) no-repeat center top',
      backgroundSize: 'cover'
    }

    return <div className={'zmiti-result-main-ui '+ this.state.className} style={mainStyle}>
      <div className='zmiti-result-main-content'>
        <div className='zmiti-result-img' style={resultBg}>
          
        </div>
        <div className='zmiti-wish-C' style={wishStyle}>
            <div>{this.state.wish}</div>
        </div>
        <div className='zmiti-btn-group'>
          <aside onClick={this.reInput.bind(this)}>
            <img src='./assets/images/reinput.png'/>
          </aside>
           <aside onClick={()=>{this.setState({showMask:true})}}>
            <img src='./assets/images/done.png'/>
          </aside>
        </div>
      </div>

      {this.state.showMask&&<div  onTouchStart={()=>{this.setState({showMask:false})}} className='zmiti-mask lt-full' style={maskStyle}></div>}

    </div>

  }

  reInput() {
    var {
      obserable
    } = this.props;
    obserable.trigger({
      type: 'toggleInput',
      data: 'active'
    });

    obserable.trigger({
      type: 'toggleResult',
      data: 'right'
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
      obserable,
      wxConfig,
      nickname,
      changeURLPar
    } = this.props;
    obserable.on('toggleResult', e => {
      this.setState({
        className: e,
        wish: obserable.trigger({
          type: 'getWish'
        })
      }, () => {
        this.getAssets();
      });

      if (e === 'active') {

        var url = window.location.href;
        url = changeURLPar(url, 'data', JSON.stringify({
          file: obserable.trigger({
            type: 'getFile'
          }),
          border: obserable.trigger({
            type: 'getBorder'
          }),
          wish: obserable.trigger({
            type: 'getWish'
          })
        }));
        wxConfig(nickname + '的最美笑脸和祝福送老师！', 'XX的最美笑脸和祝福送老师！', 'http://h5.zmiti.com/public/teacherday/assets/images/300.jpg', url);
      }

    });
  }

  getAssets() {
    var {
      obserable
    } = this.props;
    var file = obserable.trigger({
      type: 'getFile'
    });
    var border = obserable.trigger({
      type: 'getBorder'
    })
    this.setState({
      file,
      border: border.src
    })
  }


}

export default PubCom(ZmitiResultApp);