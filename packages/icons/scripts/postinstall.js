const {version} = require('../package.json');

const {createWriteStream, access, constants} = require('fs');
const {get} = require('https');

const url = `https://cdn.jsdelivr.net/npm/@fluent-blocks/basic-icons@${version}/basic-icons.svg`;

access('basic-icons.svg', constants.F_OK, dne => {
  if(dne){
    const file = createWriteStream('basic-icons.svg');
    get(url, (res) => {
      res.pipe(file);
      file.on('finish', file.close);
    }).on("error", err => {
      console.log("Error fetching built sprite: ", err.message);
    });
  }
})
