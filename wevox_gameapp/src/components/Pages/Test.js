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
              <div class="div1">{card1[0]} </div>
              <div class="div2">{card1[1]} </div>
              <div class="div3">{card1[2]} </div>
              <div class="div4">{card1[3]} </div>
              <div class="div5">{card1[4]} </div>
              <div class="div6">{user1} の<br></br>価値観</div>
              <div class="div7">{card2[0]}</div>
              <div class="div8"> </div>
              <div class="div9"> </div>
              <div class="div10"> </div>
              <div class="div11"> </div>
              <div class="div12"> </div>
              <div class="div13"> </div>
              <div class="div14"> </div>
              <div class="div15"> </div>
              <div class="div16"> </div>
              <div class="div17"> </div>
              <div class="div18"> </div>
              <div class="div19"> </div>
              <div class="div20"> </div>
              <div class="div21"> </div>
              <div class="div22"> </div>
              <div class="div23"> </div>
              <div class="div24"> </div>
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
