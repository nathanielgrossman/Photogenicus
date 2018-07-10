import React, { Component } from 'react';
import TrueImages from './TrueImages.jsx';
import FalseImages from './FalseImages.jsx';
import FreshImages from './FreshImages.jsx';
import UploadBox from './UploadBox.jsx';
import Header from './Header.jsx';

// import '../style/style.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      trained: false
    }
  }

  train() {
    let totalLoss = 0;
    let loss = document.getElementById('loss');
    if (!this.props.classifier.hasAnyTrainedClass) {
      loss.innerHTML = 'Please add images before training classifier.';
      return;
    }
    this.props.classifier.train(function(lossValue) {
    if (lossValue) {
      totalLoss = lossValue;
      loss.innerHTML = 'Loss: ' + totalLoss;
    } else {
      loss.innerHTML = 'Final Loss: ' + totalLoss;
    }
  }); 
    this.setState((current) => {
      current.trained = true;
      return current;
    })
  }

  render() {

    return (

      <div className="container-fluid maindiv">
      <button className="btn btn-success" onClick={this.train.bind(this)}>Train</button> <span id="loss"></span>
      <div className="row">
        <TrueImages classifier={this.props.classifier}/>
        <FalseImages classifier={this.props.classifier}/>
        <FreshImages classifier={this.props.classifier} trained={this.state.trained}/>
      </div>

      </div>
    )
  }
}
