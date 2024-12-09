# Recipes API

## API documentation

### Return/Create user userId - story-2

- **URL**

  /users

- **Method:**

  `POST`

- **URL Params**

  none

  **Example:**

  `/users`

    **Body Data**

  ``` json
  {
    "email": "you@me.com"
  }
  ```

## get user

- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "message": "Successfully retrieved user",
  "data": {
    "userId": "1"
  }
}
```

- **Error Response:**
- **Code:** 400 BAD REQUEST
- **Content:** `{"message": "Invalid email", "data": {} }`

- **Code:** 500 SERVER ERROR
- **Content:** `{"message": "Unexpected error", "data": {} }`

#### add user if not existing

- **Success Response:**
  - **Code:** 201
  - **Content:**

```json
{
  "message": "Successfully created user",
  "data": {
    "userId": "1"
  }
}
```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
  - **Content:** `{"message": "Invalid email", "data": {} }`

  - **Code:** 500 SERVER ERROR
    **Content:** `{"message": "Unexpected error"}`

## Return all recipes for a user - story3

- **URL**

  /users/:userId/recipes

- **Method:**

  `GET`

- **URL Params**

  none

  **Example:**

  `/users/1/recipes`

- **Success Response:**
- **Code:** 200
- **Content:**

```json
{
  "message": "Successfully retrieved all recipes",
  "data": [
    {
      "id": 1,
      "name": "baps",
      "duration": 3
    },
    {
      "id": 2,
      "name": "buns",
      "duration": 3
    }
  ]
}
```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `{"message": "Invalid user id", "data": [] }`

  - **Code:** 500 SERVER ERROR
    **Content:** `{"message": "Unexpected error", "data": [] }`

## Add a recipe for a user - Story-3

- **URL**

  /users/:userId/recipes

- **Method:**

  `POST`

- **URL Params**

  none

  **Example:**

  `/users/1/recipes` 

  **Body Data**

  Required

  ``` json
  {
    "name": "string",
    "instructions": "string",
    "prep_time": 0,
    "cook_time": 0,
    "ingredients": [
      1, 2 ,3
    ]
  }

  ```

- **Success Response:**
  - **Code:** 201
  - **Content:**

```json
{
  "message": "Successfully created recipe",
  "data": {
    "recipeId": 1,
  }
}
```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `{"message": "Invalid user id", "data": {} }`
  - **Code:** 400 BAD REQUEST
    **Content:** `{"message": "Invalid data", "data": {} }`

  - **Code:** 500 SERVER ERROR
    **Content:** `{"message": "Unexpected error", "data": {} }`

## Return recipe by recipe id - story-4

- **URL**

  /users/:userId/recipes/:recipeId

- **Method:**

  `GET`

- **URL Params**

  none

  **Example:**

  `/users/1/recipes/1`

- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "message": "Successfully retrieved recipe",
  "data": {
    "id": 1,
    "name": "baps",
    "instructions": "how to make baps",
    "prep_time": 1,
    "cook_time": 2,
    "ingredients": [
      {
        "id": 1,
        "name": "tasty food"
      },
      {
        "id": 2,
        "name": "tastier food"
      },
      {
        "id": 3,
        "name": "tastiest food"
      }
    ]
  }
}
```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `{"message": "Invalid recipe id", "data": {} }`

  - **Code:** 500 SERVER ERROR
    **Content:** `{"message": "Unexpected error", "data": {} }`

## Return all ingredients - story-4

- **URL**

  /users/:userId/ingredients

- **Method:**

  `GET`

- **URL Params**

  none

  **Example:**

  `/users/1/ingredients`

- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "message": "Successfully retrieved all ingredients",
  "data": {
      {
        "id": 1,
        "name": "tasty food"
      },
      {
        "id": 2,
        "name": "tastier food"
      },
      {
        "id": 3,
        "name": "tastiest food"
      }
  }
}
```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `{"message": "Invalid user id", "data": {} }`

  - **Code:** 500 SERVER ERROR
    **Content:** `{"message": "Unexpected error", "data": {} }`

## Return single ingredient - story-4

- **URL**

  /users/:userId/ingredient/:ingredientId

- **Method:**

  `GET`

- **URL Params**

  none

  **Example:**

  `/users/1/ingredient/1`

- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "message": "Successfully retrieved ingredient",
  "data": {
    "id": 1,
    "name": "tasty food"
  }
}
```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `{"message": "Invalid ingredient id", "data": {} }`
  - **Code:** 400 BAD REQUEST
    **Content:** `{"message": "Invalid user id", "data": {} }`

  - **Code:** 500 SERVER ERROR
    **Content:** `{"message": "Unexpected error", "data": {} }`

## Add ingredient - story-4

- **URL**

  /users/:userId/ingredient

- **Method:**

  `POST`

- **URL Params**

  none

  **Example:**

  `/users/1/ingredient`

  **Body Data**

    Required
  
  ``` json
  {
    "name": "string"
  }

  ```

  the inserted ID for the ingredient in the 'ingredients' table must be used in the 'recipe' table and 'recipes_ingredient' relational table.

- **Success Response:**
  - **Code:** 201
  - **Content:**

```json
{
  "message": "Successfully added ingredient",
  "data": {
    "id": 1
  }
}
```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `{"message": "Invalid data", "data": {} }`
  - **Code:** 400 BAD REQUEST
    **Content:** `{"message": "Invalid user id", "data": {} }`

  - **Code:** 500 SERVER ERROR
    **Content:** `{"message": "Unexpected error", "data": {} }`
