class CalenderController < ApplicationController
  def index
    @events = Event.order(:id).limit(params[:limit]).offset(params[:offset])
    json = @events
    render json: json.to_json
  end
end
