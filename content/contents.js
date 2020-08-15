
{

  // load時、タイマーが計測されているかの判定を,backendと通信する事で確認
  window.onload = function() {
    sendData = {
      messageType: 'checkTimerStatus'
    };
    chrome.runtime.sendMessage(sendData, function(response) {
      if (response){
          console.log(response.response);
          if(response.response){
            // DISPLAY TIMER...
            createElement();
          }
      }
      else{
          console.log('onTimerFlag => err...')
      }
    });
  }



  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

    // エレメントの作成
    createElement();

    // 1s毎にtimerを設置
    setTimer(Number(request.message) * 60000);

    // backendにタイマーオンフラグを立てる。
    changeTimerStatus(true);

    // 画面で選択されている部分を文字列で取得する
    if(window.getSelection){
      selection = window.getSelection().toString();
    }else{
      selection = '';
    }
    sendResponse(selection);
  });



  // 画面内のdivを取得 => そこにh3コンテントを作成
  function createElement() {

    // create Time display zone 
    let target = document.querySelector('div');
    let element = document.createElement('div');
    element.textContent = "hi";
    element.id = "hidden_id"; 
    element.className = "displayFix"; 

    myStyle = {
      fontSize: "3rem",
      color: "red",
    }
    for(var prop in myStyle) {
      element.style[prop] = myStyle[prop];
    } 
    target.appendChild(element);
    
    // create stop button 
    let stopButton = document.createElement('button');
    stopButton.type = 'button';
    stopButton.className = 'btn btn-warning displayFix stop-button';
    stopButton.textContent = 'Stop';
    stopButton.id = "stop_button_id"; 
    target.appendChild(stopButton);

    // create restart button 
    let restartButton = document.createElement('button');
    restartButton.type = 'button';
    restartButton.className = 'btn btn-primary displayFix restart-button';
    restartButton.textContent = 'Restart';
    restartButton.id = "restart_button_id"; 
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

  function changeTimerStatus(flag = false) {
    sendData = {
      messageType: 'chengeTimerStatus',
      onTimer: flag
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

}