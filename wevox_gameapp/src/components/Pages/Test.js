import React from 'react';
import '../../index.css';


class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          rooms:[["A部屋",2],["B部屋",1],["C部屋",1]],
          roomname:"",
          username:""
        }
      }

      handleAdd(i){
        console.log(i);
      }




  render(){
    return(
      <div>
<div className="title">
          <h1>wevox value card</h1>
        </div>
        <div className="yoko">
          <div className="p-roomlist">
            <p className="roomlist_title">部屋一覧</p>
            <div className="roomlist_label">
              <p>部屋名</p>
              <p className="roomlist_num">人数</p>
            </div>

              <div className="roomlist">
                <div>
                {this.state.rooms.map((room) => (
                  <div key={room}>
                    <li className="roomcard" onClick={(i)=>this.handleAdd(room[0])}>
                      <a href="#">{room[0]} {room[1]}人</a>
                    </li>
                  </div>
                ))}
                </div>
              </div>
          </div>
          <div className="p-form">
            <form onSubmit={this.handleSubmit} className="form2">
              <div className="form-label">
                <div className="form-roomname">
                    <p>部屋名:</p>
                    <input type="text" value={this.state.roomname} onChange={this.handleChange} />
                </div>
                <div className="nick-name">
                  <p>ニックネーム:</p>
                  <input type="text" value={this.state.username} onChange={this.handleChangeusername} />
                </div>
                
              </div>
              <div className="form-button">
                <input type="submit" value="部屋作成" />
                <input type="submit" value="部屋に参加" onClick={this.handleAlternate} className="aaa"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}


export default Test
