require 'rails_helper'

describe 'PostAPI' do
 it '新しいpostを作成する' do
    valid_params = { title: 'titlegagaga' }

    #データが作成されている事を確認
    expect { post '/api/v1/posts', params: { post: valid_params } }.to change(Post, :count).by(+1)

    # リクエスト成功を表す200が返ってきたか確認する。
    expect(response.status).to eq(200)
  end
end
