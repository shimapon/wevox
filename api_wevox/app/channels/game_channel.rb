class GameChannel < ApplicationCable::Channel
  $deck = Card.pluck(:title).shuffle
  $hands=[];
  $trash=[];

  def subscribed
    stream_from "game_channel_#{params[:id]}"
    logger.info 'game:接続した'    
  end

  def unsubscribed
    logger.info 'game:接続切れた'
  end

  def first_regis(data)
    logger.info 'game:firstregis'
    logger.info data["message"][0]
    $hands.push([data["message"][0],[$deck.pop,$deck.pop,$deck.pop,$deck.pop,$deck.pop]])
    ActionCable.server.broadcast("game_channel_#{params[:id]}", [$hands,$trash])
    logger.info $deck
    logger.info '----------'
    logger.info $hand
  end



  # 手番のプレイヤーに山札からランダムに1枚渡す
  def pushhand_fromdeck(data)
    if (data["message"][0]==$hands[0][0]) then
      $hands[0][1].push($deck.pop)
    elsif (data["message"][0]==$hands[1][0]) then
      $hands[1][1].push($deck.pop)
    elsif (data["message"][0]==$hands[2][0]) then
      $hands[2][1].push($deck.pop)
    elsif (data["message"][0]==$hands[3][0]) then
      $hands[3][1].push($deck.pop)
    end
    ActionCable.server.broadcast("game_channel_#{params[:id]}", [$hands,$trash])
  end

  # 手番のプレイヤーの捨てたカードを捨て札に加える
  # [手番のプレイヤーの名前，カード名]
  def pushtrash_fromhand(data)
    $trash.push(data["message"][1])
    if (data["message"][0]==$hands[0][0]) then
      $hands[0][1].delete(data["message"][1])
    elsif (data["message"][0]==$hands[1][0]) then
      $hands[1][1].delete(data["message"][1])
    elsif (data["message"][0]==$hands[2][0]) then
      $hands[2][1].delete(data["message"][1])
    elsif (data["message"][0]==$hands[3][0]) then
      $hands[3][1].delete(data["message"][1])
    end
    ActionCable.server.broadcast("game_channel_#{params[:id]}", [$hands,$trash])
  end

  # 手番のプレイヤーに捨て札から1枚渡す
  # [手番のプレイヤーの名前，カード名]
  def pushhand_fromtrash(data)
    $trash.delete(data["message"][1])
    if (data["message"][0]==$hands[0][0]) then
      $hands[0][1].push(data["message"][1])
    elsif (data["message"][0]==$hands[1][0]) then
      $hands[1][1].push(data["message"][1])
    elsif (data["message"][0]==$hands[2][0]) then
      $hands[2][1].push(data["message"][1])
    elsif (data["message"][0]==$hands[3][0]) then
      $hands[3][1].push(data["message"][1])
    end
    ActionCable.server.broadcast("game_channel_#{params[:id]}", [$hands,$trash])
  end

end
