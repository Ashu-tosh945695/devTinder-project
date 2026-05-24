# devtinder APIs
## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password'

## connectionRequestRouter
- post /request/send/:status/:userId
<!-- - post /request/send/interested/:userId -->
<!-- - post /request/send/ignored/:userId -->

- post /request/review/:status/:requestId
<!-- - Post /request/review/accepted/:requestId -->
<!-- - Post /request/review/rejected/:requestId -->
 
## useRouter
- GET /user/connections
- Get /user/requests/received
- GET /user/feed - gets you the profile of other users on platform


