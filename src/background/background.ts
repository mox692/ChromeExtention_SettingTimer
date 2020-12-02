
import {responseData, responseFn, messageType, sendData} from '../types'

let is_Running_Content = false;
let is_Running_Backend = false;
let Remaining_Time = 0;
let Stopped_Time = 0;
let Kill_Signal = false;

class TimerBackgroundStatus {
  constructor(){
    this.is_Running_Backend = false
    this.is_Running_Content = false
    this.kill_Signal = false
    this.remaining_Time = 0
    this.stopped_Time = 0
  }
  is_Running_Content:boolean
  is_Running_Backend:boolean
  kill_Signal:boolean
  remaining_Time:number
  stopped_Time:number
}

let timerStatus = new TimerBackgroundStatus()

// from content
chrome.runtime.onMessage.addListener(function (
  getData: sendData,
  sender: any,
  sendResponse: responseFn
) {
  console.log(getData);
  switch (getData.messageType) {
    case "checkTimerStatus":
      console.log(`checkTimerStatusにて${timerStatus.is_Running_Backend}`);
      sendResponse({
        TimerStatus: timerStatus.is_Running_Backend,
        NowTime: timerStatus.remaining_Time,
        ContentRunning: timerStatus.is_Running_Content,
        Stopped_Time: timerStatus.stopped_Time,
      });
      //  ここに現在の時間のレスポンスを加える
      break;

    case "chengeTimerStatus":
      if (getData.onTimer) {
        timerStatus.is_Running_Backend = true;
        timerStatus.is_Running_Content = true;
        timerStatus.kill_Signal = false;
        console.log(`chengeTimerStatusにて${timerStatus.is_Running_Backend}`);
        // ******** todo: handle if nil
        if(getData.time != null){
          setBackgroundTimer(getData.time);
        }
        sendResponse({ response: "NOW TIMER ON" });
      } else {
        timerStatus.is_Running_Backend = false;
        sendResponse({ response: "NOW TIMER OFF" });
      }
      break;

    case "stopTimer":
      timerStatus.is_Running_Content = false;
       // ******** todo: handle if nil
      if(getData.Stopped_Time != null) {
        timerStatus.stopped_Time = getData.Stopped_Time;
      }
      console.log(Stopped_Time);
      timerStatus.kill_Signal = true;
      sendResponse({ Stopped_Time: timerStatus.stopped_Time });
      break;

    case "deleteTimer":
      timerStatus.is_Running_Backend = false;
      timerStatus.is_Running_Content = false;
      timerStatus.kill_Signal = true;
      sendResponse({ delete_message: "delete success" });
      break;
  }
});

function setBackgroundTimer(time: number) {
  function showtime() {
    let timeoutId = setTimeout(showtime, 1000);
    time = time - 1000;
    console.log(time);
    timerStatus.remaining_Time = time;
    if (time == -1000 || timerStatus.kill_Signal == true) {
      clearTimeout(timeoutId);
      timerStatus.is_Running_Backend = false;
    }
  }
  showtime();
}