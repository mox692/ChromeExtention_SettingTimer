
{
  is_Runnnig  = false;
  Remaining_Time = 0;

  // load時、タイマーが計測されているかの判定を,backendと通信する事で確認
  // remaining_timeの更新
  // Timer_runnningの更新
  window.onload = function() {
    sendData = {
      messageType: 'checkTimerStatus'
    };
    chrome.runtime.sendMessage(sendData, function(response) {
      if (response){
          console.log(response);
          // 
          is_Runnnig = response.ContentRunning;
          if(is_Runnnig)
            Remaining_Time = response.NowTime;
          else
            Remaining_Time = response.Stopped_Time;
          // タイマーがbackで起動していたら、ウィンドウ表示
          if(response.TimerStatus){
            createElement();
            getBackgroundTimeEverySeconds();
          }
      }
      else{
          console.log('onTimerFlag => err...')
      }
    });
  }


  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

    // timer start時の処理
    if(request.onTimer == true){

      // エレメントの作成
      createElement();

      // 1s毎にtimerを設置
      // setTimer(Number(request.settingTime) * 60000);

      // backendにタイマーオンフラグを立てる。
      changeTimerStatus(true, Number(request.settingTime) * 60000);

      // 1s毎にbackgroundと通信
      getBackgroundTimeEverySeconds();

      // 画面で選択されている部分を文字列で取得する
      if(window.getSelection){
        selection = window.getSelection().toString();
      }else{
        selection = '';
      }
      sendResponse(selection);
    }
    // stop timerの処理
    else if(request.onTimer == false){

    }

  });



  // 画面内のdivを取得 => そこにh3コンテントを作成
  function createElement() {

    // create Time display zone 
    let target = document.querySelector('body');
    let element = document.createElement('div');
    element.id = "hidden_id"; 
    element.className = "displayFix"; 

    target.appendChild(element);
    
    // create stop button 
    let stopButton = document.createElement('button');
    stopButton.type = 'button';
    stopButton.className = 'btn btn-warning displayFix stop-button';
    stopButton.textContent = 'Stop';
    stopButton.onclick = function() {
      stopTimer();
    }
    
    stopButton.id = "stop_button_id"; 
    target.appendChild(stopButton);

    // create restart button 
    let restartButton = document.createElement('button');
    restartButton.type = 'button';
    restartButton.className = 'btn btn-primary displayFix restart-button';
    restartButton.textContent = 'Restart';
    restartButton.id = "restart_button_id"; 
    restartButton.onclick = function(){
      restartTimer();
    }
    target.appendChild(restartButton);

  }

  // 1s毎に発火
  // divのidを取得してそこのtext-contentを書き換える
  function setTimer(time) {
    target = document.getElementById('hidden_id');

    function showtime () {
      time = time - 1000;
      if(time == 0){
        target.textContent = 'Time Over!!!';
        changeTimerStatus();
      }
      else{
        second = time / 1000;

        if(60 <= second){
          disp_min = Math.floor(second / 60);
          disp_sec = second % 60;
        }
        else{
          disp_min = 0;
          disp_sec = second;
        }
        target.textContent = `${disp_min}min ${disp_sec}sec`;
        
        setTimeout(showtime, 1000);
      }
    }
    showtime(time);
  }

  
  // backgroundのtimer値を取得して、id: hidden_idにセット
  function getBackgroundTimeEverySeconds(){
    let target = document.getElementById('hidden_id')
    sendData = {
      messageType: 'checkTimerStatus'
    };
    chrome.runtime.sendMessage(sendData, function(response) {
      if (response){
          console.log(response);
          if(response.TimerStatus){
            // DISPLAY TIMER...
            console.log(`response.NowTime = ${response.NowTime}`)
            is_Runnnig = response.ContentRunning
            target.textContent = `${response.NowTime}`;
            Remaining_Time = response.NowTime;
            if(is_Runnnig){
              if(Remaining_Time == 0){
                target.textContent = 'Time Over!!!';;
              }
              else{
                // target.textContent = `${response.NowTime}`;
                target.textContent = mmTime_To_Second(response.NowTime)
                setTimeout(getBackgroundTimeEverySeconds, 1000);
              }
            }
            else{
              // target.textContent = `${response.Stopped_Time}`;
              target.textContent = mmTime_To_Second(response.Stopped_Time)
            }
              
          }
      }
      else{
          console.log('onTimerFlag => err...')
      }
    });
  }

  function changeTimerStatus(flag = false, time) {
    sendData = {
      messageType: 'chengeTimerStatus',
      onTimer: flag,
      time: time
    }
    chrome.runtime.sendMessage(sendData, function(response) {
      if (response){
          console.log(response);
      }
      else{
          console.log('onTimerFlag => err...')
      }
    });
  }

  function stopTimer() {
    is_Runnnig = false;
    sendData = {
      messageType: 'stopTimer',
      Stopped_Time: Remaining_Time
    };
    chrome.runtime.sendMessage(sendData, function(response) {
      if (response){
          console.log(response);
      }
      else{
          console.log('onTimerFlag => err...')
      }
    });
  }

  function restartTimer() {
    is_Runnnig = true;

    changeTimerStatus(true, Remaining_Time);
    getBackgroundTimeEverySeconds();
  }

  function mmTime_To_Second(mmTime){
    second = mmTime / 1000;

        if(60 <= second){
          disp_min = Math.floor(second / 60);
          disp_sec = second % 60;
        }
        else{
          disp_min = 0;
          disp_sec = second;
        }
        return `${disp_min}min ${disp_sec}sec`;
  }

}