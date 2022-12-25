function destroymachine(guestname) {
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

            console.log(guestname, editItem)

            json.splice(editItem, 1);

            fsss.writeFileSync(`settings.json`, JSON.stringify(json))
        }
    });
}