import React, { Component } from 'react'
import Row from '../Row/index'

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: []
        }
    }
    componentDidMount() {
        this.setState({
            board: this.createBoard(this.props)
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.flags !== this.props.flags)
            if (this.props.mines + this.props.openCells === this.props.columns * this.props.rows) {
                this.props.endGame()
                alert('you win, press reset btn to play again')

            }


    }
    reset = () => {
        let newBoard = this.createBoard(this.props)
        this.props.reset()
        this.setState({
            board: newBoard
        })
    }
    createBoard = props => {
        let board = []
        for (let i = 0; i < props.rows; i++) {
            board.push([])
            for (let j = 0; j < props.columns; j++) {
                board[i].push({
                    i: i,
                    j: j,
                    count: 0,
                    isOpen: false,
                    hasMine: false,
                    hasFlag: false,
                }
                )
            }

        }
        //Create mines
        for (let i = 0; i < props.mines; i++) {
            let randomRow = Math.floor(Math.random() * props.rows)
            let randomCol = Math.floor(Math.random() * props.columns)
            let cell = board[randomRow][randomCol]

            if (cell.hasMine) {
                i--;
            } else {
                cell.hasMine = true;
            }
        }
        return board
    }
    openAllMines=()=>{
        let rows = [];
        for (let i = 0; i < this.state.board.length; i++) {
            rows[i] = [...this.state.board[i]]
        }
        for(let i=0;i<rows.length;i++){
            for(let j=0;j<rows[0].length;j++){
                if(rows[i][j].hasMine&&!rows[i][j].isOpen){
                    rows[i][j].isOpen=true
                }
            }
        }
        this.setState({
            board:rows
        })
    }
    open = cell => {
        if (this.props.status === 'ended') return

        let rows = [];
        for (let i = 0; i < this.state.board.length; i++) {
            rows[i] = [...this.state.board[i]]
        }
        let current = rows[cell.i][cell.j]
        let numberOfMines = this.findMines(cell);
        if (current.hasMine) {
            current.isOpen=true;
            this.setState({board:rows})
            this.openAllMines()
            this.props.endGame()
            alert('You lost this game, press reset to play again')
        } else {
            if (!cell.hasFlag && !cell.isOpen) {
                this.props.handleFirstCellClick();
                current.isOpen = true;
                current.count = numberOfMines
                this.setState({
                    board: rows
                })
                if (!current.hasMine && numberOfMines === 0) {
                    this.openCellDoNotHaveMineNearBy(cell)
                }
            }
        }
        // })

    }
    findMines = cell => {
        let minesInSurround = 0;
        let dr = [-1, -1, -1, 0, 1, 1, 1, 0]
        let dc = [-1, 0, 1, 1, 1, 0, -1, -1]
        for (let i = 0; i < 8; i++) {
            if (cell.i + dr[i] >= 0 && cell.j + dc[i] >= 0) {
                if (cell.i + dr[i] < this.state.board.length && cell.j + dc[i] < this.state.board[0].length) {
                    if (this.state.board[cell.i + dr[i]][cell.j + dc[i]].hasMine) {
                        minesInSurround++
                    }
                }
            }
        }
        return minesInSurround;
    }
    openCellDoNotHaveMineNearBy = cell => {
        let rows = [];
        for (let i = 0; i < this.state.board.length; i++) {
            rows[i] = [...this.state.board[i]]
        }
        let dr = [-1, -1, -1, 0, 1, 1, 1, 0]
        let dc = [-1, 0, 1, 1, 1, 0, -1, -1]
        for (let i = 0; i < 8; i++) {
            if (cell.i + dr[i] >= 0 && cell.j + dc[i] >= 0) {
                if (cell.i + dr[i] < this.state.board.length &&
                    cell.j + dc[i] < this.state.board[0].length) {
                    if (!this.state.board[cell.i + dr[i]][cell.j + dc[i]].hasMine && !rows[cell.i + dr[i]][cell.j + dc[i]].isOpen) {
                        this.open(rows[cell.i + dr[i]][cell.j + dc[i]])
                    }
                }
            }
        }
    }
    flag = cell => {
        let rows = [];
        for (let i = 0; i < this.state.board.length; i++) {
            rows[i] = [...this.state.board[i]]
        }
        let current = rows[cell.i][cell.j]
        current.hasFlag = !current.hasFlag
        this.props.changeFlagAmount(current.hasFlag ? -1 : 1)
        this.setState({
            board: rows
        })

    }
    render() {
        let rows = this.state.board.map((row, index) => {
            return (

                <Row key={index}
                    cells={row}
                    open={this.open}
                    flag={this.flag}
                    flags={this.props.flags}
                    checkForWinning={this.props.checkForWinning}
                    status={this.props.status}
                />
            )
        })
        return (
            <div className="board">
                <button onClick={() => this.reset()}>
                    reset
                </button>
                {rows}
            </div>
        )
    }
}
