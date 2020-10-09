class ShareChannel < ApplicationCable::Channel
  # def self.broadcast(comment)
  #   logger.info 'これ発火'
  #   ActionCable.server.broadcast("share_channel", Room.all)
  # end 

  # クライアントと接続されたとき
  def subscribed
    stream_from "share_channel_#{params[:id]}"
    # Room.all.each do |room|
    #   stream_for room 
    # end     
    # logger.info params[:id]
    tekitou()
  end

  # 接続が解除されたときに実行される
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    logger.info '接続切れたぞ'
    stop_all_streams
  end

  def speak(data)
    ActionCable.server.broadcast "share_channel", comment: data['message']
    logger.info 'speak発火'
  end

  def send_message(data)
    logger.info "来たぞ"
    logger.info data #クラスはハッシュ
    logger.info data["message"]

    room = Room.new(name:data["message"])
    if room.save
      logger.info "できた"
    else
      logger.info "できなかった"
    end

    ActionCable.server.broadcast("share_channel_#{params[:id]}", Room.all)
  end

  def tekitou()
    #data = {text: "Hello, World!"}
    # これで渡せる
    ActionCable.server.broadcast("share_channel_#{params[:id]}", Room.all)
  end
end
