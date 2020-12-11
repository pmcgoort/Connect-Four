import React, { Component } from 'react';

class ConnectFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [[0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [6,6,6,6,6,6,6]],
      turn: 1,
      message: ''
    }
    this.add = this.add.bind(this)
    this.check = this.check.bind(this)
    this.clear = this.clear.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(n){
    if(n.keyCode === 97 || n.keyCode === 49){
      document.getElementById('col-0').click()
    } else if(n.keyCode === 98 || n.keyCode === 50){
      document.getElementById('col-1').click()
    } else if(n.keyCode === 99 || n.keyCode === 51){
      document.getElementById('col-2').click()
    } else if(n.keyCode === 100 || n.keyCode === 52){
      document.getElementById('col-3').click()
    } else if(n.keyCode === 101 || n.keyCode === 53){
      document.getElementById('col-4').click()
    } else if(n.keyCode === 102 || n.keyCode === 54){
      document.getElementById('col-5').click()
    } else if(n.keyCode === 103 || n.keyCode === 55){
      document.getElementById('col-6').click()
    } else if(n.keyCode === 46){
      document.getElementById('clear').click()
    }
  }

  add = (col) => () => {

    var board = [...this.state.board]

    if(board[6][col] > 0){
      board[6][col]--

      board[board[6][col]][col] = this.state.turn
      this.setState((state) => ({
        board: board,
        turn: (state.turn === 1 ? 2 : 1),
        message: ''
      }))

      this.check()
    }
  }

  check(){
    var board = [...this.state.board]
    /*horizontal check*/
    for(let i = 0; i < 6; i++){
      for(let j = 0; j < 4; j++){
        if(board[i][j] !== 0 && board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2] && board[i][j] === board[i][j + 3]){
          if(this.state.turn === 2){
            this.setState({
              message: 'Black Wins!'
            })
          } else {
            this.setState({
              message: 'Red Wins'
            })
          }
        }
      }
    }
    /*vertical check*/
    for(let i = 0; i < 6; i++){
      for(let j = 0; j < 3; j++){
        if(board[j][i] !== 0 && board[j][i] === board[j + 1][i] && board[j][i] === board[j + 2][i] && board[j][i] === board[j + 3][i]){
          if(this.state.turn === 2){
            this.setState({
              message: 'Black Wins!'
            })
          } else {
            this.setState({
              message: 'Red Wins'
            })
          }
        }
      }
    }
      /*right diagonal check*/
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 4; j++){
          if(board[i][j] !== 0 && board[i][j] === board[i + 1][j + 1] && board[i][j] === board[i + 2][j + 2] && board[i][j] === board[i + 3][j + 3]){
            if(this.state.turn === 2){
              this.setState({
                message: 'Black Wins!'
              })
            } else {
              this.setState({
                message: 'Red Wins'
              })
            }
          }
        }
      }
      /*left diagonal check*/
      for(let i = 0; i < 3; i++){
        for(let j = 3; j < 7; j++){
          if(board[i][j] !== 0 && board[i][j] === board[i + 1][j - 1] && board[i][j] === board[i + 2][j - 2] && board[i][j] === board[i + 3][j - 3]){
            if(this.state.turn === 2){
              this.setState({
                message: 'Black Wins!'
              })
            } else {
              this.setState({
                message: 'Red Wins'
              })
            }
          }
        }
      }

      /*completed board*/
      for(let i = 0; i < 6; i++){
        for(let j = 0; j < 7; j++){
          if(board[i][j] === 0){
            return
          }
        }
      }
      this.setState({
        message: 'Tie'
      })
  }


  clear(){
    this.setState({
      board: [[0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [6,6,6,6,6,6,6]],
      turn: 1,
      message: ''
    })
  }

  render(){
    const board = this.state.board
    if(this.state.turn === 1){
      var turnClass = 'space-1'
    } else {
      turnClass = 'space-2'
    }

    /**/
    if(this.state.message == ''){
    return (
      <div id="main">
        <a id="col-0" class="button" onClick={this.add(0)}></a>
        <a id="col-1" class="button" onClick={this.add(1)}></a>
        <a id="col-2" class="button" onClick={this.add(2)}></a>
        <a id="col-3" class="button" onClick={this.add(3)}></a>
        <a id="col-4" class="button" onClick={this.add(4)}></a>
        <a id="col-5" class="button" onClick={this.add(5)}></a>
        <a id="col-6" class="button" onClick={this.add(6)}></a>
        <button id="clear" onClick={this.clear}>Start Over</button>
        <div/>

        {
          board.map((j, jndex) => {
            return(
              <div class='gap'>
                {
                  j.map((i, index) => {
                    if(jndex !== 6){
                    var classId
                    if(i === 0){
                      classId = 'space-0'
                    } if(i === 1){
                      classId = 'space-1'
                    } else if(i === 2){
                      classId = 'space-2'
                    }
                    return(
                      <div class='empty row'>
                        <div class={classId}/>
                      </div>
                    )}
                  })
                }
              </div>
            )
          })
        }
        <div id='turn' class={turnClass}/>
      </div>
    )
  } else{
    return (
      <div id="main">
        <a id="col-0" class="button"></a>
        <a id="col-1" class="button"></a>
        <a id="col-2" class="button"></a>
        <a id="col-3" class="button"></a>
        <a id="col-4" class="button"></a>
        <a id="col-5" class="button"></a>
        <a id="col-6" class="button"></a>
        <button id="clear" onClick={this.clear}>Start Over</button>
        <div/>

        {
          board.map((j, jndex) => {
            return(
              <div class='gap'>
                {
                  j.map((i, index) => {
                    if(jndex !== 6){
                    var classId
                    if(i === 0){
                      classId = 'space-0'
                    } if(i === 1){
                      classId = 'space-1'
                    } else if(i === 2){
                      classId = 'space-2'
                    }
                    return(
                      <div class='empty row'>
                        <div class={classId}></div>
                      </div>
                    )}
                  })
                }
              </div>
            )
          })
        }

        <p id='message'>{this.state.message}</p>
      </div>
    )
  }
  }
}

export default ConnectFour;
