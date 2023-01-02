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
            //cdrom = "C:\\Users\\WinISO\\Downloads\\win16.iso"
            hda = "C:\\Users\\WinISO\\Downloads\\server.qcow2"
            border = "-boot d"
            //

            //generate final command
            if (accel == "whpx")  { //gen 2
                var cpuc = "-cpu Skylake-Client-IBRS,hv_crash,hv_frequencies,hv_relaxed,hv_reset,hv_runtime,hv_spinlocks=0x1fff,hv_time,hv_vapic"
                var uefi = "-bios ../ovmf.fd"
                var smbios = "-smbios type=0,vendor=teslavirtualization,version=2.1 -smbios type=1,manufacturer=teslavirtualization,product=teslavirtualization,version=2.1"
                var portforward = "-net user,hostfwd=tcp::3388-:3389 -net nic"
                command = command_base + `.exe -name ${name.replace(/\s+/g, '')} -drive file=../scsi.iso,media=cdrom ${border} ${cpuc} ${uefi} ${smbios} ${portforward} -device intel-hda -usbdevice tablet -display gtk -machine q35 -m ${ram}M -smp ${cpu} -vga none -vga ${gpu} -accel ${accel} -device virtio-net,netdev=vmnic -netdev user,id=vmnic`;
            }

            if (accel == "hax") {//gen 1 (hax does not support gen 2 yet)
                var cpuc = "-cpu Skylake-Client-IBRS"
                var uefi = ""
                var smbios = "-smbios type=0,vendor=teslavirtualization,version=2.1 -smbios type=1,manufacturer=teslavirtualization,product=teslavirtualization,version=2.1"
                var portforward = ""
                command = command_base + `.exe -name ${name.replace(/\s+/g, '')} -boot menu=on ${border} ${cpuc} ${uefi} ${smbios} ${portforward} -device intel-hda -usbdevice tablet -display gtk -machine q35 -m ${ram}M -smp ${cpu} -vga none -vga ${gpu} -accel ${accel} -device virtio-net,netdev=vmnic -netdev user,id=vmnic`;
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
                    command = command + ` -drive file=${hda},index=5,media=disk,format=qcow2 -cdrom ${cdrom}`
                } else if (cdrom != "") {
                    console.log("CD-ROM attached, building command with it.")
                    command = command + ` -cdrom ${cdrom} `
                } else if (hda != "" ) {
                    console.log("Hard Disk attached, building command with it")
                    command = command + ` -drive file=${hda},index=5,media=disk,format=qcow2 `
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
                    if (stderr.includes("HAX")) {
                        alert("There are two options, you dont have HAXM installed or you have Hyper-V feature enabled. (or you are using AMD cpu)")
                    } else if (stderr.includes("hr=00000000")) {
                        alert("You have to enable Hyper-V feature to use Hyper-V.")
                    } else if (stderr.includes("whpx: injection failed")) {
                        console.log(stderr)
                    } else if (stderr.includes("audio: Failed to create voice")){
                        alert("You should plug in your microphone to prevent from error spam.")
                    } else if(stderr == "" || stderr == undefined) {
                        console.log("empty stderr")
                    } else if (stderr.includes("Image is not in qcow2 format")) {
                        alert("Only qcow2 format is supported for now.")
                    }
                }
            });
        }
    });
}

// ${machine.guestname}, ${machine.ostype}, ${machine.osver}, ${machine.ram}, ${machine.cpu}, ${machine.accel}, ${machine.gpu}