const fs = require('fs');
fs.readFile('./Alias-Sheet1.csv', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        const lines = data.split('\n');
        const result = [];
        const headers = ['id', 'song_name', 'alias']
        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(',');
            while (currentline[currentline.length - 1] === '' || currentline[currentline.length - 1] === '\r'){
                currentline.pop();
            }
            // console.log(currentline);
            obj[headers[0]] = currentline[0];
            obj[headers[1]] = currentline[1];
            const alias = [];
            for (let j = 2; j < currentline.length; j++) {
                alias.push(currentline[j]);
            }
            obj[headers[2]] = alias;
            result.push(obj);
        }
        fs.writeFile('./alias.json', JSON.stringify(result), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('success');
            }
        })
    }
})
