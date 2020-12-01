
import {responseData, responseFn, messageType, sendData} from '../types'

let is_Running_Content = false;
let is_Running_Backend = false;
let Remaining_Time = 0;
let Stopped_Time = 0;
let Kill_Signal = false;

class TimerBackgroundStatus {
  // constructor(){
  //   this.is_Runnnig_Bacnend = false
  //   this.is_Runnnig_Content = false
  //   this.kill_Signal = false
  //   this.remainig_Time = 0
  //   this.stopped_Time = 0
  // }
  // is_Runnnig_Content:boolean
  // is_Runnnig_Bacnend:boolean
  // kill_Signal:boolean
  // remainig_Time:number
  // stopped_Time:number
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
      console.log(`checkTimerStatusにて${is_Running_Backend}`);
      sendResponse({
        TimerStatus: is_Running_Backend,
        NowTime: Remaining_Time,
        ContentRunning: is_Running_Content,
        Stopped_Time: Stopped_Time,
      });
      //  ここに現在の時間のレスポンスを加える
      break;

    case "chengeTimerStatus":
      if (getData.onTimer) {
        is_Running_Backend = true;
        is_Running_Content = true;
        Kill_Signal = false;
        console.log(`chengeTimerStatusにて${is_Running_Backend}`);
        // ******** todo: handle if nil
        if(getData.time != null){
          setBackgroundTimer(getData.time);
        }
        sendResponse({ response: "NOW TIMER ON" });
      } else {
        is_Running_Backend = false;
        sendResponse({ response: "NOW TIMER OFF" });
      }
      break;

    case "stopTimer":
      is_Running_Content = false;
       // ******** todo: handle if nil
      if(getData.Stopped_Time != null) {
        Stopped_Time = getData.Stopped_Time;
      }
      console.log(Stopped_Time);
      Kill_Signal = true;
      sendResponse({ Stopped_Time: Stopped_Time });
      break;

    case "deleteTimer":
      is_Running_Backend = false;
      is_Running_Content = false;
      Kill_Signal = true;
      sendResponse({ delete_message: "delete success" });
      break;
  }
});

function setBackgroundTimer(time: number) {
  function showtime() {
    let timeoutId = setTimeout(showtime, 1000);
    time = time - 1000;
    console.log(time);
    Remaining_Time = time;
    if (time == -1000 || Kill_Signal == true) {
      clearTimeout(timeoutId);
      is_Running_Backend = false;
    }
  }
  showtime();
}