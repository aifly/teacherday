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
    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;

  }
  render() {
    var mainStyle = {
      background: 'url(./assets/images/bg1.jpg) no-repeat center center ',
      backgroundSize: 'cover'
    };



    return <div className={'zmiti-result-main-ui '+ this.state.className} style={mainStyle}>
      <div className='zmiti-result-main-content'>
       
        <div className='zmiti-btn-group'>
          <aside>
            <img src='./assets/images/done.png'/>
          </aside>
        </div>
      </div>

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

export default PubCom(ZmitiResultApp);