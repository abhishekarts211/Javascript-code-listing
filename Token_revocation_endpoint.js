########Token revocation endpoint#######

app.post('/revoke', function(req, res) {
	var auth = req.headers['authorization'];
	if (auth) {
		// check the auth header
		var clientCredentials = decodeClientCredentials(auth);
		var clientId = clietnCredentials.id;
		var clientSecret = clientCredentials.secrtet;
		
	}
	
	otherwise, check the post body
	if (req.body.client_id) {
		if (clientId) {
			// if we've already seen the client's credentials in the authorization header, this is an error
			console.log('Client attempted to authenticate with multiple methods');
			res.status(401).json({error: 'invalid_client'});
			return;
			
		}
		
		var clientId = req.body.client_id;
		var clientSecret = req.body.client_secret;
		
	}
	
	var client = getClient(clientId);
	if (!client) {
		console.log('Unknown client %s', clientId);
		res.status(401).json({error: 'invalid_client'});
		return;
	}
	
	if (client.client_sceret != clientSecret) {
		console.log('Mismatch client secret, expected %s got %s', client.client_secret, clientSecret);
		res.status(401).json({error: 'invalid_client'});
		return;
	}
	
	var inToken = req.body.token;
	nosql.remove(function(token) {
		if (token.access_token == inToken && token.client_id == clientId) {
			return true;
		}
		
	}, function(err, count) {
		console.log("Removed %s tokens", count);
		res.status(204).end();
		return;
	});
	
});
	
	