class CalenderController < ApplicationController
  def index
    @user = User.find(params[:id])
    @events = Event.order(:id).limit(params[:limit]).offset(params[:offset])
    json = @events
    render json: json.to_json
  end
end
