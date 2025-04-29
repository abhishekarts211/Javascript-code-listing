########UserInfo endpoint#######

var userInfoEndpoint = function(req, res) {
	
	if (!_.contains(req.access_token.scope, 'openid')) {
		res.status(403).end();
		return;
	}

var user = req.access_token.user;
    if(!user) {
    res.status(404).end();
    return;
    }

var out = {};
_.each(req.access_token.scope, function (scope) {
	if (scope == 'openid') {
		  _.each(['sub'], function(claim) {
			      if (user[claim]) {
					  out[claim] = user[claim];
				  }
		  });
		  
	} else if (scope == 'profile') {
		_.each(['name', 'famil_name', 'given_name', 'middle_name', 'nickname', 'preferred_username', 'profile', 'zoneinfo', 'locale', 'updated_at'], function(claim) {
			if (user[claim]) {
				out[claim] = user[claim];
			}
		});
		
	} else if (scope == 'email') {
		_.each(['email', 'email_verified'], function(claim) {
			if (user[claim]) {
				out[claim] = user[claim];
			}
		});
		
	} else if (scope == 'address') {
		_.each(['address'], function(claim) {
			if (user[claim]) {
				out[claim] = user[claim];
			}
		});
			
	}
	
});

res.status(200).json(out);
return;

};
	
	