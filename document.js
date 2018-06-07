/**
 * @name ParsePOSTman
 * @description This file is help developer easiler to create Postman's json file to html file.
 * @version v1.0.2
 * @author Ivan Wu  <ivantw08@gmail.com>
 */


/**
 * Basic param description
 * @param {string} gap create a gap string
 * @param {string} htmlHead basic html header 
 * @param {string} apiHtmlBegin api section start
 * @param {string} apiHtmlEnd api section end
 * @param {string} content content form json
 * @param {string} final final string save to md file 
 * 
 */


var apiHtmlBegin= '\r\n .<div class="apiFrame">\r\n',
    apiHtmlEnd='</div>',
    final = '',
    content = '',
    responseText = [],
    tree = '',
    order = '',
    obj = '',
    gap = '\r\n----------------\r\n',
    htmlHead = '<html lang="en"><head><link rel="stylesheet" type="text/css" href="./document.css"><link href="./json-tree-master/css/jsontree.css" rel="stylesheet"><script src="./json-tree-master/src/jsontree.js"></script><script src="tree.js"></script><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body><div class="container">\r\n'

/**
 * Begining
 * clear the markdown file and parse data from json file.
 */

showdown  = require('showdown')
fs = require('fs');
fs.writeFile("./document.md",'', function(err) {});

fs.readFile('./document2', 'utf8', function (err,data) {
  content = data;
  parseData();
});

function parseData(){

  obj = JSON.parse(content);
  final = final + htmlHead;
  var title = '# Documnt name:'+obj.name+'\r\n',
      description = '## Document description:'+obj.description+'\r\n',
      api = obj.requests,
      mainData=title+description+gap+'\r\n';
      final = final + mainData;
      order =  obj.order ;    

  var test = '';
  var itemData=[];
  var mainIndex = 1 ;

  //console.log(obj.order);
obj.order.forEach(function(orderItem,orderIndex){
  api.forEach(function(item,index){
      if(orderItem==item.id){
        var bodyInfo='| key | value | description | enabled | type |\r\n|:-----|:----|:----|:-----|:-----|\r\n';
        var headerInfo= '| key | value | description | enabled |'+'\r\n'+'|:----|:------|:-----|:-----|\r\n';
       // api基本資料
          apiTitle ='#'+orderIndex+' Api name: '+item.name+'\r\n';
          apiUrl ='## Api route: '+item.url+'\r\n';
          apiMethod ='### Method: '+item.method+'\r\n';
          apiDescription ='#### api description: '+item.description+'\r\n';
          apiInfo = apiHtmlBegin+'\r\n'+apiTitle+apiUrl+apiMethod+apiDescription;
          final = final+apiInfo;
          var body = 'Body'+'\r\n';
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
          var multipleResponse='';
          var response ='##Response'+'\r\n';
              if(item.responses != null){
                 item.responses.forEach(function(item,index){//多種情況還沒寫
                  //responseInfo =' \r\n ##example name:'+item.name+' \r\n'+'  ###status code:'+ item.responseCode.code+'\r\n　response:\r\n<div id=json'+mainIndex+'>'+' </div>\r\n';
                  responseInfo = '### example name:'+item.name+'\r\n';
                  responseInfo =responseInfo+'####status code:'+ item.responseCode.code+'\r\n'+'response:\r\n<div id=json'+mainIndex+'>'+' </div>\r\n';
                  responseText[mainIndex] ='document.getElementById("json'+mainIndex+'").innerHTML = JSONTree.create('+item.text +'); \r\n' ;  
                  tree = tree +responseText[mainIndex];
                  mainIndex=mainIndex+1;
                  multipleResponse = '\r\n'+multipleResponse+'\r\n'+responseInfo;
               });
              } 
              final = final+multipleResponse+'\r\n'+apiHtmlEnd;
      }
  })
})
 // api.forEach(function(item,index){
   
 // });
  final = final+'<script>'+tree+'</script>';
  write(final,'document.md');
  html();
}
    
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