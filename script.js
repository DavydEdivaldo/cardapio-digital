const menu = document.getElementById('menu');
const carrinho = document.getElementById('carrinho');
const btnCarrinho = document.getElementById('cart-btn');
const itensCarrinho = document.getElementById('cart-items');
const enderecoVazio = document.getElementById('adress-warn');
const endereco = document.getElementById('addres')
const valorTotal = document.getElementById('cart-total');
const enviarPedido = document.getElementById('enviar-pedido-btn');
const fecharcarrinho = document.getElementById('fechar');
const quantidadeCarrinho = document.getElementById('cart-count');

VerificaHrarioDeFuncionamento();

// Carregar os itens do carrinho do localStorage ou inicializar como array vazio
let produtosDoCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

btnCarrinho.addEventListener('click', function(){
    carrinho.classList.remove('hidden');
});
fecharcarrinho.addEventListener('click', function(){
    carrinho.classList.add('hidden');
});
carrinho.addEventListener('click', function(evento){
    if(evento.target === carrinho){
        carrinho.classList.add('hidden');
    }
});

menu.addEventListener('click',  function(evento){
    let btnAddCarrinho = evento.target.closest('.add-to-cart-btn');

    if(btnAddCarrinho){
        const nome = btnAddCarrinho.dataset.name;
        const preco = parseFloat(btnAddCarrinho.getAttribute('data-price'));

        addAoCarrinho(nome, preco);
        Toastify({
            text: "Item adicionado no carrinho!",
            duration: 1000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#1bcf36",
            },
          }).showToast();
    }
});

function addAoCarrinho(nome, preco){
    const verificaItem = produtosDoCarrinho.find(item => item.nome === nome);

    if(verificaItem){
        verificaItem.quantidade += 1;
    } else {
        produtosDoCarrinho.push({
            nome,
            preco,
            quantidade: 1,
        });
    }
    atualizaCarrinho();
    salvarCarrinhoNoLocalStorage(); // Salvar no localStorage após adicionar o item
}

function atualizaCarrinho(){
    itensCarrinho.innerHTML = "";
    let total = 0;
    let totalQuantity = 0;

    if (produtosDoCarrinho.length === 0) {
        itensCarrinho.innerHTML = "<p>Seu carrinho está vazio!</p>";
    } else {
        produtosDoCarrinho.forEach(item => {
            const itens = document.createElement("div");
            itens.innerHTML = `
            <div class="flex items-center gap-2 mb-[7px] justify-between">
                <div class="w-[50%] text-xs">
                    <p class="font-bold">${item.nome}</p>
                    <p class="text-sm text-responsivo">150g de Blend de Fraldinha, servido no pão tostado, 
                    bacon, cheddar, cebola caramelizada, salada 
                    e molho especial</p>
                </div> 
                <div class="ml-9 flex flex-col items-center">
                    <button class="text-gray-500 remove-from-cart-btn" data-name="${item.nome}">remover</button>
                    <span class="text-xs mb-[5px] font-bold">( ${item.quantidade} )</span>
                    <span class="text-xs">R$: ${item.preco.toFixed(2)}</span>
                </div> 
            </div>
            `;
            total += item.preco * item.quantidade;
            totalQuantity += item.quantidade;
            itensCarrinho.appendChild(itens);
        });
    }

    valorTotal.innerText = total.toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL"
    });

    quantidadeCarrinho.innerHTML = totalQuantity;
}

itensCarrinho.addEventListener('click', function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute('data-name');
        removerItensdoCarrinho(name);
    }
});

function removerItensdoCarrinho(name){
    const index = produtosDoCarrinho.findIndex(item => item.nome === name);

    if (index !== -1) {
        const item = produtosDoCarrinho[index];

        if (item.quantidade > 1) {
            item.quantidade -= 1;
        } else {
            produtosDoCarrinho.splice(index, 1);
        }
        atualizaCarrinho();
        salvarCarrinhoNoLocalStorage(); // Salvar no localStorage após remover o item
    }
}

function salvarCarrinhoNoLocalStorage(){
    // Salva os itens do carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(produtosDoCarrinho));
}

// Carregar os itens do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function(){
    atualizaCarrinho();
});


//verifica se o endereço foi digitado para poder enviar o pedido
endereco.addEventListener('input', function(event){
    let ValorEndereco = event.target.value;

    if(ValorEndereco !== ""){
        enderecoVazio.classList.add("hidden");
        endereco.classList.remove("border-red-500");
    }
})
// verifica se tem itens do carrinho para poder enviar
enviarPedido.addEventListener('click', function(){

    let estaFechado = VerificaHrarioDeFuncionamento();
    if(estaFechado == true){
        Toastify({
            text: "Estamos fechados no momento!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "red",
            }
        }).showToast();
        return;
    }
    

    if(produtosDoCarrinho.length === 0) return;

    if(endereco.value === ""){
        enderecoVazio.classList.remove('hidden');
        endereco.classList.add('border-red-500');
        return;
    }


    //enviar para wpp
    const itensParaEnviar = produtosDoCarrinho.map(item => {
        return(`
            ${item.nome}<br/>
            Quantidade: (${item.quantidade})<br/>
            R$ ${item.preco}    
        `)
    }).join("")
    console.log(itensParaEnviar)

    const pedido = encodeURI(itensParaEnviar);
    const contato = "992384292"
    window.open(`https://wa.me/${contato}?text=${pedido} Endereço: ${endereco.value}`, "_blank")

    produtosDoCarrinho = [];
    atualizaCarrinho();
})




function VerificaHrarioDeFuncionamento(){
    const horaAtual = new Date();
    let horarioDeFuncionamento = horaAtual.getHours();

    const diaAtual = new Date();
    let diasDeFuncionamento = diaAtual.getDay();


    if(horarioDeFuncionamento < 16 || horarioDeFuncionamento > 23){
        const sectionAberto = document.getElementById("data-span");
        sectionAberto.classList.remove("bg-green-600");
        sectionAberto.classList.remove("sombra");
        sectionAberto.classList.add('bg-red-500');
        return true;
    }
    if(diasDeFuncionamento == 1 || diasDeFuncionamento == 2){
        const sectionAberto = document.getElementById("data-span");
        sectionAberto.classList.remove("bg-green-600");
        sectionAberto.classList.remove("sombra");
        sectionAberto.classList.add('bg-red-500');
        return true;
    }
}
