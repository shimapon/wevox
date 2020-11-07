class TeamsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "teams_channel_#{params[:id]}"
    logger.info 'teams:接続した'
    send_firstmessage()
  end

  def unsubscribed
    logger.info 'teams:接続切れた'
    stop_all_streams
  end


  def send_firstmessage()
    roomuser=[]
    @room = Room.find(params[:id])
    @roomuser = @room.createReturnArray

    ActionCable.server.broadcast("teams_channel_#{params[:id]}", 
    {
      name:@room.name,
      user1:@roomuser[0],
      user2:@roomuser[1],
      user3:@roomuser[2],
      user4:@roomuser[3],
    })
  end

  # ゲーム画面に遷移させる
  def back_toppage(data)
    deleteusername = data["message"][0]
    
    @room.deleteuserid(deleteusername)
    @roomuser = @room.createReturnArray

    ActionCable.server.broadcast("teams_channel_#{params[:id]}", 
    {
      name:@room.name,
      user1:@roomuser[0],
      user2:@roomuser[1],
      user3:@roomuser[2],
      user4:@roomuser[3],
    })
  end

  # ゲーム画面に遷移させる
  def move_gameapp(data)
    # 部屋を削除する
    Room.find_by(id: params[:id]).destroy
    ActionCable.server.broadcast("teams_channel_#{params[:id]}", "start")
  end
end
