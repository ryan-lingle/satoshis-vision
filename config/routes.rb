Rails.application.routes.draw do
  devise_for :users

  mount ActionCable.server => '/cable'

  root to: 'root#root'

  authenticate :user do
    get 'admin', to: 'admin#edits'
  end

  namespace 'api' do
    namespace 'v1' do
      resources :words, only: [:index, :update]
      post '/invoice', to: 'lnd#invoice'
    end
  end

   get "/404", to: "errors#not_found"
   get "/500", to: "errors#internal_error"
end
