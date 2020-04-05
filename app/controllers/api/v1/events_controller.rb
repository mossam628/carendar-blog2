require "#{Rails.root}/app/controllers/application_controller.rb"

module Api
  module V1
    class EventsController < ApplicationController

      # CSRF対策
      protect_from_forgery except: [:create, :update]

      def index
        @events = Event.order(:id).limit(params[:limit]).offset(params[:offset])
        json = @events
        render json: json.to_json 
      end

      def show
        @event = Event.find(params[:id])
        render json: @event.to_json and return
      end

      def edit
        @event = Event.find(params[:id])
      end

      def update
        @event = Event.find(params[:id])
        # event_params.require(:title)
        # event_params.require(:start)
        # event_params.require(:end)
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
        @event = Event.new
      end

      def create
        # event_params.require(:title)
        # event_params.require(:start)
        # event_params.require(:end)
        @event = Event.new(event_params)
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
        @event = Event.find(params[:id])
        @event.destroy
        render json: @event and return
      end
      
      private
      def event_params
        params[:event]
        .permit(
          :title,
          :start,
          :end
        ).merge(user_id: current_user.id)
      end
    end
  end
end

