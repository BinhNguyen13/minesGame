
import './css/style.css';

import React, { Component } from 'react'
import Board from './components/Board/index'
import BoardHead from './components/BoardHead'
export default class Mines extends Component {
  constructor(props){
    super(props)
    this.state={
      status:'waiting', //waiting, running,ended
      columns:16,
      mines:40,
      flags:40,
      time:0,
      openCells:0,
      rows:16
  
    }
    this.intervals=[]
  }
  changeFlagAmount=(amount)=>{
    let flags=this.state.flags
    if(flags>0){
      this.setState({
        flags:this.state.flags+amount
      })
    }
   
  }
  reset=()=>{
    this.setState({
      openCells:0,
      flags:16,
      status:'waiting'
    })
  }
  endGame=()=>{
    this.setState({
      status:'ended'
    })
  }
  handleFirstCellClick=()=>{
    if(this.state.openCells===0&&this.state.status!=='running'){
      this.setState({
        status:'running'
      })
    }
    this.setState(prevState=>{
      return { openCells:prevState.openCells+1}
    })
  }
  render() {
    return (
      <div className="mine">
        <BoardHead reset={this.reset} time={this.state.time} flagCount={this.state.flags} />
        <Board  rows={this.state.columns}
                columns={this.state.columns}
                mines={this.state.mines}
                openCells={this.state.openCells}
                handleFirstCellClick={this.handleFirstCellClick}
                changeFlagAmount={this.changeFlagAmount}
                status={this.state.status}
                flags={this.state.flags}
                reset={this.reset}
                endGame={this.endGame}
        />
      </div>
    )
  }
}
