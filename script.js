const menu = document.getElementById('menu');
const carrinho = document.getElementById('carrinho');
const btnCarrinho = document.getElementById('cart-btn');
const itensCarrinho = document.getElementById('cart-items');
const endereco = document.getElementById('adress-warn');
const valorTotal = document.getElementById('cart-total');
const enviarPedido = document.getElementById('enviar-pedido-btn');
const fecharcarrinho = document.getElementById('fechar');
const quantidadeCarrinho = document.getElementById('cart-count');

let produtosDoCarrinho = [];

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
    //console.log(evento.target);
    let btnAddCarrinho = evento.target.closest('.add-to-cart-btn');//responsavel por verificar e pegar o botão de add ao carrinho.

    if(btnAddCarrinho){//responsavel por pegar o nome e preço do lanche
        const nome = btnAddCarrinho.dataset.name; //dataset.nome do data name para pegar o valor. pode utilizar o getAtribute tbm. 
        const preco = parseFloat(btnAddCarrinho.getAttribute('data-price'));//parseFloat para transformar o valor em number
       
        addAoCarrinho(nome, preco);

    }
})

function addAoCarrinho(nome, preco){//função responsavel por incluir os itens no carrinho.

    const verificaItem = produtosDoCarrinho.find(item => item.nome === nome);//responsavel por verificar se os nomes de produtos add são iguais

    if(verificaItem){//aumenta a quantidade se tiver itens iguais.
        verificaItem.quantidade += 1;
    }else{// se não add com quantidade 1
        produtosDoCarrinho.push({
            nome,
            preco,
            quantidade: 1,
    })
    }
    atualizaCarrinho(nome, preco )
}

function atualizaCarrinho(nome, preco){
    itensCarrinho.innerHTML += `
        <div class="flex items-center gap-2 mb-[7px]">
          <div>
            <img class="w-[80px] h-[80px] rounded" src="./imagens/hamburguer.jpg" alt="produto">
          </div>
          <div class="w-[50%] text-xs">
          <p class="font-bold">${nome}</p>
          <p class="text-sm text-responsivo">150g de Blend de Fraldinha, servido no pão tostado, 
            bacon, cheddar, cebola caramelizada, salada 
            e molho especial</p>
          </div> 
          <div class="ml-9 flex flex-col items-center">
            <button class="text-gray-500">remover</button>
            <span class="text-xs mb-[5px]">( quantidade: ${quantidade} )</span>
            <span class="text-xs">R$: ${preco}</span>
          </div> 
        </div>
    `
    
}