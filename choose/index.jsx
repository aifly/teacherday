import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './assets/css/index.css';
import {
  PubCom
} from '../components/public/pub.jsx';



class ZmitiChooseApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileVal: 'http://api.zmiti.com/zmiti_ele/public/20170905/13d5f5b828dfc697fced7b7b1baf3458.png',
      className: 'active',
      border: ''

    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;

  }
  render() {
    var mainStyle = {
      background: 'url(./assets/images/bg1.jpg) no-repeat center center ',
      backgroundSize: 'cover'
    };
    var rem = this.viewW / 10;
    return <div className={'zmiti-choose-main-ui '+this.state.className} style={mainStyle}>
      <div className='zmiti-choose-main-content'>
        <div className='zmiti-upload'>
          <img  src={this.state.fileVal||'./assets/images/upload.png'}/>
          <canvas ref='canvas' width={6*rem}  height={6*rem}></canvas>
          <input ref='upload-file' onChange={this.chooseImg.bind(this)} type='file'/>

          {this.state.showUploadLoading&&<span className='zmiti-upload-loading'>上传中,请稍候...</span>}
        </div>
        <div className='zmiti-beign-upload' >
          上传照片

        </div>
        <div className='zmiti-btn-groups'>
            <aside onClick={this.rechoose.bind(this)}><img src='./assets/images/rechoose.png'/></aside>
            <aside onClick={this.next.bind(this)}><img src='./assets/images/next.png'/></aside>
        </div>
      </div>
    </div>

  }


  next() {
    var {
      obserable
    } = this.props;

    obserable.trigger({
      type: 'toggleChooseBorder',
      data: 'active'
    });
    obserable.trigger({
      type: 'toggleChoose',
      data: 'left'
    });
  }

  rechoose() {
    //重新选择图片
    this.setState({
      fileVal: ''
    }, () => {
      this.drawImage();
    });

  }

  chooseImg(e) {
    console.log(e.target.value);
    if (!e.target.value) {
      return;
    }
    var formData = new FormData();
    this.setState({
      showUploadLoading: true
    })

    formData.append('setupfile', this.refs['upload-file'].files[0]);
    formData.append('uploadtype', 1);
    $.ajax({
      type: "POST",
      contentType: false,
      processData: false,
      url: 'http://api.zmiti.com/v2/share/upload_file/',
      data: formData
    }).done((data) => {
      console.log(data);
      if (data.getret === 0) {
        var img = new Image();
        img.onload = () => {
          var {
            obserable
          } = this.props;
          this.setState({
            fileVal: data.getfileurl[0].datainfourl,
            showUploadLoading: false,
            border: obserable.trigger({
              type: 'getBorder'
            }).src
          }, () => {
            this.drawImage()
          });

        }
        img.src = data.getfileurl[0].datainfourl
      }
    });

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


  drawImage() {


  }


  componentDidMount() {
    var {
      obserable
    } = this.props;


    obserable.on('toggleChoose', (e) => {
      if (e === 'active') {
        var canvas = this.refs['canvas'];
        var context = canvas.getContext('2d');
        var img = new Image();
        img.onload = function() {
          context.globalCompositeOperation = 'destination-atop';
          context.drawImage(this, 0, 0, canvas.width, canvas.height);
        }
        img.src = this.state.border;
      }
      this.setState({
        className: e
      })
    });

    obserable.on('getFile', () => {
      return this.state.fileVal
    })
  }


}

export default PubCom(ZmitiChooseApp);