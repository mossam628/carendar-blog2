json.array!(@event) do |event|
  json.id  event.id
  json.title event.title
  json.start event.start
  json.end event.end
  json.url root_url(format: :html)
end