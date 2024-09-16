const mysql = require('mysql2');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#Ovelha354'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado!");

  con.query("CREATE DATABASE IF NOT EXISTS Crud", function (err) {
    if (err) throw err;
    console.log("Banco de dados Criado ou já existe.");

    con.changeUser({database: 'Crud'}, function(err) {
      if (err) throw err;

      con.query(`
        CREATE TABLE IF NOT EXISTS Fornecedor (
          fornecedor_id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(255) NOT NULL
        )
      `, function (err) {
        if (err) throw err;
        console.log("Tabela Fornecedor Criada");

        con.query(`
          CREATE TABLE IF NOT EXISTS Produtos (
            produto_id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            preco DECIMAL(10, 2) NOT NULL,
            fornecedor_id INT,
            FOREIGN KEY (fornecedor_id) REFERENCES Fornecedor(fornecedor_id)
          )
        `, function (err) {
          if (err) throw err;
          console.log("Tabela Produtos Criada");

          inserirDados();
        });
      });
    });
  });
});

function inserirDados() {
  con.query("INSERT INTO Fornecedor (nome) VALUES ('Fornecedor A')", function (err) {
    if (err) throw err;
    console.log("Fornecedor Inserido");

    con.query("INSERT INTO Produtos (nome, preco, fornecedor_id) VALUES ('Produto 1', 50, 1)", function (err) {
      if (err) throw err;
      console.log("Produto 1 Inserido");

      con.query("INSERT INTO Produtos (nome, preco, fornecedor_id) VALUES ('Produto 2', 150, 1)", function (err) {
        if (err) throw err;
        console.log("Produto 2 Inserido");

        executarConsultas();
      });
    });
  });
}

function executarConsultas() {
  con.query(`
    SELECT f.nome AS fornecedor, COUNT(p.produto_id) AS total_produtos
    FROM Fornecedor f
    LEFT JOIN Produtos p ON f.fornecedor_id = p.fornecedor_id
    GROUP BY f.fornecedor_id
  `, function (err, results) {
    if (err) throw err;
    console.log("Contagem de produtos por fornecedor:");
    console.log(results);

    con.query(`
      SELECT p.nome AS produto, p.preco, f.nome AS fornecedor
      FROM Produtos p
      JOIN Fornecedor f ON p.fornecedor_id = f.fornecedor_id
      WHERE p.preco > 100
    `, function (err, results) {
      if (err) throw err;
      console.log("Produtos com preço acima de 100:");
      console.log(results);

      con.end(function(err) {
        if (err) throw err;
        console.log("Conexão encerrada.");
      });
    });
  });
}
