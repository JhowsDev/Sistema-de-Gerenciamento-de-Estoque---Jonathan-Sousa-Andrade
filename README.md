Olá Sejam muito bem vindos a minha API de sistema de Gerenciamento de estoque!

Nela você será capaz de:

* Criar, editar, excluir e consultar contas com divisões de cargos

* Sistema de logins onde é nescessaio está logado e ser de determinado cargo para ter acesso a algumas rotas

* Criar, editar, excluir produtos com sua localização localização em estoque, categoria e definir sujestões de quantidades minimas e maximas, desde que seja do cargo de "STOCKIST" ( Estoquista )

* Consultar lista de produtos e produtos que estão em emergencia (produtos que estão acima ou abaixo do sugerido pelo estoquista)

* Criar uma lista de categorias especificas desde que seja do cargo de "STOCKIST" ( Estoquista )

* Realizar a saida de um material isso desde que seja do cargo de "STOCKIST" ( Estoquista )

* Realizar requisições de produtos que passará para a aprovação do gerente selecionado na requisição desde que seja do cargo de "USER" ( Usuario )

* Realizar a aprovação ou reprovação da requisição desde que seja do cargo de "MANEGER" ( Gerente ), e o gerente destacado na requisição

* Realizar a consulta do historico de movimentações esde que seja do cargo de "MANEGER" ( Gerente )

BASE URL: https://inventory-management-system-yit6.onrender.com

## ROTAS

### Gerenciamento de contas (Criar conta) /account POST

Headers

Padrão de corpo:

```json
{
	"fullName": "Jhon",
	"email": "jhon@mail.com",
	"password": "12345678",
	"role": "MANEGER"
}
```

Padrão de Resposta:
```json
{
	"id": 1,
	"fullName": "Jhon",
	"email": "jhon@mail.com",
	"role": "MANEGER",
	"createdAt": "2024-11-09T18:23:30.067Z",
	"updatedAt": "2024-11-09T18:23:30.067Z"
}
```

### Gerenciamento de contas (Consultar contas) /accounts GET

Padrão de resposta:

```json
[
	{
		"id": 1,
		"fullName": "Jhon",
		"email": "jhon@mail.com",
		"role": "MANEGER",
		"createdAt": "2024-11-09T18:23:30.067Z",
		"updatedAt": "2024-11-09T18:23:30.067Z"
	},
	{
		"id": 2,
		"fullName": "Isabela",
		"email": "isabela@mail.com",
		"role": "USER",
		"createdAt": "2024-11-09T18:23:43.936Z",
		"updatedAt": "2024-11-09T18:23:43.936Z"
	},
	{
		"id": 3,
		"fullName": "Pietro",
		"email": "pietro@mail.com",
		"role": "STOCKIST",
		"createdAt": "2024-11-09T18:24:06.148Z",
		"updatedAt": "2024-11-09T18:24:06.148Z"
	},
	{
		"id": 4,
		"fullName": "Eduardo Viana",
		"email": "eduardoviana@mail.com",
		"role": "MANEGER",
		"createdAt": "2024-11-09T18:25:27.997Z",
		"updatedAt": "2024-11-09T18:25:27.997Z"
	}
]
```

### Gerenciamento de contas (Consultar uma unica conta por id) /accounts/:id GET

Padrão de resposta:

```json
{
	"id": 1,
	"fullName": "Jhon",
	"email": "jhon@mail.com",
	"role": "MANEGER",
	"createdAt": "2024-11-09T18:23:30.067Z",
	"updatedAt": "2024-11-09T18:23:30.067Z"
},
```

### Gerenciamento de contas (Realizar Login) /login

Padrão de corpo:

```json
{
	"email": "jhon@mail.com",
	"password": "12345678",
}
```

Padrão de Resposta:
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6Ikpob24iLCJyb2xlIjoiTUFORUdFUiIsImVtYWlsIjoiamhvbkBtYWlsLmNvbSIsImlhdCI6MTczMTE3NzExMCwiZXhwIjoxNzMyMzg2NzEwLCJzdWIiOiIxIn0.GJ12DCZZtTR5yqnuzmulbFUnmwgNB4gDL98VRviziCA"
}
```

> *Esse token é obrigatório em rotas que requerem autorização então copie e use da maneira indicada nas rotas para poder acessa-la (a depender do seu nivel)*

### Gerenciamento de contas (Editar conta) /account/:id PATCH (Requer autorização)

Headers

```json
{
   'Authorization': 'Bearer token'
}
```

> *É nescessario ser o usuario da conta para realizar essa ação*

Padrão de corpo:

```json
{
	"fullName": "NewJhon",
	"email": "jhonUpdate1@mail.com"
}
```

Por se tratar de uma rota de patch nem todos as chaves são obrigatórias.

```json
{
	"id": 1,
	"fullName": "NewJhon",
	"email": "jhonUpdate1@mail.com",
	"role": "MANEGER",
	"createdAt": "2024-11-09T18:23:30.067Z",
	"updatedAt": "2024-11-09T18:39:50.557Z"
}
```


### Gerenciamento de contas (Excluir conta) /account/:id DELETE (Requer autorização)

Headers

```json
{
   'Authorization': 'Bearer token'
}
```

> *É nescessario ser o usuario da conta para realizar essa ação*

### Categorias (Criar categoria) /categories POST

Padrão de corpo:

> *É nescessario ser do papel de Estoquista "role: STOKIST" para realizar essa ação*

```json
{
	"nameCategory": "limpeza"
}
```

Padrão de resposta:

```json
{
	"id": 1,
	"nameCategory": "limpeza",
	"createdAt": "2024-11-09T18:50:55.074Z",
	"updatedAt": "2024-11-09T18:50:55.074Z"
}
```

 > *Esse ID será importante para a criação dos produtos a seguir*

 ### Categorias (Consultar Categorias) /categories GET

 Padrão de resposta:

```json
 [
	{
		"id": 1,
		"nameCategory": "limpeza",
		"createdAt": "2024-11-09T18:50:55.074Z",
		"updatedAt": "2024-11-09T18:50:55.074Z"
	},
	{
		"id": 2,
		"nameCategory": "Informática",
		"createdAt": "2024-11-09T18:51:18.177Z",
		"updatedAt": "2024-11-09T18:51:18.177Z"
	},
	{
		"id": 3,
		"nameCategory": "Farmacos",
		"createdAt": "2024-11-09T18:51:30.837Z",
		"updatedAt": "2024-11-09T18:51:30.837Z"
	}
]
```

### Categorias (Consultar uma unica Categoria por id) /categories/:id GET

Padrão de resposta:

```json
{
	"id": 1,
	"nameCategory": "limpeza",
	"createdAt": "2024-11-09T18:50:55.074Z",
	"updatedAt": "2024-11-09T18:50:55.074Z"
}
```

### Categorias (Editar categoria) /categories/:id PATCH (Requer autorização)

Headers

```json
{
   'Authorization': 'Bearer token'
}
```

> *É nescessario ser do papel de Estoquista "role: STOKIST" para realizar essa ação*


Padrão de corpo:

```json
{
	"nameCategory": "Limpesa Industrial"
}
```

```json
{
	"id": 1,
	"nameCategory": "Limpesa Industrial",
	"createdAt": "2024-11-09T19:12:45.284Z",
	"updatedAt": "2024-11-09T19:22:27.106Z"
}
```


### Categorias (Excluir categoria) /categories/:id DELETE (Requer autorização)

Headers

```json
{
   'Authorization': 'Bearer token'
}
```

> *É nescessario ser do papel de Estoquista "role: STOKIST" para realizar essa ação*


### Gerenciamento de estoque (Criar produto) /products POST

Headers

```json
{
   'Authorization': 'Bearer token'
}
```

> *É nescessario ser do papel de Estoquista "role: STOKIST" para realizar essa ação*


Padrão de corpo:

```json
{
   "quantity": 11,
   "name": "quiboa",
   "categoryId": 1,
   "street": "A1",
   "minLimitItens": 5,
   "maxLimitItens": 100
}
```

Padrão de Resposta:
```json
{
	"id": 1,
	"name": "quiboa",
	"categoryId": 1,
	"quantity": 11,
	"street": "A1",
	"minLimitItens": 5,
	"maxLimitItens": 100,
	"createdById": 3,
	"createdAt": "2024-11-09T19:12:54.430Z",
	"updatedAt": "2024-11-09T19:12:54.430Z"
}
```

> *Nesse momento é em conjunto também criada a movimentação na tabela de historico de movimentações*


### Gerenciamento de estoque (Consultar estoque) /products GET

Padrão de resposta:

```json
[
	{
		"id": 1,
		"name": "quiboa",
		"categoryId": 1,
		"quantity": 11,
		"street": "A1",
		"minLimitItens": 5,
		"maxLimitItens": 100,
		"createdById": 3,
		"createdAt": "2024-11-09T19:12:54.430Z",
		"updatedAt": "2024-11-09T19:12:54.430Z"
	},
	{
		"id": 2,
		"name": "mouse",
		"categoryId": 2,
		"quantity": 11,
		"street": "A1",
		"minLimitItens": 5,
		"maxLimitItens": 100,
		"createdById": 3,
		"createdAt": "2024-11-09T19:25:45.599Z",
		"updatedAt": "2024-11-09T19:25:45.599Z"
	},
	{
		"id": 3,
		"name": "computador",
		"categoryId": 2,
		"quantity": 11,
		"street": "A1",
		"minLimitItens": 5,
		"maxLimitItens": 100,
		"createdById": 3,
		"createdAt": "2024-11-09T19:25:48.445Z",
		"updatedAt": "2024-11-09T19:25:48.445Z"
	},
	{
		"id": 4,
		"name": "teclado",
		"categoryId": 2,
		"quantity": 1,
		"street": "A1",
		"minLimitItens": 5,
		"maxLimitItens": 100,
		"createdById": 3,
		"createdAt": "2024-11-09T19:28:17.935Z",
		"updatedAt": "2024-11-09T19:28:17.935Z"
	}
]
```

### Gerenciamento de estoque (Consultar um unico produto por id) /products/:id GET

Padrão de resposta:

```json
{
	"id": 1,
	"name": "quiboa",
	"categoryId": 1,
	"quantity": 11,
	"street": "A1",
	"minLimitItens": 5,
	"maxLimitItens": 100,
	"createdById": 3,
	"createdAt": "2024-11-09T19:12:54.430Z",
	"updatedAt": "2024-11-09T19:12:54.430Z"
}
```

### Gerenciamento de estoque (Consultar estoque emergencial) /products/emergency GET

Padrão de resposta:

```json
[
	{
		"id": 4,
		"name": "teclado",
		"categoryId": 2,
		"quantity": 1,
		"street": "A1",
		"minLimitItens": 5,
		"maxLimitItens": 100,
		"createdById": 3,
		"createdAt": "2024-11-09T19:28:17.935Z",
		"updatedAt": "2024-11-09T19:28:17.935Z"
	}
]
```

> *Ele é responsavél por retornar uma lista com todos os produtos com o estoque abaixo do minimo sujerido ou acima do minimo sugerido*

### Gerenciamento de estoque (Editar produto) /products/:id PATCH (Requer autorização)

Headers

```json
{
   'Authorization': 'Bearer token'
}
```

> *É nescessario ser do papel de Estoquista "role: STOKIST" para realizar essa ação*

Padrão de corpo:

```json
{
	"name": "mouse gamer"
}
```

Por se tratar de uma rota de patch nem todos as chaves são obrigatórias.

> *Nessa rota NÃO é possivél alterar a quantidade dos produtos isso é feito apenas em rotas que tem essa função em especifico*

```json
{
	"id": 2,
	"name": "mouse gamer",
	"categoryId": 2,
	"quantity": 11,
	"street": "A1",
	"minLimitItens": 5,
	"maxLimitItens": 100,
	"createdById": 3,
	"createdAt": "2024-11-09T19:25:45.599Z",
	"updatedAt": "2024-11-09T19:33:38.557Z"
}
```


### Gerenciamento de estoque (Excluir produto) /products/:id DELETE (Requer autorização)

Headers

```json
{
   'Authorization': 'Bearer token'
}
```

> *É nescessario ser do papel de Estoquista "role: STOKIST" para realizar essa ação*

> *Nesse momento é em conjunto também criada a movimentação na tabela de historico de movimentações*

### Gerenciamento de estoque (Retirar um produto) /products/output/:id POST (Requer autorização)

```json
{
   'Authorization': 'Bearer token'
}
```

Padrão de corpo:

> *É nescessario ser do papel de Estoquista "role: STOKIST" para realizar essa ação*

```json
{
	"quantity": 5
}
```

Padrão de Resposta:
```json
{
	"id": 1,
	"name": "quiboa",
	"categoryId": 1,
	"quantity": 6,
	"street": "A1",
	"minLimitItens": 5,
	"maxLimitItens": 100,
	"createdById": 3,
	"createdAt": "2024-11-10T00:00:49.349Z",
	"updatedAt": "2024-11-10T00:01:01.195Z"
}
```

> *Nesse momento é em conjunto também criada a movimentação na tabela de historico de movimentações*

### Gerenciamento de estoque (Solicitar compra de um produto) /products/request/ POST (Requer autorização)

```json
{
   'Authorization': 'Bearer token'
}
```

> *É nescessario ser do papel de Usuario "role: USER" para realizar essa ação*

Padrão de corpo::

```json
{
	"quantity": 11,
	"productId": 4,
	"manegerId": 1
}
```

Padrão de Resposta:

```json
{
	"id": 2,
	"productId": 4,
	"quantity": 11,
	"movimentType": "ENTRIE",
	"requestTime": "2024-11-10T00:27:47.804Z",
	"userId": 2,
	"manegerId": 1,
	"aproved": false,
	"rejected": false
}
```
> *Ela ainda NÃO gera movimentação na tabela de produtos, nesse momento ela vai passar pelo processo de aprovação do gerente que foi indicado no corpo: da requisição*

### Gerenciamento de estoque (Consultar lista de solicitações) /products/request/all GET

Padrão de resposta:

```json
[
	{
		"id": 1,
		"productId": 4,
		"quantity": 11,
		"movimentType": "ENTRIE",
		"requestTime": "2024-11-10T00:19:37.024Z",
		"userId": 2,
		"manegerId": 1,
		"aproved": false,
		"rejected": false
	},
	{
		"id": 2,
		"productId": 4,
		"quantity": 11,
		"movimentType": "ENTRIE",
		"requestTime": "2024-11-10T00:27:47.804Z",
		"userId": 2,
		"manegerId": 1,
		"aproved": false,
		"rejected": false
	}
]
```

### Gerenciamento de estoque (Consultar uma solicitação por ID) /products/request/unique/:id GET

Padrão de resposta:

```json
{
	"id": 1,
	"name": "quiboa",
	"categoryId": 1,
	"quantity": 6,
	"street": "A1",
	"minLimitItens": 5,
	"maxLimitItens": 100,
	"createdById": 3,
	"createdAt": "2024-11-10T00:00:49.349Z",
	"updatedAt": "2024-11-10T00:01:01.195Z"
}
```

### Gerenciamento de estoque (Aprovar uma solicitação de compra de um produto) /products/request/aprove POST (Requer autorização)

```json
{
   'Authorization': 'Bearer token'
}
```

> *É nescessario ser do papel de Gerente "role: MANEGER" para realizar essa ação, e ser o gerente responsavél pela aprovação da solicitação*

Padrão de Resposta:
```json
{
	"id": 1,
	"productId": 4,
	"quantity": 11,
	"movimentType": "ENTRIE",
	"requestTime": "2024-11-10T00:19:37.024Z",
	"userId": 2,
	"manegerId": 1,
	"aproved": true,
	"rejected": false
}
```
> A partir desse momento a requisição passa a gerar historico e não poderá ser aprovada novamente, e alterara a quantidade de itens do produto que foi solicitado *

### Gerenciamento de estoque (Reprovar uma solicitação de compra de um produto) /products/request/reprove POST (Requer autorização)

```json
{
   'Authorization': 'Bearer token'
}
```

> *É nescessario ser do papel de Gerente "role: MANEGER" para realizar essa ação, e ser o gerente responsavél pela aprovação da solicitação*

Padrão de Resposta:
```json
{
	"id": 2,
	"productId": 4,
	"quantity": 11,
	"movimentType": "ENTRIE",
	"requestTime": "2024-11-10T00:27:47.804Z",
	"userId": 2,
	"manegerId": 1,
	"aproved": false,
	"rejected": true
}
```
> A partir desse momento a requisição não pordera ser aprovada nem reporvada novamente e NÃO gera estoque e nem alterara a tabela de produtos

### Controle de Histórico (Consultar lista de historicos) /history GET

```json
{
   'Authorization': 'Bearer token'
}
```

> *É nescessario ser do papel de Gerente "role: MANEGER" para realizar essa ação, e ser o gerente responsavél pela aprovação da solicitação*

Padrão de resposta:

```json
[
	{
		"id": 1,
		"movimentType": "ENTRIE",
		"accountId": 3,
		"productId": 1,
		"quantity": 11,
		"currentQuantity": 11,
		"movimentTime": "2024-11-10T00:00:49.368Z"
	},
	{
		"id": 2,
		"movimentType": "ENTRIE",
		"accountId": 3,
		"productId": 2,
		"quantity": 11,
		"currentQuantity": 11,
		"movimentTime": "2024-11-10T00:00:52.467Z"
	},
	{
		"id": 3,
		"movimentType": "ENTRIE",
		"accountId": 3,
		"productId": 3,
		"quantity": 11,
		"currentQuantity": 11,
		"movimentTime": "2024-11-10T00:00:55.582Z"
	},
	{
		"id": 4,
		"movimentType": "ENTRIE",
		"accountId": 3,
		"productId": 4,
		"quantity": 1,
		"currentQuantity": 1,
		"movimentTime": "2024-11-10T00:00:58.587Z"
	},
	{
		"id": 5,
		"movimentType": "EXIT",
		"accountId": 3,
		"productId": 1,
		"quantity": 5,
		"currentQuantity": 6,
		"movimentTime": "2024-11-10T00:01:01.211Z"
	},
	{
		"id": 6,
		"movimentType": "ENTRIE",
		"accountId": 2,
		"productId": 4,
		"quantity": 11,
		"currentQuantity": 12,
		"movimentTime": "2024-11-10T00:37:21.619Z"
	}
]
```


### Controle de Histórico (Consultar um historico por ID) /history/:id GET

```json
{
   'Authorization': 'Bearer token'
}
```

> *É nescessario ser do papel de Gerente "role: MANEGER" para realizar essa ação, e ser o gerente responsavél pela aprovação da solicitação*

Padrão de resposta:

```json
{
	"id": 1,
	"movimentType": "ENTRIE",
	"accountId": 3,
	"productId": 1,
	"quantity": 11,
	"currentQuantity": 11,
	"movimentTime": "2024-11-10T00:00:49.368Z"
}
```

### Essas foram todas as rotas da API agora vou apresentar brevemente algum dos erros:

## ERROS

### JsonWebToken:

Se o Token expirar (duram 14 dias):

```json
{
	"error": "jwt expired"
}
```

Se for passado um Token incorreto:

```json
{
	"error": "invalid token"
}
```

Se não for passado o token:

```json
{
	"error": "Missing token Bearer prefix"
}
```

Se o usuario do token não estiver acesso a rota:

```json
{
	"error": "You dont have permission to perform this action"
}
```

### Zod:

Os erros do Zod são muito personalizaveis, então segue um exemplo da rota /products POST:

```json
{
	"error": [
		{
			"code": "invalid_type",
			"expected": "string",
			"received": "undefined",
			"path": [
				"name"
			],
			"message": "Required"
		},
		{
			"code": "invalid_type",
			"expected": "number",
			"received": "undefined",
			"path": [
				"categoryId"
			],
			"message": "Required"
		},
		{
			"code": "invalid_type",
			"expected": "number",
			"received": "undefined",
			"path": [
				"quantity"
			],
			"message": "Required"
		},
		{
			"expected": "'A1' | 'A2' | 'A3' | 'B1' | 'B2' | 'B3' | 'C1' | 'C2' | 'C3'",
			"received": "undefined",
			"code": "invalid_type",
			"path": [
				"street"
			],
			"message": "Required"
		},
		{
			"code": "invalid_type",
			"expected": "number",
			"received": "undefined",
			"path": [
				"minLimitItens"
			],
			"message": "Required"
		},
		{
			"code": "invalid_type",
			"expected": "number",
			"received": "undefined",
			"path": [
				"maxLimitItens"
			],
			"message": "Required"
		}
	]
}
```

### Erros personalizados:

### Rota /products

Se o estoquista quiser criar um produto repetido:

```json
{
	"error": "Product already registered"
}
```

Se for realizado uma consulta ou criação associando um produto que não existe: 

```json
{
	"error": "Product not Found"
}
```

Se for criado um produto com uma categoria que não existe:

```json
{
	"error": "category does not exist"
}
```

Se houver uma busca sou solicitação de aprovação ou rejeição de uma requisição que não exista:

```json
{
	"error": "Shoping does not exist"
}
```

Se for criada uma solicitação associando a um gerente que não exista:

```json
{
	"error": "Maneger does not exist"
}
```

Se tentar sair produdos acima do que axistem no estoque:

```json
{
	"error": "Not enough products"
}
```

Se for tentar aprovar uma requisição já rejeitada:

```json
{
	"error": "This request has been rejected"
}
```

Se tentarem aprovar uma requisição já aprovada:

```json
{
	"error": "This request has already been approved"
}
```

Se o gerente logado não for o gerente que precisa aprovar a solicitação:

```json
{
	"error": "This is not the approving manager"
}
```

### Rota /categories

Se o estoquista tentar criar uma categoria repetida:

```json
{
	"error": "Category already exists"
}
```

Caso seja buscada uma requisição que não exista:

```json
{
	"error": "Category not Found"
}
```

### Rota /accounts

Caso o estoquista crie uma categoria repetida:

```json
{
	"error": "Email already used"
}
```

Caso for consultada uma categoria com o id inexistente:

```json
{
	"error": "Account not found"
}
```

### Rota /historys

Caso o gerente tente buscar um historico que não exista:

```json
{
	"error": "History not Found"
}
```

### Rota /login

Caso o usuario erre a senha ou o e-mail:

```json
{
	"error": "Invalid credentials"
}
```























