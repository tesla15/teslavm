
# TeslaVM (early alpha)
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)
[![Windows](https://badgen.net/badge/icon/windows?icon=windows&label)](https://microsoft.com/windows/)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
[![Visual Studio Code](https://img.shields.io/badge/--007ACC?logo=visual%20studio%20code&logoColor=ffffff)](https://code.visualstudio.com/)



TeslaVM is graphical user interface made for QEMU for windows usage, since only linux have well working GUI interface for QEMU and its kinda hard and not practical to use i thought that i can make a program like virt-manager.

#### You cant use HAXM 7.8.0 for now. (It's not working properly)
You should use QEMU 20221130, HAXM 7.7.1

## Installation
#### For development
You have to git clone this repository, download nwjs sdk, qemu windows and put them unpacked into their folders. Open project in visual studio code or your favorite editor and run it by `nwjs/nw .` in root repository folder.

#### For personal usage
The compiled executables are available [here](https://github.com/tesla15/teslavm/releases), run teslavm using run.cmd
## Todo
- [X]  Windows 64bit support (Hyper-V + UEFI)
- [ ]  Machine dashboard (machine list like virtualbox,vmware)
- [X]  Improve frontend
- [X]  Select cpu and machine type
- [ ]  ARM virtualization (will be much better than other virtual machine software)
- [X]  Guest sound to host
- [ ]  Internal virtual network
- [ ]  NAT, Bridged etc. selection of network mode 
- [ ]  Create virtual disk from app
- [X]  Select CD-ROM, virtual disk instead of typing the path
- [ ]  Selection between VNC and default QEMU window
- [ ]  USB, BT passtrough 
- [X]  Android emulation support
- [ ]  Multi monitor support
- [ ]  Slider of VRAM size
- [ ]  MacOS support (very hard)
- [X]  Custom BIOS and maybe EFI
- [X]  Optimize code (command builder etc instead of switch,if)
- [ ]  Tab switching in frontend
and much more...
## FAQ

#### Does it support machine acceleration ?

&nbsp;Yes it does on AMD and Intel CPU's with Linux, partially with Windows (full with Hyper-V)

#### What guest OS does it support?

&nbsp;All you dream about!

#### Will it support more machines to save than only one?

&nbsp;Yes, we are planning to rework the GUI. We are currently working more on the backend than the frontend.

#### HAX acceleration makes my machines doesnt launch! 😠

&nbsp;Probably you dont have [HAXM](https://github.com/intel/haxm/releases/tag/v7.7.1) or you have Hyper-V [enabled](https://www.nakivo.com/blog/uninstalling-or-disabling-hyper-v-in-windows-10/).

#### I cant launch machine with Hyper-V acceleration 😡
&nbsp;You have to [install](https://learn.microsoft.com/pl-pl/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v) Hyper-V.

#### I cant even launch a VM 😡😡
&nbsp;Bro. You should check if your CPU supports VT-d/VT-x and if does, check if you have virtualization options enabled in BIOS. If that wasnt your problem you should check error in developer console (F11) or write to us for help (github issues)

#### My windows VM keeps crashing at loading!
&nbsp;Make sure you are using Hyper-V for windows 64/32bit or TCG/HAX for 32bit only.

## Tree
![tree](https://media.discordapp.net/attachments/945709982425432066/1044312308236685393/image.png)

## Screenshot from app
super ultra mega early alpha frontend dont be scared it will look much better
![demo](https://media.discordapp.net/attachments/945709982425432066/1043983709042393131/image.png)


## Feedback

If you have any feedback, please reach out to us at tesla#0069


## Authors

- [@tesla15](https://www.github.com/tesla15)
