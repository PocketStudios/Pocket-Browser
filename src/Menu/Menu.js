let Menu;
function buildMenu(props) {
    const hasText = props.selectionText.trim().length > 0;
    const isLink = props.linkURL.length > 0 && props.mediaType === "none";
    const isImg = props.mediaType == "image";
    let template = [
        {
            label: "Search",
            visible: hasText,
            click() {
                addTab(searchEngine.replace("%s",props.selectionText))
            }
        },
        {
        label: 'Cut',
        enabled: props.editFlags.canCut,
        visible: props.isEditable,
        click(menuItem) {
            const target = require("@electron/remote").webContents.fromId(tabGroup.getActiveTab().webview.getWebContentsId());
            if (!menuItem.transform && target) {
                target.cut();
            } else {
                props.selectionText = menuItem.transform ? menuItem.transform(props.selectionText) : props.selectionText;
                require("@electron/remote").clipboard.writeText(props.selectionText);
            }
        }
    },
        {
        label: 'Copy',
        enabled: props.editFlags.canCopy,
        visible: props.isEditable || hasText,
        click(menuItem) {
            const target = require("@electron/remote").webContents.fromId(tabGroup.getActiveTab().webview.getWebContentsId());

            if (!menuItem.transform && target) {
                target.copy();
            } else {
                props.selectionText = menuItem.transform ? menuItem.transform(props.selectionText) : props.selectionText;
                require("@electron/remote").clipboard.writeText(props.selectionText);
            }
        }
    },
        {
        label: 'Paste',
        enabled: props.editFlags.canPaste,
        visible: props.isEditable,
        click(menuItem) {
            const target = require("@electron/remote").webContents.fromId(tabGroup.getActiveTab().webview.getWebContentsId());

            if (menuItem.transform) {
                let clipboardContent = require("@electron/remote").clipboard.readText(props.selectionText);
                clipboardContent = menuItem.transform ? menuItem.transform(clipboardContent) : clipboardContent;
                target.insertText(clipboardContent);
            } else {
                target.paste();
            }
        }
    },
        {
            label: "Copy Link",
            visible: isLink,
            click(menuItem) {
                props.linkURL = menuItem.transform ? menuItem.transform(props.linkURL) : props.linkURL;
                require("@electron/remote").clipboard.write({
                    bookmark: props.linkText,
                    text: props.linkURL
                });
            }
        },

        {
            label: "Copy Image",
            visible: isImg,
            click() {
                require("@electron/remote").webContents.fromId(tabGroup.getActiveTab().webview.getWebContentsId()).copyImageAt(props.x,props.y)
            }
        },

        {
            label: "Copy Image Address",
            visible: isImg,
            click(menuItem) {
                props.srcURL = menuItem.transform ? menuItem.transform(props.srcURL) : props.srcURL;

                require("@electron/remote").clipboard.write({
                    bookmark: props.srcURL,
                    text: props.srcURL
                });
            }
        },
        {
            label: "Save image",
            visible: isImg,
            click(menuItem) {
                props.srcURL = menuItem.transform ? menuItem.transform(props.srcURL) : props.srcURL;
            }
        },
        { type: 'separator' },
        {
          label: "Bookmark page",
          visible: !isLink,
            click() {
              // todo add bookmark
            }
        },
        {
            label: "Create QR Code for this page",
            click() {
            generateQR();
            }
        },
        {
            label: "Cast",
            visible: tabGroup.getActiveTab().webview.src.includes("youtube.com"),
            click() {
                showDevicesToCast();
            }
        },
        {
            label: "Bookmark link",
            visible: isLink,
            click() {
                // todo add bookmark
            }
        },
        {
            label: "View page source",
            visible: !tabGroup.getActiveTab().webview.src.startsWith("file:///"),
            click () {
                addTab("view-source:" + tabGroup.getActiveTab().webview.src)
            }
        },
        {
            label: "Inspect Element",
            click () {
                require("@electron/remote").webContents.fromId(tabGroup.getActiveTab().webview.getWebContentsId()).inspectElement(props.x, props.y);
                if (require("@electron/remote").webContents.fromId(tabGroup.getActiveTab().webview.getWebContentsId()).isDevToolsOpened()) {
                    require("@electron/remote").webContents.fromId(tabGroup.getActiveTab().webview.getWebContentsId()).devToolsWebContents.focus();
                }
            }
        }

    ]
    Menu = require("@electron/remote").Menu.buildFromTemplate(template);
    Menu.popup(require("@electron/remote").webContents.fromId(tabGroup.getActiveTab().webview.getWebContentsId()))
}