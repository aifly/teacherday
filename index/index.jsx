import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import IScroll from 'iscroll';
import './assets/css/index.css';

import {
  PubCom
} from '../components/public/pub.jsx';



class ZmitiIndexApp extends Component {
  constructor(props) {
    super(props);


    this.state = {


    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;
    window.s = this;
  }
  render() {

    var mainStyle = {
      background: 'url(./assets/images/bg1.jpg) no-repeat center center ',
      backgroundSize: 'cover'
    };

    return <div className='zmiti-index-main-ui left' style={mainStyle}>
        <img src='./assets/images/logo.png' className='zmiti-logo'/>
        <div className='zmiti-img-C'>
          <img src='./assets/images/img1.png' className='zmiti-img1'/>
          <img src='./assets/images/img2.png' className='zmiti-img2'/>
          <img src='./assets/images/img3.png' className='zmiti-img3'/>
        </div>
        <img src='./assets/images/flower.png' className='zmiti-flower'/>

        <img src='./assets/images/text.png' className='zmiti-text'/>
        <img src='./assets/images/begindo.png' className='zmiti-begindo'/>
    </div>

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

  }

}

export default PubCom(ZmitiIndexApp);