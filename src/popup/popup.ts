// click start button
$("#timer_start").on("click", function () {
  // todo: more strictly
  let settingTime = $("#min").val() as string;

  // validation (0 ~ 999)
  let validation = /^[1-9]$|^[1-9][0-9]$|^[1-9][0-9][0-9]$/;
  if (validation.test(settingTime)) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        // todo: more strictly
        tabs[0].id ?? 0,
        {
          settingTime: settingTime,
          onTimer: true,
        },
        function () {
          console.log(settingTime);
        }
      );
    });
  } else {
    alert('Please enter number collectly...\n (permitted "0~999" min)');
  }
});
