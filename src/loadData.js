let homePage = "https://google.com";
let adBlock = false;
let dark = false;
let vidDown = false;
let dataPath = require("@electron/remote").app.getPath("userData");
let path = require("path");
let fs = require('fs');
let Swal = require("sweetalert2");

if (fs.existsSync(path.join(dataPath,"/home.pocket"))) {
	homePage = fs.readFileSync(path.join(dataPath, "/home.pocket"), "utf8") || "https://google.com";
}
let searchEngine = "https://duck.com/%s";
if (fs.existsSync(path.join(dataPath,"/search.pocket"))) {
searchEngine = fs.readFileSync(path.join(dataPath, "/search.pocket"),"utf8") || "https://duck.com/%s";
}
if (!fs.existsSync(path.join(dataPath,"/errors.pocket")) || !fs.existsSync(path.join(dataPath, "/security.pocket"))) {
	let electron = require("@electron/remote");
	let newWindow = new electron.BrowserWindow({
			width: 600,
			height: 400,
			resizable: false,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false,
				webviewTag: true
			}
		})
		require("@electron/remote").require("@electron/remote/main").enable(newWindow.webContents)
		newWindow.loadFile(path.join(__dirname,"src/System/pages/start.html"));
		newWindow.setMenu(null);
		newWindow.setTitle("Start - Pocket Browser")

}

if (fs.existsSync(path.join(dataPath,"/ads.pocket"))) {
	adBlock = fs.readFileSync(path.join(dataPath,"/ads.pocket"),"utf8") || "false";
}

if (fs.existsSync(path.join(dataPath,"/dark.pocket"))) {
	dark = fs.readFileSync(path.join(dataPath,"/dark.pocket"),"utf8") || "false"
}

if (fs.existsSync(path.join(dataPath,"/vid-down.pocket"))) {
	vidDown = fs.readFileSync(path.join(dataPath,"/vid-down.pocket"),"utf8") || "false";
}