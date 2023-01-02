async function updateinfo() {
    const systemcpu = await os.cpus();  // use await to get the result of the asynchronous call
    document.getElementById("cpuinfo").innerHTML = "CPU: " + systemcpu[0].model;  //update processor info
    const totalmem = await os.totalmem();  // use await to get the result of the asynchronous call
    document.getElementById("meminfo").innerHTML = "Memory: " + (totalmem / (1024 * 1024 * 1024)).toFixed(1) + " GB"; //update ram info
  }
  