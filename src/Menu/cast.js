const ChromecastAPI = require("chromecast-api")
const client = new ChromecastAPI()
function castTo(id) {
    client.devices[id].play(tabGroup.getActiveTab().webview.src)
}
function showControls(choosenDevice) {
    let fullDiv = document.createElement("div");
    fullDiv.innerHTML = "<img width='32' src='node_modules/bootstrap-icons/icons/stop-btn.svg' onclick='client.devices[" + choosenDevice + "].stop()'><img width='32' src='node_modules/bootstrap-icons/icons/pause-btn.svg' onclick='client.devices[" + choosenDevice + "].pause()'><img width='32' src='node_modules/bootstrap-icons/icons/play-btn.svg' onclick='client.devices[" + choosenDevice + "].resume()'><br><p>Volume:<input type='range' min='0' max='100' value='" + getVolume(choosenDevice) + "' class='form-control' id='cast-volume' onchange='changeVolume(" + choosenDevice + ")'></p>" + showButtons(choosenDevice) + "</p>"
    require("sweetalert")({
        title: client.devices[choosenDevice].friendlyName,
        content: fullDiv,
        button: {
            className: "btn"
        }
    })

}
function showDevicesToCast() {
    let devices = "";
    let nbOfDevices = 0;
    client.devices.forEach(function(device) {
        devices += "<button class='btn' onclick='showControls(" + nbOfDevices + ")'>" + device.friendlyName + "</button>"
            nbOfDevices++;
    })
    let fullDiv = document.createElement("div");
    fullDiv.innerHTML = devices
    require("sweetalert")({
        title: "Choose device",
        content: fullDiv,
        button: {
            className: "btn"
        },
        onSubmit: showControls
    })
}
function changeVolume(id) {
    let volume = document.getElementById("cast-volume").value;
    console.log("Changing volume of " + id + " to " + volume)
    client.devices[id].setVolume(volume);
}
function getVolume(id) {
    if (client.devices[id].getVolume()) {
        return client.devices[id].getVolume()
    } else {
        return "50";
    }
}
function showButtons(id) {
    try {
        if (client.devices[id].getCurrentTime()) {
            return client.devices[id].getCurrentTime() + "<br><button class='btn' onclick='client.devices[" + id + "].close()'>Close Connection</button>"
        } else {
            return "No video running.<br><button class='btn' onclick='castTo(" + id + ")'>Cast</button>";
        }
    } catch(err) {
        return "No video running.<br><button class='btn' onclick='castTo(" + id + ")'>Cast</button>";
    }
}