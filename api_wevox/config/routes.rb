Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :rooms
    end
  end
  namespace 'api' do
    namespace 'v1' do
      resources :posts
    end
  end

  mount ActionCable.server => '/cable'
end
