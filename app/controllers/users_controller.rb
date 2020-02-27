class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @posts = @user.posts
    @events = Event.where(user_id: @user.id)
    @event = Event.new
  end
end
