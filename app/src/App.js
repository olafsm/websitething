import './App.css';
import React from 'react'
import Grid from './grid/Grid'
import {
  AppBar, Toolbar, Typography,
} from '@material-ui/core'

class Game extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                  Visualize Algorithm
                </Typography>
                
            </Toolbar>
        </AppBar>
        <div className="grid">
          <Grid />
        </div>
      </div>
    );
  }
}

function App() {
  return <Game />
}

export default App;
