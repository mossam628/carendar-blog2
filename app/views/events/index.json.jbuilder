# json.array! @events, partial: "events/event", as: :event
# json.array!(@events) do |event|
#   json.extract! event, :id, :title, :description   
#   json.start event.start 
#   json.end event.end   
# end