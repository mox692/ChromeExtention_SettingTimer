// click start button 
$('#timer_start').on('click', function(){
  settingTime = $('#min').val();
  
  // validation (0 ~ 999)
  let validation = /^[1-9]$|^[1-9][0-9]$|^[1-9][0-9][0-9]$/;
  if(validation.test(settingTime)){
    chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {
        settingTime: settingTime,
        onTimer: true
      }, function(){
      });
    });  
  }
  else{
    alert('Please enter number collectly...\n (permitted "0~999" min)');
  }
});