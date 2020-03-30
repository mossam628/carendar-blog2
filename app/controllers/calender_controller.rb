class CalenderController < ApplicationController
  def index
  end
  def show
    @events = Event.where(user_id: current_user.id)
    respond_to do |format|
      format.html # index.html.erb
      format.xml { render :xml => @events }
      format.json {
        render json:
        @events.to_json(only: [:title, :start, :end])
      }
    end
  end
end
