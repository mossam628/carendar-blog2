class EventController < ApplicationController
  def show
    @event = Event.find(params[:id])
    # render :json => @event
    respond_to do |format|
      format.json {
        render json:
        @event.to_json(
          only: [:id, :title, :start, :end]
        )
      }
    end
  end

  def create
    event = Event.new(event_params)
    event.attributes = {
      title: params[:title],
      start: params[:start],
      end: params[:end],
    }
    event.save
    respond_to do |format|
      format.json {
        render json:
        @event.to_json(
          only: [:id, :title, :start, :end]
        )
      }
    end
  end

  private
  def event_params
      params.require(:event).permit(:id, :title, :start, :end, :user_id).merge(user_id: current_user.id)
  end
end