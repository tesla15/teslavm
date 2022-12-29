var ostype;
var osver;
var accel;
var gpuaccel;
var bootorder;

function selecthdd() {
    bootorder = "-boot c";
}

function selectcd() {
    bootorder = "-boot d";
}

function selectwindows() {
    ostype = "windows";
}

function selectlinux() {
    ostype = "linux";
}

function newerthan7() {
    osver = "q35"
}

function olderthan7() {
    osver = "pc"
}

function tcg() {
    accel = "tcg,thread=multi";
}

function hax() {
    accel = "hax"
}

function hyperv() {
    accel = "whpx"
}

function virtio() {
    gpuaccel = "virtio"
}

function vga() {
    gpuaccel = "std"
}

function cirrus() {
    gpuaccel = "cirrus"
}

function qxl() {
    gpuaccel = "qxl"
}

function vmwaresvga() {
    gpuaccel = "vmware"
}