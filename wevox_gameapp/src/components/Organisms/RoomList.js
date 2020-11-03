import React from 'react';
import '../../index.css';
import List from '../Molecules/List';
import Text from '../Atoms/Text'
import RoomLabel from '../Molecules/RoomLabel'


// 手札のコンポーネント
class RoomList extends React.Component {
    render() {
        return (
            <div className="o-roomlist">
                <div className="o-roomlist-title">
                    <Text
                        value="部屋一覧"
                    />
                </div>
                <div className="o-roomlist-label">
                    <RoomLabel/>
                </div>
                <ListningRoom rooms={this.props.rooms} onClick={(i)=>this.props.onClick(i)}/>
            </div>
        );
  }
}

export default RoomList;



function ListningRoom(props) {
    const rooms = props.rooms;
    if (rooms.length===0) {
      return <NotExistRoom />;
    }
    return <ExistRoom rooms={props.rooms} onClick={(i)=>props.onClick(i)}/>;
}
  
  
function NotExistRoom(props) {
    return(
        <div className="listning-roomlist">
            <List
                value="部屋が立てられていません"
            />
        </div>
    )
}
  
function ExistRoom(props) {
    return(
      <div className="listning-roomlist">
        {props.rooms.map((room) => (
            <div key={room}>
                <li onClick={(i)=>props.onClick(room[1])}>
                    <a><div className="justified-right">{room[2]}人</div>{room[1]}</a>
                </li>
            </div>
        ))}
      </div>
    )

}
