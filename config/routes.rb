Rails.application.routes.draw do
  resources :events
  get 'calender/index'
  devise_for :users
  root to: 'posts#index'
  resources :posts, except: :index
  resources :users, only: :show
  resources :carendar, only: :index
end