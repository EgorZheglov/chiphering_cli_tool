const fs = require('fs');
const CeaserTransformStream = require('./CeaserTransformStream');
const ROT8TransformStream = require('./ROT-8transformStream');
const AtbashTransformStream = require('./AtbashTransformStream');
const { pipeline } = require('stream');

let reader;
let writer;


if((new Set(process.argv)).size !== process.argv.length){
    // checking for duplications
    process.stderr.write('invalid input data: input string contains duplications!');
    process.exit(1);
}


if(process.argv.some(el => el === '-i')) {
    // appoint input stream
    const path = process.argv[process.argv.indexOf('-i') + 1];

    
    const files = fs.readdirSync(__dirname, 'utf8');
    if(!files.some(el => el === path.slice(2))){
        // checking filename
        process.stderr.write(`invalid input data: file ${path} not found`);
        process.exit(1);
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
        process.stderr.write(`invalid input data: file ${path} not found`);
        process.exit(1);
    }   

    writer = fs.createWriteStream(path.toString(), { flags: 'a', encoding: 'utf8' });
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
              streams.push(new CeaserTransformStream(false));
              break;
            case 'C1':
              streams.push(new CeaserTransformStream(true));
              break;
            case 'R0':
              streams.push(new ROT8TransformStream(false));
              break;
            case 'R1':
              streams.push(new ROT8TransformStream(true));
              break; 
            case 'A':
              streams.push(new AtbashTransformStream());
              break;
            default:
              process.stderr.write(`invalid cipherCode: ${el}`);
              process.exit(1);
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