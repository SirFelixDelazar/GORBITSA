var g_program = [];
var g_ram = [];
var g_register = 0;

function compile() {
    const input = document.getElementById('in').value.replace(/(\n|\t|\r|\v)/g, ' ').replace(/\s\s+/g, ' ').trim();

    if(input == "") {
        console.error('Program is empty');
        return false;
    }

    const program = input.split(' ');
    //const strict = document.getElementById('strict-mode').checked;

    if (!checkSyntax(program, true)) return;

    for(let i = 0; i < 255; i++) {
        g_ram[i] = 0;
    }

    for(let i = 0; i < 255; i++) {
        g_program[i] = 0;
    }

    program.forEach((element, id) => {
        setProgram(element, id);
    });
    
    run();
}

function run() {
    let statement = 0;
    while(true) {
        if(g_program[statement] == 0) break;
        if(g_program[statement].match(/^G/)) {
            let num;
            if(g_program[statement].length == 2) {
                num = parseInt(g_program[statement].charAt(1));
            }
            else if(g_program[statement].length == 3) {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
            }
            else {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
            }
            g_register = g_ram[num];
            statement++;
        }
        if(g_program[statement].match(/^O/)) {
            let num;
            if(g_program[statement].length == 2) {
                num = parseInt(g_program[statement].charAt(1));
            }
            else if(g_program[statement].length == 3) {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
            }
            else {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
            }
            g_ram[num] = g_register;
            statement++;
        }
        if(g_program[statement].match(/^R$/)) {
            let read = 0;
            g_register = (read = parseInt(prompt('input'))) > 255 && read < 0 ? 0 : read;
            statement++;
            continue;
        }
        if(g_program[statement].match(/^B/)) {
            if (g_register == 0) {
                let num;
                if(g_program[statement].length == 2) {
                    num = parseInt(g_program[statement].charAt(1));
                }
                else if(g_program[statement].length == 3) {
                    num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
                }
                else {
                    num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
                }
                statement = num;
                continue;
            } else {
                statement++;
                continue;
            }
        }
        if(g_program[statement].match(/^I/)) {
            let num;
            if(g_program[statement].length == 2) {
                num = parseInt(g_program[statement].charAt(1));
            }
            else if(g_program[statement].length == 3) {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
            }
            else {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
            }
            g_register += num;
            statement++;
            continue;
        }
        if(g_program[statement].match(/^T$/)) {
            alert(g_register);
            statement++;
            continue;
        }
        if(g_program[statement].match(/^S/)) {
            let num;
            if(g_program[statement].length == 2) {
                num = parseInt(g_program[statement].charAt(1));
            }
            else if(g_program[statement].length == 3) {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
            }
            else {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
            }
            g_register = num;
            statement++;
            continue;
        }
        if(g_program[statement].match(/^A/)) {
            let num;
            if(g_program[statement].length == 2) {
                num = parseInt(g_program[statement].charAt(1));
            }
            else if(g_program[statement].length == 3) {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
            }
            else {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
            }
            g_register += g_ram[num];
            statement++;
            continue;
        }
        if(g_program[statement].match(/^g/)) {
            let num;
            if(g_program[statement].length == 2) {
                num = parseInt(g_program[statement].charAt(1));
            }
            else if(g_program[statement].length == 3) {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
            }
            else {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
            }
            g_register += g_ram[g_ram[num]];
            statement++;
            continue;
        }
        if(g_program[statement].match(/^o/)) {
            let num;
            if(g_program[statement].length == 2) {
                num = parseInt(g_program[statement].charAt(1));
            }
            else if(g_program[statement].length == 3) {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
            }
            else {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
            }
            g_ram[g_ram[num]] += g_register;
            statement++;
            continue;
        }
        if(g_program[statement].match(/^r/)) {
            let num;
            if(g_program[statement].length == 2) {
                num = parseInt(g_program[statement].charAt(1));
            }
            else if(g_program[statement].length == 3) {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
            }
            else {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
            }
            let read = 0;
            g_ram[num] = (read = parseInt(prompt('input'))) > 255 && read < 0 ? 0 : read;
            statement++;
            continue;
        }
        if(g_program[statement].match(/^b/)) {
            if (g_register == 0) {
                let num;
                if(g_program[statement].length == 2) {
                    num = parseInt(g_program[statement].charAt(1));
                }
                else if(g_program[statement].length == 3) {
                    num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
                }
                else {
                    num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
                }
                statement = g_ram[num];
                continue;
            } else {
                statement++;
                continue;
            }
        }
        if(g_program[statement].match(/^i/)) {
            let num;
            if(g_program[statement].length == 2) {
                num = parseInt(g_program[statement].charAt(1));
            }
            else if(g_program[statement].length == 3) {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
            }
            else {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
            }
            g_ram[num] += g_register;
            statement++;
            continue;
        }
        if(g_program[statement].match(/^t/)) {
            let num;
            if(g_program[statement].length == 2) {
                num = parseInt(g_program[statement].charAt(1));
            }
            else if(g_program[statement].length == 3) {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
            }
            else {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
            }
            alert(g_ram[num]);
            statement++;
            continue;
        }
        if(g_program[statement].match(/^s/)) {
            let num;
            if(g_program[statement].length == 2) {
                num = parseInt(g_program[statement].charAt(1));
            }
            else if(g_program[statement].length == 3) {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
            }
            else {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
            }
            g_register = num ^ g_register;
            statement++;
            continue;
        }
        if(g_program[statement].match(/^a/)) {
            let num;
            if(g_program[statement].length == 2) {
                num = parseInt(g_program[statement].charAt(1));
            }
            else if(g_program[statement].length == 3) {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)));
            }
            else {
                num = parseInt(g_program[statement].charAt(1).concat(g_program[statement].charAt(2)).concat(g_program[statement].charAt(3)));
            }
            g_register += g_ram[g_ram[num]];
            statement++;
            continue;
        }
    }
}

function checkSyntax(program, strict) {
    if(program.length > 256) {
        console.error('Program is too big >> length is', program.length);
        return false;
    }

    let canCompile = true;
    program.forEach(element => {
        if (!isValidStatement(element, strict)) {
            console.error(element, '<< invalid syntax');
            canCompile = false;
        }
    });
    if (!canCompile) return false;
    console.log('Program is correct');
    return true
}

function setProgram(statement, line) {
    if(line > 255 || line < 0) return false;
    g_program[line] = statement;
    return true;
}

function isValidStatement(statement, strict) {
    if (!strict) return statement.match(/^((R|T)|([GOBISA]([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])))$/);
    return statement.match(/^((R|T)|([GOBISAgorbitsa]([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])))$/);
}