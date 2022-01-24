let cameraAccess = "";
let micAccess = "";
let notsAccess = "";
let locAccess = "";
function secureDialog(mode) {
    let secureText = "Connection is Secure."
    if (mode == 1) secureText = "Connection is In-Secure"
    else if (mode == 2) secureText = "Secure Browser Page."
    Swal.fire({
        text: secureText,
        showConfirmButton: true,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "Cookies",
        denyButtonText: "Site Permissions"
    }).then(function (value) {
        if (value.isConfirmed) {
            let fullDiv = document.createElement("div");

            require("@electron/remote").session.defaultSession.cookies.get({url: tabGroup.getActiveTab().webview.src}).then(cookies => cookies.forEach(function (cookie) {
                let button = document.createElement("button");
                button.className = "btn btn-light";
                button.onclick = function () {
                    cookieDialog(tabGroup.getActiveTab().webview.src,cookie.name)
                    }
                button.innerHTML = cookie.name;

                fullDiv.appendChild(button)

            })).then(function () {
                Swal.fire({
                title: "Site Cookies:",
                html: fullDiv,
            })
            })
        } else if (value.isDenied) {
            let fullDiv = document.createElement("div");
            if (fs.existsSync(path.join(dataPath,"camera.json"))) {
                let data = JSON.parse(fs.readFileSync(path.join(dataPath,"camera.json"),"utf8"));
                let url = tabGroup.getActiveTab().webview.src;
                if (url in data) {
                    if (data[url] == true) {
                        cameraAccess="checked";
                    }
                }
            }
            if (fs.existsSync(path.join(dataPath,"microphone.json"))) {
                let data = JSON.parse(fs.readFileSync(path.join(dataPath,"microphone.json"),"utf8"));
                let url = tabGroup.getActiveTab().webview.src;
                if (url in data) {
                    if (data[url] == true) {
                        micAccess="checked";
                    }
                }
            }
            if (fs.existsSync(path.join(dataPath,"notifications.json"))) {
                let data = JSON.parse(fs.readFileSync(path.join(dataPath,"notifications.json"),"utf8"));
                let url = tabGroup.getActiveTab().webview.src;
                if (url in data) {
                    if (data[url] == true) {
                        notsAccess="checked";
                    }
                }
            }
            if (fs.existsSync(path.join(dataPath,"geolocation.json"))) {
                let data = JSON.parse(fs.readFileSync(path.join(dataPath,"geolocation.json"),"utf8"));
                let url = tabGroup.getActiveTab().webview.src;
                if (url in data) {
                    if (data[url] == true) {
                        locAccess="checked";
                    }
                }
            }
            let cameraText = document.createElement("p")
            cameraText.innerHTML = 'Camera <br><label class="switch"><input onchange="changePermission(' + "'camera'" + ')" type="checkbox" '+ cameraAccess + '><span class="slider round"></span></label>';
            let microphoneText = document.createElement("p")
            microphoneText.innerHTML = 'Microphone: <br><label class="switch"><input onchange="changePermission(' + "'microphone'" + ')" type="checkbox" ' + micAccess + '><span class="slider round"></span></label>';
            let jsText = document.createElement("p")
            jsText.innerHTML = 'JavaScript: <br><label class="switch"><input type="checkbox"><span class="slider round"></span></label>';
            let notsText = document.createElement("p")
            notsText.innerHTML = 'Notifications: <br><label class="switch"><input onchange="changePermission(' + "'notifications'" + ')" type="checkbox" ' + notsAccess + '><span class="slider round"></span></label>';
            let locText = document.createElement("p")
            locText.innerHTML = 'Location: <br><label class="switch"><input onchange="changePermission(' + "'geolocation'" + ')" type="checkbox" ' + locAccess + '><span class="slider round"></span></label>';
            fullDiv.appendChild(cameraText)
            fullDiv.appendChild(microphoneText)
            fullDiv.appendChild(jsText)
            fullDiv.appendChild(notsText)
            fullDiv.appendChild(locText)
            Swal.fire({
                title: "Site Permissions:",
                html: fullDiv
            })
        }
    })
}
async function cookieDialog(url,name) {
    let content = document.createElement("p");
    let cookie = await require("@electron/remote").session.defaultSession.cookies.get({url: url,name: name});
    let secureText = "Non-secure requests";
    if (cookie[0].secure) secureText = "Secure requests only";
    let expireDate = new Date(cookie[0].expirationDate);

    content.innerHTML = "Name: " + name + "<br><br>Value: " + cookie[0].value + "<br><br>URL: " + cookie[0].domain + "<br><br>Path: " + cookie[0].path + "<br><br>" + secureText + "<br><br>Expires at: " + expireDate.toString();
    Swal.fire({
        title: name,
        html: content,
        showConfirmButton: true,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "Back",
        denyButtonText: "Delete"
    }).then(function (value) {
        if (value.isConfirmed) {
            secureDialog();
        } else if (value.isDenied) {
            require("@electron/remote").session.defaultSession.cookies.remove(url,name);
            secureDialog();

        }
    })
}
function changePermission(permission) {
    let returned = false;
    let url = tabGroup.getActiveTab().webview.src;
    if (permission == "camera") {
        if (cameraAccess == "checked") {
            cameraAccess = "";
        } else {
            cameraAccess = "checked";
            returned = true;
        }
    } else if (permission == "microphone") {
        if (micAccess == "checked") {
            micAccess = "";
        } else {
            micAccess = "checked";
            returned = true;
        }
    }  else if (permission == "notifications") {
        if (notsAccess == "checked") {
            notsAccess = "";
        } else {
            notsAccess = "checked";
            returned = true;
        }
    } else if (permission == "geolocation") {
        if (locAccess == "checked") {
            locAccess = "";
        } else {
            locAccess = "checked";
            returned = true;
        }
    }

    if (fs.existsSync(path.join(dataPath,permission + ".json"))) {
        let currentData = JSON.parse(fs.readFileSync(path.join(dataPath,permission + ".json"),"utf8"));
        currentData[url] = returned;
        fs.writeFileSync(path.join(dataPath,permission + ".json"),JSON.stringify(currentData,null," "),"utf8");

    } else {
        let obj = {}
        obj[url] = returned;
        fs.writeFileSync(path.join(dataPath,permission + ".json"),JSON.stringify(obj,null," "),"utf8");

    }}