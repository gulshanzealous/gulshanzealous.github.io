import React, { Component } from 'react';
import './App.css';
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
          <Routes />
        {/* <Footer/> */}
      </div>
    );
  }
}

export default App;
