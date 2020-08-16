{
    is_Running_Content  = false;
    is_Running_Backend  = false;
    Remaining_Time = 0;
    Stopped_Time = 0;
    Kill_Signal = false;

    // from content
    chrome.runtime.onMessage.addListener(function(getData, sender, sendResponse) {
        console.log(getData)
        switch (getData.messageType){
            case 'checkTimerStatus':
                console.log(`checkTimerStatusにて${is_Running_Backend}`);
                sendResponse({
                    TimerStatus: is_Running_Backend,
                    NowTime: Remaining_Time,
                    ContentRunning: is_Running_Content,
                    Stopped_Time: Stopped_Time
                });
                //  ここに現在の時間のレスポンスを加える
            break;

            case 'chengeTimerStatus':
                if(getData.onTimer){
                    is_Running_Backend = true;
                    is_Running_Content = true;
                    Kill_Signal = false;
                    console.log(`chengeTimerStatusにて${is_Running_Backend}`);
                    setBackgroundTimer(getData.time);
                    sendResponse({response: 'NOW TIMER ON'});
                }
                else{
                    is_Running_Backend = false;
                    sendResponse({response: 'NOW TIMER OFF'});
                }
            break;

            case 'stopTimer':
                is_Running_Content  = false;
                Stopped_Time = getData.Stopped_Time;
                console.log(Stopped_Time);
                Kill_Signal = true; 
                sendResponse({Stopped_Time: Stopped_Time});
                break;

            case 'deleteTimer':
                is_Running_Backend = false;
                is_Running_Content = false;
                Kill_Signal = true; 
                sendResponse({delete_message: 'delete success'});
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
            if(time == -1000 || Kill_Signal == true){
                clearTimeout(timeoutId);
                is_Running_Backend = false;
            }
        }
        showtime(time);
    }

}
