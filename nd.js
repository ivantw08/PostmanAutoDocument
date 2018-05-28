showdown  = require('showdown')
fs = require('fs');
fs.readFile('./report.md', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var converter = new showdown.Converter();
    converter.setOption('tables', true);
    converter.setOption('tablesHeaderId', true);
    converter.setOption('backslashEscapesHTMLTags', true);
    converter.setOption('completeHTMLDocument', true);
    html = converter.makeHtml(data);

        fs.writeFile('result3.html', html, function (err) {
        if (err) throw err;
          console.log('write Saved!');
        });
});
