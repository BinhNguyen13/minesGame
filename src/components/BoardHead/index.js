import React from 'react'

export default function BoardHead(props) {
    // let minutes =Math.floor(props.time/60)
    // let seconds= props.time-minutes*60||0;
    // let formattedSeconds=seconds<10?`0${seconds}`:seconds;
    // let time=`${minutes}:${formattedSeconds}`
    return (
        <div className="boardHead">
            <div  className="boardHead__flagCount">{props.flagCount} Flags</div>
            {/* <button onClick={props.reset} className="boardHead__reset">Reset</button> */}
            {/* <div className="boardHead__timer">{time}</div> */}
        </div>
    )
}
