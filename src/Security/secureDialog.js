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
            let cookiesText = "";
            require("@electron/remote").session.defaultSession.cookies.get({url: tabGroup.getActiveTab().webview.src}).then(cookies => cookies.forEach(cookie => cookiesText += cookie.name + "<br>")).then(function () {
            Swal.fire({
                title: "Site Cookies:",
                text: cookiesText,
            })
            })
        } else if (value.isDenied) {
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
            Swal.fire({
                title: "Site Permissions:",
                html: fullDiv
            })
        }
    })
}