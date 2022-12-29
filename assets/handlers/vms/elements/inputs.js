document.querySelector("#name-of-guest").addEventListener("input", updateinputtext);
var guestname;
function updateinputtext() {
    guestname = document.getElementById("name-of-guest").value;
}