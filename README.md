# wevox
TechTrainのmissionです．

> アトラエの組織改善プラットフォーム「wevox」(ウィボックス)から発売している  
>「wevox values card」をオンラインでプレイできるように開発していただきます。

TechTrain:https://techbowl.co.jp/techtrain  
ミッションページ:https://techbowl.co.jp/techtrain/missions/8  
wevox values card:https://wevox.io/valuescard

## Readme更新日
11/14 12:00

## 課題
・ゲームでの順番が入室順となっており，ユーザ側で決められない  
・ゲーム画面で他のユーザの操作が見られていない．（カードゲームではあまりこういう例はないように感じる)  
・[本番環境]reloadするとアクセスできなくなる   
・[本番環境]山札から2枚引いてしまう   

## アプリの動作
![wevox](https://user-images.githubusercontent.com/38938327/98434168-a23c8280-2110-11eb-911b-12822beb715a.gif)

## api_webox
**Rails**APIサーバーのファイル．  

[Model]の依存関係  
room.rb  
```ruby
class Room < ApplicationRecord
    belongs_to :user1, class_name: 'User', optional: true
    belongs_to :user2, class_name: 'User', optional: true
    belongs_to :user3, class_name: 'User', optional: true
    belongs_to :user4, class_name: 'User', optional: true
end
```

user.rb  
```ruby
class User < ApplicationRecord
    has_one :room
    has_many :user_card
    has_many :card, through: :user_card
end
```

card.rb  
```ruby
class Card < ApplicationRecord
    has_many :user_card
    has_many :user, through: :user_card
end
```

user_card.rb: 中間テーブル  
```ruby
class UserCard < ApplicationRecord
    belongs_to :user, optional: true
    belongs_to :card, optional: true
end
```
  
[Action Cable:CHANNEL]  
・**ShareChannel**: 部屋選択画面で用いる  
・**TeamsChannel**: 部屋待機画面で用いる  
・**GameChannel**: ゲーム画面で用いる  

## webox_gameapp
**React**のフロントアプリ．  
React コンポーネントで ActionCable チャンネルを購読できるようにするパッケージを使用  
https://github.com/cpunion/react-actioncable-provider

## 画面遷移とページコンポーネント
<img src="https://user-images.githubusercontent.com/38938327/96357973-35e7e800-113d-11eb-8fac-02c64d9fc5da.png" width=100%>

## DB設計(Rails Model)
Room

| id | name | created_at | updated_at | user1_id | user2_id | user3_id | user4_id |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |------------- | 
|  1 | 部屋A  | .  | .  | 1| 2  | NULL  | NULL  | 
|...|...|...|...|...|...|...|...|

Card
| id | title | created_at | updated_at | 
| ------------- | ------------- | ------------- | ------------- | 
| 1  |  ロジック・論理 | 2020-09-26 16:39:24  |  2020-09-26 16:39:24 | 
|  2 | エモーション・感情          | 2020-09-26 16:39:24 | 2020-09-26 16:39:24 |
|  3 | グローバル                  | 2020-09-26 16:39:24 | 2020-09-26 16:39:24 |
|...|...|...|...|
| 58 | 責任感                      | 2020-09-26 16:39:24 | 2020-09-26 16:39:24 |
| 59 | 最先端                      | 2020-09-26 16:39:24 | 2020-09-26 16:39:24 |
| 60 | 経験                        | 2020-09-26 16:39:24 | 2020-09-26 16:39:24 |

User (Room user*_idと依存関係)
| id | name | created_at | updated_at |
| ------------- | ------------- | ------------- | ------------- |
|  1 | tarou  | .  | .  |
|  2 | 次郎  | .  | .  |
|...|...|...|...|

UserCard (Card，Userと依存関係)
| id | user_id | card_id | created_at | updated_at |
| ------------- | ------------- | ------------- | ------------- | ------------- |
|  1 | 1  | 2  | .  |.  |
|  2 | 1  | 3  | .  |.  |
|  3 | 2  | 17  | .  |.  |
|  4 | 4  | 29  | .  |.  |
|...|...|...|...|...|


## 画面設計
<img src="https://user-images.githubusercontent.com/38938327/94405949-3d564a00-01ac-11eb-9e17-e34d28ac12e5.png" width=40%><img src="https://user-images.githubusercontent.com/38938327/94406086-75f62380-01ac-11eb-9e77-011088df279b.png" width=40%>
<img src="https://user-images.githubusercontent.com/38938327/94406093-78f11400-01ac-11eb-98ec-66aa90a6f710.png" width=40%><img src="https://user-images.githubusercontent.com/38938327/94406099-7b536e00-01ac-11eb-9bee-9e9e4ffccc5b.png" width=40%>


## サーバとの通信フロー
<img src="https://user-images.githubusercontent.com/38938327/94406729-6aefc300-01ad-11eb-8599-5f92b0e0366a.png" width=40%>

## コンポーネント設計  
Atomic Designに基づく  
<img src="https://user-images.githubusercontent.com/38938327/94406105-7d1d3180-01ac-11eb-8a41-ca73a8013e07.png" width=40%><img src="https://user-images.githubusercontent.com/38938327/94406107-7d1d3180-01ac-11eb-913a-8ceb6a66eb2b.png" width=40%>
<img src="https://user-images.githubusercontent.com/38938327/94406109-7db5c800-01ac-11eb-951a-d8bb49571743.png" width=40%><img src="https://user-images.githubusercontent.com/38938327/94406130-84443f80-01ac-11eb-94a6-55d2b660d638.png" width=40%>

# 開発での考案

## User,Roomのテーブルを繋ぐ中間テーブルが必要？
メリット：ゲームの人数に制限がない
Userモデル：　User情報  
Roomモデル：  4人以下が所属するRoom  
Entryモデル：　どのUserがどのRoomに所属しているか  

room.rb  
```ruby
class Room < ApplicationRecord
  has_many :entries, dependent: :destroy
  has_many :room, through: :entries
end
```

user.rb  
```ruby
class User < ApplicationRecord
  has_many :entries, dependent: :destroy
  has_many :user, through: :entries
end
```  
中間テーブル:entry.rb  
```ruby
class Entry < ApplicationRecord
  belongs_to :user
  belongs_to :room
end
```


