//設定例
$(document).ready(function() {

  var select = function(start, end) {
    var title = window.prompt("イベントを追加");
    start_time = start.unix()
    var d = new Date( start_time * 1000 );
    var year = d.getYear() + 1900;
    var month = d.getMonth() + 1;
    var day   = d.getDate();
    var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    var moment_start = year+"-"+month+"-"+day+" "+hour+":"+min;
    var start_time = moment(moment_start).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
    end_time = end.unix()
    var d = new Date( end_time * 1000 );
    var year = d.getYear() + 1900;
    var month = d.getMonth() + 1;
    var day   = d.getDate();
    var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    var moment_end = year+"-"+month+"-"+day+" "+hour+":"+min;
    var end_time = moment(moment_end).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
    // var user_id = user_signed_in? && current_user.id;
    var data = {
      event: {
        title: title,
        start: start_time,
        end: end_time,
        // user_id: user_id,
        allday: false
      }
    }
    $.ajax({
     type: "POST",
     url: "/events",
     data: data,
     success: function() {
       calendar.fullCalendar('refetchEvents'),
       alert("登録しました!");
     }
    });
    calendar.fullCalendar('unselect');
  };
  var calendar = $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    axisFormat: 'H:mm',
    timeFormat: 'H:mm',
    monthNames: ['１月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'],
    monthNamesShort: ['１月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'],
    dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
    dayNamesShort: ['日','月','火','水','木','金','土'],
    events: "/events",
    editable: true,        // 編集可
    selectable: true,      // 選択可
    selectHelper: true,    // 選択時にプレースホルダーを描画
    ignoreTimezone: false, // 自動選択解除
    select: select,        // 選択時に関数にパラメータ引き渡す
    buttonText: {
      prev:     '<',   // &lsaquo;
      next:     '>',   // &rsaquo;
      prevYear: '<<',  // &laquo;
      nextYear: '>>',  // &raquo;
      today:    '今日',
      month:    '月',
      week:     '週',
      day:      '日'
    },
    height: 800,                           // 高さ
    defaultView: 'agendaWeek',             // 初期表示ビュー
    eventLimit: true,                      // allow "more" link when too many events
    firstDay: 0,                           // 最初の曜日, 0:日曜日
    weekends: true,                        // 土曜、日曜を表示
    weekMode: 'fixed',                     // 週モード (fixed, liquid, variable)
    weekNumbers: false,                    // 週数を表示
    slotDuration: '00:30:00',              // 表示する時間軸の細かさ
    snapDuration: '00:15:00',              // スケジュールをスナップするときの動かせる細かさ
    minTime: "00:00:00",                   // スケジュールの開始時間
    maxTime: "24:00:00",                   // スケジュールの最終時間
    defaultTimedEventDuration: '10:00:00', // 画面上に表示する初めの時間(スクロールされている場所)
    allDaySlot: false,                     // 終日スロットを非表示
    allDayText:'allday',                   // 終日スロットのタイトル
    slotMinutes: 15,                       // スロットの分
    snapMinutes: 15,                       // 選択する時間間隔
    firstHour: 9,                          // スクロール開始時間
    eventClick: function(event) { //イベントをクリックしたときに実行
      var id = event.id
      var show_url = "/events/"+id
      location.href = show_url;
    },
    eventResize: function(event) { //イベントをサイズ変更した際に実行
      var id = event.id
      var update_url = "/api/v1/events/"+id
      var event_start_time = event._start._d
      var year = event_start_time.getYear() + 1900;
      var month = event_start_time.getMonth() + 1;
      var day   = event_start_time.getDate();
      var hour  = ( event_start_time.getHours()   < 10 ) ? '0' + event_start_time.getHours()   : event_start_time.getHours();
      var min   = ( event_start_time.getMinutes() < 10 ) ? '0' + event_start_time.getMinutes() : event_start_time.getMinutes();
      var moment_start = year+"-"+month+"-"+day+" "+hour+":"+min;
      var start_time = moment(moment_start).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
      var event_end_time = event._end._d
      var year = event_end_time.getYear() + 1900;
      var month = event_end_time.getMonth() + 1;
      var day   = event_end_time.getDate();
      var hour  = ( event_end_time.getHours()   < 10 ) ? '0' + event_end_time.getHours()   : event_end_time.getHours();
      var min   = ( event_end_time.getMinutes() < 10 ) ? '0' + event_end_time.getMinutes() : event_end_time.getMinutes();
      var moment_end = year+"-"+month+"-"+day+" "+hour+":"+min;
      var end_time = moment(moment_end).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
      var data = {
        event: {
          title: event.title,
          start: start_time,
          end: end_time,
          allday: false
        }
      }
      $.ajax({
       type: "PATCH",
       url: update_url,
       data: data,
       success: function() {
        calendar.fullCalendar('refetchEvents');
       }
      });
      calendar.fullCalendar('unselect');
    },
    eventDrop: function(event) { //イベントをドラッグ&ドロップした際に実行
      var id = event.id
      var update_url = "/api/v1/events/"+id
      var event_start_time = event._start._d
      var year = event_start_time.getYear() + 1900;
      var month = event_start_time.getMonth() + 1;
      var day   = event_start_time.getDate();
      var hour  = ( event_start_time.getHours()   < 10 ) ? '0' + event_start_time.getHours()   : event_start_time.getHours();
      var min   = ( event_start_time.getMinutes() < 10 ) ? '0' + event_start_time.getMinutes() : event_start_time.getMinutes();
      var moment_start = year+"-"+month+"-"+day+" "+hour+":"+min;
      var start_time = moment(moment_start).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
      var event_end_time = event._end._d
      var year = event_end_time.getYear() + 1900;
      var month = event_end_time.getMonth() + 1;
      var day   = event_end_time.getDate();
      var hour  = ( event_end_time.getHours()   < 10 ) ? '0' + event_end_time.getHours()   : event_end_time.getHours();
      var min   = ( event_end_time.getMinutes() < 10 ) ? '0' + event_end_time.getMinutes() : event_end_time.getMinutes();
      var moment_end = year+"-"+month+"-"+day+" "+hour+":"+min;
      var end_time = moment(moment_end).add(-9, 'hour').format("YYYY-MM-DD HH:mm");
      var data = {
        event: {
          title: event.title,
          start: start_time,
          end: end_time,
          allday: false
        }
      }
      $.ajax({
       type: "PATCH",
       url: update_url,
       data: data,
       success: function() {
         calendar.fullCalendar('refetchEvents');
       }
      });
      calendar.fullCalendar('unselect');
    }
  });
});

// $(document).ready(function() {
//   create_event = function(title, start, end){
//     $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
//       var token;
//       if (!options.crossDomain) {
//         token = $('meta[name="csrf-token"]').attr('content');
//         if (token) {
//           return jqXHR.setRequestHeader('X-CSRF-Token', token);
//         }
//       }
//     });
//     $.ajax({
//       type: "GET",
//       url: "/events",
//       data: {
//         title: title,
//         start: start.toISOString(),
//         end: end.toISOString()
//       },
//     }).done(function(){
//       alert("登録しました!"),
//       calendar.fullCalendar('refetchEvents');
//     }).fail(function(){
//       alert("登録できませんでした。");
//     });
//   };

//   $('#calendar').fullCalendar({
//     header: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'month,agendaWeek,agendaDay'
//     },
//     navLinks: true,
//     selectable: true,
//     selectHelper: true,
//     select: function(start, end) {
//       var title = prompt('イベントを追加');
//       var eventData;
//       if (title) {
//         eventData = {
//           title: title,
//           start: start,
//           end: end
//         };
//         $('#calendar').fullCalendar('renderEvent', eventData, true);
//         $('#calendar').fullCalendar('unselect');
//         create_event(title, start, end);
//       }
//     },
//     height: 800,
//     axisFormat: 'H:mm',
//     timeFormat: 'H:mm',
//     timezone: 'UTC',
//     events: '/events.json',
//     editable: true
//   });

// });


// //設定例
// $(document).ready(function() {
//   var now = moment();
//   console.log(now.toDate()); // Dateオブジェクトが返される
//   var select = function(title, start, end) {
//     var title = window.prompt("title");
//       start = start.unix()
//     var d = new Date( start * 1000 );
//     var year = d.getYear() + 1900;
//     var month = d.getMonth() + 1;
//     var day   = d.getDate();
//     var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
//     var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
//     var moment_start = year+"-"+month+"-"+day+" "+hour+":"+min;
//     var start = moment(moment_start).add(-9, 'hour').format();
//       end = end
//     var d = new Date( end * 1000 );
//     var year = d.getYear() + 1900;
//     var month = d.getMonth() + 1;
//     var day   = d.getDate();
//     var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
//     var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
//     var moment_end = year+"-"+month+"-"+day+" "+hour+":"+min;
//     var end = moment(moment_end).add(-9, 'hour').format();
//     var data = {
//       event: {
//         title: title,
//         start: start,
//         end: end,
//       }
//     }
//     $.ajax({
//      type: "GET",
//      url: "/events",
//      data: data,
//      success: function() {
//        calendar.fullCalendar('refetchEvents');
//      }
//     });
//     calendar.fullCalendar('unselect');
//   };
//   var calendar = $('#calendar').fullCalendar({
//     header: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'month,agendaWeek,agendaDay'
//     },
//     axisFormat: 'H:mm',
//     timeFormat: 'H:mm',
//     monthNames: ['１月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'],
//     monthNamesShort: ['１月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'],
//     dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
//     dayNamesShort: ['日','月','火','水','木','金','土'],
//     events: "/events",
//     editable: true,        // 編集可
//     selectable: true,      // 選択可
//     selectHelper: true,    // 選択時にプレースホルダーを描画
//     ignoreTimezone: false, // 自動選択解除
//     select: select,        // 選択時に関数にパラメータ引き渡す
//     buttonText: {
//       prev:     '<',   // &lsaquo;
//       next:     '>',   // &rsaquo;
//       prevYear: '<<',  // &laquo;
//       nextYear: '>>',  // &raquo;
//       today:    '今日',
//       month:    '月',
//       week:     '週',
//       day:      '日'
//     },
//     height: 800,                           // 高さ
//     defaultView: 'agendaWeek',             // 初期表示ビュー
//     eventLimit: true,                      // allow "more" link when too many events
//     firstDay: 0,                           // 最初の曜日, 0:日曜日
//     weekends: true,                        // 土曜、日曜を表示
//     weekMode: 'fixed',                     // 週モード (fixed, liquid, variable)
//     weekNumbers: false,                    // 週数を表示
//     slotDuration: '00:30:00',              // 表示する時間軸の細かさ
//     snapDuration: '00:15:00',              // スケジュールをスナップするときの動かせる細かさ
//     minTime: "00:00:00",                   // スケジュールの開始時間
//     maxTime: "24:00:00",                   // スケジュールの最終時間
//     defaultTimedEventDuration: '10:00:00', // 画面上に表示する初めの時間(スクロールされている場所)
//     allDaySlot: false,                     // 終日スロットを非表示
//     allDayText:'allday',                   // 終日スロットのタイトル
//     slotMinutes: 15,                       // スロットの分
//     snapMinutes: 15,                       // 選択する時間間隔
//     firstHour: 9,                          // スクロール開始時間
//     eventClick: function(event) { //イベントをクリックしたときに実行
//       var id = event.id
//       var show_url = "/events"+id
//       location.href = show_url;
//     },
//     eventResize: function(event) { //イベントをサイズ変更した際に実行
//       var id = event.id
//       var update_url = "/events"+id
//       var event_start_time = event._start._d
//       var year = event_start_time.getYear() + 1900;
//       var month = event_start_time.getMonth() + 1;
//       var day   = event_start_time.getDate();
//       var hour  = ( event_start_time.getHours()   < 10 ) ? '0' + event_start_time.getHours()   : event_start_time.getHours();
//       var min   = ( event_start_time.getMinutes() < 10 ) ? '0' + event_start_time.getMinutes() : event_start_time.getMinutes();
//       var moment_start = year+"-"+month+"-"+day+" "+hour+":"+min;
//       var start = moment(moment_start).add(-9, 'hour').toISOString();
//       var event_end_time = event._end._d
//       var year = event_end_time.getYear() + 1900;
//       var month = event_end_time.getMonth() + 1;
//       var day   = event_end_time.getDate();
//       var hour  = ( event_end_time.getHours()   < 10 ) ? '0' + event_end_time.getHours()   : event_end_time.getHours();
//       var min   = ( event_end_time.getMinutes() < 10 ) ? '0' + event_end_time.getMinutes() : event_end_time.getMinutes();
//       var moment_end = year+"-"+month+"-"+day+" "+hour+":"+min;
//       var end = moment(moment_end).add(-9, 'hour').toISOString();
//       var data = {
//         event: {
//           title: event.title,
//           start: start,
//           end: end,
//         }
//       }
//       $.ajax({
//        type: "PATCH",
//        url: update_url,
//        data: data,
//        success: function() {
//          calendar.fullCalendar('refetchEvents');
//        }
//       });
//       calendar.fullCalendar('unselect');
//     },
//     eventDrop: function(event) { //イベントをドラッグ&ドロップした際に実行
//       var id = event.id
//       var update_url = "/events"+id
//       var event_start_time = event._start._d
//       var year = event_start_time.getYear() + 1900;
//       var month = event_start_time.getMonth() + 1;
//       var day   = event_start_time.getDate();
//       var hour  = ( event_start_time.getHours()   < 10 ) ? '0' + event_start_time.getHours()   : event_start_time.getHours();
//       var min   = ( event_start_time.getMinutes() < 10 ) ? '0' + event_start_time.getMinutes() : event_start_time.getMinutes();
//       var moment_start = year+"-"+month+"-"+day+" "+hour+":"+min;
//       var start = moment(moment_start).add(-9, 'hour').toISOString();
//       var event_end_time = event._end._d
//       var year = event_end_time.getYear() + 1900;
//       var month = event_end_time.getMonth() + 1;
//       var day   = event_end_time.getDate();
//       var hour  = ( event_end_time.getHours()   < 10 ) ? '0' + event_end_time.getHours()   : event_end_time.getHours();
//       var min   = ( event_end_time.getMinutes() < 10 ) ? '0' + event_end_time.getMinutes() : event_end_time.getMinutes();
//       var moment_end = year+"-"+month+"-"+day+" "+hour+":"+min;
//       var end = moment(moment_end).add(-9, 'hour').toISOString() ;
//       var data = {
//         event: {
//           title: event.title,
//           start: start,
//           end: end,
//           allday: false
//         }
//       }
//       $.ajax({
//        type: "PATCH",
//        url: update_url,
//        data: data,
//        success: function() {
//          calendar.fullCalendar('refetchEvents');
//        }
//       });
//       calendar.fullCalendar('unselect');
//     }
//   });
// });