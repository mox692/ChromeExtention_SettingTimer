{
    On_Timer = false;
    Remaining_Time = 0;

    // from content
    chrome.runtime.onMessage.addListener(function(getData, sender, sendResponse) {
        console.log(getData)
        switch (getData.messageType){
            case 'checkTimerStatus':
                sendResponse({
                    TimerStatus: On_Timer,
                    NowTime: Remaining_Time
                });
                //  ここに現在の時間のレスポンスを加える
            break;

            case 'chengeTimerStatus':
                if(getData.onTimer){
                    On_Timer = true;
                    setBackgroundTimer(getData.time);
                    sendResponse({response: 'NOW TIMER ON'});
                }
                else{
                    On_Timer = false;
                    sendResponse({response: 'NOW TIMER OFF'});
                }
            break;
        }
    });

    // in => time(mm sec) , out => change remainTime
    function setBackgroundTimer(time) {
    
        function showtime () {
            let timeoutId = setTimeout(showtime, 1000);
            time = time - 1000;
            console.log(time);
            Remaining_Time = time;
            if(time == 0){
                clearTimeout(timeoutId);
            }
        }
        showtime(time);
    }

}
