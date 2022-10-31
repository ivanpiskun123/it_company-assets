Rails.application.routes.draw do




  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  get 'nominations/index'
  root 'pages#home'


  resources :bids, only: [:show,:index, :update, :destroy, :create ] do
    get 'opened_bids_count', on: :collection
  end

  resources :units, only: [:index, :destroy, :show, :update, :create]
  resources :bids, only: [:index, :create, :destroy, :update,]
  resources :users, only: [:index, :show, :update, :destroy]
  resources :nominations, only: [:index]

  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
  },
  controllers: {
    sessions: 'users/sessions',
  }


    get '/current_user', to: 'current_user#index'



    get '*path', to: redirect('/'), constraints: lambda { |req|
       req.path.exclude? 'rails/active_storage'
     }

end
