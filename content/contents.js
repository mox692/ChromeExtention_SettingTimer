
{

  // load時、タイマーが計測されているかの判定を,backendと通信する事で確認
  window.onload = function() {
    sendData = {
      messageType: 'checkTimerStatus'
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



  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    let selection;
    console.log(request.message); // -> 選択範囲ちょうだい が出力される

    // エレメントの作成
    createElement();

    // 1s毎にtimerを設置
    setTimer(Number(request.message) * 1000);

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
    let target = document.querySelector('div');
    let element = document.createElement('h3');
    element.textContent = "hi";
    element.id = "hidden_id"; 

    myStyle = {
      fontSize: "3rem",
      color: "red"
    }
    for(var prop in myStyle) {
      element.style[prop] = myStyle[prop];
    } 
    target.appendChild(element);
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
        disptime = time / 1000;
        target.textContent = disptime;
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