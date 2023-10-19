// This component handles the App template used on every page.
import React from 'react';
import GamePage from './GamePage.tsx'
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <GamePage/>
      </div>
    );
  }
}

export default App;
