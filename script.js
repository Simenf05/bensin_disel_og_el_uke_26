
const fileInputEl = document.querySelector("#fileInput")

function makeData(table) {

    const years = table[0].filter(n => n)
    table.shift()
    const data = {}
    
    let carTypeCount = 0

    for (let i = 1; i < table.length; i++) {
        if (table[i][0]) {
            carTypeCount = i
            break
        }
    }

    console.log(carTypeCount);

    const areasCount = table.length / carTypeCount
    
    console.log(areasCount);


    for (let i = 0; i < areasCount * carTypeCount; i += 3) {
        
        console.log(table[i]);

        
    }

}


fileInputEl.onchange = () => {

    const file = fileInputEl.files[0]
    const fr = new FileReader()


    fr.onload = () => makeData(fr.result.trim().split(/\r?\n/).map(e => e.split(";")));

    fr.readAsText(file)
}


