import React from 'react'
import Node from './Node'
import './grid.css'
import {Button} from '@material-ui/core'
import Dijkstra from './algorithms/dijkstra'

const CELL_SIZE = 25;
const GRID_WIDTH_PX = window.innerWidth;
const GRID_HEIGHT_PX = 600;
const NUM_CELLS_WIDTH = 50//Math.floor(GRID_WIDTH_PX/CELL_SIZE);
const NUM_CELLS_HEIGHT = 20//Math.floor(GRID_HEIGHT_PX/CELL_SIZE);

export default class Grid extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        grid: [],
        startNodeRow:9,
        startNodeColumn: 15,
        goalNodeRow: 9,
        goalNodeColumn:35,
        isMousePressed:false,
        type:""
      };
    }
    componentDidMount() {
      const x = this.getInitialGrid()
      x[this.state.startNodeRow][this.state.startNodeColumn].isStart = true
      x[this.state.goalNodeRow][this.state.goalNodeColumn].isGoal = true
      this.setState({grid:x});
      window.addEventListener("mouseup",()=>{this.setState({isMousePressed:false})})
    }
    handleMouseDown(row,col,type){
      if(this.state.grid[row][col].isGoal || this.state.grid[row][col].isStart)return
      let newGrid = this.toggleWall(this.state.grid,row,col,type)
      let x = type
      if(x === "start") {
        x = "wall"
      }else if(x==="goal") {
        x = ""
      }
      this.setState({grid:newGrid, isMousePressed:true, type:x})
    }
    handleMouseEnter(row,col){
      if(!this.state.isMousePressed) return;
      if(this.state.grid[row][col].isGoal || this.state.grid[row][col].isStart) return;
      let newGrid = this.toggleWall(this.state.grid,row,col, this.state.type)
      this.setState({grid:newGrid})
    }

    createNode(row,col) {
      return {
        row,
        col,
        isStart: false,
        isGoal: false,
        isWall: false,
        weight: Infinity,
        visited:false,
        parent: null,
      }
    }
    toggleWall(grid, row, col,type) {
      let newGrid = grid.slice()
      let node = this.createNode(row,col)
      let {startNodeColumn,startNodeRow,goalNodeColumn,goalNodeRow} = this.state
      if(type==="start") {
        this.toggleWall(grid, startNodeRow,startNodeColumn,"")
        this.setState({startNodeRow:row, startNodeColumn:col})
        node.isStart = true
      } else if(type === "goal") {
        this.toggleWall(grid,goalNodeRow,goalNodeColumn,"")
        this.setState({goalNodeRow:row, goalNodeColumn:col})
        node.isGoal = true
      } else if(type === "wall") {
        node.isWall = true
      }
      newGrid[row][col] = node
      return newGrid
    }
  
    getInitialGrid(){
      let grid = []
      for (let row = 0; row<NUM_CELLS_HEIGHT;row++) {
        let currentRow = []
        for(let col = 0; col<NUM_CELLS_WIDTH;col++) {
          currentRow.push(this.createNode(row,col))
        }
        grid.push(currentRow)
      }
      return grid
    }
    
    runAlgorithm(){
      let {startNodeColumn,startNodeRow,goalNodeColumn,goalNodeRow,grid} = this.state
      if(startNodeColumn === goalNodeColumn && startNodeRow === goalNodeRow) {
        alert("Start and stop cant be the same")
      } else {
        Dijkstra(grid,grid[startNodeRow][startNodeColumn],grid[goalNodeRow][goalNodeColumn])
      }
    }
    render() {  
      let {grid} = this.state;
      return (
          <div className="grid" onContextMenu={(e)=>e.preventDefault()} >
            <Button variant="contained" onClick={()=>this.runAlgorithm()}>Run algorithm</Button>
            {grid.map((row, rowIdx) => {
              return (
                <div className="grid-row" key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isGoal, isStart, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx} 
                        size={CELL_SIZE-2}
                        col={col}
                        row={row}
                        isGoal={isGoal}
                        isStart={isStart}
                        isWall={isWall}
                        onMouseDown={(row, col, type) => this.handleMouseDown(row, col, type)}
                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                      ></Node>
                    );
                  })}
                </div>
              );
          })}

          </div>
      );
    }
  }
