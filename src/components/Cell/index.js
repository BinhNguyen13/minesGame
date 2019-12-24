import React from 'react'


export default function Cell(props) {
    let getStyle=()=>{
        if(props.element.isOpen){
            if(props.element.hasFlag&&props.element.hasMine&&props.status==='ended'){
                return 'cell cell--true'
            }else {
                return 'cell cell--open'
            }
        }else {
            if(props.element.hasFlag&&!props.element.hasMine&&props.status==='ended'){
                return 'cell cell--false'
            }
        }
        
    }
    let renderCell=()=>{
       
        return (
            <div className={getStyle()||'cell'} 
                onContextMenu={e=>{
                    e.preventDefault();
                    if(props.flags>0 && props.status!=='ended'){
                        props.flag(props.element)
                    }
                    
                    
                }}
                onClick={() => {
                    if(!props.element.hasFlag)
                    props.open(props.element);
                   
                }}>
                {props.element.count===0?'':<p>{props.element.count}</p>}
                {props.element.isOpen?'':props.element.hasFlag?<i className="fas fa-flag"></i>:''}
                {props.element.hasMine?<i className={props.element.isOpen?"fas fa-bomb":''}></i>:''}
                
            </div>
        )
        
    }
    return renderCell()
}
