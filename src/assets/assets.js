const path = require('path');
// dynamic imports for all files from "./png" and "./svg" folders

// get all files from "./png" folder
const useImage = (name) => {

    const filepath = path.join(`@/assets/png/${name}.png`)
    console.log(filepath);
}

module.exports = {
    useImage
};



