import React, { Component } from 'react';
import TrueImages from './TrueImages.jsx';
import FalseImages from './FalseImages.jsx';
import FreshImages from './FreshImages.jsx';

// import '../style/style.css';

export default class App extends Component {


  train() {
    let totalLoss = 0;
    let loss = document.getElementById('loss');
    this.props.classifier.train(function(lossValue) {
    if (lossValue) {
      totalLoss = lossValue;
      loss.innerHTML = 'Loss: ' + totalLoss;
    } else {
      loss.innerHTML = 'Done Training! Final Loss: ' + totalLoss;
    }
  }); 
    
  }

  render() {

    return (
      <div>
      <button onClick={this.train.bind(this)}>Train</button><span id="loss"></span>
      <TrueImages classifier={this.props.classifier}/>
      <FalseImages classifier={this.props.classifier}/>
      <FreshImages classifier={this.props.classifier}/>
      </div>
    )
  }
}
