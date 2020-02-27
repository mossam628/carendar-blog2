Rails.application.routes.draw do
  get 'calender/index'
  devise_for :users
  root to: 'posts#index'
  resources :posts, except: :index
  resources :users, only: :show
  get 'events', to: 'event#show'
  post 'events/create', to: 'event#create'
end