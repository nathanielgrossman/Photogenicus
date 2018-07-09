import React, { Component } from 'react';
// import '../style/style.css';

export default class FalseImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  addToModel() {
    let images = this.state.images;
    let total = images.length - 1;
    let falsestatus = document.getElementById('falsestatus');
    images.forEach((imageEl, i) => {
      this.props.classifier.addImage(document.getElementById('false' + i), 'false', () => {
        let current = i;
        let percentage = Math.floor((current / total) * 100)+'%'
        falsestatus.innerHTML = percentage;
      });
    })
    let container = document.getElementById('falsebox');
    document.getElementById('addfalse').disabled = true;
    container.innerHTML = ''
  }

  componentDidMount() {
    const images = [];
    fetch('http://localhost:5000/getfalse', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => {
      return response.json();
    })
    .then(urlArr => {
      urlArr.forEach((pic, i) => {
        let image = <img src={pic.url} id={'false' + i} width="224px" height="224px" key={'false' + i} crossOrigin="anonymous"/>

        images.push(image);
      });
      this.setState(preState => {
        preState.images = images;
        return preState;
      })
      return urlArr;
    })
  }

  render() {
    

    return (
      <div id="false">
      <p>false</p>
      <button onClick={this.addToModel.bind(this)} id="addfalse">Add to Model</button> <span id="falsestatus"></span>
        <div id="falsebox">
          {this.state.images}
        </div>
     </div>
    )
  }
}


