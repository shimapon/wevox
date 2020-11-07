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
<<<<<<< Updated upstream
    logger.info 'game:firstregis'
    logger.info data["message"][0]

    $hash_trash[params[:id]]=[]

    if $hash_deck.has_key?(params[:id]) then
      # すでにデッキが作成されている
      hand=[]
      for _ in 0..4
        hand.push($hash_deck[params[:id]].pop)
      end

      $hash_hands[params[:id]].push([data["message"][0],hand])
    else
      #デッキを作成する
      deck = Card.pluck(:title).shuffle

      hand=[]
      for _ in 0..4
        hand.push(deck.pop)
      end
      
      $hash_deck[params[:id]]=deck
      $hash_hands[params[:id]]=
      [
        [data["message"][0],hand]
      ]
    end

    ActionCable.server.broadcast("game_channel_#{params[:id]}", [0, $hash_hands[params[:id]], [], $hash_deck[params[:id]].length])
  end



  # 手番のプレイヤーに山札からランダムに1枚渡す
  def pushhand_fromdeck(data)
    player_index=data["message"][0]
    player_name=data["message"][1]


    if (player_name==$hash_hands[params[:id]][0][0]) then
      $hash_hands[params[:id]][0][1].push($hash_deck[params[:id]].pop)
    elsif (player_name==$hash_hands[params[:id]][1][0]) then
      $hash_hands[params[:id]][1][1].push($hash_deck[params[:id]].pop)
    elsif (player_name==$hash_hands[params[:id]][2][0]) then
      $hash_hands[params[:id]][2][1].push($hash_deck[params[:id]].pop)
    elsif (player_name==$hash_hands[params[:id]][3][0]) then
      $hash_hands[params[:id]][3][1].push($hash_deck[params[:id]].pop)
=======
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
>>>>>>> Stashed changes
    end

<<<<<<< Updated upstream
  # 手番のプレイヤーの捨てたカードを捨て札に加える
  # [手番のプレイヤーの名前，カード名]
  def pushtrash_fromhand(data)
    player_index=data["message"][0]
    logger.info player_index.class
    player_name=data["message"][1]
    card_name=data["message"][2]


    $hash_trash[params[:id]].push(card_name)
    if (player_name==$hash_hands[params[:id]][0][0]) then
      $hash_hands[params[:id]][0][1].delete(card_name)
    elsif (player_name==$hash_hands[params[:id]][1][0]) then
      $hash_hands[params[:id]][1][1].delete(card_name)
    elsif (player_name==$hash_hands[params[:id]][2][0]) then
      $hash_hands[params[:id]][2][1].delete(card_name)
    elsif (player_name==$hash_hands[params[:id]][3][0]) then
      $hash_hands[params[:id]][3][1].delete(card_name)
    end

    player_index+=1


    ActionCable.server.broadcast("game_channel_#{params[:id]}", [player_index, $hash_hands[params[:id]], $hash_trash[params[:id]], $hash_deck[params[:id]].length])
=======
    deck_name = []
    for card in deck
      deck_name.push(Card.find(card).title)
    end

    ActionCable.server.broadcast("game_channel_#{params[:id]}", [0, deck_name, user_hand])
>>>>>>> Stashed changes
  end


<<<<<<< Updated upstream
    $hash_trash[params[:id]].delete(card_name)
    if (player_name==$hash_hands[params[:id]][0][0]) then
      $hash_hands[params[:id]][0][1].push(card_name)
    elsif (player_name==$hash_hands[params[:id]][1][0]) then
      $hash_hands[params[:id]][1][1].push(card_name)
    elsif (player_name==$hash_hands[params[:id]][2][0]) then
      $hash_hands[params[:id]][2][1].push(card_name)
    elsif (player_name==$hash_hands[params[:id]][3][0]) then
      $hash_hands[params[:id]][3][1].push(card_name)
    end
    ActionCable.server.broadcast("game_channel_#{params[:id]}", [player_index, $hash_hands[params[:id]], $hash_trash[params[:id]], $hash_deck[params[:id]].length])
=======
  # ゲーム中はフロントからのメッセージをそのまま送る
  def handle_game(data)
    order = data["message"][0]
    user = data["message"][1]
    card = data["message"][2]

    ActionCable.server.broadcast("game_channel_#{params[:id]}", [order, user, card])
>>>>>>> Stashed changes
  end

end
