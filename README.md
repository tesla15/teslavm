
# TeslaVM (alpha)
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)
[![Windows](https://badgen.net/badge/icon/windows?icon=windows&label)](https://microsoft.com/windows/)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
[![Visual Studio Code](https://img.shields.io/badge/--007ACC?logo=visual%20studio%20code&logoColor=ffffff)](https://code.visualstudio.com/)



TeslaVM is graphical user interface made for QEMU for windows usage, since only linux have well working GUI interface for QEMU, other one's from windows are not practical to use so i thought that i can make a program like virt-manager.&nbsp;&nbsp;&nbsp;
<sub>fun fact: that was random project, turned into serious one</sub>

#### You cant use HAXM 7.8.0 for now. (It's not working properly)
You should use QEMU 20221130, HAXM 7.7.1
Currently only windows with new ACPI and ACHI/SATA support are supported. (gen2)

## Installation
#### For development
You have to git clone this repository, download nwjs sdk, qemu windows and put them unpacked into their folders. Open project in visual studio code or your favorite editor, run `npm i ` and run teslavm by `nwjs/nw .` in root repository folder.

#### For personal usage
The compiled executables are available in releases tab.

## Performance 
```
├── Linux
│   └── TeslaVM: 53028 points (https://imgur.com/R9UuFTp)
│   └── VirtualBox: 42430 points (https://imgur.com/eduIUkR)
│
├── Windows
│   └── TeslaVM: 2655 points (https://browser.geekbench.com/v5/cpu/19502042)
│   └── VirtualBox: 2407 points (https://browser.geekbench.com/v5/cpu/19492385)
```
<sub>Software used: sysbench, geekbench 5</sub>

## How to install Hyper-V
![image](https://user-images.githubusercontent.com/117595540/210113771-dc6acd62-7dee-4892-b10b-7ce88ebb64bc.png)

## My windows does not see my disk!
Select a driver. (mounted by default in hyper-v machines)<br>
Also it is very recommended to install virtio guest drivers after you install your Windows (for QXL GPU, Ethernet).

![image](https://user-images.githubusercontent.com/117595540/210115596-0ce4b690-c472-4f56-bfa1-3ee146bd3837.png)


## Todo
- [ ]  Internal virtual network
- [ ]  NAT, Bridged etc. selection of network mode 
- [ ]  SPICE or own display method
- [ ]  USB passtrough 
- [ ]  Multi monitor support
and much more...

## Accelerators
  - HAXM - Intel Hardware Accelerated Execution Manager (HAXM), you can't use it on AMD CPU. You should use it for Linux.
  - Hyper-V - Microsoft hypervisor, you can use it on every CPU which support hyper-v & VT-D,X. You should use it for Windows.

## Troubleshooting
#### I dont know how to install Hyper-V...

 ![image](https://user-images.githubusercontent.com/117595540/210113771-dc6acd62-7dee-4892-b10b-7ce88ebb64bc.png)

#### Windows installator does not see disk

 ![image](https://user-images.githubusercontent.com/117595540/210115596-0ce4b690-c472-4f56-bfa1-3ee146bd3837.png)
 
Also it is very recommended to install virtio guest drivers after you install your Windows (for QXL GPU, Ethernet).

#### Network is verryy slow
1. Disable intel network adapter
2. Install drivers for RedHat VirtIO Ethernet Adapter (virtio guest tools)

## FAQ

**Q:** Does it support machine acceleration ?

**A:** Yes it does on AMD and Intel CPU's with Linux, partially with Windows (full with Hyper-V)
##
**Q:** What guest OS does it support?

**A:** All you dream about!
##
**Q:** HAX acceleration makes my machines doesnt launch! 😠

**A:** Probably you dont have [HAXM](https://github.com/intel/haxm/releases/tag/v7.7.1) or you have Hyper-V [enabled](https://www.nakivo.com/blog/uninstalling-or-disabling-hyper-v-in-windows-10/).
##
**Q:** I cant launch machine with Hyper-V acceleration 😡

**A:** You have to [install](https://learn.microsoft.com/pl-pl/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v) Hyper-V.
##
**Q:** I cant even launch a VM 😡😡

**A:** ;Bro. You should check if your CPU supports VT-d/VT-x and if does, check if you have virtualization options enabled in BIOS. If that wasnt your problem you should check error in developer console (F11) or write to us for help (github issues)
##
**Q:** My windows VM keeps crashing at loading!

**A:** Make sure you are using Hyper-V for windows 64/32bit or HAX for 32bit only.
##

## Screenshot from app
alpha frontend
![demo](https://i.imgur.com/pcSQVzu.png)



## Authors

- [@tesla15](https://www.github.com/tesla15)
- [@arin2115](https://www.github.com/arin2115)
