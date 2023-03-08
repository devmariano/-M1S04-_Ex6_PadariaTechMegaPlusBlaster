class CaixaRegistradora {
    constructor() {
      this.estoque = JSON.parse(localStorage.getItem('estoque')) || [];
      this.clienteAtual = '';
    }
  
    adicionarProdutoNoEstoque(codigoBarra, preco, nome, quantidade) {
      const novoProduto = {
        codigoBarra,
        preco,
        nome,
        quantidade
      };
      this.estoque.push(novoProduto);
      localStorage.setItem('estoque', JSON.stringify(this.estoque));
      console.log(JSON.stringify(this.estoque))
    }
  
    iniciarAtendimento(nome) {
      this.clienteAtual = nome;
    }
  
    adicionarItemNoCarrinho(codigoBarra, quantidade) {
      const produto = this.estoque.find((p) => p.codigoBarra === codigoBarra);
      if (!produto) {
        console.log('Produto não encontrado!');
        return;
      }
  
      if (produto.quantidade < quantidade) {
        console.log(`Não há quantidade suficiente de ${produto.nome} no estoque.`);
        return;
      }
  
      produto.quantidade -= quantidade;
      this.removerProdutoDoEstoque(produto);
  
      // adiciona o item ao carrinho do cliente
      // implementação omitida por simplicidade
    }
  
    verificarValorTotal() {
      // implementação omitida por simplicidade
    }
  
    fecharConta(dinheiro) {
      // implementação omitida por simplicidade
    }
  
    removerProdutoDoEstoque(produto) {
      const index = this.estoque.findIndex((p) => p.codigoBarra === produto.codigoBarra);
      this.estoque.splice(index, 1);
      localStorage.setItem('estoque', JSON.stringify(this.estoque));
    }
  }