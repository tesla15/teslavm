const { Console } = require('console');

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

            //debug
            cdrom = "C:\\Users\\WinISO\\Downloads\\win8.1.iso"
            hda = "C:\\Users\\WinISO\\user\\windows.qcow2"
            border = "-boot d"
            //

            //generate final command
            if (accel == "whpx")  { //gen 2
                var cpuc = "-cpu Skylake-Client-IBRS,hv_crash,hv_frequencies,hv_relaxed,hv_reset,hv_runtime,hv_spinlocks=0x1fff,hv_time,hv_vapic"
                var uefi = "-bios ../ovmf.fd"
                var smbios = "-smbios type=0,vendor=teslavm,version=2.1 -smbios type=1,manufacturer=teslavm,product=teslavm,version=2.1"
                var portforward = "-net user,hostfwd=tcp::3001-:3389 -net nic"
                command = command_base + `.exe -name ${name.replace(/\s+/g, '')} -drive file=../scsi.iso,media=cdrom ${border} ${cpuc} ${uefi} ${smbios} ${portforward} -device AC97 -usbdevice tablet -display gtk -machine q35 -m ${ram}M -smp ${cpu} -vga none -vga ${gpu} -accel ${accel}`;
            }

            if (accel == "hax") {//gen 1 (hax does not support gen 2 yet)
                var cpuc = "-cpu Skylake-Client-IBRS"
                var uefi = ""
                var smbios = "-smbios type=0,vendor=teslavm,version=2.1 -smbios type=1,manufacturer=teslavm,product=teslavm,version=2.1"
                var portforward = ""
                command = command_base + `.exe -name ${name.replace(/\s+/g, '')} -boot menu=on ${border} ${cpuc} ${uefi} ${smbios} ${portforward} -device AC97 -usbdevice tablet -display gtk -machine q35 -m ${ram}M -smp ${cpu} -vga none -vga ${gpu} -accel ${accel}`;
            }
            console.log(hda)
            console.log(cdrom)

            if (accel == "whpx") {
                if (cdrom != "" && hda != "") {
                    console.log("CD-ROM and Hard Disk attached, building command with them.")
                    command = command + ` -device virtio-scsi-pci,id=scsi0 -drive file=${hda},if=none,format=qcow2,discard=unmap,aio=native,cache=none,id=someid -device scsi-hd,drive=someid,bus=scsi0.0 -cdrom ${cdrom}`
                } else if (cdrom != "") {
                    console.log("CD-ROM attached, building command with it.")
                    command = command + ` -cdrom ${cdrom} `
                } else if (hda != "" ) {
                    console.log("Hard Disk attached, building command with it")
                    command = command + ` -device virtio-scsi-pci,id=scsi0 -drive file=${hda},if=none,format=qcow2,discard=unmap,aio=native,cache=none,id=someid -device scsi-hd,drive=someid,bus=scsi0.0 `
                } else {
                    console.log("Nothing attached")
                    command = command
                }
            } else {
                if (cdrom != "" && hda != "") {
                    console.log("CD-ROM and Hard Disk attached, building command with them.")
                    command = command + ` -hda ${hda} -cdrom ${cdrom}`
                } else if (cdrom != "") {
                    console.log("CD-ROM attached, building command with it.")
                    command = command + ` -cdrom ${cdrom} `
                } else if (hda != "" ) {
                    console.log("Hard Disk attached, building command with it")
                    command = command + ` -hda ${hda} `
                } else {
                    console.log("Nothing attached")
                    command = command
                }
            }


            console.log(command);
            exec(command, function callback(error, stdout, stderr) {
                console.log(stderr);
                if (stderr.includes("warning") || stderr.includes("WARNING")) {
                    //ignore
                } else {
                    if (stderr.includes("Open HAX")) {
                        alert("There are two options, you dont have HAXM installed or you have Hyper-V feature enabled. (or you are using AMD cpu)")
                    } else if (stderr.includes("hr=00000000")) {
                        alert("You have to enable Hyper-V feature to use Hyper-V.")
                    } else if (stderr.includes("whpx: injection failed")) {
                        console.log(stderr)
                    } else if (stderr.includes("audio: Failed to create voice")){
                        alert("You should plug in your microphone to prevent from error spam.")
                    } else if(stderr == "" || stderr == undefined) {
                        console.log("empty stderr")
                    }
                }
            });
        }
    });
}

// ${machine.guestname}, ${machine.ostype}, ${machine.osver}, ${machine.ram}, ${machine.cpu}, ${machine.accel}, ${machine.gpu}