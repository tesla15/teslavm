const os = require('os')

const totalmem323 = os.totalmem();
const cpucount323 = os.cpus().length;
let totalmemmb323 = (totalmem323 / 1048576).toFixed(0) - 1;
document.getElementById("cpuslider").setAttribute("max",cpucount323);
document.getElementById("memslider").setAttribute("max",totalmemmb323);
document.getElementById("cpuslider").value = "1";  document.getElementById("core-ammount").innerHTML = "1 Core(s)"
document.getElementById("memslider").value = "512"; document.getElementById("ram-ammount").innerHTML = "512 MB"


//todo finish sliders
document.querySelector("#memslider").addEventListener("input", updateramammount);
document.querySelector("#cpuslider").addEventListener("input", updatecpuammount);

var ramammount;
var cpucores;

function updateramammount() {
    document.getElementById("ram-ammount").innerHTML = document.getElementById("memslider").value + " MB";
    ramammount = document.getElementById("memslider").value;
}

function updatecpuammount() {
    document.getElementById("core-ammount").innerHTML = document.getElementById("cpuslider").value + " Core(s)";
    cpucores = document.getElementById("cpuslider").value;
}