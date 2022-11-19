var sliderc = document.getElementById("cockcores");
var outputc = document.getElementById("corescuro");
var slider = document.getElementById("ramsize");
var output = document.getElementById("ramsizecur");
var slider = document.getElementById("ramsize");
var output = document.getElementById("ramsizecur");

var sliderg = document.getElementById("vgambb");  //
var outputg = document.getElementById("vgambbcur");  //


var exec = require('child_process').exec;
var fs = require('fs');

function updatesliders() {
    output.innerHTML = slider.value + "GB";
    slider.oninput = function() {
    output.innerHTML = this.value + "GB";
    }

    outputc.innerHTML = sliderc.value;
    sliderc.oninput = function() {
    outputc.innerHTML = this.value;
    }
}

updatesliders()


function launchvm() {
    const cpu_type = document.getElementById("cpus").value; //
    const ram = document.getElementById("ramsize").value; //
    const cores = document.getElementById("cockcores").value;//
    const border = document.getElementById("bootorder").value;//
    const hda = document.getElementById("hdapath").value;//
    const cdrom = document.getElementById("cdrompath").value;
    const vgaac = document.getElementById("gpuaccel").value;
    const acel = document.getElementById("acel").value;

    console.log(cpu_type, ram,cores,border,hda,cdrom);

    if (cpu_type == 1) {
        switch (acel) {
            case "tcg":
                if (hda == "" && cdrom == "") {
                    console.log("no hda,cdrom")
                    exec(`cd qemu && qemu-system-x86_64.exe -audiodev jack,id=snd0 -machine type=q35 -accel tcg -m ${ram}G -smp ${cores} -boot order=${border} -vga ${vgaac} -cpu Haswell-v4`, function callback(error, stdout, stderr) {
                        console.log(error,stdout,stderr);
                    });
                } else if (cdrom == "") {
                    console.log("no cdrom")
                    exec(`cd qemu && qemu-system-x86_64.exe -audiodev jack,id=snd0 -machine type=q35 -accel tcg -m ${ram}G -smp ${cores} -boot order=${border} -hda ${hda} -vga ${vgaac} -cpu Haswell-v4`, function callback(error, stdout, stderr) {
                        console.log(error,stdout,stderr);
                    });
                } else if (hda == "") {
                    console.log("no hda")
                    exec(`cd qemu && qemu-system-x86_64.exe -audiodev jack,id=snd0 -machine type=q35 -accel tcg -m ${ram}G -smp ${cores} -boot order=${border} -cdrom ${cdrom} -vga ${vgaac} -cpu Haswell-v4`, function callback(error, stdout, stderr) {
                        console.log(error,stdout,stderr);
                    });
                } else {
                    console.log("cdrom,hda")
                    exec(`cd qemu && qemu-system-x86_64.exe -audiodev jack,id=snd0 -machine type=q35 -accel tcg -m ${ram}G -smp ${cores} -cdrom ${cdrom} -hda ${hda} -boot order=${border} -vga ${vgaac} -cpu Haswell-v4`, function callback(error, stdout, stderr) {
                        console.log(error,stdout,stderr);
                    });
                }
                break;
            case "hax":
                if (hda == "" && cdrom == "") {
                    console.log("no hda,cdrom")
                    exec(`cd qemu && qemu-system-x86_64.exe -audiodev jack,id=snd0 -machine type=q35 -accel hax -m ${ram}G -smp ${cores} -boot order=${border} -vga ${vgaac} -cpu Haswell-v4`, function callback(error, stdout, stderr) {
                        console.log(error,stdout,stderr);
                    });
                } else if (cdrom == "") {
                    console.log("no cdrom")
                    exec(`cd qemu && qemu-system-x86_64.exe -audiodev jack,id=snd0 -machine type=q35 -accel hax -m ${ram}G -smp ${cores} -boot order=${border} -hda ${hda} -vga ${vgaac} -cpu Haswell-v4`, function callback(error, stdout, stderr) {
                        console.log(error,stdout,stderr);
                    });
                } else if (hda == "") {
                    console.log("no hda")
                    exec(`cd qemu && qemu-system-x86_64.exe -audiodev jack,id=snd0 -machine type=q35 -accel hax -m ${ram}G -smp ${cores} -boot order=${border} -cdrom ${cdrom} -vga ${vgaac} -cpu Haswell-v4`, function callback(error, stdout, stderr) {
                        console.log(error,stdout,stderr);
                    });
                } else {
                    console.log("cdrom,hda")
                    exec(`cd qemu && qemu-system-x86_64.exe -audiodev jack,id=snd0 -machine type=q35 -accel hax -m ${ram}G -smp ${cores} -cdrom ${cdrom} -hda ${hda} -boot order=${border} -vga ${vgaac} -cpu Haswell-v4`, function callback(error, stdout, stderr) {
                        console.log(error,stdout,stderr);
                    });
                }
                break;
            case "whpx":
                if (hda == "" && cdrom == "") {
                    console.log("no hda,cdrom")
                    exec(`cd qemu && qemu-system-x86_64.exe -audiodev jack,id=snd0 -machine type=q35 -accel whpx -m ${ram}G -smp ${cores} -boot order=${border} -vga ${vgaac} -cpu Haswell-v4`, function callback(error, stdout, stderr) {
                        console.log(error,stdout,stderr);
                    });
                } else if (cdrom == "") {
                    console.log("no cdrom")
                    exec(`cd qemu && qemu-system-x86_64.exe -audiodev jack,id=snd0 -machine type=q35 -accel whpx -m ${ram}G -smp ${cores} -boot order=${border} -hda ${hda} -vga ${vgaac} -cpu Haswell-v4`, function callback(error, stdout, stderr) {
                        console.log(error,stdout,stderr);
                    });
                } else if (hda == "") {
                    console.log("no hda")
                    exec(`cd qemu && qemu-system-x86_64.exe -audiodev jack,id=snd0 -machine type=q35 -accel whpx -m ${ram}G -smp ${cores} -boot order=${border} -cdrom ${cdrom} -vga ${vgaac} -cpu Haswell-v4`, function callback(error, stdout, stderr) {
                        console.log(error,stdout,stderr);
                    });
                } else {
                    console.log("cdrom,hda")
                    exec(`cd qemu && qemu-system-x86_64.exe -audiodev jack,id=snd0 -machine type=q35 -accel whpx -m ${ram}G -smp ${cores} -cdrom ${cdrom} -hda ${hda} -boot order=${border} -vga ${vgaac} -cpu Haswell-v4`, function callback(error, stdout, stderr) {
                        console.log(error,stdout,stderr);
                    });
                }
                break;
        }
    } else if (cpu_type == 2) {
        // 32 bit, but no sense because we have x86_64
    }
}

function save() {
    const cpu_type = document.getElementById("cpus").value; 
    const ram = document.getElementById("ramsize").value; 
    const cores = document.getElementById("cockcores").value;
    const border = document.getElementById("bootorder").value;
    const hda = document.getElementById("hdapath").value;
    const cdrom = document.getElementById("cdrompath").value;
    const acel = document.getElementById("acel").value; 
    const gpu = document.getElementById("gpuaccel").value;

    var obj = {
        table: []
     };

    obj.table.push({cpu_type: cpu_type, ram:ram, cores: cores, border: border, hda: hda, cdrom: cdrom, gpu: gpu, acel: acel});
    var json = JSON.stringify(obj);
    fs.writeFile('settings.json', json, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    })
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

    document.getElementById("cpus").value = cpu_type;
    document.getElementById("ramsize").value = ram;
    document.getElementById("cockcores").value = cores;
    document.getElementById("bootorder").value = border;
    document.getElementById("hdapath").value = hda;
    document.getElementById("cdrompath").value = cdrom;
    document.getElementById("acel").value = acel;
    document.getElementById("gpuaccel").value = gpu;
    updatesliders()
}