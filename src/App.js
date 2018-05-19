
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyMap from './Map';

class App extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  ComponentDidMount() {
  }
  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <div>
                <img style={{verticalAlign: "middle"}} src="plastickilah.png" />
                  <h1 style={{verticalAlign: "middle"}}>Plastic Killah</h1>
              </div>
              <MyMap />
            </div>
        </header>
        <div className='container'>

        </div>
      </div>
    );
  }
}
export default App;