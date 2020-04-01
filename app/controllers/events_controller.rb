require "#{Rails.root}/app/controllers/application_controller.rb"

module Api
  module V1
    class EventsController < ApplicationController
      load_and_authorize_resource
      # CSRF対策
      protect_from_forgery except: [:create, :update]

      def index
        @events = Events.order(:id).limit(params[:limit]).offset(params[:offset])
        json = @events
        render json: json.to_json
      end

      def show
        @event = Events.find(params[:id])
        render json: @event.to_json
      end

      def edit
        @event = Events.find(params[:id])
      end

      def update
        @event = Events.find(params[:id])
        event_params.require(:title)
        event_params.require(:start)
        event_params.require(:end)
        # event_params.require(:color)
        # event_params.require(:allday)
        respond_to do |format|
          format.any
          if @event.update!(event_params)
            @event.save
            render json: @event.to_json and return
          else
            render json: {status: "ng", code: 500, content: {message: "エラーだよ"}} and return
          end
        end
      end

      def new
        @event = Events.new
      end

      def create
        event_params.require(:title)
        event_params.require(:start)
        event_params.require(:end)
        # event_params.require(:color)
        event_params.require(:allday)
        @event = Events.new(event_params)
        respond_to do |format|
          format.any
          if @event.save!
            render json: @event and return
          else
            render json: {status: "ng", code: 500, content: {message: "エラーだよ"}} and return
          end
        end
      end

      def destroy
        @event = Events.find(params[:id])
        @event.destroy
        render json: @event and return
      end

      private
        def event_params
          params[:event]
          .permit(
            :title,
            :start,
            :end,
            :color,
            :allday
          )
        end
    end
  end
end

# before_action :set_event, only: [:show, :edit, :update, :destroy] #パラメータのidからレコードを特定するメソッド
# private
#         def set_event
#           @event = Event.find(params[:id])
#         end

#         def event_params
#           params.require(:event).permit( :title, :start, :end,).merge(user_id: current_user.id)
#         end