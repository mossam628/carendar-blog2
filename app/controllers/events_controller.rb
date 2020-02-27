class EventController < ApplicationController
  before_action :set_event, only: [:show]
  def show
      @event = Event.find(params[:id])
      # render :json => @event
      respond_to do |format|
        format.json {
          render json:
          @event.to_json(
            only: [:title, :start, :end]
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
          only: [:title, :start, :end]
        )
      }
    end
  end

  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit( :title,:start,:end, ).merge(user_id: current_user.id)
    end
end

# class EventController < ApplicationController
#   def show
#     @event = Event.all
#     # render :json => @event
#     respond_to do |format|
#       format.json {
#         render json:
#         @event.to_json(
#           only: [:title, :start, :end]
#         )
#       }
#     end
#   end

#   def create
#     event = Event.new
#     event.attributes = {
#       title: params[:title],
#       start: params[:start],
#       end: params[:end],
#     }
#     event.save
#     respond_to do |format|
#       format.json {
#         render json:
#         @event.to_json(
#           only: [:title, :start, :end]
#         )
#       }
#     end
#   end
# end