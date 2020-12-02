
import {TimerStatus, sendData} from '../types'
namespace Contents {

  class TimerContentsStatus implements TimerStatus{
    constructor(){
      this.is_Running = false,
      this.remaining_time = 0
    }
    is_Running:boolean
    remaining_time:number
  }

  let contentStatus = new TimerContentsStatus

  window.onload = () => {
    let sendData:sendData = {
      messageType: "checkTimerStatus",
    };
    chrome.runtime.sendMessage(sendData,  (response) => {
      if (response) {
        contentStatus.is_Running = response.ContentRunning;
        if (contentStatus.is_Running){
          contentStatus.remaining_time = response.NowTime;
        }
        else{
          contentStatus.remaining_time = response.Stopped_Time;
        }
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

      let selection = window.getSelection();
      if (selection != null) {
        // ************ todo: null check to `window.getSelection()` ****************
        // for debug
        sendResponse(selection.toString);
      } 
      else {
        alert("element が作成できません")
        return
      }
    } 
  });

  const createElement = ():void => {
    let target:HTMLElementTagNameMap["body"] | null = document.querySelector("body");
    // ************ todo: null check to `target` ****************
    if (target === null) {
      target = document.createElement("body");
    }

    let element:HTMLElementTagNameMap["div"] = document.createElement("div");
    element.id = "hidden_id";
    element.className = "displayFix";
    target.appendChild(element);

    // create stop button
    let stopButton:HTMLElementTagNameMap["button"] = document.createElement("button");
    stopButton.type = "button";
    stopButton.disabled = false;
    stopButton.className = "displayFix stop-button fnjdsanfsksadf";
    stopButton.textContent = "Stop";
    stopButton.onclick =  ():void => {
      restartButton.disabled = false;
      stopTimer();
    };
    stopButton.id = "stop_button_id";
    target.appendChild(stopButton);

    // create restart button
    let restartButton:HTMLElementTagNameMap["button"] = document.createElement("button");
    restartButton.type = "button";
    restartButton.disabled = true;
    restartButton.className = "displayFix restart-button fnjdsanfsksadf";
    restartButton.textContent = "Restart";
    restartButton.id = "restart_button_id";
    restartButton.onclick = ():void => {
      restartButton.disabled = true;
      restartTimer();
    };
    target.appendChild(restartButton);

    // create delete button
    let deleteButton:HTMLElementTagNameMap["button"] = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "displayFix delete-button fnjdsanfsksadf";
    deleteButton.textContent = "Delete";
    deleteButton.id = "delete_button_id";
    deleteButton.onclick = ():void =>  {
      deleteTimer();
    };
    target.appendChild(deleteButton);
  }

  const getBackgroundTimeEverySeconds = ():void => {
    let target: HTMLElement =
      document.getElementById("hidden_id") ?? document.createElement("body");

    let sendData:sendData = {
      messageType: "checkTimerStatus",
    };
    chrome.runtime.sendMessage(sendData,  (response) =>  {
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

  const changeTimerStatus = (flag = false, time: number):void => {
    let sendData:sendData = {
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

  const stopTimer = ():void =>  {
    contentStatus.is_Running = false;
    let sendData:sendData = {
      messageType: "stopTimer",
      Stopped_Time: contentStatus.remaining_time,
    };
    chrome.runtime.sendMessage(sendData, (response) => {
      if (response) {
        console.log(response);
      } else {
        console.log("onTimerFlag => err...");
      }
    });
  }

  const restartTimer = ():void => {
    contentStatus.is_Running = true;

    changeTimerStatus(true, contentStatus.remaining_time);
    getBackgroundTimeEverySeconds();
  }

  const deleteTimer = ():void =>  {
    //backへの通信→それが成功したら、windowの削除
    let sendData:sendData = {
      messageType: "deleteTimer",
    };
    chrome.runtime.sendMessage(sendData,  (response) => {
      if (response) {
        contentStatus.is_Running = false;
        contentStatus.remaining_time = 0;
        deleteElement();
      } else {
        alert("Can Not stop timer");
      }
    });
  }

  const deleteElement = ():void => {
    $("#hidden_id").remove();
    $("#delete_button_id").remove();
    $("#stop_button_id").remove();
    $("#restart_button_id").remove();
  }

  const mmTime_To_Second = (mmTime: number):string => {
    let second:number = mmTime / 1000;
    let disp_min:number;
    let disp_sec:number;

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