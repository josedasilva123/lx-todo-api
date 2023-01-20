# LX Todo API

Uma api criada para Todo List com foco em servir de base para criação de lições e revisões para os alunos.

## Rotas de Usuário

### Register POST `/users`

Padrão de corpo:

```json
{
   "name": "John Doe",
   "email": "johndoe@email.com.br",
   "password": "@12Patinhos"
}
```

Padrão de resposta:

```json
{
   "user": {
      "_id": "63cacd57136133b56601c944",
      "name": "John Doe",
      "password": "$2a$04$M329z2AlNMtmi9XYdONnJOGn2HYTfiZSEVnXxt3957DCR60qqLvgi"
   },
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NhY2Q1NzEzNjEzM2I1NjYwMWM5NDQiLCJpYXQiOjE2NzQyMzUyMjMsImV4cCI6MTY3NDI3ODQyM30.YMcOoOuOivGgQpMlHYdt2DU7ZUH0xxvUdFyKCMucyDA",
   "message": "Cadastro realizado com sucesso!"
}
```

### Login POST `/users/login`

Padrão de corpo:

```json
{
   "email": "johndoe@email.com.br",
   "password": "@12Patinhos"
}
```

Padrão de resposta:

```json
{
   "user": {
      "_id": "63cacd57136133b56601c944",
      "name": "John Doe",
      "email": "johndoe@email.com.br"
   },
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NhY2Q1NzEzNjEzM2I1NjYwMWM5NDQiLCJpYXQiOjE2NzQyMzUyNzIsImV4cCI6MTY3NDI3ODQ3Mn0.Oh55-WUlDnklKZoWqQuygb78JFEdplkzub_u--QIg88"
}
```

### Autorização (Rotas Protegidas)

Para rotas protegidas, será exigido o envio da token no headers, associa a chave `auth`

Dessa maneira:

```json
{
   "headers": {
      "auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NhY2Q1NzEzNjEzM2I1NjYwMWM5NDQiLCJpYXQiOjE2NzQyMzUyNzIsImV4cCI6MTY3NDI3ODQ3Mn0.Oh55-WUlDnklKZoWqQuygb78JFEdplkzub_u--QIg88"
   }
}
```

### AutoLogin GET `/users/profile`

Para essa rota será necessário somente a passagem do token

Padrão de resposta:

```json
{
   "_id": "63cacd57136133b56601c944",
   "name": "John Doe",
   "email": "johndoe@email.com.br"
}
```

### Edit User PATCH `/users`

Padrão de corpo:

```json
{
   "name": "John Jones"
}
```

Padrão de resposta:

```json
{
   "message": "Usuário editado com sucesso!"
}
```

### Change Password PATCH `/users/password`

Padrão de corpo:

```json
{
	"currentPassword": "@12Patinhos",
	"newPassword": "@12Patinhos"
}
```

Padrão de resposta:

```json
{
	"message": "Senha alterada com sucesso!"
}
```

## Rotas de Todos

### Todo Create POST `/todos` (Precisa de Autorização)

Padrão de corpo:

```json
{
	"title": "Teste 5",
	"content": "Conteúdo de teste",
	"category": "Categoria de teste"
}
```

Padrão de resposta:

```json
{
	"todo": {
		"userId": "63c97f2c264bf92451c7a809",
		"title": "Teste 5",
		"content": "Conteúdo de teste",
		"category": "Categoria de teste",
		"_id": "63ca9b81f7fc61df0dc0e055",
		"createdAt": "2023-01-20T13:47:45.192Z",
		"updatedAt": "2023-01-20T13:47:45.192Z",
		"__v": 0
	},
	"message": "Nota cadastrada com sucesso!"
}
```

### Todos Update PATCH `/todos/:noteId` (Precisa de Autorização)

Padrão de corpo:

```json
{
	"title": "Teste 5",
	"content": "Conteúdo de teste atualizado",
	"category": "Categoria de teste"
}
```

Padrão de resposta:

```json
{
	"message": "Nota editada com sucesso!"
}
```

### Todos Delete DELETE `/todos/:noteId` (Precisa de Autorização)

Padrão de resposta

```json
{
	"message": "Nota excluida com sucesso!"
}    
```

### Todos Read GET `/todos` (Precisa de Autorização)

Padrão de resposta:

```json
{
	"count": 5,
	"todos": [
		{
			"_id": "63ca9b74f7fc61df0dc0e04d",
			"userId": "63c97f2c264bf92451c7a809",
			"title": "Teste",
			"content": "Conteúdo de teste",
			"category": "Categoria de teste",
			"createdAt": "2023-01-20T13:47:32.871Z",
			"updatedAt": "2023-01-20T13:47:32.871Z",
			"__v": 0
		},
		{
			"_id": "63ca9b77f7fc61df0dc0e04f",
			"userId": "63c97f2c264bf92451c7a809",
			"title": "Teste 2",
			"content": "Conteúdo de teste",
			"category": "Categoria de teste",
			"createdAt": "2023-01-20T13:47:35.563Z",
			"updatedAt": "2023-01-20T13:47:35.563Z",
			"__v": 0
		},
		{
			"_id": "63ca9b7af7fc61df0dc0e051",
			"userId": "63c97f2c264bf92451c7a809",
			"title": "Teste 3",
			"content": "Conteúdo de teste",
			"category": "Categoria de teste",
			"createdAt": "2023-01-20T13:47:38.662Z",
			"updatedAt": "2023-01-20T13:47:38.662Z",
			"__v": 0
		},
		{
			"_id": "63ca9b7df7fc61df0dc0e053",
			"userId": "63c97f2c264bf92451c7a809",
			"title": "Teste 4",
			"content": "Conteúdo de teste",
			"category": "Categoria de teste",
			"createdAt": "2023-01-20T13:47:41.883Z",
			"updatedAt": "2023-01-20T13:47:41.883Z",
			"__v": 0
		},
		{
			"_id": "63ca9b81f7fc61df0dc0e055",
			"userId": "63c97f2c264bf92451c7a809",
			"title": "Teste 5",
			"content": "Conteúdo de teste atualizado",
			"category": "Categoria de teste",
			"createdAt": "2023-01-20T13:47:45.192Z",
			"updatedAt": "2023-01-20T13:52:20.624Z",
			"__v": 0
		}
	]
}
```

A rota suporta os respectivos parâmetros:

| Parâmetro | Descrição |
| ------ | ------ |
| skip   | Inicio da filtragem |
| limit  | Quantidade de itens por página |
| category | Slug da categoria |
| search | Busca com base no título da nota |

### Todos Read One GET `/todos/:noteId` (Precisa de Autorização)

Padrão de resposta:

```json
{
	"_id": "63ca9b74f7fc61df0dc0e04d",
	"userId": "63c97f2c264bf92451c7a809",
	"title": "Teste",
	"content": "Conteúdo de teste",
	"category": "Categoria de teste",
	"createdAt": "2023-01-20T13:47:32.871Z",
	"updatedAt": "2023-01-20T13:47:32.871Z",
	"__v": 0
}
```

## Rotas de Categorias

### Categories Create POST `/categories` (Precisa de Autorização)

Padrão de Resposta: 

```json
{
	"category": {
		"userId": "63c97f2c264bf92451c7a809",
		"label": "exemplo",
		"slug": "exemplo2",
		"_id": "63cac61103fcb49b8db61e38",
		"createdAt": "2023-01-20T16:49:21.151Z",
		"updatedAt": "2023-01-20T16:49:21.151Z",
		"__v": 0
	},
	"message": "Categoria criada com sucesso!"
}
```

### Categories Delete DELETE `/categories/:categoryId` (Precisa de Autorização)

Padrão de Resposta:

```json
{
	"message": "Categoria excluida com sucesso!"
}
```

### Categories Read GET `/categories/` (Precisa de Autorização)

Padrão de Resposta:

```json
{
	"count": 1,
	"categories": [
		{
			"_id": "63cac5fe03fcb49b8db61e33",
			"userId": "63c97f2c264bf92451c7a809",
			"label": "exemplo",
			"slug": "exemplo",
			"createdAt": "2023-01-20T16:49:02.848Z",
			"updatedAt": "2023-01-20T16:49:02.848Z",
			"__v": 0
		}
	]
}
```

A rota suporta os respectivos parâmetros:

| Parâmetro | Descrição |
| ------ | ------ |
| skip   | Inicio da filtragem |
| limit  | Quantidade de itens por página |

===
