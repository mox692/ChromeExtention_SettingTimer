
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

  let is_Runnnig = false;
  let Remaining_Time = 0;


  window.onload = function () {
    let sendData = {
      messageType: "checkTimerStatus",
    };
    chrome.runtime.sendMessage(sendData, function (response) {
      if (response) {
        is_Runnnig = response.ContentRunning;
        if (is_Runnnig) Remaining_Time = response.NowTime;
        else Remaining_Time = response.Stopped_Time;
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
          is_Runnnig = response.ContentRunning;
          target.textContent = `${response.NowTime}`;
          Remaining_Time = response.NowTime;
          if (is_Runnnig) {
            if (Remaining_Time == 0) {
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
    is_Runnnig = false;
    let sendData = {
      messageType: "stopTimer",
      Stopped_Time: Remaining_Time,
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
    is_Runnnig = true;

    changeTimerStatus(true, Remaining_Time);
    getBackgroundTimeEverySeconds();
  }

  function deleteTimer() {
    //backへの通信→それが成功したら、windowの削除
    let sendData = {
      messageType: "deleteTimer",
    };
    chrome.runtime.sendMessage(sendData, function (response) {
      if (response) {
        is_Runnnig = false;
        Remaining_Time = 0;
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
