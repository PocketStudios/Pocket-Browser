require("@electron/remote").session.defaultSession.setPermissionRequestHandler((webContents, permission, callback,details) => {
    const url = webContents.getURL();
    //get domain from url
    let domain = url.split("/")[2];
    let permissionType = permission;
    if (permission == "media") {
        permissionType = "media";
        if (details.mediaTypes) {
            if (details.mediaTypes.includes("video")) {
                permissionType = "camera";
            } else if (details.mediaTypes.includes("audio")) {
                permissionType = "microphone"
            }
        }
    }
    if (fs.existsSync(path.join(dataPath, permissionType + ".json"))) {
        let permissionLinks = JSON.parse(fs.readFileSync(path.join(dataPath, permissionType + ".json")));
        if (domain in permissionLinks) {
            if (permissionLinks[domain] == true) {
                callback(true)
                return;
            } else {
                callback(false)
                return;
            }
        }
    }
    Swal.fire({
        title: "Permission Request",
        text: "Allow website to access: '" + permissionType + "'",
        showConfirmButton: true,
        showCancelButton: true
    }).then(function (value) {
        let returned = false;
        if (value.isConfirmed) {
            callback(true)
            returned = true;
        } else {
            callback(false)
            returned = false;
        }
        if (fs.existsSync(path.join(dataPath,permissionType + ".json"))) {
            let currentData = JSON.parse(fs.readFileSync(path.join(dataPath,permissionType + ".json"),"utf8"));
            currentData[domain] = returned;
            fs.writeFileSync(path.join(dataPath, permissionType + ".json"), JSON.stringify(currentData, null, " "), "utf8");

        } else {
            let obj = {}
            obj[domain] = returned;
            fs.writeFileSync(path.join(dataPath, permissionType + ".json"), JSON.stringify(obj, null, " "), "utf8");

        }
    })
})