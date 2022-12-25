var exec = require('child_process').exec;



async function runguest(name, ostype, osver, ram, cpu, accel, gpu, border) {
    var command_base = "cd qemu && qemu-system-x86_64";
    var command;
    var finalaccel;
    var hda,cdrom;

    await fsss.readFile('settings.json', {encoding: 'utf8', flag: 'r'}, function(err, data) {
        if(err) console.log(err);
        else {
            var json = JSON.parse(data)
            var editItem = null;
            for (let i = 0; i < json.length; i++) {
                if (json[i].guestname == name) {
                    editItem = i;
                }
            }    
            hda = json[editItem].hdd;
            cdrom = json[editItem].cdrom;

            console.log(name);
            console.log(editItem);

            console.log(hda)
            console.log(cdrom)



            if (1+1==3) { //disable uefi for a while
                if (finalaccel == "hax") {
                    if (cores > 2) {
                        alert("You cant use more cores than 2 on UEFI HAXM")
                    } else {
                        command = command_base + `.exe -name ${name.replace(/\s+/g, '')} -device AC97 -usbdevice tablet -display gtk -machine ${osver} -cpu Skylake-Client-IBRS,hv_crash,hv_frequencies,hv_relaxed,hv_reset,hv_runtime,hv_spinlocks=0x1fff,hv_time,hv_vapic -m ${ram}M -smp sockets=${cpu},cores=1,threads=1 -vga ${gpu} -accel ${accel} -bios ../ovmf.fd`;
                    }
                } else {
                    command = command_base + `.exe -name ${name.replace(/\s+/g, '')} -device AC97 -usbdevice tablet -display gtk -machine ${osver} -cpu Skylake-Client-IBRS,hv_crash,hv_frequencies,hv_relaxed,hv_reset,hv_runtime,hv_spinlocks=0x1fff,hv_time,hv_vapic -m ${ram}M -smp sockets=${cpu},cores=1,threads=1 -vga ${gpu} -accel ${accel} -bios ../ovmf.fd`;
                    console.log("uefi no hax")
                }
            } else {
                console.log("no uefi")
                command = command_base + `.exe -name ${name.replace(/\s+/g, '')} -device AC97 -usbdevice tablet -display gtk -machine ${osver} -cpu Skylake-Client-IBRS,hv_crash,hv_frequencies,hv_relaxed,hv_reset,hv_runtime,hv_spinlocks=0x1fff,hv_time,hv_vapic -m ${ram}M -smp sockets=1,cores=${cpu},threads=1 -vga ${gpu} -accel ${accel} ${border}`;
            }


            console.log(hda)
            console.log(cdrom)

            if (cdrom != "" && hda != "") {
                console.log("CD-ROM and Hard Disk attached, building command with them.")
                command = command + ` -hda ${hda} -cdrom ${cdrom}`
            } else if (cdrom != "") {
                console.log("CD-ROM attached, building command with it.")
                command = command + ` -cdrom ${cdrom}`
            } else if (hda != "" ) {
                console.log("Hard Disk attached, building command with it")
                command = command + ` -hda ${hda}`
            } else {
                console.log("Nothing attached")
                command = command
            }


            console.log(command);
            exec(command, function callback(error, stdout, stderr) {
                console.log(stderr);
                if (stderr.includes("warning") || stderr.includes("WARNING")) {
                    //ignore
                } else {
                    if (stderr.includes("No accelerator found")) {
                        alert("There are two options, you dont have HAXM installed or you have Hyper-V feature enabled. (or you are using AMD cpu)")
                    } else if (stderr.includes("WHPX: No accelerator found")) {
                        alert("You have to enable Hyper-V feature to use Hyper-V.")
                    } else {
                        alert(stderr);
                    }
                }
            });
        }
    });
}

// ${machine.guestname}, ${machine.ostype}, ${machine.osver}, ${machine.ram}, ${machine.cpu}, ${machine.accel}, ${machine.gpu}
