
namespace Contents {

  type sendData = {
    messageType :messageType
    onTimer?:boolean
    time?: number
    Stopped_Time?:number
  }

  class ContentStatus {
    constructor(isRunning:boolean, remainingTime:number){
      this.isRunnning = isRunning
      this.remainingTime = remainingTime
    }
    isRunnning:boolean
    remainingTime:number
  }

  type messageType = 'checkTimerStatus' | 'chengeTimerStatus' | 'deleteTimer' | 'checkTimerStatus'

  class TimerContentsStatus {
    constructor(){
      this.is_Running = false,
      this.remaining_time = 0
    }
    is_Running:boolean
    remaining_time:number
  }

  let contentStatus = new TimerContentsStatus

  window.onload = function () {
    let sendData = {
      messageType: "checkTimerStatus",
    };
    chrome.runtime.sendMessage(sendData, function (response) {
      if (response) {
        contentStatus.is_Running = response.ContentRunning;
        if (contentStatus.is_Running) contentStatus.remaining_time = response.NowTime;
        else contentStatus.remaining_time = response.Stopped_Time;
        if (response.TimerStatus) {
          createElement();
          getBackgroundTimeEverySeconds();
        }
      } else {
        alert("now, you can not use timer.");
      }
    });
  };

  chrome.runtime.onMessage.addListener(function (
    request: any,
    sender: any,
    sendResponse: any
  ) {
    if (request.onTimer == true) {
      createElement();
      changeTimerStatus(true, Number(request.settingTime) * 60000);
      getBackgroundTimeEverySeconds();

      let selection;
      if (window.getSelection) {
        // ************ todo: null check to `window.getSelection()` ****************
        selection = window.getSelection();
        if (selection === null) {
          return;
        }
        selection = selection.toString();
      } else {
        selection = "";
      }
      sendResponse(selection);
    } else if (request.onTimer == false) {
    }
  });

  function createElement() {
    let target = document.querySelector("body");
    // ************ todo: null check to `target` ****************
    if (target === null) {
      target = document.createElement("body");
    }

    let element = document.createElement("div");
    element.id = "hidden_id";
    element.className = "displayFix";
    target.appendChild(element);

    // create stop button
    let stopButton = document.createElement("button");
    stopButton.type = "button";
    stopButton.disabled = false;
    stopButton.className = "displayFix stop-button fnjdsanfsksadf";
    stopButton.textContent = "Stop";
    stopButton.onclick = function () {
      restartButton.disabled = false;
      stopTimer();
    };
    stopButton.id = "stop_button_id";
    target.appendChild(stopButton);

    // create restart button
    let restartButton = document.createElement("button");
    restartButton.type = "button";
    restartButton.disabled = true;
    restartButton.className = "displayFix restart-button fnjdsanfsksadf";
    restartButton.textContent = "Restart";
    restartButton.id = "restart_button_id";
    restartButton.onclick = function () {
      restartButton.disabled = true;
      restartTimer();
    };
    target.appendChild(restartButton);

    // create delete button
    let deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "displayFix delete-button fnjdsanfsksadf";
    deleteButton.textContent = "Delete";
    deleteButton.id = "delete_button_id";
    deleteButton.onclick = function () {
      deleteTimer();
    };
    target.appendChild(deleteButton);
  }

  function getBackgroundTimeEverySeconds() {
    let target =
      document.getElementById("hidden_id") ?? document.createElement("body");

    let sendData = {
      messageType: "checkTimerStatus",
    };
    chrome.runtime.sendMessage(sendData, function (response) {
      if (response) {
        if (response.TimerStatus) {
          // DISPLAY TIMER...
          contentStatus.is_Running = response.ContentRunning;
          target.textContent = `${response.NowTime}`;
          contentStatus.remaining_time = response.NowTime;
          if (contentStatus.is_Running) {
            if (contentStatus.remaining_time == 0) {
              target.textContent = "Time Over!!!";
            } else {
              target.textContent = mmTime_To_Second(response.NowTime);
              setTimeout(getBackgroundTimeEverySeconds, 1000);
            }
          } else {
            target.textContent = mmTime_To_Second(response.Stopped_Time);
          }
        }
      } else {
        console.log("onTimerFlag => err...");
      }
    });
  }

  function changeTimerStatus(flag = false, time: any) {
    let sendData = {
      messageType: "chengeTimerStatus",
      onTimer: flag,
      time: time,
    };
    chrome.runtime.sendMessage(sendData, function (response) {
      if (response) {
        console.log(response);
      } else {
        console.log("onTimerFlag => err...");
      }
    });
  }

  function stopTimer() {
    contentStatus.is_Running = false;
    let sendData = {
      messageType: "stopTimer",
      Stopped_Time: contentStatus.remaining_time,
    };
    chrome.runtime.sendMessage(sendData, function (response) {
      if (response) {
        console.log(response);
      } else {
        console.log("onTimerFlag => err...");
      }
    });
  }

  function restartTimer() {
    contentStatus.is_Running = true;

    changeTimerStatus(true, contentStatus.remaining_time);
    getBackgroundTimeEverySeconds();
  }

  function deleteTimer() {
    //backへの通信→それが成功したら、windowの削除
    let sendData = {
      messageType: "deleteTimer",
    };
    chrome.runtime.sendMessage(sendData, function (response) {
      if (response) {
        contentStatus.is_Running = false;
        contentStatus.remaining_time = 0;
        deleteElement();
      } else {
        alert("Can Not stop timer");
      }
    });
  }

  function deleteElement() {
    $("#hidden_id").remove();
    $("#delete_button_id").remove();
    $("#stop_button_id").remove();
    $("#restart_button_id").remove();
  }

  function mmTime_To_Second(mmTime: any) {
    let second = mmTime / 1000;
    let disp_min;
    let disp_sec;
    if (60 <= second) {
      disp_min = Math.floor(second / 60);
      disp_sec = second % 60;
    } else {
      disp_min = 0;
      disp_sec = second;
    }
    return `${disp_min}min ${disp_sec}sec`;
  }
}
