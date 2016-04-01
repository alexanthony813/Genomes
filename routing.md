## Routing

|Description|Endpoint|
|---|---|
|[Log-in OAuth](routing.md#get-receive-code)|GET /receive_code/|
|[Log-in Demo](routing.md#post-demo)|POST /demo/|
|[Log-out current user](routing.md#logout)|POST /logout|
|[Get User Info](routing.md#get-currentuserinfo)|GET /currentuser_info/|
|[Get User Relatives](routing.md#post-apirelatives)|POST /api/relatives/|
|[Get User's SNP Data](routing.md#post-apisnpdata)|POST /api/snp_data/|

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


## `POST /demo/`

Allows visitors to access site as a demo user

### Example Request
```json
{
	'demo_profile_id': 'demo_id',
	'demo_first_name': 'Foo',
	'demo_last_name': 'Bar'
	'demo_data': [
		'sex': 'm/f',
		'rs_id': 'demo_basepairs',
		...
	]
}
```


## `POST /logout/`

Logs out user from session and clears cookies/cache

### Example Request
```json
{
	'user_profile_id': 'profile_id',
	'headers': {
		'cookie': {
			'token': 'asj238xlzhs_uw28hzbhslsm8es9'
		}
	}
}
```


