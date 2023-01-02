async function destroymachine(guestname) {
    try {
      // Read the file asynchronously
      const data = await fss.promises.readFile('settings.json', 'utf8');
      // Parse the file content as JSON
      const json = JSON.parse(data);
      // Find the index of the item to be deleted
      const editItem = json.findIndex(item => item.guestname === guestname);
      // Remove the item from the array
      json.splice(editItem, 1);
      // Write the updated JSON array to the file
      await fss.promises.writeFile('settings.json', JSON.stringify(json));
      // Reload the page
      location.reload();
    } catch (err) {
      console.log(err);
    }
  }