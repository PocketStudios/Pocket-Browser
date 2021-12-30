async function generateQR() {
    let url = await require("qrcode").toDataURL(tabGroup.getActiveTab().webview.src);
    let qrImg = document.createElement("img");
    qrImg.src = url;
    require("sweetalert")({
        title: "Scan to load website",
    content: qrImg,
        button: {
            className: "btn"
        }
})
}