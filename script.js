
const fileInputEl = document.querySelector("#fileInput")
const barContainerEl = document.querySelector("#barContainer")

const colors = {}

function makeBar(info) {

    const barEl = document.createElement("div")

    barEl.className = "bar"

    const infoArr = Object.entries(info)
    const total = Object.values(info).reduce((n, i) => Number(n) + Number(i))


    infoArr.forEach((typeAndNum, index) => {
        percent = Math.round((Number(typeAndNum[1]) / total) * 100)
        
        const barPartEl = document.createElement("div")
        
        barPartEl.className = "barPart"
        if (index + 1 === infoArr.length) barPartEl.style.flex = "1"
        barPartEl.style.width = `${percent}%`
        barPartEl.style.backgroundColor = colors[typeAndNum[0]]

        barEl.appendChild(barPartEl)

    })

    return barEl
}

function makeBars(data) {

    for (const year in data) {
        const divEl = document.createElement("div")

        divEl.className = "box"

        divEl.innerHTML += `<h1>${year}</h1>`

        const colorsArr = Object.entries(colors) 

        divEl.innerHTML += `<div class="colors">${colorsArr.map(([type, color]) => `<p style="color: ${color};">${type}</p>`).join("")}</div>`

        for (const area in data[year]) {

            const barDivEl = document.createElement("div")

            barDivEl.innerHTML += `<p>${area}</p>`

            const barEl = makeBar(data[year][area])

            barDivEl.appendChild(barEl)
            divEl.appendChild(barDivEl)
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


    for (let i = 0; i < areasCount * carTypeCount; i += carTypeCount) {
        
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


