function secureDialog(mode) {
    let secureText = "Connection is Secure."
    if (mode == 1) secureText = "Connection is In-Secure"
    else if (mode == 2) secureText = "Secure Browser Page."
    require("sweetalert")({
        text: secureText,
        buttons: {
            cookies: {
                text: "Cookies",
                value: "cookies",
                className: "btn"
            },
            permissions: {
                text: "Site Permissions",
                value: "permissions",
                className: "btn"
            }
        }
    }).then(function (value) {
        if (value === "cookies") {
            let cookiesText = "";
            require("@electron/remote").session.defaultSession.cookies.get({url: tabGroup.getActiveTab().webview.src}).then(cookies => cookies.forEach(cookie => cookiesText += cookie.name + "<br>")).then(function () {
            require("sweetalert")({
                title: "Site Cookies:",
                text: cookiesText,
            })
            })
        } else if (value === "permissions") {
            let fullDiv = document.createElement("div");
            let cameraText = document.createElement("p")
            cameraText.innerHTML = "Camera: <input type='checkbox'>";
            let microphoneText = document.createElement("p")
            microphoneText.innerHTML = "Microphone: <input type='checkbox'>";
            let jsText = document.createElement("p")
            jsText.innerHTML = "JavaScript: <input type='checkbox'>";
            let popupText = document.createElement("p")
            popupText.innerHTML = "Popups: <input type='checkbox'>";
            fullDiv.appendChild(cameraText)
            fullDiv.appendChild(microphoneText)
            fullDiv.appendChild(jsText)
            fullDiv.appendChild(popupText)
            require("sweetalert")({
                title: "Site Permissions:",
                content: fullDiv,
                    button: {
                className: "btn"
            }

            })
        }
    })
}