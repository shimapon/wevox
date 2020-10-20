import React from 'react';
import '../../index.css';


let roomname="A部屋"
let user1="Eさん"
let user2="Fさん"
let user3="Gさん"
let user4="Hさん"
let card1=["耐震","目眩し","気付き","成程","マサカリ"]
let card2=["巻き戻し","マイク","ネコババ","のぞき","素面"]
let card3=["迷惑","繋がり","牢屋","迷走","戻る"]
let card4=["退ける","負ける","しつかり","闇","草"]


class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }

      }

      handleClickrestartbutton(){
        alert("リスタートします")
        this.props.history.push({
          //pathname: '/App/' + id,
          pathname: '/App',
          state: { myname: this.props.history.location.state.myname }
       })
      }

      handleClickexitbutton(){
        alert("退出します．")
        
       this.props.history.push({
          pathname: '/Top',          
       })

      }



  render(){
    return(
      <div>
          <header className="waitroomheader">
              部屋:{roomname}の結果
          </header>
          <div>
            <div className="parent">
              <div className="div1">{card1[0]} </div>
              <div className="div2">{card1[1]} </div>
              <div className="div3">{card1[2]} </div>
              <div className="div4">{card1[3]} </div>
              <div className="div5">{card1[4]} </div>
              <div className="div6">{user1} の<br></br>価値観</div>
              <div className="div7">{card2[0]} </div>
              <div className="div8">{card2[1]} </div>
              <div className="div9">{card2[2]} </div>
              <div className="div10">{card2[3]} </div>
              <div className="div11">{card2[4]} </div>
              <div className="div12">{user2} の<br></br>価値観</div>
              <div className="div13">{card3[0]} </div>
              <div className="div14">{card3[1]} </div>
              <div className="div15">{card3[2]} </div>
              <div className="div16">{card3[3]} </div>
              <div className="div17">{card3[4]} </div>
              <div className="div18">{user3} の<br></br>価値観</div>    
              <div className="div19">{card4[0]} </div>
              <div className="div20">{card4[1]} </div>
              <div className="div21">{card4[2]} </div>
              <div className="div22">{card4[3]} </div>
              <div className="div23">{card4[4]} </div>
              <div className="div24">{user4} の<br></br>価値観</div>                        
            </div>
            <div className="resultbutton">
              <div>
                <button onClick={this.handleClickrestartbutton}>もう一度</button> 
              </div>
              <div>
                <button onClick={this.handleClickexitbutton}>退出</button>
              </div>
            </div>
          </div>
      </div>
    )
  }
}


export default Test
