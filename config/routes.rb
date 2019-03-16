Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  root to: 'root#root'
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
  namespace 'api' do
    namespace 'v1' do
      resources :words, only: [:index, :update]
      post '/invoice', to: 'lnd#invoice'
    end
  end
end
