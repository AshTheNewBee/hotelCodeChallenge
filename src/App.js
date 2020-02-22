import * as React from 'react';
import { logo } from 'utils/images/_images';
import 'utils/styleSheets/_app.css';
import SortAndTotal from 'components/SortAndTotal';

/**************
 * @App
 * Display Qantas logo and calls SortAndTotal
 **************/

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="qantasLogo" alt="logo" />
          <SortAndTotal />
        </header>
      </div>
    );
  }
}

export default App;
