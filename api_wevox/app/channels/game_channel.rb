class GameChannel < ApplicationCable::Channel

  def subscribed
    stream_from "game_channel_#{params[:id]}"
    logger.info 'game:接続した'
  end

  def unsubscribed
    logger.info 'game:接続切れた'
    Room.find_by(id: params[:id]).destroy
  end

  # 初めの手札配布．初めのindexを持つプレイヤーのみが接続する
  def first_regis(data)
    deck = Card.pluck(:id).shuffle
    room = Room.find(params[:id])
    user_hand=[]

    # 中間テーブルを作成する．
    for userid in [room.user1_id, room.user2_id, room.user3_id, room.user4_id]
      if(userid) then
        for _ in 0..4
          UserCard.create(user_id:userid, card_id:deck.pop)
        end
        user_hand.push(User.find(userid).card.pluck(:title))
      end
    end

    deck_name = []
    for card in deck
      deck_name.push(Card.find(card).title)
    end

    ActionCable.server.broadcast("game_channel_#{params[:id]}", [0, deck_name, user_hand])

  end


  # ゲーム中はフロントからのメッセージをそのまま送る
  def handle_game(data)
    order = data["message"][0]
    user = data["message"][1]
    card = data["message"][2]

    ActionCable.server.broadcast("game_channel_#{params[:id]}", [order, user, card])

  end

end
