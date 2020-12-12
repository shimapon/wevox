class ShareChannel < ApplicationCable::Channel

  # クライアントと接続されたとき
  def subscribed
    stream_from "share_channel"
    logger.info 'share:接続した'
    ActionCable.server.broadcast("share_channel", Room.all)  
  end

  # 接続が解除されたときに実行される
  def unsubscribed
    logger.info 'share:接続切れた'
    stop_all_streams
  end


  # クライアントにメッセージを送る
  # ※記述をもう少し分けられる？
  def send_message(data)

    roomname = data["message"][0]
    username = data["message"][1]

    user = User.new(name:username)
    if user.save
      logger.info "user作成できた"
    else
      logger.info "user作成できなかった"

      # エラー処理
      logger.info user.errors.full_messages
      errorhandling()
      return false
    end

    # Roomのuser_idで空いているところに左詰する
    @enterRoom=Room.find_by(name: roomname)


    # 部屋が立てられている/部屋を立てる
    if (@enterRoom) then
      @enterRoomId=@enterRoom.pushuserid(user.id)
    else
      room = Room.new(name: roomname, user1_id: user.id)
      if room.save!
        logger.info "room作成できた"
      else
        logger.info "room作成できなかった"
        
        # エラー処理
        logger.info user.errors.full_messages
        errorhandling()
        return false
      end
    end

    ActionCable.server.broadcast("share_channel", Room.all)
  end


  # エラーの結果を返す
  def errorhandling()
    ActionCable.server.broadcast("share_channel", "入室に失敗しました．部屋名/ニックネームに間違いがないかご確認のうえ、再度操作してください。")
  end


end
