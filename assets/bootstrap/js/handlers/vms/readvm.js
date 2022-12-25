const fss = require('fs');
const { clearLine } = require('readline');

var globalmachine;

const generateRandomString = (myLength) => {
    const chars =
      "abcdefghijklmnopqrstuvwxyz";
    const randomArray = Array.from(
      { length: myLength },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
  
    const randomString = randomArray.join("");
    return randomString;
  };


function readvms() {
    fsss.readFile('settings.json', {encoding: 'utf8', flag: 'r'}, async function(err, data) {
        if(err) console.log(err);
        else {
            console.log(data);
            var json = JSON.parse(data)
            json.forEach(async machine => {
                // guestname: guestname,
                // ostype: ostype, 
                // osver: osver,
                // ram: ramammount,
                // cpu: cpucores,
                // accel: accel,
                // gpu: gpuaccel

                console.log("loading")

                let table = document.getElementById("vmtable"); //init table
 
                let row = table.insertRow(-1); // we are adding at the end of table so -1!
             
                // create new table cells
                let c1 = row.insertCell(0);
                let c2 = row.insertCell(1);
                let c3 = row.insertCell(2);
                let c4 = row.insertCell(3);

                //create unique id's
                var cc1 = generateRandomString(256);
                var cc2 = generateRandomString(256);
                var cc3 = generateRandomString(256);
                var cc4 = generateRandomString(256);
             
                // add data to table
                c1.className = cc1; var c1c = document.querySelector(`.` + cc1); c1c.innerHTML = `${machine.guestname}`
                c2.className = cc2; var c2c = document.querySelector(`.` + cc2); c2c.innerHTML = `<center>${machine.cpu}</center>`
                c3.className = cc3; var c3c = document.querySelector(`.` + cc3); c3c.innerHTML = `<center>${machine.ram} MB</center>`
                c4.className = cc4; var c4c = document.querySelector(`.` + cc4); c4c.innerHTML = `<center><a style='cursor:pointer;' onclick='runguest("${machine.guestname}", "${machine.ostype}", "${machine.osver}", "${machine.ram}", "${machine.cpu}", "${machine.accel}", "${machine.gpu}","${machine.bootorder}" )'>Launch</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="cursor:pointer;" onclick='editvm("${machine.guestname}")'>Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="color: rgb(255, 69, 69); cursor:pointer;" onclick="destroymachine('${machine.guestname}');">Destroy</a></center>`
            })
        }
    });
}

