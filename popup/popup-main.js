let memo;
// リロードの度に実行
loadData();

//データの読み込み
function loadData(){
  chrome.storage.local.get(['chromememo'], function(obj){
    memo = obj.chromememo;

    //データがない場合の初期化
    if(!memo){
      memo = [ {text: "", lastUpdate: new Date()} ];
      chrome.storage.local.set({chromememo:memo}, function(){});
      return;
    }
    $('#memo').val(memo.text);
  });
}

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
        alert('timer start!!');
      });
    });  
  }
  else{
    alert('Please enter number collectly...\n (permitted "0~999" min)');
  }


});