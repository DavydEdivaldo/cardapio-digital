const menu = document.getElementById('menu');
const carrinho = document.getElementById('carrinho');
const btnCarrinho = document.getElementById('cart-btn');
const itensCarrinho = document.getElementById('cart-items');
const endereco = document.getElementById('adress-warn');
const valorTotal = document.getElementById('cart-total');
const enviarPedido = document.getElementById('enviar-pedido-btn');
const fecharcarrinho = document.getElementById('fechar');
const quantidadeCarrinho = document.getElementById('cart-count');


btnCarrinho.addEventListener('click', function(){
    carrinho.classList.remove('hidden');
});
fecharcarrinho.addEventListener('click', function(){
    carrinho.classList.add('hidden');
});