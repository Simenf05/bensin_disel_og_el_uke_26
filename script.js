
const fileInputEl = document.querySelector("#fileInput")

function makeBars(data) {

    console.log(data);

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


