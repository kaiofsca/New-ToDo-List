// Declarando variaveis
const colors = [ 'Red', 'Green', 'Blue', 'Yellow', 'Brown', 'Pink', 'White', 'Purple', 'Gray', 'Orange', 'Violet', 'Amber', 'Lilac', 'Teal', 'Olive', 'Magenta', 'Lime']
const texto = document.querySelector('input')
const btnInsert = document.querySelector('.divInsert button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')

let itensDB = []

btnDeleteAll.onclick = () => { // evento que apaga tudo
    itensDB = []
    document.body.style.backgroundColor = 'whitesmoke'
    updateDB()
}

texto.addEventListener('keypress', e => { // Primeiro evento
    if(e.key === 'Enter' && texto.value != '') {
        const numAleatorio = pegaNumAleatorio()
        document.body.style.backgroundColor = colors[numAleatorio]
        setItemDB() 
    }
})


btnInsert.onclick = () => { // Segundo evento
    if(texto.value != '') {
        const numAleatorio = pegaNumAleatorio()
        document.body.style.backgroundColor = colors[numAleatorio]
        setItemDB()
    } else {
        alert('Escreva uma tarefa antes de eviar!')
    }
}

// Funções

function pegaNumAleatorio() {
    return Math.floor(Math.random() * colors.length)
}

function setItemDB() {
    if(itensDB.length >= 20) {
        alert('Limite máximo de 20 itens atingido!')
        return
    }

    itensDB.push({'item': texto.value, 'status': ''})
    updateDB()
}

function updateDB() {
    localStorage.setItem('todolist', JSON.stringify(itensDB))
    loadItens()
}

function loadItens() {
    ul.innerHTML = ''
    itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
    itensDB.forEach((item, i) => {
        insertItemTela(item.item, item.status, i)
    })
}

function insertItemTela(text, status, i) {
    const li = document.createElement('li')
    
    li.innerHTML = `
      <div class="divLi">
        <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
        <span data-si=${i}>${text}</span>
        <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
      </div>
      `
    ul.appendChild(li)
  
    if (status) {
      document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
    } else {
      document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
    }
  
    texto.value = ''
  }

function done(chk, i) {

    if (chk.checked) {
      itensDB[i].status = 'checked' 
    } else {
      itensDB[i].status = '' 
    }
  
    updateDB()
}

function removeItem(i) {
    itensDB.splice(i, 1)
    updateDB()
}

loadItens()
