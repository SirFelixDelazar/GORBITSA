var g_program = []
var g_ram = []
var g_register = 0

function compile() {
    const input = document.getElementById('in').value.replace(/(\n|\t|\r|\v)/g, ' ').replace(/\s\s+/g, ' ').trim()

    if(input == "") {
        console.error('the program is empty')
        alert('the program is empty')
        return false
    }

    const program = input.split(' ')

    if (!checkSyntax(program)) return

    for(let i = 0; i < 255; i++) {
        g_ram[i] = 0
    }

    for(let i = 0; i < 255; i++) {
        g_program[i] = 0
    }

    g_register = 0;

    program.forEach((element, id) => {
        g_program[id] = element;
    })
    
    run()
}

function run() {
    let statement = 0
    while(true) {
        if(g_program[statement] == 0) break
        
        if(g_program[statement].match(/^G/)) {
            g_register = g_ram[getArg(g_program[statement])]
            statement++
            continue
        }

        if(g_program[statement].match(/^O/)) {
            g_ram[getArg(g_program[statement])] = g_register
            statement++
            continue
        }

        if(g_program[statement].match(/^R$/)) {
            let read = 0
            g_register = (read = parseInt(prompt('input'))) > 255 && read < 0 ? 0 : read
            statement++
            continue
        }

        if(g_program[statement].match(/^B/)) {
            if (g_register == 0)
                statement = getArg(g_program[statement])
             else 
                statement++
            continue
        }

        if(g_program[statement].match(/^I/)) {
            g_register += getArg(g_program[statement])
            g_register %= 256
            statement++
            continue
        }

        if(g_program[statement].match(/^T$/)) {
            alert(g_register)
            statement++
            continue
        }

        if(g_program[statement].match(/^S/)) {
            g_register = getArg(g_program[statement])
            statement++
            continue
        }

        if(g_program[statement].match(/^A/)) {
            g_register += g_ram[getArg(g_program[statement])]
            g_register %= 256
            statement++
            continue
        }

        if(g_program[statement].match(/^g/)) {
            g_register = g_ram[g_ram[getArg(g_program[statement])]]
            statement++
            continue
        }

        if(g_program[statement].match(/^o/)) {
            g_ram[g_ram[getArg(g_program[statement])]] = g_register
            statement++
            continue
        }

        if(g_program[statement].match(/^r/)) {
            let read = 0
            g_ram[getArg(g_program[statement])] = (read = parseInt(prompt('input'))) > 255 && read < 0 ? 0 : read
            statement++
            continue
        }

        if(g_program[statement].match(/^b/)) {
            if (g_register == 0) 
                statement = g_ram[getArg(g_program[statement])]
             else 
                statement++
            continue    
        }
        if(g_program[statement].match(/^i/)) {
            g_ram[getArg(g_program[statement])] += g_register
            g_ram[getArg(g_program[statement])] %= 256
            statement++
            continue
        }
        if(g_program[statement].match(/^t/)) {
            alert(g_ram[getArg(g_program[statement])])
            statement++
            continue
        }
        if(g_program[statement].match(/^s/)) {
            g_register ^=g_ram[getArg(g_program[statement])]
            statement++
            continue
        }
        if(g_program[statement].match(/^a/)) {
            g_register += g_ram[g_ram[getArg(g_program[statement])]]
            g_register %= 256
            statement++
            continue
        }
    }
}

function checkSyntax(program) {
    if(program.length > 256) {
        console.error('Program is too big >> length is', program.length)
        return false
    }

    let canCompile = true
    program.forEach(element => {
        if (!isValidStatement(element)) {
            console.error(element, '<< invalid syntax')
            alert(element + '<< invalid syntax')
            canCompile = false
        }
    })

    if (!canCompile) return false

    console.log('Program is correct')
    return true
}

function getArg(statement) {
    return parseInt(statement.substring(1))
}

function isValidStatement(statement) {
    return statement.match(/^((R|T)|([GOBISAgorbitsa]([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])))$/)
}
