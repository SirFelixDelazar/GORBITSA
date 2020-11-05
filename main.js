/**
 * 
 * @param {string} str Text to normalize
 * @returns {string} Normalized string (all words are splitted by 1 whitespace (tabs and etc. are removed))
 */
const normalize = (str) => {
    return str.replace(/(\n|\s|\t|\v|\r)/g, ' ').replace(/\s\s+/g, ' ').trim();
}
// console.assert(normalize('\n\t\t\r assa\r\t\t\t   \n') === 'assa');
// console.assert(normalize('\n\t\t\r asssa\r\t\t\t   \n') !== 'assa');

/**
 * 
 * @param {string} statement Statement to check
 * @returns {boolean} Is statement valid
 */
const checkStatement = (statement) => {
    return !!statement.match(/^[GORBITSAgorbitsa][0-9]?[0-9]?[0-9]?$/);
}
// console.assert(checkStatement('G22')  === true);
// console.assert(checkStatement('R')    === true);
// console.assert(checkStatement('Y222') === false);

/**
 * 
 * @param {string} str Normalized string to validate gorbitsa program
 * @returns {boolean} Result of the validating
 */
const validate = (str) => {
    return str.split(' ').every(checkStatement);
}
// console.assert(validate('G22 S22 R2'));
// console.assert(validate('G22 S22 X2') === false);

/**
 * 
 * @param {string} str Statement to byte code
 * @returns {number} Byte code of statement
 */
const toByteCode = (str) => {
    return (str.charCodeAt(0) << 8) + (str.slice(1,4) !== '' ? +str.slice(1,4) % 256 : 0);
}
// console.assert(toByteCode('G22') == 0x0116);
// console.assert(toByteCode('B') == 0x0400);
// console.assert(toByteCode('R256') == 0x0300);

/**
 * 
 * @param {string} str Gorbitsa progam to compile
 * @returns {Array} The program
 */
const compile = (str) => {
    return str.split(' ').map(toByteCode)
}

/**
 * 
 * @param {Number} statement 
 * @param {Number} register 
 * @param {Number} pc 
 * @param {Array} memory 
 * @param {Object} mode
 */
const evalStatement = (statement, register, pc, memory, mode) => {
    const newMemory = [...memory];
    const newPc = pc+1;
    const value = statement & 0xFF;
    switch (String.fromCharCode(statement >> 8))
    {
    case 'G':
        return [memory[value], newPc, newMemory];
    case 'O':
        newMemory[value] = register;
        return [register, newPc, newMemory];
    case 'R':
        return [+prompt('X') % 256, newPc, newMemory];
    case 'B':
        return [register, register == 0 ? value : newPc, newMemory]; 
    case 'I':
        return [(register + value) % 256, newPc, newMemory];
    case 'T':
        if (mode.alert) alert(mode.ascii ? String.fromCharCode(register) : register + ' ');
        document.getElementById('out').value += mode.ascii ? String.fromCharCode(register) : register + ' ';;
        return [register, newPc, newMemory];
    case 'S':
        return [value, newPc, newMemory];
    case 'A':
        return [(register + memory[value]) % 256, newPc, newMemory];
    case 'g':
        return [memory[memory[value]], newPc, newMemory];
    case 'o':
        newMemory[memory[value]] = register
        return [register, newPc, newMemory];
    case 'r':
        newMemory[value] = +prompt('X') % 256;
        return [register, newPc, newMemory];
    case 'b':
        return [register, register == 0 ? memory[value] : newPc, newMemory];
    case 'i':
        newMemory[value] = (memory[value] + register) % 256;
        return [register, newPc, newMemory];
    case 't':
        if (mode.alert) alert(mode.ascii ? String.fromCharCode(memory[value]) : memory[value] + ' ');
        document.getElementById('out').value += mode.ascii ? String.fromCharCode(memory[value]) : memory[value] + ' ';
        return [register, newPc, newMemory];
    case 's':
        return [register ^ memory[value], newPc, newMemory];
    case 'a':
        return [(register + memory[memory[value]]) % 256, newPc, newMemory];

    default:
        return [-1, newPc, newMemory];
    }
}

/**
 * @param {Array} program Program to run
 * @param {boolean} mode Is ASCII mode enabled
 * @returns {null}
 */
const run = (program, mode) => {
    let memory = new Array(255).fill(0);
    let register = 0;
    let pc = 0;
    let cc = 0;
    while (1) {
        [register, pc, memory] = evalStatement(program[pc], register, pc, memory, mode);
        if (register == -1 || pc == 256) break;
        ++cc;
        if(cc % 1000 == 0 && confirm(`Break? (Step:${cc})`)) {
            console.log(pc, register, memory);
            break;
        }
    }
}

/**
 * Main Function of the program
 */
const main = () => {
    const textProgram = normalize(document.getElementById('in').value);
    const mode = {ascii:document.getElementById('aout').checked, alert:document.getElementById('eale').checked}
    document.getElementById('out').value = '';
    if (validate(textProgram))
    {
        const program = compile(textProgram);
        run(program, mode);
    }
}