import React, { Component } from 'react';
// import '../style/style.css';

export default class TrueImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      classified: false
    }
  }

  classify() {
    let images = this.state.images;
    let filtered = [];
    let promises = [];
    let total = images.length;
    if (!this.props.trained) {
      document.getElementById('warning').innerHTML = 'Please train classifier before attempting to classify images.'
      return;
    }
    images.forEach((imageEl, i) => {
      let classifyProm = new Promise((resolve, reject) => {
        this.props.classifier.classify(document.getElementById('fresh' + i), function(results) {
          if (results === 'true') {
            filtered.push(imageEl);
          }
          resolve();
        })
      });
      promises.push(classifyProm);


    })
    Promise.all(promises)
    .then(() => {
    	this.setState(preState => {
  			console.log('setting state', filtered);
        preState.images = filtered;
        preState.classified = true;
        return preState;
      })
    })
    .then(() => {
      let info = document.getElementById('info');
      let information = `Selected ${filtered.length} images from a batch of ${total}.`
      document.getElementById('classify').disabled = true;
      info.innerHTML = information;
      document.getElementById('warning').innerHTML = ''
    })
  }

  fetchFreshImagesPeriodically() {
    if (this.state.classified === false ) {
      const images = [];
      fetch('http://localhost:5000/getfresh', {
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
          let imgname = '' + pic.url
          let filename = imgname.split('fresh');
          const thepicurl = 'http://localhost:8080/public/fresh/' + filename[1];
          let image = <img src={thepicurl} id={'fresh' + i} width="224px" height="224px" key={'fresh' + i} crossOrigin="anonymous"/>

          images.push(image);
        });
        this.setState(preState => {
          preState.images = images;
          return preState;
        })
      })  
    }
  } 

  componentDidMount() {
    const images = [];
    fetch('http://localhost:5000/getfresh', {
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
        let imgname = '' + pic.url
        let filename = imgname.split('fresh');
        const thepicurl = 'http://localhost:8080/public/fresh/' + filename[1];
        let image = <img src={thepicurl} id={'fresh' + i} width="224px" height="224px" key={'fresh' + i} crossOrigin="anonymous"/>

        images.push(image);
      });
      this.setState(preState => {
        preState.images = images;
        return preState;
      })
      return urlArr;
    })

    this.fetchFreshImagesPeriodically();
    this.timer = setInterval(() => this.fetchFreshImagesPeriodically(), 1000);
  }

  render() {
    

    return (
      <div id="true">
      <p>Unsorted Images</p>
      <button onClick={this.classify.bind(this)} id="classify" >Classify</button> <span id='warning'></span>
        <p id="info"></p>
        <div id="unfiltered">
          {this.state.images}
        </div>
     </div>
    )
  }

}