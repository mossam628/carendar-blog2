$(document).ready(function() {
  $('#calendar').fullCalendar({
    defaultDate: '2018-03-20',
    events: [
      {
        title: '来客',
        start: '2018-03-20'
      },
      {
        title: '旅行',
        start: '2018-03-25T06:00:00',
        end: '2018-03-30T22:00:00'
      }
    ]
  })
  });