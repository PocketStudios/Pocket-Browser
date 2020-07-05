var nbOfTabs=0;
function addTab() {
  const TabGroup = require("electron-tabs");
  let tab = tabGroup.addTab({
    src: homePage,
    title: "New Tab",
  });


  tab.webview.addEventListener('did-finish-load',function(){
changeAddress(tab)
});
  tab.webview.addEventListener("page-favicon-updated",function () {
changeFavicon(event,tab);
  })
  tab.webview.addEventListener('did-start-loading', changeState);
  tab.webview.addEventListener('page-title-updated', function(){
    log.info("title change attempt")
    changeTitle(tab,event)
  })


 nbOfTabs = nbOfTabs+1;
  log.info("Opening New Tab: " + nbOfTabs);
}
