class ShareChannel < ApplicationCable::Channel
  # def self.broadcast(comment)
  #   logger.info 'これ発火'
  #   ActionCable.server.broadcast("share_channel", Room.all)
  # end 

  # クライアントと接続されたとき
  def subscribed
    stream_from "share_channel_#{params[:id]}"
    logger.info 'share:接続した'
    send_firstmessage()
  end

  # 接続が解除されたときに実行される
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    logger.info 'share:接続切れた'
    stop_all_streams
  end

  def send_message(data)
    logger.info data #クラスはハッシュ
    logger.info data["message"][0]

    if (Room.find_by(name: data["message"][0])) then
      logger.info "ある"
      if (Room.find_by(name: data["message"][0]).user1.nil?) then
        Room.where(name: data["message"][0], user1: nil).update(user1:data["message"][1])
      elsif (Room.find_by(name: data["message"][0]).user2.nil?) then
        Room.where(name: data["message"][0], user2: nil).update(user2:data["message"][1])
      elsif (Room.find_by(name: data["message"][0]).user3.nil?) then
        Room.where(name: data["message"][0], user3: nil).update(user3:data["message"][1])
      else
        Room.where(name: data["message"][0], user4: nil).update(user4:data["message"][1])
      end      
    else
      room = Room.new(name:data["message"][0], user1:data["message"][1])
      if room.save
        logger.info "できた"
      else
        logger.info "できなかった"
      end
    end

    ActionCable.server.broadcast("share_channel_#{params[:id]}", Room.all)
  end

  def send_firstmessage()
    # これで渡せる
    ActionCable.server.broadcast("share_channel_#{params[:id]}", Room.all)
  end
end
