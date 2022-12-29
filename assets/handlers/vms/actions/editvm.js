function pickfilecdrom() {
    document.getElementById("cdrom").value = document.getElementById("cdrom-input").value;
}

function pickfilehdd() {
    document.getElementById("hdd").value = document.getElementById("hdd-input").value;
}

function editvm(guestname) {
    console.log(guestname, "is being edited.")
    
    fsss.readFile('settings.json', {encoding: 'utf8', flag: 'r'}, function(err, data) {
        if(err) console.log(err);
        else {
            var json = JSON.parse(data)
            var editItem = null;
            for (let i = 0; i < json.length; i++) {
                if (json[i].guestname == guestname) {
                    editItem = i;
                }
            }     
            
            document.getElementById("cdrom").value = json[editItem].cdrom;
            document.getElementById("hdd").value =  json[editItem].hdd;
            bootorder = json[editItem].bootorder;
        }
    });

    document.getElementById("edit-vm-overlay").style = "display: block"
    document.getElementById("edit-vm").style = "display: block;"
    document.getElementById("edit-vm").style = "display: block;"
    document.getElementById("editparag").innerHTML = "Editing " + guestname;
}

function finishediting() {
    document.getElementById("edit-vm-overlay").style = "display: none"
    document.getElementById("edit-vm").style = "display: none;"

    console.log(bootorder, document.getElementById("hdd-input").value, document.getElementById("cdrom-input").value);

    var dupa = document.getElementById("editparag").innerHTML.split("Editing ")[1]

    console.log(dupa);

    fsss.readFile('settings.json', {encoding: 'utf8', flag: 'r'}, function(err, data) {
        if(err) console.log(err);
        else {
            var json = JSON.parse(data)
            var editItem = null;
            for (let i = 0; i < json.length; i++) {
                if (json[i].guestname == dupa) {
                    editItem = i;
                }
            }     

            
            console.log(editItem)
            json[editItem].cdrom = document.getElementById("cdrom").value;
            json[editItem].hdd = document.getElementById("hdd").value;
            if (bootorder == "") {
                json[editItem].bootorder = "";
            } else {
                json[editItem].bootorder = bootorder;
            }
            fsss.writeFileSync(`settings.json`, JSON.stringify(json))
        }
    });
}