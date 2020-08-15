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

// 
$('#save').on('click', function(){
  memo = {
    text: $('#memo').val(),
    lastUpdate: new Date()
  };
  chrome.storage.local.set({chromememo: memo}, function(){
    alert('保存が完了しました');
  });
});

// click start button 
$('#timer_start').on('click', function(){
  settingTime = $('#min').val();

  chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {message: settingTime}, function(){
      alert('timer start!!');
    });
  });  

});