const fss = require('fs');

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


async function readvms() {
  try {
    const data = await fss.promises.readFile('settings.json', { encoding: 'utf8', flag: 'r' });  // use await to read the file asynchronously
    console.log(data);
    const json = JSON.parse(data);
    let table = document.getElementById('vmtable'); //init table
    for (const machine of json) {
      console.log('loading');

      let row = table.insertRow(-1); // we are adding at the end of table so -1!

      // create new table cells
      let c1 = row.insertCell(0);
      let c2 = row.insertCell(1);
      let c3 = row.insertCell(2);
      let c4 = row.insertCell(3);

      //create unique id's
      const cc1 = generateRandomString(256);
      const cc2 = generateRandomString(256);
      const cc3 = generateRandomString(256);
      const cc4 = generateRandomString(256);

      // add data to table
      c1.className = cc1;
      const c1c = document.querySelector(`.${cc1}`);
      c1c.innerHTML = `${machine.guestname}`;
      c2.className = cc2;
      const c2c = document.querySelector(`.${cc2}`);
      c2c.innerHTML = `<center>${machine.cpu}</center>`;
      c3.className = cc3;
      const c3c = document.querySelector(`.${cc3}`);
      c3c.innerHTML = `<center>${machine.ram} MB</center>`;
      c4.className = cc4;
      const c4c = document.querySelector(`.${cc4}`);
      c4c.innerHTML = `<center><i class="fas fa-play" style='cursor:pointer;' onclick='runguest("${machine.guestname}", "${machine.ostype}", "${machine.osver}", "${machine.ram}", "${machine.cpu}", "${machine.accel}", "${machine.gpu}","${machine.bootorder}" )'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i style="cursor:pointer;" class="fas fa-edit" onclick='editvm("${machine.guestname}")'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-trash" style="color: rgb(255, 57, 57); cursor:pointer;" onclick="destroymachine('${machine.guestname}');"></i></center>`;
    }
  } catch (err) {
    console.log(err);
  }
}

readvms();

