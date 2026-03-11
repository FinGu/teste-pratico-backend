# Teste Prático Back-end BeTalent

Feito com adonisjs, mysql e docker para executar os componentes, incluso os mocks de gateway

## Como executar o sistema: 

Instalar as dependencias (.env ja configurado):

```
$ npm install
```

Executar os containers:

```
# docker compose run
```

E, antes de testar, executar o seguinte comando para inserir dados de teste no sistema:

```
# docker exec teste_pratico node ace db:seed
```

O sistema foi planejado adaptando a API da gateway 1, se substituir a porta de 3001 para 3333 o resultado será similar.

* Rotas:
POST /login
```json
{
  "email": "admin@mail.com",
  "password": "abcdfg"
}
```
Retorno:
```json
{
  "error": false,
  "response": "oat_..."
}
```

POST /transactions: 
```json
{
  "amount": 1000,
  "name": "João Silva",
  "email": "joao@example.com",
  "cardNumber": "1234567812345678",
  "cvv": 123
}
```
Retorno:
```json
{
  "id": 1
}
```
* Rotas privadas - (Bearer Token)

Gateways: GET /gateways e PATCH /gateways/:id (Ativar/Prioridade).
```json
// PATCH /gateways/1
{
  "isActive": true,
  "priority": 1
}
```

Compras: GET /transactions, GET /transactions/:id e POST /transactions/:id/charge_back.
```json
// POST /transactions/1/charge_back
{}
```

Retorno:
```json
{
  "error": false,
  "response": "sucesso"
}
```

Clientes: GET /clients e GET /clients/:id (Histórico).
```json
// GET /clients/1
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@example.com",
  "transactions": [
    {
      "id": 1,
      "status": "charged_back",
      "card_last_numbers": "5678",
      "amount": 1000
    }
  ]
}
```

Usuários: CRUD completo /users (Apenas ADMIN).
```json
// POST /users
{
  "email": "manager@example.com",
  "password": "password",
  "role": "MANAGER",
  "fullName": "Manager Test"
}
```

Produtos: CRUD completo /products (ADMIN/MANAGER).
```json
// POST /products
{
  "name": "Produto de Teste",
  "amount": 5000
}
```
