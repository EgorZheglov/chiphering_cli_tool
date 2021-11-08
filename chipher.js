const fs = require('fs');
const ShiftTransformStream = require('./ShiftTransformStream');
const AtbashTransformStream = require('./AtbashCipher');
const { pipeline } = require('stream');

let reader;
let writer;


if((new Set(process.argv)).size !== process.argv.length){
    // checking for duplications
    throw 'invalid input data: input string contains duplications!';
}


if(process.argv.some(el => el === '-i')) {
    // appoint input stream
    const path = process.argv[process.argv.indexOf('-i') + 1];

    
    const files = fs.readdirSync(__dirname, 'utf8');
    if(!files.some(el => el === path.slice(2))){
        // checking filename
        throw `invalid input data: file ${path} not found`
    }   

    reader = fs.createReadStream(path, { encoding: 'utf8' });
} else {

    console.log('type data needs to be chiphered:')
    reader = process.stdin;
}


if(process.argv.some(el => el === '-o')){
    // appoint outputput stream
    const path = process.argv[process.argv.indexOf('-o') + 1];

    const files = fs.readdirSync(__dirname, 'utf8');
    if(!files.some(el => el === path.slice(2))){
        // checking filename
        throw `invalid input data: file ${path} not found`
    }   

    writer = fs.createWriteStream(path.toString(), { encoding: 'utf8' });
} else {
    writer = process.stdout;
}

const chipherCode = getChipherCode();

pipeline(reader, ...streamsArray(chipherCode), writer, () => { 
    console.log('chiphered!');
});


function streamsArray(chipherCode) {
    // chiphering a letter

    let streams = []// geting a start index;

    chipherCode.split('-').forEach(el =>{
        // shifting letter index step-by-step

        switch (el) {

            case 'C0':
              streams.push(new ShiftTransformStream(false, 1));
              break;
            case 'C1':
              streams.push(new ShiftTransformStream(true, 1));
              break;
            case 'R0':
              streams.push(new ShiftTransformStream(false, 8));
              break;
            case 'R1':
              streams.push(new ShiftTransformStream(true, 8));
              break; 
            case 'A':
              streams.push(new AtbashTransformStream());
              break;
        }       
    });

    return streams;

}

function getChipherCode() { 
    // extracting chipher code from CLI & checkig flags

    if (!process.argv.some(item => item === '-c'|| item === '-config')) { // checking having "-c" or "-config" flag
        throw 'wrong command! type -c or -config!'
    }

    return process.argv[3]
}