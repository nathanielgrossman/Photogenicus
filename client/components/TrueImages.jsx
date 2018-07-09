import React, { Component } from 'react';
// import '../style/style.css';

export default class TrueImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  addToModel() {
    let images = this.state.images;
    let total = images.length - 1;
    let addTrue = document.getElementById('truestatus');
    addTrue.innerHTML = '0%';
    images.forEach((imageEl, i) => {
      this.props.classifier.addImage(document.getElementById('true' + i), 'true', () => {
        let current = i;
        let percentage = Math.floor((current / total) * 100)+'%'
        addTrue.innerHTML = percentage;
      });
    })
    let container = document.getElementById('truebox');
    document.getElementById('addtrue').disabled = true;
    container.innerHTML = ''
  }

  componentDidMount() {
    const images = [];
    fetch('http://localhost:5000/gettrue', {
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
        let image = <img src={pic.url} id={'true' + i} width="224px" height="224px" key={'true' + i} crossOrigin="anonymous"/>

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
      <div id="true">
      <p>true</p>
      <button id="addtrue" onClick={this.addToModel.bind(this)} >Add to Model</button> <span id="truestatus"></span>
        <div id="truebox">
          {this.state.images}
        </div>
     </div>
    )
  }
}


