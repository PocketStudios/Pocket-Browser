let homePage = require("fs").readFileSync(require("@electron/remote").app.getPath("userData") + "/home.pocket","utf8");
let searchEngine = require("fs").readFileSync(require("@electron/remote").app.getPath("userData") + "/search.pocket","utf8");
