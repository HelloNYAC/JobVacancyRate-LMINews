// const output = document.querySelector('.output');
// let url = 'https://docs.google.com/spreadsheets/d/19mFhYjuQePkuvqN2u9vyfHcGGd8-naGskga8nt1QL8I/gviz/tq?';
// const query = encodeURIComponent('Select J where A contains 2021');

// url = url + '&tq=' + query;
// //const endpoint1 = `${url}${ssid}${query1}${query2}`;
// console.log(url);

// output.textContent = url;

// fetch(url)
// 	.then(res => res.text())
// 	.then(rep => {
// 		//console.log(data);
// 		const data = JSON.parse(rep.substr(47).slice(0, -2));
// 		console.log(data);
// 		const row = document.createElement('tr');
// 		output.append(row);
// 		data.table.cols.forEach((heading) => {
// 			//console.log(heading);  
// 			const cell = document.createElement('td');
// 			cell.textContent = heading.label;
// 			row.append(cell);
// 		})


// 		//const fs = require('vectors.json');

// 		const saveData = (vectors) => {
// 			const finished = (error) => {
// 				if (error) {
// 					console.error(error);
// 					return;
// 				}
// 			}
// 			let obj = {
// 				table: []
// 			};
// 			obj.table.push({
// 				vectors
// 			});
// 			let json = JSON.stringify(obj);
// 			let fs = require('./vectors.json');
// 			fs.writeFile('vectors.json', json, 'utf8', callback);

// 			// const jsonData = JSON.stringify(vectors);
// 			// fs.writeFile('vectors.json', jsonData, finished);
// 		}

// 		data.table.rows.forEach((main) => {
// 			//console.log(heading);  
// 			const container = document.createElement('tr');
// 			output.append(container);
// 			//console.log(main.c);
// 			main.c.forEach((elem) => {
// 				const cell = document.createElement('td');
// 				if (elem !== null) {
// 					cell.textContent = elem.v.substr(1);
// 					// console.log(cell.textContent);
// 				} else {
// 					cell.textContent = null;
// 				}
// 				container.append(cell);
// 				saveData(cell);
// 			})
// 		})

// 	});

let url = 'https://docs.google.com/spreadsheets/d/19mFhYjuQePkuvqN2u9vyfHcGGd8-naGskga8nt1QL8I/gviz/tq?';
const query = encodeURIComponent('Select J where A contains 2021');

url = url + '&tq=' + query
search(url)

function search(url){
	var res = localStorage.getItem(query)
	if (res) {
		convertAndRender(res);
	} else {
		$.get(url, function(res) {
			localStorage.setItem(query,res);
			convertAndRender(res);
		})
	}
}

function convertAndRender(res){
	var dataStr = res.substr(res.indexOf('({') + 1).replace(');', '');
	var data = JSON.parse(dataStr);
	var vectors = data.table.rows.map(row => {
		return row.c[0].v.substr(1);
	});
	console.log(vectors);
	var template = "<div>_v</div>";
	$('.flex').html('');
	vectors.forEach(v => {
		$('.flex').append(template.replace('_v', v));
	});
	
	$('.flex div').click(function() {
		var vectorID = $(this).html().trim();
		console.log('click:' + vectorID);
		location.href = '../projects.html?vectorID='+vectorID;
	})
}
