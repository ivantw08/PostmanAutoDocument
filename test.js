showdown  = require('showdown')
fs = require('fs');
gap = '\r\n----------------\r\n';
//clean the old document
fs.writeFile("./document.md",'', function(err) {
 
});

htmlHead = '<html lang="en"><head><link rel="stylesheet" type="text/css" href="./document.css"><link href="./json-tree-master/css/jsontree.css" rel="stylesheet"><script src="./json-tree-master/src/jsontree.js"></script><script src="tree.js"></script><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body><div class="container">\r\n'


var apiHtmlBegin= '\r\n .<div class="apiFrame">\r\n',
    apiHtmlEnd='</div>';
var final = '';
var content = '' ; 
var responseText = []; 
var tree = '';
var order = '';
fs.readFile('./document.json', 'utf8', function (err,data) {
  content = data;
  parseData();
});

function parseData(){
  var obj = JSON.parse(content);
  final = final + htmlHead;
  var title = '# Documnt name:'+obj.name+'\r\n',
      description = '## Document description:'+obj.description+'\r\n',
      api = obj.requests,
      mainData=title+description+gap+'\r\n';
      final = final + mainData;


      order =  obj.order ;    
console.log(order[0]); 
  var test = '';
 // var writeString = '';
  var itemData=[];
  var mainIndex = 1 ;

  api.forEach(function(item,index){
    // if (obj[i].code == needle){
     
    // }
    var bodyInfo='| key | value | description | enabled | type |\r\n|:-----|:----|:----|:-----|:-----|\r\n';
    var headerInfo= '| key | value | description | enabled |'+'\r\n'+'|:----|:------|:-----|:-----|\r\n';
   // api基本資料
      apiTitle ='#'+index+' Api name: '+item.name+'\r\n';
      apiUrl ='## Api route: '+item.url+'\r\n';
      apiMethod ='### Method: '+item.method+'\r\n';
      apiDescription ='#### api description: '+item.description+'\r\n';
      apiInfo = apiHtmlBegin+'\r\n'+apiTitle+apiUrl+apiMethod+apiDescription;
  
      final = final+apiInfo;
       //送出去的東西
      var body = 'Body'+'\r\n';
      //console.log(item.data);
      if(item.data != null){
          item.data.forEach(function(item,index){
            if (item.enabled==true){
              bodyInfo = bodyInfo+'|'+item.key+'|'+item.value+'|'+item.description+'|'+item.enabled+'|'+item.type+'| \r\n'
            }
          });
      }else{
        bodyInfo = ': null\r\n';
      }
 
     
      final = final+body+bodyInfo+'\r\n';
      
      var Headers = '\r\nHeaders:\r\n ';
      if(item.headerData != null){
        item.headerData.forEach(function(item,index){
          if (item.value.length > 100){
            item.value='token';
          }
           if (item.enabled==true){
            headerInfo =headerInfo +'|'+item.key+'|'+item.value+'|'+item.description+'|'+item.enabled+'|'+'\r\n'
           }
        });
      }else{
        headerInfo = '' 
      } 

      final = final+Headers+headerInfo;

    //回傳的內容
      var response ='##Response'+'\r\n';
          if(item.responses != null){
             item.responses.forEach(function(item,index){
              responseInfo ='###status code:'+ item.responseCode.code+'\r\n'+'response:\r\n<div id=json'+mainIndex+'>'+' </div>\r\n';
              responseText[mainIndex] ='document.getElementById("json'+mainIndex+'").innerHTML = JSONTree.create('+item.text +'); \r\n' ;  
              tree = tree +responseText[mainIndex];
              mainIndex=mainIndex+1;
           });
          } 
          final = final+responseInfo+'\r\n'+apiHtmlEnd;
  });
final = final+'<script>'+tree+'</script>';
  write(final,'document.md');

  html();
}// FUNCTION END 


  

    
function write(content,fileName){
  fs.appendFile(fileName, content, function (err) {
  if (err) throw err;

  });
}

function html(){
  fs.readFile('./document.md', 'utf8', function (err,data) {
    if (err) throw err;
    var converter = new showdown.Converter();
    converter.setOption('tables', true);
    converter.setOption('tablesHeaderId', true);
    html = converter.makeHtml(data);
    fs.writeFile("./document.html",html, function(err) {
      if (err) throw err;
    });
  });//read from md 
}