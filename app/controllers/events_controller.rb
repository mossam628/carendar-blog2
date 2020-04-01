class EventsController < ApplicationController
  before_action :set_event, only: [ :edit, :update, :destroy] #パラメータのidからレコードを特定するメソッド

  def index
    @user = User.find(params[:id])
    @events = Event.order(:id).limit(params[:limit]).offset(params[:offset])
    json = @events
    render json: json.to_json
  end


  def show
    @user = User.find(params[:id])
    @events = Event.where(user_id: @user.id)
    render json: @event.to_json
  end

  def new
    @event = Event.new
  end

  def edit
  end

  def create
    @event = Event.new(event_params)
    @event.save!
    @events = Event.where(user_id: current_user.id)
    end
  end

  def update
    @events = Event.where(user_id: current_user.id)
    @event.update(event_params)
  end

  def destroy
    @user = User.find(params[:id])
    @event.destroy
    redirect_to user_path(@user)
  end

  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit( :title, :start, :end,).merge(user_id: current_user.id)
    end
end