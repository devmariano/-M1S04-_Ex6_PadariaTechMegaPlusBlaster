class CaixaRegistradora {
    constructor() {
      this._estoque = [];
      this._compra = [];
    }
  
    get compra() {
      return this._compra;
    }
  
    adicionarProduto(codigoBarra, preco, nome, quantidade = 0) {
      const produto = { codigoBarra, preco, nome, quantidade };
      this._estoque.push(produto);
    }
  
    iniciarAtendimento(nomeCliente) {
      this._compra = [];
      this._nomeCliente = nomeCliente;
    }
  
    adicionarItem(codigoBarra, quantidade) {
      const produto = this._estoque.find((p) => p.codigoBarra === codigoBarra);
      if (produto && produto.quantidade >= quantidade) {
        produto.quantidade -= quantidade;
        const item = { codigoBarra, quantidade };
        this._compra.push(item);
        return true;
      } else {
        return false;
      }
    }
  
    calcularTotal() {
      let total = 0;
      for (const item of this._compra) {
        const produto = this._estoque.find((p) => p.codigoBarra === item.codigoBarra);
        total += item.quantidade * produto.preco;
      }
      return total;
    }
  
    fecharConta(dinheiro) {
      const total = this.calcularTotal();
      const troco = dinheiro - total;
      if (troco >= 0) {
        this._estoque.forEach((p) => {
          const item = this._compra.find((i) => i.codigoBarra === p.codigoBarra);
          if (item) {
            p.quantidade += item.quantidade;
          }
        });
        this.iniciarAtendimento(null);
        return troco;
      } else {
        return null;
      }
    }
  
    listarEstoqueHtml() {
      const container = document.getElementById("estoque-container");
      const lista = document.createElement("ul");
      this._estoque.forEach((p) => {
        const item = document.createElement("li");
        item.textContent = `${p.nome}: R$ ${p.preco.toFixed(2)} (${p.quantidade} unidades)`;
        lista.appendChild(item);
      });
      container.appendChild(lista);
    }
  }