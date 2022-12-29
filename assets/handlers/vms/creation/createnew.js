function createnewvm() {
    currenttab = 1;
    document.getElementById("create-vm-overlay").style.display = "block";
    document.getElementById("intro-creation").style = "display: block;"
    //reset values
    document.getElementById("cpuslider").value = "1";  document.getElementById("core-ammount").innerHTML = "1 Core(s)"
    document.getElementById("memslider").value = "512"; document.getElementById("ram-ammount").innerHTML = "512 MB"
    document.getElementById("name-of-guest").value = "";
    ostype = undefined
    osver = undefined
    accel = undefined;
    gpuaccel = undefined;
}

function close_vm_overlay() {
    currenttab = 1;
    document.getElementById("create-vm-overlay").style.display = "none";
    document.getElementById("create-vm-overlay").style = "display: none"
    document.getElementById("intro-creation").style = "display: none;"
    document.getElementById("cpu-ram-configuration").style = "display: none;"
    document.getElementById("optional-features").style = "display: none;"
    //reset values
    document.getElementById("cpuslider").value = "1";  document.getElementById("core-ammount").innerHTML = "1 Core(s)"
    document.getElementById("memslider").value = "512"; document.getElementById("ram-ammount").innerHTML = "512 MB"
    document.getElementById("name-of-guest").value = "";
    ostype = undefined
    osver = undefined
    accel = undefined;
    gpuaccel = undefined;
}

//output should like
// name: {
//     ostype: '', 
//     osver: '',
//     ram: '',
//     cpu: '',
//     accel: '',
//     gpu: '',
//     audio: '',
// }