async function generateQR() {
    let url = await require("qrcode").toDataURL(tabGroup.getActiveTab().webview.src);
    let qrImg = document.createElement("img");
    qrImg.src = url;
    Swal.fire({
        title: "Scan to load website",
        imageUrl: url,
        confirmButtonText: "Close"
    })
}