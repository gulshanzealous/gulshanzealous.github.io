import React, { Component } from 'react';
import './App.css';
import Routes from './Routes'
import firebase from 'firebase'


class App extends Component {

  componentWillMount = () => {
        var config = {
            apiKey: "AIzaSyAJAQrgfYwZrmsmG6z29XKIXZIF6NxAw28",
            authDomain: "blog-77a28.firebaseapp.com",
            databaseURL: "https://blog-77a28.firebaseio.com",
            projectId: "blog-77a28",
            storageBucket: "gs://blog-77a28.appspot.com",
            messagingSenderId: "313215376492"
        };
        firebase.initializeApp(config);
  }

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
