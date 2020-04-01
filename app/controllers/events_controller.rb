class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy] #パラメータのidからレコードを特定するメソッド

  def index
    @events = Event.order(:id).limit(params[:limit]).offset(params[:offset])
    json = @events
    render json: json.to_json
  end
  
  def show
    @event = Event.find(params[:id])
    render json: @event.to_json
  end

  def new
    @event = Event.new
  end

  def edit
    @event = Event.find(params[:id])
  end


  def create
    event_params.require(:title)
    event_params.require(:start)
    event_params.require(:end)
    # event_params.require(:color)
    # event_params.require(:allday)
    @event = Event.new(event_params)
    @events = Event.where(user_id: current_user.id)
    respond_to do |format|
      format.any
      if @event.save!
        render json: @event
      else
        render json: {status: "ng", code: 500, content: {message: "エラーだよ"}}
      end
    end
  end

 
  def update
    @event = Event.find(params[:id])
    event_params.require(:title)
    event_params.require(:start)
    event_params.require(:end)
    # event_params.require(:color)
    # event_params.require(:allday)
    @events = Event.where(user_id: current_user.id)
    event.update(event_params)
    respond_to do |format|
      format.any
      if @event.update!(event_params)
        @event.save
        render json: @event.to_json
      else
        render json: {status: "ng", code: 500, content: {message: "エラーだよ"}}
      end
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    @user = User.find(params[:id])
    redirect_to user_path(@user)
  end


  def events
    @event = Event.all
    # render: json =&gt;@event
    respond_to do | format |
      format.json {
        render json:
        @event.to_json}
    end
  end

  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit( :title, :start, :end,).merge(user_id: current_user.id)
    end
end