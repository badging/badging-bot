#!/bin/sh
sudo gem install jwt
ruby token.rb
auth_token=`cat token.txt`
rm token.txt

#get installation access token
curl -i -X POST \
-H "Authorization: Bearer $auth_token" \
-H "Accept: application/vnd.github.v3+json" \
https://api.github.com/app/installations/24938912/access_tokens