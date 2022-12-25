

function onToggle(element) {
    var oStatus = element.getAttribute("data-checked")
    if (oStatus == "true") {
        element.setAttribute("data-checked","false")
    } else {
        element.setAttribute("data-checked","true")
    }
}