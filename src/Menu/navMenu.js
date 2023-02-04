async function menuClick(i) {
    modal.classList.toggle('is-active');

    if (i == 0) {
        addTab();
    } else if (i == 1) {
        addWindow();
    } else if (i == 2) {
        toggleDevTools();
    } else if (i == 3) {
        toggleFullScreen()
    } else if (i == 4) {
    find();
    } else if (i == 5) {
        showDevicesToCast();
    } else if (i == 6) {
    History();
    } else if (i == 7) {
        Bookmarks();
    } else if (i == 8) {
        downloadsList();
    } else if (i == 9) {
        settingsModal.classList.add('is-active');
    } else if (i == 10) {
        addTab("https://pocket-studios.gitbook.io/pocketbrowser/");
    } else if (i == 11) {
        aboutModal.classList.add('is-active');
    } else if (i == 12) {
        electron.remote.app.quit();
    }
}