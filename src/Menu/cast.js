const ChromecastAPI = require("chromecast-api")
const client = new ChromecastAPI()
function castTo(id) {
    client.devices[id].play(tabGroup.getActiveTab().webview.src)
}
function showControls(choosenDevice) {
    Swal.close();
    let fullDiv = document.createElement("div");
    fullDiv.innerHTML = "<img width='32' src='node_modules/bootstrap-icons/icons/stop-btn.svg' onclick='client.devices[" + choosenDevice + "].stop()'><img width='32' src='node_modules/bootstrap-icons/icons/pause-btn.svg' onclick='client.devices[" + choosenDevice + "].pause()'><img width='32' src='node_modules/bootstrap-icons/icons/play-btn.svg' onclick='client.devices[" + choosenDevice + "].resume()'><br><p>Volume:<input type='range' min='0' max='100' value='" + getVolume(choosenDevice) + "' class='form-control' id='cast-volume' onchange='changeVolume(" + choosenDevice + ")'></p>" + showButtons(choosenDevice) + "</p>"
    Swal.fire({
        title: client.devices[choosenDevice].friendlyName,
        html: fullDiv
    })

}
function showDevicesToCast() {
    let devices = "";
    let nbOfDevices = 0;
    client.devices.forEach(function(device) {
        devices += "<button class='button' onclick='showControls(" + nbOfDevices + ")'>" + device.friendlyName + "</button>"
        nbOfDevices++;
    })
    let fullDiv = document.createElement("div");
    fullDiv.innerHTML = devices
    Swal.fire({
        title: "Choose device",
        html: fullDiv
    })
}
function changeVolume(id) {
    let volume = document.getElementById("cast-volume").value;
    console.log("Changing volume of " + id + " to " + volume)
    client.devices[id].setVolume(volume / 100);
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
            return client.devices[id].getCurrentTime() + "<br><button class='button' onclick='client.devices[" + id + "].close()'>Close Connection</button>"
        } else {
            return "No video running.<br><button class='btn' onclick='castTo(" + id + ")'>Cast</button>";
        }
    } catch(err) {
        return "No video running.<br><button class='btn' onclick='castTo(" + id + ")'>Cast</button>";
    }
}