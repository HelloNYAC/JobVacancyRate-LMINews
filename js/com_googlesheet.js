"use strict";

var url =
  "https://docs.google.com/spreadsheets/d/19mFhYjuQePkuvqN2u9vyfHcGGd8-naGskga8nt1QL8I/gviz/tq?";
var query = encodeURIComponent(
  "Select A,B,L where B matches 'Canada'  and D matches 'Total, all industries' and E matches 'Job vacancies'"
);
url = url + "&tq=" + query;
search(url);

function search(url) {
  var res = localStorage.getItem(query);

  if (res) {
    convertAndRender(res);
  } else {
    $.get(url, function (res) {
      localStorage.setItem(query, res);
      convertAndRender(res);
    });
  } // $.get(url, function(res) {
  // 	localStorage.setItem(query,res)
  // 	convertAndRender(res)
  // })
}

function convertAndRender(res) {
  var dataStr = res.substr(res.indexOf("({") + 1).replace(");", "");
  var data = JSON.parse(dataStr);
  debugger;
  var _data$table = data.table,
    cols = _data$table.cols,
    rows = _data$table.rows;
  console.log(rows);
  var rowDatas = [];
  var columns = [];

  for (var j = 0; j < cols.length; j++) {
    var key = cols[j].label;
    columns.push({
      field: key,
      title: key
    });
    console.log(key + "  " + cols[j].type);
  }

  for (var i = 0; i < rows.length; i++) {
    var obj = {};
    var row = rows[i];

    for (var _j = 0; _j < cols.length; _j++) {
      var _key = cols[_j].label;
      var val = "";

      if (row.c && row.c[_j]) {
        val = row.c[_j].f || row.c[_j].v;
      }

      obj[_key] = val;
    }

    rowDatas.push(obj);
  }

  console.log(rowDatas);
  $("#jvrbyindustry").bootstrapTable({
    columns: columns,
    data: rowDatas
  });
}
