const fs = require('fs');
const log = require('electron-log');
    
    function getSettings() {
    fs.readFile(__dirname + '/data/engine.pocket', function (err, data) {
      if (err) {
          log.error("Couldn't load file: /system/data/engine.pocket: " + err)
        throw err; 
      }
      try {
      
      var engine = String(data).replace("%s","<u>SearchTerm</u>");
    document.getElementById("currentEngine").innerHTML += "<b>" + engine + "</b>";
        
      } catch(err) {
          log.error("Couldn't add currentEngine URL");
          log.error("Normal: " + data);
          log.error("With Cut: " + engine)
      }
    });    
}



function changeSearchEngine() {
var newEngine = document.getElementById("engine").value;

fs.writeFile(__dirname + '/data/engine.pocket', newEngine, function (err) {
    if (err) {
      throw err; 
    }

  });
  let myNotification = new Notification('Pocket Browser', {
    body: "Search Engine is changed successfully!.",
    icon: "../s-icon.png"
  })
}
