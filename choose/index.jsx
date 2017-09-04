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
      fileVal: ''
    }
    this.viewW = document.documentElement.clientWidth;
    this.viewH = document.documentElement.clientHeight;

  }
  render() {
    var mainStyle = {
      background: 'url(./assets/images/bg1.jpg) no-repeat center center ',
      backgroundSize: 'cover'
    };

    return <div className={'zmiti-choose-main-ui left'} style={mainStyle}>
      <div className='zmiti-choose-main-content'>
        <div className='zmiti-upload'>
          <img  src={this.state.fileVal||'./assets/images/upload.png'}/>
          <input ref='upload-file' onChange={this.chooseImg.bind(this)} type='file'/>
          {this.state.showUploadLoading&&<span className='zmiti-upload-loading'>上传中,请稍候...</span>}
        </div>
        <div className='zmiti-beign-upload' >
          上传照片

        </div>
        <div className='zmiti-btn-groups'>
            <aside onClick={this.rechoose.bind(this)}><img src='./assets/images/rechoose.png'/></aside>
            <aside><img src='./assets/images/next.png'/></aside>
        </div>
      </div>
    </div>

  }

  rechoose() {
    //重新选择图片
    this.setState({
      fileVal: ''
    })
  }

  chooseImg(e) {
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

          this.setState({
            fileVal: data.getfileurl[0].datainfourl,
            showUploadLoading: false
          })
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


  componentDidMount() {}


}

export default PubCom(ZmitiChooseApp);