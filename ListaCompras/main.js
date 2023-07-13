let ListarItens = []
let ItemAeditar = []

const form = document.getElementById("form-itens")
const ItensInput = document.getElementById("receber-item")
const ulItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById("itens-comprados")
const listarecuperada = localStorage.getItem('ListarItens')

function atualizarlocalstorage() {
    localStorage.setItem('ListarItens', JSON.stringify(ListarItens))
}

if (listarecuperada) {
    ListarItens = JSON.parse(listarecuperada)
    MostrarItens()
} else{
    ListarItens = []
}

form.addEventListener("submit", function (event) {
    event.preventDefault()
    salvarItem()
    MostrarItens()
    ItensInput.focus
})

function salvarItem () {
    const comprasItem = ItensInput.value
    const checarItem = ListarItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase())

    if(checarItem){
        alert("Item ja existente!")
    } else{

    ListarItens.push ({
        valor: comprasItem,
        checar: false
    })}
    
    ItensInput.value = ''
}

function MostrarItens () {
    ulItens.innerHTML = ''
    ulItensComprados.innerHTML = ''

    ListarItens.forEach((elemento,index) => {
        if(elemento.checar){
            ulItensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5">${elemento.valor}</span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
            `
        } else{

        
    ulItens.innerHTML += `
    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index != ItemAeditar ? 'enable' : ''}></input>
        </div>
        <div>
            ${ index == ItemAeditar ?'<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
    `
}
})

const InputCheck = document.querySelectorAll('input[type="checkbox"]')

    InputCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
         const valorElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
         ListarItens[valorElemento].checar = evento.target.checked
         MostrarItens()
        })
    })

    const deletarItens = document.querySelectorAll(".deletar")

    deletarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
         const valorElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
         ListarItens.splice(valorElemento,1)
         MostrarItens()
        })
    })

    const editarItens = document.querySelectorAll(".editar")

    editarItens.forEach(i => {
        i.addEventListener('click', (evento) => {
         const ItemAeditar = evento.target.parentElement.parentElement.getAttribute('data-value')
         MostrarItens()
        })
    })

}

atualizarlocalstorage()

function salvarEdicao() {
    const itemsalvo = document.querySelector(`[data-value="${ItemAeditar}"] input[type="text"]`)
    ListarItens[ItemAeditar].valor = itemsalvo.value
    ItemAeditar = -1
    MostrarItens()
}
