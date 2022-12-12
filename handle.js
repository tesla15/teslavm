var sliderc = document.getElementById("cockcores");
var outputc = document.getElementById("corescuro");
var slider = document.getElementById("ramsize");
var output = document.getElementById("ramsizecur");
var slider = document.getElementById("ramsize");
var output = document.getElementById("ramsizecur");
var vdiskc = document.getElementById("vdisksize"); // not used for while
var vdiskg = document.getElementById("vdiskcur"); // not used for while
var vdiskpopup = false;
console.log("Handler loaded from remote server.");
var exec = require('child_process').exec;
var fs = require('fs');
const {
    arch
} = require('os');

function updatesliders() {
    output.innerHTML = slider.value + " GB";
    slider.oninput = function() {
        output.innerHTML = this.value + " GB";
    }

    outputc.innerHTML = sliderc.value;
    sliderc.oninput = function() {
        outputc.innerHTML = this.value;
    }

    vdiskg.innerHTML = vdiskc.value + " GB";
    vdiskc.oninput = function() {
        vdiskg.innerHTML = this.value + " GB";
    }
}

updatesliders()

function hdasel() {
    document.getElementById("page-mask").style.display = "block";
    document.getElementById("hdapopup").style.display = "block";
}

function closehda() {
    document.getElementById("page-mask").style.display = "none";
    document.getElementById("hdapopup").style.display = "none";
}

const commandbuilder = () => {
    const cpu_type = document.getElementById("cput").value;
    const ram = document.getElementById("ramsize").value;
    const cores = document.getElementById("cockcores").value;
    const border = document.getElementById("bootorder").value;
    const hda = document.getElementById("vda").value;
    const cdrom = document.getElementById("cdr").value;
    const vgaac = document.getElementById("gpuaccel").value;
    const acell = document.getElementById("acel").value;
    const useefi = document.getElementById("useefi").checked;
    const machinetype = document.getElementById("machtype").value;
    const cputype = document.getElementById("cputypesel").value;
    const audio = document.getElementById("audiosel").value;

    var command_base = "cd qemu && qemu-system-";
    var command;
    var finalaccel;

    if (acell == "tcg") {
        finalaccel = "tcg,thread=multi"
    } else {
        finalaccel = acell;
    }
    

    if (useefi) {
        if (finalaccel == "hax") {
            //alert("You cant use UEFI and HAX yet")
            if (cores > 2) {
                alert("You cant use more cores than 2 on UEFI HAXM")
            } else {
                command = command_base + cpu_type + `.exe ${audio} -usbdevice tablet -display gtk -machine ${machinetype} -cpu ${cputype}, -m ${ram}G -smp ${cores} -boot ${border} -vga ${vgaac} -accel ${finalaccel} -bios ../ovmf.fd`;
            }
        } else {
            command = command_base + cpu_type + `.exe ${audio} -usbdevice tablet -display gtk -machine ${machinetype} -cpu ${cputype} -m ${ram}G -smp ${cores} -boot ${border} -vga ${vgaac} -accel ${finalaccel} -bios ../ovmf.fd`;
            console.log("uefi no hax")
        }
    } else {
        console.log("no uefi")
        command = command_base + cpu_type + `.exe ${audio} -usbdevice tablet -display gtk -machine ${machinetype} -cpu ${cputype} -m ${ram}G -smp ${cores} -boot ${border} -vga ${vgaac} -accel ${finalaccel}`;
    }


    if (cdrom != "" && hda != "") {
        console.log("CD-ROM and Hard Disk attached, building command with them.")
        console.log(command)
        return command + ` -hda ${hda} -cdrom ${cdrom}`
    } else if (cdrom != "") {
        console.log("CD-ROM attached, building command with it.")
        console.log(command)
        return command + ` -cdrom ${cdrom}`
    } else if (hda != "") {
        console.log("Hard Disk attached, building command with it")
        console.log(command)
        return command + ` -hda ${hda}`
    } else {
        console.log("Nothing attached")
        console.log(command)
        return command
    }
}

function launchvm() {
    exec(commandbuilder(), function callback(error, stdout, stderr) {
        console.log(error, stdout, stderr);
    });
}

function save() {
    const cpu_type = document.getElementById("cput").value;
    const ram = document.getElementById("ramsize").value;
    const cores = document.getElementById("cockcores").value;
    const border = document.getElementById("bootorder").value;
    const hda = document.getElementById("vda").value;
    const cdrom = document.getElementById("cdr").value;
    const acel = document.getElementById("acel").value;
    const gpu = document.getElementById("gpuaccel").value;
    const useefi = document.getElementById("useefi").checked;
    const machinetype = document.getElementById("machtype").value;
    const cputype = document.getElementById("cputypesel").value;
    const audio = document.getElementById("audiosel").value;

    var obj = {
        table: []
    };

    obj.table.push({
        cpu_type: cpu_type,
        ram: ram,
        cores: cores,
        border: border,
        hda: hda,
        cdrom: cdrom,
        gpu: gpu,
        acel: acel,
        useefi: useefi,
        machinetype: machinetype,
        cputype: cputype,
        audio, audio

    });
    //obj.table.push({cpu_type: cpu_type, ram:ram, cores: cores, border: border, gpu: gpu, acel: acel, useefi: useefi});
    var json = JSON.stringify(obj);
    fs.writeFile('settings.json', json, 'utf8', function(err) {
        if (err) {
            return console.log(err);
        }
    })

    console.log("Settings succesfully saved to settings.json")
}

function load() {
    var obj = JSON.parse(fs.readFileSync("settings.json"));
    const cpu_type = obj.table[0].cpu_type
    const ram = obj.table[0].ram
    const cores = obj.table[0].cores
    const border = obj.table[0].border
    const hda = obj.table[0].hda
    const cdrom = obj.table[0].cdrom
    const acel = obj.table[0].acel;
    const gpu = obj.table[0].gpu;
    const useefi = obj.table[0].useefi;
    const machinetype = obj.table[0].machinetype;
    const cputype = obj.table[0].cputype;
    const audio = obj.table[0].audio;

    document.getElementById("cput").value = cpu_type;
    document.getElementById("ramsize").value = ram;
    document.getElementById("cockcores").value = cores;
    document.getElementById("bootorder").value = border;
    document.getElementById("vda").value = hda;
    document.getElementById("cdr").value = cdrom;
    document.getElementById("acel").value = acel;
    document.getElementById("gpuaccel").value = gpu;
    document.getElementById("useefi").checked = useefi;
    document.getElementById("machtype").value = machinetype;
    document.getElementById("cputypesel").value = cputype;
    document.getElementById("audiosel").value = audio;

    console.log("Settings succesfully loaded from settings.json")
    updatesliders()
}

function cdromchanged() {
    console.log("cdrom changed")
    document.getElementById("cdr").value = document.getElementById("cdrfile").value;
}

function vdachanged() {
    console.log("vda changed")
    document.getElementById("vda").value = document.getElementById("vdafile").value;
}

$("#vdabtn").click(function() {
    $("#vdafile").trigger("click");
});

$("#cdrbtn").click(function() {
    $("#cdrfile").trigger("click");
});

$("#adrbtn").click(function() {
    //$( "#adrfile" ).trigger( "click" );    
    console.log("show creator popup")
    document.getElementById("page-mask").style = "display: block;";
    document.getElementById("hdapopup").style = "display: block;";
});


function switchtype() {
    console.log("Switched to " + document.getElementById("vtype").value)
    if (document.getElementById("vtype").value == "hyperv") {
        gethypervm()
        document.getElementById("qemuvirt").style = "display: none;"
        document.getElementById("hypervirt").style = ""
    } else if (document.getElementById("vtype").value == "qemu") {
        document.getElementById("hypervirt").style = "display: none;"
        document.getElementById("qemuvirt").style = ""
    }
}

var cmd;
var path;


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function generatepath() {
    path = `C:\\Users\\%USERNAME%\\VMs\\${getRandomInt(500000)}.${document.getElementById("vdisksel").value}`
}


function vdiskcreate() {
    console.log("generating command");
    generatepath()
    cmd = `cd qemu && qemu-img create -f ${document.getElementById("vdisksel").value} ${path} ${document.getElementById("vdisksize").value + "G"}`
    console.log("command: " + cmd);
    exec("mkdir C:\\Users\\%USERNAME%\\VMs\\", function callback(error, stdout, stderr) {
        console.log(error, stdout, stderr);
    });
    exec(cmd, function callback(error, stdout, stderr) {
        console.log(error, stdout, stderr);
    });
    alert("Disk created in " + path)
}