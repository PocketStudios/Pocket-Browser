let errors = [
    {
        "error": "-6",
        "description": "File not found.",
        "listSolutions": [
            "Add https:// to start of url.",
            "Search for correct URL.",
            "Contact website administrators."
        ]
    },
    {
        "error": "-21",
        "description": "Network change occurred.",
        "listSolutions": [
            "Try again."
        ]
    },
    {
        "error": "-106",
        "description": "Connection was lost.",
        "listSolutions": [
            "Reconnect to Wi-Fi",
            "Check your internet connection."
        ]
    },
    {
        "error": "-107",
        "description": "SSL Protocol Error.",
        "listSolutions": [
            "Use HTTP Instead of HTTPS. (Not Recommended)",
            "Contact website administrators."
        ]

    },
    {
        "error": "-113",
        "description": "SSL Protocol Error.",
        "listSolutions": [
            "Use HTTP Instead of HTTPS. (Not Recommended)",
            "Contact website administrators."
        ]

    },
    {
        "error": "-7",
        "description": "Operation time out.",
        "listSolutions": [
            "Try again later."
        ]
    },
    {
        "error": "123",
        "description": "Error is unknown.",
        "listSolutions": [
            "Please contact <a href='emailto:support.pocket-inc.com'>Pocket Support</a>."
        ]
    }
]
function loadErrorModal(error) {
    let code = "123";
    if (error && errors.filter(error => parseFloat(error.error) == error).length > 0) code = error;
    if (errors.filter(error => parseFloat(error.error) == code).length > 0) {
        let errorInfo = errors.filter(error => parseFloat(error.error) == code)[0];
        let fullDiv = document.createElement("center");
        let img = document.createElement("img");
        img.src = require("path").join("node_modules","bootstrap-icons","icons","emoji-frown.svg")
        img.style = "animation: unset;width: 128px;border-radius:50%"
        img.addEventListener('click',function() { img.style.backgroundColor = "red"; img.src = require("path").join('node_modules','bootstrap-icons','icons','emoji-angry.svg') })
        let errorMain = document.createElement("h2");
        errorMain.innerHTML = "Error " + error
        let errorDesc = document.createElement("small");
        errorDesc.innerHTML = errorInfo['description'];
        let line = document.createElement("hr");
        line.style = "width: 50%;border-top-color: darkslategray"
        let errorSolutions = document.createElement("div");
        errorInfo.listSolutions.forEach(solution => errorSolutions.innerHTML += "<br>" + solution)

        fullDiv.appendChild(img)
        fullDiv.appendChild(errorMain)
        fullDiv.appendChild(errorDesc)
        fullDiv.appendChild(line)
        fullDiv.appendChild(errorSolutions)
        console.log(fullDiv)
        Swal.fire({
            html: fullDiv
        })
    }
}