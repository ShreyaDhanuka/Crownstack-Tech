# Crownstack-Tech

you can run the code by :- nodemon start

POST : /users/signup: 
     a)username b)password 
     :- userId and cartId will be generated

POST: /user/login:
     a)username b)password
     :-login credentials

POST : /product/create-product 
     a)name b)description c)price d)make 
     :-  will create product details like name, description , price, make

GET : /product/all-product 
    a)productId 
    :-list of all products

PUT: /product/add-product/:productId
    a)productId
   :- add product in cart by productId

GET: /user/get-cart
    Token
    :-products in a cart for a particular user

