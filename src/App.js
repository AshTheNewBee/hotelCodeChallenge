import { React, Component } from 'react';
import { logo } from 'utils/images/_images';
import 'utils/styleSheets/_app.css';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="qantasLogo" alt="logo" />
        </header>
      </div>
    );
  }
}
