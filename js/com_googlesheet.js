let url = 'https://docs.google.com/spreadsheets/d/19mFhYjuQePkuvqN2u9vyfHcGGd8-naGskga8nt1QL8I/gviz/tq?';
const query = encodeURIComponent("Select A,B,L where B matches 'Canada'  and D matches 'Total, all industries' and E matches 'Job vacancies'");

url = url + '&tq=' + query;
search(url);


function search(url) {
    var res = localStorage.getItem(query);
    if (res) {
        convertAndRender(res);
    } else {
        $.get(url, function(res) {
            localStorage.setItem(query, res);
            convertAndRender(res);
        })
    }

    // $.get(url, function(res) {
    // 	localStorage.setItem(query,res)
    // 	convertAndRender(res)
    // })

}

function convertAndRender(res) {
    var dataStr = res.substr(res.indexOf('({') + 1).replace(');', '')
    var data = JSON.parse(dataStr)
    debugger
    const {
        cols,
        rows
    } = data.table;
    
    console.log(rows);
    const rowDatas = [];
    let columns = [];
    for (let j = 0; j < cols.length; j++) {
        const key = cols[j].label
        columns.push({
            field: key,
            title: key
        })
        console.log(key+'  '+cols[j].type)
    };

    for (let i = 0; i < rows.length; i++) {
        const obj = {};
        const row = rows[i];
        for (let j = 0; j < cols.length; j++) {
            const key = cols[j].label;
            let val = '';
            if (row.c && row.c[j]) {
                val = row.c[j].f||row.c[j].v
            }
            obj[key] = val;
        }
        rowDatas.push(obj);
    }
    console.log(rowDatas);
    $('#jvrbyindustry').bootstrapTable({
        columns: columns,
        data: rowDatas
    })
}