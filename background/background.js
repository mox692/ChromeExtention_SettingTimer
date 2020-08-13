{
    onTimer = false;
    
    // from content
    chrome.runtime.onMessage.addListener(function(getData, sender, sendResponse) {
        console.log(getData)
        switch (getData.messageType){
            case 'checkTimerStatus':
                sendResponse({response: onTimer});
            break;

            case 'chengeTimerStatus':
                if(getData.onTimer){
                    onTimer = true;
                    sendResponse({response: 'NOW TIMER ON'});
                }
                else{
                    onTimer = false;
                    sendResponse({response: 'NOW TIMER OFF'});
                }
            break;
        }
    });


}
