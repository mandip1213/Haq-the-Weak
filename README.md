# Haq-the-Weak

# Mission  20,000
![get rs 20,000](./images/img1.png)

# Backend Endpoints

### Authorization using simple jwt token - access and refresh

**Refresh Token not changed**
 * /api/auth/token/ : 
        **Request Type:POST**
        - Takes Email and Password
        - Returns refresh and access Token

 * /api/auth/token/refresh/ :
        **Request Type:POST**
        - Takes Refresh Token
        - Returns access Token

 * /api/user/ :
        **Request Type : GET**
            - Returns all the Users and their creds along with uuid
        **Request Type : POST**
            - Takes Username, Name, Email, Password, Confirm Password, Profile Picture, Bio, Home town
            - Returns the created user instance
 
 * /api/user/{uuid}
     ## Authorization Enabled for non-safe methods
       **Request Type: GET**
       Returns the specific user creds
       **Request Type: PUT, PATCH, DELETE**
