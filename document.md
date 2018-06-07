<html lang="en"><head><link rel="stylesheet" type="text/css" href="./document.css"><link href="./json-tree-master/css/jsontree.css" rel="stylesheet"><script src="./json-tree-master/src/jsontree.js"></script><script src="tree.js"></script><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body><div class="container">
# Documnt name:postMan
## Document description:This is api example

----------------


 .<div class="apiFrame">

#0 Api name: login
## Api route: http://localhost/jwt/public/api/login
### Method: POST
#### api description: This api is for user login
Body
| key | value | description | enabled | type |
|:-----|:----|:----|:-----|:-----|
|account|ivantw08@gmail.com|user account|true|text| 
|password|password|user password|true|text| 


Headers:
 | key | value | description | enabled |
|:----|:------|:-----|:-----|



### example name:login success
####status code:200
response:
<div id=json1> </div>

### example name:login fail
####status code:400
response:
<div id=json2> </div>

</div>
 .<div class="apiFrame">

#1 Api name: user/{user_id}
## Api route: http://localhost/jwt/public/api/user/ivantw08
### Method: GET
#### api description: this api show the user information
Body
: null


Headers:
 | key | value | description | enabled |
|:----|:------|:-----|:-----|
|Authorization|sdfgmv,cod9e84j59590404kk59yh780303489rjfhr4y57tgurbhy3483o9fkfhtyt88554||true|



### example name:user not found
####status code:400
response:
<div id=json3> </div>

### example name:get user info success
####status code:200
response:
<div id=json4> </div>

</div>
 .<div class="apiFrame">

#2 Api name: product/{proiduct_id}
## Api route: http://localhost/jwt/public/api/product/cccs78s
### Method: PUT
#### api description: 
Body
| key | value | description | enabled | type |
|:-----|:----|:----|:-----|:-----|
|product name|Magic book||true|text| 
|code|cccs78s||true|text| 
|weight|150||true|text| 
|price|150||true|text| 
|color|black||true|text| 


Headers:
 | key | value | description | enabled |
|:----|:------|:-----|:-----|
|Authorization|lmnxcklmnoiw8303uij3oirm23wie0kdkp||true|


### example name:change some product info
####status code:200
response:
<div id=json5> </div>

</div><script>document.getElementById("json1").innerHTML = JSONTree.create({"status":"login successful","user name":"Ivan wu","token":"cmvkjf9rj5ntgkf93e854jtkf"}); 
document.getElementById("json2").innerHTML = JSONTree.create({"status":"password or account is incorrect"}); 
document.getElementById("json3").innerHTML = JSONTree.create({"status":"user not found"}); 
document.getElementById("json4").innerHTML = JSONTree.create({"name":"Ivan Wu","mail":"ivantw08@gmail.com","gender":"male"}); 
document.getElementById("json5").innerHTML = JSONTree.create({"product name":"Magic book","code":"Ivan wu","weight":"150g","price":"150","color":"black"}); 
</script>