// var tableToExcel = (function () {
//   var uri = "data:application/vnd.ms-excel;base64,";

//   var template =
//     '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';

//   var base64 = function (s) {
//     return window.btoa(unescape(encodeURIComponent(s)));
//   };

//   var format = function (s, c) {
//     return s.replace(/{(\w+)}/g, function (m, p) {
//       return c[p];
//     });
//   };

//   return function (table, name) {
//     if (!table.nodeType) table = document.getElementById(table);
//     var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
//     const downloadLink = document.createElement("a");
//     const fileName = "file.xls";

//     downloadLink.href = uri + base64(format(template, ctx));
//     downloadLink.download = fileName;
//     downloadLink.click();

//     // window.location.href = uri + base64(format(template, ctx));
//   };
// })();

function tableToExcel() {
  var csv_data = [];

  var rows = document.getElementById("table").getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    var cols = rows[i].querySelectorAll("td,th");
    var csvrow = [];
    for (var j = 0; j < cols.length; j++) {
      csvrow.push(cols[j].innerHTML);
    }

    csv_data.push(csvrow.join(","));
  }

  csv_data = csv_data.join("\n");
  console.log(csv_data);

  const CSVFile = new Blob([csv_data], {
    type: "application/octet-stream",
  });

  const downloadLink = document.createElement("a");
  downloadLink.href = window.URL.createObjectURL(CSVFile);
  downloadLink.download = "file.xls";
  downloadLink.click();
}
