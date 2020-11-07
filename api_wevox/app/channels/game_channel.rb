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

    user_hand, deck = @room.createReturnUsersHand(deck)

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
