# json.array!(@events) do |event|
#   json.id "#{event.id}"
#   json.title "#{event.name}"
#   json.start event.start
#   json.end event.end
#   json.url root_url(format: :haml)
# end