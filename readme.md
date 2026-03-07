## library management systems 

this is a library API backend for the management of users and the books 

## routes and endpoints

## /users 

get : get all the list of the all users in the systems 

## create new user / resister 

Post : To resister the user 

## /user {id}
GET : get a new user by user ID
PUT : Updating a user by their ID 
DELETE : deleting a user by their ID (check if the user still has an issued book ) && (is there any file or panalty to be collected  
)

## user / subscription details {id}

GET : get a user rsubs details by the user ID 

  >> Date of subscription  
  >> valid till ?
  >> Fine if any ?

## /books
GET : get all the books in the system 
POST : add new book to the System 

## /books{id}
 GET : get a book by its ID
 PUT : update a book id with its ID 
 DELETE : delete a book by its ID

 ## / boooks /issuued 
 GET: get all the issued books 

 ## /books/issued/withFine 
 GET all the isssued book with fine Amount 

 ## Subscriptions types 
    >> Basic for 3 months 
    >> Standerd 6 months 
    >> premium for 12 months

>> if user missed the renewal date , then user should be collected with $100
>> if a user misses his sunscription , then user is expected to pay $100
>> if a user misses renewal and sub both then fine will be 200 $


## commands 

npm init -y
npm i express  --> change the script in package.JSON 
npm i nodemon  
npm i nodemon --save-dev >> this creates individual dependency in package.JSON 
devDependency nodemon only use for Developers 
where  dependency express use for both the dev + user


to restore package.lock.json and node module ---> node i 


