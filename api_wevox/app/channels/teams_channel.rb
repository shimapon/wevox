class TeamsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "teams_channel_#{params[:id]}"
    logger.info 'teams:接続した'
    send_firstmessage()
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    logger.info 'teams:接続切れた'
    stop_all_streams
  end


  def send_firstmessage()
    roomuser=[]
    room = Room.find(params[:id])

    for num in [room.user1, room.user2, room.user3, room.user4] do
      if num then
        roomuser.push(num.name)
      else
        roomuser.push(nil)
      end
    end


    ActionCable.server.broadcast("teams_channel_#{params[:id]}", 
    {
      name:Room.find(params[:id]).name,
      user1:roomuser[0],
      user2:roomuser[1],
      user3:roomuser[2],
      user4:roomuser[3],
    })
  end

  # ゲーム画面に遷移させる
  def move_gameapp(data)
    ActionCable.server.broadcast("teams_channel_#{params[:id]}", "start")
  end
end
