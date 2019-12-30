# Speech API documentation

**List users**
----
  Verify if the users exists and creates a required token for the application validations.

* **URL**

  `/api/users/:userId`

* **Method:**

  `GET`
  
*  **URL Params**  

    **Optional**
    
     `userId=[string]`
     
* **Data Params**

  **Required:**
 
   `token=[string]`  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{  
      message: "User created successfully",  
      user: { username, _id }
    }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error message }`

* **Sample Call:**

  ```javascript
  $.post('/api/users/create', {username: "myusername", password: "mypassword", JWT_KEY="server_secret_jwt_key"}, response => {
    console.log(response.message)
  });
  ```

* **Notes:**

  JWT_KEY is used for admin accounts creation, if it matches with the internal server key, automatically creates an account with administrator privileges.</br>






**List users**
----
  List all informations our about one user.

* **URL**

  `/api/users/login`

* **Method:**

  `POST`
  
*  **URL Params**  

    `None`

* **Data Params**

  **Required:**
 
   `username=[string]`  
   `password=[string]`
   
  **Required on mobile apps:**  
  
    `deviceName=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{  
      message: "Listring user(s)",  
      users: [...users]
    }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ message: : error message }`

* **Sample Call:**

  ```javascript
  // Information about the specific
  $.get('/api/users/jKmHByNlPh87bYG67O9KLmm', { token: YOUR_AUTH_TOKEN }, response => {
    console.log(response.message)
  });
  
  // Information about all users
  $.get('/api/users', response => {
    console.log(response.users)
  });
  ```

* **Notes:**

  None
  





**Create user**
----
  Verify if the users exists and creates a required token for the application validations.

* **URL**

  `/api/users/create`

* **Method:**

  `POST`
  
*  **URL Params**  

    `None`

* **Data Params**

  **Required:**
 
   `username=[string]`  
   `password=[string]`
  
  **Optional:**
  
    `JWT_KEY=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{  
      message: "User created successfully",  
      user: { username, _id }
    }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error message }`

* **Sample Call:**

  ```javascript
  $.post('/api/users/create', {username: "myusername", password: "mypassword", JWT_KEY="server_secret_jwt_key", token: "YOUR_AUTH_TOKEN" },"}, response => {
    console.log(response.message)
  });
  ```

* **Notes:**

  JWT_KEY is used for admin accounts creation, if it matches with the internal server key, automatically creates an account with administrator privileges.</br>
  
  
  
  
  
  
**Delete user**
----
  Verify if the users exists and creates a required token for the application validations.

* **URL**

  `/api/users/:userId`

* **Method:**

  `DELETE`
  
*  **URL Params**  

     **Optional:**
     
      `userId=[string]`

* **Data Params**
  
    **Required:**
  
     `token=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{  
      message: "User deleted successfully",  
      user: { username, _id }
    }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ message: "User not found" }`

* **Sample Call:**

  ```javascript
  $.delete('/api/users/jKmHByNlPh87bYG67O9KLmm', response => {
    console.log(response.message)
  });
  ```

* **Notes:**

  For many deletions the user must be an administrator.</br>
  
