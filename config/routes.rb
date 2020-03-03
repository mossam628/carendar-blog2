Rails.application.routes.draw do
  get 'events/index'
  get 'events/show'
  get 'events/new'
  get 'events/edit'
  get 'calender/index'
  devise_for :users
  root to: 'posts#index'
  resources :posts, except: :index
  resources :users, only: :show
  resources :carendar, only: :index
  resources :events, only: [:index,:show,:new,:create,:update,:edit,:destroy]
  get 'events', to: 'event#show'
  post 'events/create', to: 'event#create'
end