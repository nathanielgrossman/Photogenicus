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
    images.forEach((imageEl, i) => {
      console.log('adding to classifier');
      this.props.classifier.addImage(document.getElementById('false' + i), 'false');
    })
  }

  componentDidMount() {
    const images = [];
    fetch('/getfalseimages', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => {
      // return JSON.parse(response);
      return [{url:"https://s7d1.scene7.com/is/image/PETCO/puppy-090517-dog-featured-355w-200h-d"},{url:"https://s7d1.scene7.com/is/image/PETCO/puppy-090517-dog-featured-355w-200h-d"},{url:"https://s7d1.scene7.com/is/image/PETCO/puppy-090517-dog-featured-355w-200h-d"}]
    })
    .then(urlArr => {
      urlArr.forEach((pic, i) => {
        let image = <img src={pic.url} id={'false' + i} width="224px" height="224px" key={'false' + i} crossOrigin="anonymous"/>

        images.push(image);
           console.log(images);
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
      <button onClick={this.addToModel.bind(this)} >Add to Model</button>
        <div>
          {this.state.images}
        </div>
     </div>
    )
  }
}


