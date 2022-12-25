const { totalmem } = require('os');

const systemcpu = os.cpus();

function updateinfo() {
    document.getElementById("cpuinfo").innerHTML = "CPU: " + systemcpu[0].model;  //update processor info
    document.getElementById("meminfo").innerHTML = "Memory: " + (totalmem / (1024 * 1024 * 1024)).toFixed(1) + " GB"; //update ram info
}