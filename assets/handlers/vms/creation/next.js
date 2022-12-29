document.getElementById("intro-creation").style = "display: block!important;"
document.getElementById("cpu-ram-configuration").style = "display: none!important;"
document.getElementById("optional-features").style = "display: none!important;"

var currenttab;

function next() {
    console.log('next tab ' + currenttab);
    switch (currenttab) {
        case 0: // Introduction
            document.getElementById("create-vm-overlay").style = "display: block"
            document.getElementById("intro-creation").style = "display: block;"
            document.getElementById("cpu-ram-configuration").style = "display: none;"
            document.getElementById("optional-features").style = "display: none;"
            currenttab = 1;
            break;

        case 1: //Configuration of CPU RAM
            if (ostype == undefined || guestname == "") {
                textalert("Did you fill up everything?") 
                break;
            }  
            document.getElementById("cpuslider").value = "1";  document.getElementById("core-ammount").innerHTML = "1 Core(s)"
            document.getElementById("memslider").value = "512"; document.getElementById("ram-ammount").innerHTML = "512 MB"
            updatecpuammount()
            updateramammount()
            document.getElementById("intro-creation").style = "display: none;"
            document.getElementById("cpu-ram-configuration").style = "display: block;"
            document.getElementById("optional-features").style = "display: none;"
            currenttab = 2;
            break;

        case 2: //Optional features
            if (cpucores == undefined || ramammount == undefined) {
                textalert("Did you fill up everything?") 
                break;
            }
            document.getElementById("intro-creation").style = "display: none;"
            document.getElementById("cpu-ram-configuration").style = "display: none;"
            document.getElementById("optional-features").style = "display: block;"
            currenttab = 3;
            break;

        case 3: //Create json
            if (accel == undefined ||
                gpuaccel == undefined) {
                textalert("Did you fill up everything?") 
                break;
            }  
            document.getElementById("intro-creation").style = "display: none;"
            document.getElementById("cpu-ram-configuration").style = "display: none;"
            document.getElementById("optional-features").style = "display: none;"
            document.getElementById("create-vm-overlay").style = "display: none;"
            currenttab = 1;

            console.log(ostype)
            console.log(osver)
            console.log(guestname)
            console.log(cpucores)
            console.log(ramammount)
            console.log(accel)
            console.log(gpuaccel)

            createvm();

            //reset values
            document.getElementById("cpuslider").value = "1";  document.getElementById("core-ammount").innerHTML = "1 Core(s)"
            document.getElementById("memslider").value = "512"; document.getElementById("ram-ammount").innerHTML = "512 MB"
            document.getElementById("name-of-guest").value = "";
            ostype = undefined
            osver = undefined
            accel = undefined;
            gpuaccel = undefined;
            break;
    }
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