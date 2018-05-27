
import React, { Component } from 'react';
import logo from './logo.svg';
import MyMap from './Map';
import NewMap from './NewMap';

class App extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  state = {
    vortex: 'greatpacific'
  }
  changeVortex = (vortex) => {
    this.setState({vortex});
  }
  render() {
    return (
      <div className='app'>
        <div className='wrapper'>
        <header>
          <div>
            <img style={{verticalAlign: "middle"}} src="plastickilah.png" />
            <h1 style={{verticalAlign: "middle"}}>Plastic Killer</h1>
          </div>
        </header>
          <div className='flex-row'>
            <div className='sidebar'>
              <button  onClick={
                  () => {
                    this.changeVortex('greatpacific')
                  }}>Great Pacific</button>
              <button onClick={() => {this.changeVortex('atlantic')}}>Atlantic</button>
              <button onClick={() => {this.changeVortex('indianocean')}}>Indian Ocean</button>
              <a className='globe' href='/earth.html'>Globe</a>
             </div>
            <MyMap vortex={this.state.vortex} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;