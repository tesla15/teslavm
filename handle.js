var sliderc = document.getElementById("cockcores");
var outputc = document.getElementById("corescuro");
var slider = document.getElementById("ramsize");
var output = document.getElementById("ramsizecur");
var slider = document.getElementById("ramsize");
var output = document.getElementById("ramsizecur");
var sliderg = document.getElementById("vgambb");  // not used for while
var outputg = document.getElementById("vgambbcur");  // not used for while
var cdromoutput;

var exec = require('child_process').exec;
var fs = require('fs');
const { arch } = require('os');

function updatesliders() {
    output.innerHTML = slider.value +  "GB";
    slider.oninput = function() {
    output.innerHTML = this.value + " GB";
    }

    outputc.innerHTML = sliderc.value;
    sliderc.oninput = function() {
    outputc.innerHTML = this.value;
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
    const acel = document.getElementById("acel").value;
    const useefi = document.getElementById("useefi").checked;
    var command_base = "cd qemu && qemu-system-";
    var command;

    if (useefi) {
        if (acel == "hax") {
            alert("You cant use UEFI and HAX yet")
        } else {
            command = command_base + cpu_type + `.exe -machine q35 -cpu SandyBridge,hv_relaxed,hv_spinlocks=0x1fff,hv_vapic,hv_time -m ${ram}G -smp ${cores} -boot ${border} -vga ${vgaac} -accel ${acel} -bios efi.fd`;
        }
    } else {
        command = command_base + cpu_type + `.exe -m ${ram}G -smp ${cores} -boot ${border} -vga ${vgaac} -accel ${acel}`;
    }
    

    if (cdrom != "" && hda != "") {
        console.log("CD-ROM and Hard Disk attached, building command with them.")
        return command + ` -hda ${hda} -cdrom ${cdrom}`
    } else if (cdrom != "") {
        console.log("CD-ROM attached, building command with it.")
        return command + ` -cdrom ${cdrom}`
    } else if (hda != "") {
        console.log("Hard Disk attached, building command with it")
        return command + ` -hda ${hda}`
    } else {
        console.log("Nothing attached")
        return command
    }
}

function launchvm() {
    exec(commandbuilder(), function callback(error, stdout, stderr) {
        console.log(error,stdout,stderr);
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

    var obj = {
        table: []
     };

    obj.table.push({cpu_type: cpu_type, ram:ram, cores: cores, border: border, hda: hda, cdrom: cdrom, gpu: gpu, acel: acel, useefi: useefi});
    //obj.table.push({cpu_type: cpu_type, ram:ram, cores: cores, border: border, gpu: gpu, acel: acel, useefi: useefi});
    var json = JSON.stringify(obj);
    fs.writeFile('settings.json', json, 'utf8', function (err) {
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

    document.getElementById("cput").value = cpu_type;
    document.getElementById("ramsize").value = ram;
    document.getElementById("cockcores").value = cores;
    document.getElementById("bootorder").value = border;
    document.getElementById("vda").value = hda;
    document.getElementById("cdr").value = cdrom;
    document.getElementById("acel").value = acel;
    document.getElementById("gpuaccel").value = gpu;
    document.getElementById("useefi").checked = useefi;

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

$( "#vdabtn" ).click(function() {
    $( "#vdafile" ).trigger( "click" );            
});

$( "#cdrbtn" ).click(function() {
    $( "#cdrfile" ).trigger( "click" );            
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
