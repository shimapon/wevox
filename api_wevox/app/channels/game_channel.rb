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
    @room = Room.find(params[:id])


    # 山札からRoomにいるユーザに5枚づつ配布して結果を受け取る
    user_hand, deck = @room.createReturnUsersHand(deck)

    deck_name = []
    # 変数deckがidの配列なので，そこからカードタイトルを入れた配列を生成する．
    # ※もっと楽にかけないか
    for card in deck
      deck_name.push(Card.find(card).title)
    end

    ActionCable.server.broadcast("game_channel_#{params[:id]}", [0, deck_name, user_hand])

  end


  # ゲーム中はフロントからのメッセージをそのまま送る，横流し
  def handle_game(data)
    order = data["message"][0]
    user = data["message"][1]
    card = data["message"][2]

    ActionCable.server.broadcast("game_channel_#{params[:id]}", [order, user, card])

  end

end
