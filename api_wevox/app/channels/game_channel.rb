class GameChannel < ApplicationCable::Channel
  $hash_hands={};
  $hash_trash={};
  $hash_deck={};

  def subscribed
    stream_from "game_channel_#{params[:id]}"
    logger.info 'game:接続した'
  end

  def unsubscribed
    logger.info 'game:接続切れた'
  end

# 接続したプレイヤーに山札から5枚配布する
  def first_regis(data)
    logger.info 'game:firstregis'
    player_name = data["message"][0]

    $hash_trash[params[:id]]=[]

    if $hash_deck.has_key?(params[:id]) then
      # すでにデッキが作成されている
      hand=[]
      for _ in 0..4
        hand.push($hash_deck[params[:id]].pop)
      end

      $hash_hands[params[:id]].push([player_name,hand])
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
        [player_name, hand]
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
    end
    ActionCable.server.broadcast("game_channel_#{params[:id]}", [player_index, $hash_hands[params[:id]], $hash_trash[params[:id]], $hash_deck[params[:id]].length])
  end

  # 手番のプレイヤーの捨てたカードを捨て札に加える
  # [手番のプレイヤーの名前，カード名]
  def pushtrash_fromhand(data)
    player_index=data["message"][0]
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
  end

  # 手番のプレイヤーに捨て札から1枚渡す
  # [手番のプレイヤーの名前，カード名]
  def pushhand_fromtrash(data)
    player_index=data["message"][0]
    player_name=data["message"][1]
    card_name=data["message"][2]

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
  end

end
