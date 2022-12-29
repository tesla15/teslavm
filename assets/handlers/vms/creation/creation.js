const fsss = require('fs');

async function createvm() {
    console.log("creating vm..")
    content = {
        guestname: guestname,
        ostype: ostype, 
        osver: osver,
        ram: ramammount,
        cpu: cpucores,
        accel: accel,
        gpu: gpuaccel,
        cdrom: '',
        hdd: '',
        bootorder: ''
    }

    fsss.readFile('settings.json', {encoding: 'utf8', flag: 'r'}, function(err, data) {
        if(err) console.log(err);
        else {
            console.log(data);
            var json = JSON.parse(data)
            json.push(content);
            fsss.writeFileSync(`settings.json`, JSON.stringify(json))
        }
    });

    console.log("VM has been saved.")
    location.reload();
}