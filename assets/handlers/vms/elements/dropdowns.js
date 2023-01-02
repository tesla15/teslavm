async function selecthdd() {
    bootorder = "-boot c";
}

async function selectcd() {
    bootorder = "-boot d";
}

async function selectwindows() {
    ostype = "windows";
}

async function selectlinux() {
    ostype = "linux";
}

async function newerthan7() {
    osver = "q35"
}

async function olderthan7() {
    osver = "pc"
}

async function tcg() {
    accel = "tcg,thread=multi";
}

async function hax() {
    accel = "hax"
}

async function hyperv() {
    accel = "whpx"
}

async function virtio() {
    gpuaccel = "virtio"
}

async function vga() {
    gpuaccel = "std"
}

async function cirrus() {
    gpuaccel = "cirrus"
}

async function qxl() {
    gpuaccel = "qxl"
}

async function vmwaresvga() {
    gpuaccel = "vmware"
}
