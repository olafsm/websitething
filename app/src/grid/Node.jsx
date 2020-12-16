import './Node.css'
import React from 'react'

const Node = (props) => {
    let handleMouseDown = (row,col,e) => {
        const type = (
            e.shiftKey && e.button === 0 ? "start" :
            e.shiftKey ? "goal":
            e.button === 0 ? "wall":
            ""
        )
        props.onMouseDown(row,col,type)
    }
    
    const {
        size,
        row,
        col,
        isStart,
        isGoal,
        isWall,
    } = props;
    
    const className = (
        isStart 
        ? "start" 
        : isGoal 
        ? "goal" 
        : isWall 
        ? "wall" 
        : ""
    )
    return (
    <div style={{width:size, height:size}} 
        className={`node ${className}`}  
        onMouseEnter={()=>props.onMouseEnter(row,col)} 
        onMouseDown={(e)=>handleMouseDown(row,col,e)}
    >
    </div>
    );
}
export default Node;
