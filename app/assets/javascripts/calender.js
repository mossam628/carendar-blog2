$(document).ready(function() {
  $('#calendar').fullCalendar({
    editable: true
    
  });
  //設定例

  var select = function(start, end) {
    var title = window.prompt("title");
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
    var data = {
      event: {
        title: title,
        start: start_time,
        end: end_time,
        allday: false
      }
    }
    $.ajax({
     type: "POST",
     url: "/api/v1/events",
     data: data,
     success: function() {
       calendar.fullCalendar('refetchEvents');
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
    defaultView: 'agendaWeek',             // 初期表示ビュー
    eventLimit: true,                      // allow "more" link when too many events
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
	// //JSONでイベントを読み込み
	// $.getJSON('js/events.json', function(data) {
	// 	var jsonEvents = data;
	// 	for(i in jsonEvents){
	// 		$('#calendar').fullCalendar('renderEvent', jsonEvents[i], true);
	// 	}
	// 	$('#calendar').fullCalendar('gotoDate', '2020-02-27');
  // });
  // $(".delete-events_class a").click(function(){
	// 	var className = $(this).text();
		
	// 	//フィルター内で直接処理をする
	// 	$('#calendar').fullCalendar('clientEvents', function(clEvent){
	// 		if(clEvent.className == className){ //クラス名が一致するイベントについて、処理をする
	// 			$('#calendar').fullCalendar('removeEvents', clEvent.id);
	// 		}
	// 	});
	// 	return false;
  // });
  // $(".delete-events_date a").click(function(){
	// 	var eventDate = $(this).text();
		
	// 	//フィルターで「selectedEvents」にイベントを取得しする
	// 	var selectedEvents = $('#calendar').fullCalendar('clientEvents', function(clEvent){
	// 		var rootEventDate = moment(clEvent.start);
	// 		rootEventDate = ((rootEventDate.format()).split('T'))[0];
	// 		if(rootEventDate == eventDate){
	// 			//日付が一致するイベントを、データとして返す
	// 			return true;
	// 		}else{
	// 			//日付が一致しない場合は、データとして返さない
	// 			return false;
	// 		}
	// 	});
		
	// 	//取得したイベントすべてに処理を行う
	// 	for(var i in selectedEvents){
	// 		$('#calendar').fullCalendar('removeEvents', selectedEvents[i].id);
	// 	}
		
	// 	return false;
  // });
});
});