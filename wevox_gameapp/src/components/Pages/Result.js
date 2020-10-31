import React from 'react';
import '../../index.css';
import MHeader from '../Molecules/Header';


class Result extends React.Component {
  componentDidMount(){
    console.log(this.props.history);
  }

  handleClickexitbutton(e){
    alert("退出します．")
    this.props.history.push('/Top')
  }

  render(){
    let message = this.props.history.location.state.owncards
    let cards=[]
    let username=[]

    for(var i=0;i<message.length;i++){
      cards.push(message[i][1])
      username.push(message[i][0])
    }

    console.log(cards);
    console.log(username);

    var list = [];


    for(var i=0;i<message.length;i++){
      list.push(<div className={"div"+String(6*i+1)}>{cards[i][0]} </div>);
      list.push(<div className={"div"+String(6*i+2)}>{cards[i][1]} </div>);
      list.push(<div className={"div"+String(6*i+3)}>{cards[i][2]} </div>);
      list.push(<div className={"div"+String(6*i+4)}>{cards[i][3]} </div>);
      list.push(<div className={"div"+String(6*i+5)}>{cards[i][4]} </div>);
      list.push(<div className={"div"+String(6*i+6)}>{username[i]} の<br></br>価値観</div>);
    }




    return(
      <div>
          <MHeader
              headertext={"結果"}
          />
          <div>
            <div className="parent">
              {list}                  
            </div>
            <div className="resultbutton">
              <div>
                <button onClick={(e)=>this.handleClickexitbutton(e)}>退出</button>
              </div>
            </div>
          </div>      
      </div>
    )
  }
}


export default Result
