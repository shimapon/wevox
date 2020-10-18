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
    # これで渡せる
    ActionCable.server.broadcast("teams_channel_#{params[:id]}", Room.where(id: params[:id]))
  end

  # ゲーム画面に遷移させる
  def move_gameapp(data)
    ActionCable.server.broadcast("teams_channel_#{params[:id]}", "start")
  end
end
