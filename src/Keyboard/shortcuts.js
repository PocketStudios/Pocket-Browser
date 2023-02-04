function shortcuts(input) {
if (input.control && input.key.toLowerCase() == "t") {
    addTab();
} else if (input.control && input.key.toLowerCase() == "w") {
    tabGroup.getActiveTab().close();
} else if (input.control && input.key.toLowerCase() == "n") {
    addWindow();
} else if (input.control && input.key.toLowerCase() == "h") {
    History();
} else if (input.control && input.key.toLowerCase() == "l") {
    document.getElementById("address").focus();
    document.getElementById("address").select();
}
}