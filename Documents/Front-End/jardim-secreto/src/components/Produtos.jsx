import "./Produtos.css";

function Produtos() {

  const produtos = [
    {
      id: 1,
      nome: "Cacto Mandacaru",
      preco: "R$ 29,90",
      imagem:
        "https://images.unsplash.com/photo-1497250681960-ef046c08a56e"
    },
    {
      id: 2,
      nome: "Suculenta Haworthia",
      preco: "R$ 24,90",
      imagem:
        "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc"
    },
    {
      id: 3,
      nome: "Echeveria",
      preco: "R$ 34,90",
      imagem:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411"
    }
  ];

  return (
    <section className="produtos">

      <h2>Produtos populares</h2>

      <div className="produtos-container">

        {produtos.map((produto) => (
          <div className="card-produto" key={produto.id}>

            <img
              src={produto.imagem}
              alt={produto.nome}
            />

            <div className="produto-info">

              <h3>{produto.nome}</h3>

              <p>{produto.preco}</p>

              <button>Adicionar ao carrinho</button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Produtos;