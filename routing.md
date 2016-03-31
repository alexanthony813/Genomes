## Routing

|Description|Endpoint|
|---|---|
|[Log-in OAuth](routing.md#log-in)|GET /receive_code/|
|[Log-in Demo](routing.md#demo)|GET /demo/|
|[Log-out current user](routing.md#log-out)|POST /logout|
|[Get User Info](routing.md#get-user-info)|GET /currentuser_info/|
|[Get User Relatives](routing.md#relatives)|POST /api/relatives/|
|[Get User's SNP Data](routing.md#snpdata)|POST /api/snp_data|

##### Admin Only
|Description|Endpoint|
|---|---|
|[Access to 23&Me Individual data](routing.md#get-individual-data)|/1/user/:userID|
|[Access to 23&Me Genotype data](routing.md#get-genotype-data)|/1/genotype/:userID|
|[Access to 23&Me Relative data](routing.md#get-relative-data)|/1/relatives/:userID|


## `GET /receive_code/`

Redirects back to server after acquiring access token after User approves OAuth permissions

### Example Request
```bash
curl -H 'Accept: auth-url' -H 'Authorization: OAuth <access_token>' \
-X GET https://BASE_API_URL + 
{
  'client_id': CLIENT_ID,
  'client_secret': CLIENT_SECRET,
  'grant_type': 'authorization_code',
  'code': request.args.get('code'),
  'redirect_uri': REDIRECT_URI,
  'scope': DEFAULT_SCOPE
}
```