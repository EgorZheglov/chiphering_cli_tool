const alphabet = require('./aphabet-uppercase');
const TransformStream = require('stream').Transform;

module.exports = class ShiftTransformStream extends TransformStream {
    constructor(isEnconding, shiftNumber){
        // this class gives exports ROT-8 or Ceaser stream. becouse of their similarities.

        super();
        this._shiftNumber = shiftNumber; // if encoding (isEncoding = true) - shift to the right, false to the left
        this._isEncoding = isEnconding; // number of shift 1 - for the ceasar and 8 - for the ROT-8
    }

    _transform(chunk, encoding, callback) {

        const chipheredData = chunk.toString().split('').map(symbol => {

            if(!alphabet.includes(symbol.toUpperCase())){
                // if there is any symbols not included in alphabet - they won't be chiphered
                return symbol;
            }
            
            let newIndex;

            if(this._isEncoding){
                newIndex = alphabet.indexOf(symbol.toUpperCase()) + this._shiftNumber;
            } else {
                newIndex = alphabet.indexOf(symbol.toUpperCase()) - this._shiftNumber;
            }


            // there is cases in which array index can become more then 'Z'(25) and lower then 'A'(0) 
            if(newIndex < 0){                               
                newIndex = alphabet.length + newIndex;
            }

            if(newIndex > alphabet.length - 1){
                newIndex = newIndex - alphabet.length;
            }


            if(symbol.toUpperCase() === symbol){
                // checking the original case of the letter
        
                return symbol = alphabet[newIndex];
            } else {
                return symbol = alphabet[newIndex].toLowerCase();
            }
        }).join('');

        this.push(chipheredData);
        callback();
    }
}