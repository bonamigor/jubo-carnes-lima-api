##SQL projeto

create database jubo;

create table clientes (
id bigint not null auto_increment,
nome varchar(255) not null, 
cnpj varchar(14) not null, 
endereco varchar(255), 
email varchar(255), 
cidade varchar(50), 
estado varchar(50), 
telefone varchar(11), 
ativo tinyint(1), 
primary key(id)
);

create table estantes (
id bigint not null auto_increment, 
periodo varchar(7) not null, 
cliente_id int(11) not null, 
ativa tinyint(1),
primary key (id), 
foreign key (cliente_id) references clientes(id));

create table produtos (
id bigint not null auto_increment, 
nome varchar(255) not null, 
preco_custo double(7,2) not null, 
unidade_medida varchar(4) not null, 
primary key(id));

create table preco_quantidade (
id bigint not null auto_increment, 
preco_venda double(7,2) not null, 
quantidade int not null, 
primary key (id));

create table estante_produto (
estante_id bigint not null, 
produto_id bigint not null, 
preco_quantidade_id bigint not null,
primary key(estante_id, produto_id), 
foreign key (estante_id) references estantes(id), 
foreign key (produto_id) references produtos(id),
foreign key (preco_quantidade_id) references preco_quantidade(id) on delete cascade);

create table users (
  id bigint not null auto_increment,
  nome varchar(255) not null, 
  email varchar(255) not null, 
  senha varchar(255) not null, 
  admin tinyint(1) not null,
  cliente_id bigint unique not null,
  primary key(id),
  foreign key (cliente_id) references clientes(id)
);

create table pedidos (
  id bigint not null auto_increment,
  data_criacao date not null,
  data_confirmacao date,
  data_cancelamento date,
  data_entrega date,
  valor_total double(7,2) not null,
  cliente_id bigint not null,
  primary key(id),
  foreign key (cliente_id) references clientes(id)
);

create table item_pedido (
  id bigint not null auto_increment,
  quantidade int(11) not null,
  preco_total double(7,2) not null,
  observacao varchar(255),
  pedido_id bigint not null,
  produto_id bigint not null,
  primary key(id),
  foreign key (pedido_id) references pedidos(id),
  foreign key (produto_id) references produtos(id)
);

SELECT estante_id, produtos.nome, produtos.preco_custo, produtos.unidade_medida, preco_quantidade.preco_venda, preco_quantidade.quantidade
FROM estante_produto
INNER JOIN produtos ON estante_produto.produto_id = produtos.id
INNER JOIN preco_quantidade ON estante_produto.id = preco_quantidade.estante_produto_id
WHERE estante_produto.estante_id = 1;

SELECT estantes.id, estantes.periodo, clientes.name, clientes.endereco FROM estantes INNER JOIN clientes ON estantes.cliente_id=clientes.id';

SELECT estantes.id, estantes.periodo, produtos.id, produtos.nome, produtos.preco_custo, produtos.unidade_medida FROM estantes INNER JOIN estante_produto ON estante_produto.estante_id=estantes.id INNER JOIN estante_produto ON estante_produto.produto_id=produtos.id;

select estantes.id, clientes.name, produtos.nome, produtos.preco_custo, produtos.unidade_medida FROM estante_produto INNER JOIN estantes ON estante_produto.estante_id = estantes.id INNER JOIN produtos ON estante_produto.produto_id = produtos.id INNER JOIN clientes ON estantes.cliente_id = clientes.id;


