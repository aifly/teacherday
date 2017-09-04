import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './assets/css/index.css';
import {
  PubCom
} from '../components/public/pub.jsx';



class ZmitiChooseBorderApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      borderList: [{
        src: './assets/images/border1.png'
      }, {
        src: './assets/images/border2.png'
      }, {
        src: './assets/images/border3.png'
      }, {
        src: './assets/images/border4.png'
      }],
      currentBorderIndex: 0
    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;

  }
  render() {
    var mainStyle = {
      background: 'url(./assets/images/bg1.jpg) no-repeat center center ',
      backgroundSize: 'cover'
    };

    return <div className='zmiti-chooseborder-main-ui' style={mainStyle}>
      <div className='zmiti-chooseborder-main-content'>
        <ul>
          {
            this.state.borderList.map((border,i)=>{
              return <li key={i} onClick={this.chooseBorder.bind(this,i)}>
                  {this.state.currentBorderIndex === i && <img className='zmiti-border-active' src='./assets/images/border-active.png'/>}
                  <img src={border.src}/>
              </li>
            })  
          }
        </ul>
        <div className='zmiti-btn-groups'>
           <aside ><img src='./assets/images/preview.png'/></aside>
           <aside><img src='./assets/images/next.png'/></aside>
        </div>
      </div>
    </div>

  }



  chooseBorder(i) {
    this.setState({
      currentBorderIndex: i
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


  componentDidMount() {}


}

export default PubCom(ZmitiChooseBorderApp);