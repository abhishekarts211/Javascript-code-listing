########Fetching a protected Resource#######

app.get('/fetch_resource', function(req, res) {


if (!access_token) {
   res.render('error', {error: 'Missing Access Token'});
   }
   
   console.log('Making request with access token %s', access_token);
   
   var headers = {
       'Authorization': 'Bearer ' + access_token
	   };
	   
	var resource = request('POST', protectedResource,
	     {headers: headers}
	   };
	   
	if (resource.statusCode >= 200 && resource.status Code < 300) {
	    var body = JSON.parse(resource.getBody());
		res.render('data', {resource: body});
		return;
		
    } else {
	
	        access_token = null;
			res.render('error', {error: resource.statusCode});
			return;
	    }
		
	});
	





	
  if (req.query.error) {
	  res.render('error', {error: req.query.error});
	  return;
    }
  
  if (req.query.state != state) {
	  console.log('state DOES NOT MATCH: expected %s got %s', state, req.query.state);
	  res.render('error', {error: 'State value did not macth'});
	  return;
	  
  }
  
  var code = req.query.code;
  
  var form_data = qs.stringify({
	  grant_type: 'authorization_code',
	  code: code,
	  redirect_uri: client.redirect_uris[0]
	  
  });
  
  var headers = {
	  'Content-Type': 'application/x-www-form-urlencoded',
	  'Authorization': 'Basic " + encodeClientCredentials(client.client_id,client.client_secret)
	  
  }:
  
  var tokRes = request('POST', authServer.tokenEndpoint, {
	               body: form_data,
				   headers: headers
  });
  
  console.log('Requesting access token for code %s',code);
  
  if (tokRes.statusCode >= 200 && tokRes.statusCode < 300) {
	  var body = JSON.parse(tokRes.getBody());
	  
	  access_token = body.acces_token;
	  console.log('Got access token: %s', access_token);
	  
	  res.render('index', {access_token: access_token, scope; scope});
	  
  } else {
	  res.render('error', {error: 'Unable to fetch access token, server response: " + tokres.statusCode})
  }
  
});
  
  
  
  
  
  
  
  
  
  
  
  
  



