import React from 'react'
import Cell from '../Cell/index'
export default function Row(props) {
    let cells=props.cells.map((element,index)=>{
        return (
                
                <Cell key={index} element={element} status={props.status} flag={props.flag} checkForWinning={props.checkForWinning}  flags={props.flags} open={props.open} />
        )
    })
    return (
        <div className="row">
            {cells}
        </div>
    )
}
