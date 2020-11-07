class ShareChannel < ApplicationCable::Channel

  # クライアントと接続されたとき
  def subscribed
    stream_from "share_channel"
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

    user = User.new(name:data["message"][1])
    if user.save
      logger.info "user作成できた"
    else
      logger.info "user作成できなかった"
    end

<<<<<<< Updated upstream
=======
    # Roomのuser_idで空いているところに左詰する
    @enterRoom = Room.find_by(name: roomname)
>>>>>>> Stashed changes

    # Roomのuser_idで空いているところに左詰する
    # もう少し上手い書き方がありそう?
    if (Room.find_by(name: data["message"][0])) then
      logger.info "ある"
      if (Room.find_by(name: data["message"][0]).user1_id.nil?) then
        Room.where(name: data["message"][0], user1_id: nil).update(user1_id:user.id)
      elsif (Room.find_by(name: data["message"][0]).user2_id.nil?) then
        Room.where(name: data["message"][0], user2_id: nil).update(user2_id:user.id)
      elsif (Room.find_by(name: data["message"][0]).user3_id.nil?) then
        Room.where(name: data["message"][0], user3_id: nil).update(user3_id:user.id)
      else
        Room.where(name: data["message"][0], user4_id: nil).update(user4_id:user.id)
      end
    else
      room = Room.new(name:data["message"][0], user1_id:user.id)
      if room.save!
        logger.info "room作成できた"
      else
        logger.info "room作成できなかった"
      end
    end

    ActionCable.server.broadcast("share_channel", Room.all)
  end

  def send_firstmessage()
    # これで渡せる
    ActionCable.server.broadcast("share_channel", Room.all)
  end
end
