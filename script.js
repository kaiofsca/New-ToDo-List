// Declarando variaveis

const texto = document.querySelector('input')
const btnInsert = document.querySelector('.divInsert button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')

let itensDB = []


texto.addEventListener('keypress', e => { // Primeiro evento
    if(e.key === 'Enter' && texto.value != '') {
        setItemDB() 
    }
})


btnInsert.onclick = () => { // Segundo evento
    if(texto.value != '') {
        setItemDB()
    }
}

// Funções

function setItemDB() {
    if(itensDB.length >= 20) {
        alert('Limite máximo de 20 itens atingido!')
        return
    }

    itensDB.push({'item': texto.value, 'status': ''})
    updateDB()
}

function updateDB() {
    localStorage.setItem('todolist', JSNO.stringify(itensDB))
    loadItens()
}

function loadItens() {
    ul.innerHTML = ''
    itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
    
}

