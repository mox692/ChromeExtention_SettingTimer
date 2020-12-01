

let is_Running_Content = false;
let is_Running_Backend = false;
let Remaining_Time = 0;
let Stopped_Time = 0;
let Kill_Signal = false;

class TimerBackgroundStatus {
  constructor(isRunningContent:boolean,isRunningBackend:boolean,killSignal:boolean,remainingTime:number,stoppedTime:number){
    this.isRunnnigBacnend = isRunningBackend
    this.isRunnnigContent = isRunningContent
    this.killSignal = killSignal
    this.remainigTime = remainingTime
    this.stoppedTime = stoppedTime
  }
  isRunnnigContent:boolean
  isRunnnigBacnend:boolean
  killSignal:boolean
  remainigTime:number
  stoppedTime:number
}

type responseData = {
  TimerStatus?:boolean
  NowTime?:number
  ContentRunning?:boolean
  Stopped_Time?:number
  response?:string
  delete_message? :string
}

type responseFn = {
  (data: responseData):void
}

// from content
chrome.runtime.onMessage.addListener(function (
  getData: any,
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
        setBackgroundTimer(getData.time);
        sendResponse({ response: "NOW TIMER ON" });
      } else {
        is_Running_Backend = false;
        sendResponse({ response: "NOW TIMER OFF" });
      }
      break;

    case "stopTimer":
      is_Running_Content = false;
      Stopped_Time = getData.Stopped_Time;
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

// in => time(mm sec) , out => change remainTime
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
