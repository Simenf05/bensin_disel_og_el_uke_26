
const fileInputEl = document.querySelector("#fileInput")
const barContainerEl = document.querySelector("#barContainer")

const colors = {}

function makeBar(info) {

    const barEl = document.createElement("div")

    barEl.className = "bar"

    const infoArr = Object.entries(info)
    const total = Object.values(info).reduce((n, i) => Number(n) + Number(i))




    infoArr.forEach(typeAndNum => {
        percent = Math.floor((Number(typeAndNum[1]) / total) * 100)
        
        const barPartEl = document.createElement("div")
        
        barPartEl.className = "barPart"
        barPartEl.style.width = `${percent}%`
        barPartEl.style.backgroundColor = colors[typeAndNum[0]]

        barEl.appendChild(barPartEl)

    });

    return barEl
}

function makeBars(data) {

    console.log(data);

    for (const year in data) {
        const divEl = document.createElement("div")

        divEl.innerHTML += `<h1>${year}</h1>`

        for (const area in data[year]) {
            
            const barEl = makeBar(data[year][area])

            divEl.appendChild(barEl)

        }

        barContainerEl.appendChild(divEl)
    }
}

function makeData(table) {

    const years = table[0].filter(n => n)
    table.shift()
    const data = {}

    years.forEach(year => {
        data[year] = {}
    })
    
    let carTypeCount = 0

    for (let i = 1; i < table.length; i++) {

        const red = Math.floor(Math.random() * 200)
        const green = Math.floor(Math.random() * 200)
        const blue = Math.floor(Math.random() * 200)

        colors[table[i][1]] = `#${(red << 16 | green << 8 | blue).toString(16).padStart(6, '0')}`
        if (table[i][0]) {
            carTypeCount = i
            break
        }
    }

    const areasCount = table.length / carTypeCount


    for (let i = 0; i < areasCount * carTypeCount; i += 3) {
        
        years.forEach(year => {
            data[year][table[i][0]] = {}
        })
        

        for (let j = 0; j < carTypeCount; j++) {
            
            const key = table[i][0]
            const row = [...table[i + j]]
            row.shift()
            const type = row[0]
            row.shift()

            row.forEach((num, index) => {
                
                data[years[index]][key][type] = num
            
            })

        }
        
    }
    makeBars(data)
}


fileInputEl.onchange = () => {

    const file = fileInputEl.files[0]
    const fr = new FileReader()


    fr.onload = () => makeData(fr.result.trim().split(/\r?\n/).map(e => e.split(";")));

    fr.readAsText(file)
}


