var ramusage = document.getElementById("ram-usage");
var gpuusage = document.getElementById("gpu-usage");

const osu = require('node-os-utils')
const os = require('os');
const cpu = osu.cpu

function getScaledValue(value, sourceRangeMin, sourceRangeMax, targetRangeMin, targetRangeMax) {
    var targetRange = targetRangeMax - targetRangeMin;
    var sourceRange = sourceRangeMax - sourceRangeMin;                                                  // scale RAM values to 0-100
    return (value - sourceRangeMin) * targetRange / sourceRange + targetRangeMin;
}

async function updateusage() {
    const totalmem = os.totalmem() / (1024 * 1024 * 1024); //b to gb
    const freemem = os.freemem() / (1024 * 1024 * 1024); //b to gb
    const usedmem = totalmem - freemem;

    //update cpu usage
    cpu.usage().then(cpuPercentage => {
        document.getElementById("cpu-usage").style.width = `${cpuPercentage.toFixed(0)}%`;
        document.getElementById("cpu-usage-text").innerHTML = `${cpuPercentage.toFixed(0)}%`
    });
    

    //update ram usage
    document.getElementById("ram-usage-text").innerHTML = `${usedmem.toFixed(1)} GB`;
    document.getElementById("ram-usage").style.width = `${getScaledValue(usedmem.toFixed(1), 0, totalmem.toFixed(0), 0, 100)}%`;

    //update free ram
    document.getElementById("ram-free-text").innerHTML = `${freemem.toFixed(1)} GB`
    document.getElementById("ram-free").style.width = `${getScaledValue(freemem.toFixed(1), 0, totalmem.toFixed(0), 0, 100)}%`
}
setInterval(updateusage, 5); //interval for calling cpu to run function each 1s for updating