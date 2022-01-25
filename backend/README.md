
# Backend Endpoints

### Authorization using simple jwt token - access and refresh

**Refresh Token not changed**
 * /api/auth/token/ : <!-- login -->
        **Request Type:POST**
        - Takes Email and Password
        - Returns refresh and access Token

 * /api/auth/token/refresh/ :<!-- refresh token -->
        **Request Type:POST**
        - Takes Refresh Token
        - Returns access Token

 * /api/user/ :<!-- signup -->
        **Request Type : GET**
            - Returns all the Users and their creds along with uuid
        **Request Type : POST**
            - Takes Username, Name, Email, Password, Confirm Password, Profile Picture, Bio, Home town
            - Returns the created user instance
 
* /api/user/{uuid} <!-- profile -->
       *Authorization Enabled for non-safe methods*
       **Request Type: GET**
       Returns the specific user creds
       **Request Type: PATCH, DELETE**


## Main Application(tripping) endpoints


### Vendor Details
* /api/vendor/ <!-- Vendors(Places where QR is Installed) -->
       **Request Type: GET**
<br />
              - Returns the list of all vendors and its details id,name,location,contact,image,type_of_place,is_sponsor

* /api/vendor/{id} <!-- id is the same id which gets returned when the get request is sent to /api/vendor/ -->
       **Request Type : GET**
<br />
              -Returns the specific vendor details as above


### Visit Details
* /api/visit/ <!-- Visit is the field where the the user and the vendor gets interconnected  -->
**Request Type : GET**
<br />
              - Returns the list of all the visits of all the user which is marked as public

**Request Type : POST**
<br />
              - Only works when Authenticated user sends request
<br />
              - Send {"vendor":"{vendor_id}","public":"true" } in the body as payload if user wants the visit to be public PS: Make public default to be "true"
<br />
              - Returns the created visit of an user to the vendor
<br />
       Fields: id, user, vendor, content, public, location_score(hidden,read_only)


### Leaderboard Details
* /api/leaderbord/ <!-- Travellers Leaderboard -->
**Request Type : GET**
<br />
       -Returns the list of users and their scores based on the the total score of their visits and ranks them.
</br>
     * fields: user(user_id), visits, unique_visits, username, user_uuid, user_profile_picture, score *
