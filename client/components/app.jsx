import React, { Component } from 'react';
import TrueImages from './TrueImages.jsx';
import FalseImages from './FalseImages.jsx';

// import '../style/style.css';

export default class App extends Component {

  render() {

    return (
      <div>
      <span>hi from app</span>
      <TrueImages classifier={this.props.classifier}/>
      <FalseImages classifier={this.props.classifier}/>
      </div>
    )
  }
}
