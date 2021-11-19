$(function() {
	let data = ''
	if (getUrlParam()) {
		data = getUrlParam().data
		data = decodeURIComponent(data)
		data = JSON.parse(data)
		// console.log(data)
	}
	const productId = 14100326



	var startdate= data.startdate||'2021-01-01'
	var enddate= data.enddate||'2021-11-01'
	var keyWord= data.keyWord

	
	var paramStr = "&from_date.gt="+(startdate||'2021-01-01')
	paramStr+="&from_date.lt="+(enddate||'2021-11-01')
	if(keyWord){
		paramStr +="&title_en=*"+keyWord+"*"
	}
	console.log('--------paramStr--------')
	console.log(paramStr)
	getNews(paramStr, function(res) {
		console.log('----------news--------')
		console.log(res)
		var data = res.data
		// .filter(n=>{
		// 	var pdate = n.publish_date.split(' ')[0]
		// 	return pdate < enddate
		// })
		if(data&&data.length>0){
			renderNews(data)
		}else{
			$('.newsDiv').html('There is no Data matching your search result. Please go back and select different search cretias!!')
		}
		
	})
})



function renderNews(data) {
	var template = '<div style="padding:10px" class="new shadow-blur" id="news"><a href="_href" target="blank">' +
		'<h3> _title_fr</h3>' +
		// '<p>link_fr:_link_fr</p>' +
		'<p>analyst:_analyst</p>' +
		'<p>province:_province</p>' +
		'<p>economic_region:_economic_region</p>' +
		'<p>naics: _naics</p>' +
		'<p>publish_date: _publish_date</p>' +
		'</a></div>'

	$('.newsDiv').html('')

	data = data.sort(function(b, a) {
		var x = a.publish_date
		var y = b.publish_date
		if (x < y) {
			return -1;
		}
		if (x > y) {
			return 1;
		}
		return 0;
	});

	data.forEach(d => {
		let news = template.replace('_title_fr', d.title_en || d.title_fr)
			.replace('_link_fr', d.link_fr)
			.replace('_href', d.link_en || d.link_fr)
			.replace('_analyst', d.analyst)
			.replace('_province', d.province)
			.replace('_economic_region', d.economic_region)
			.replace('_naics', d.naics)
			.replace('_publish_date', d.publish_date)

		$('.newsDiv').append(news)
	})
}

function getUrlParam() {
	var url = document.location.toString();
	var arrObj = url.split("?");
	var paramObj = {}
	if (arrObj.length > 1) {
		var arrPara = arrObj[1].split("&");
		var arr;

		for (var i = 0; i < arrPara.length; i++) {
			arr = arrPara[i].split("=");
			paramObj[arr[0]] = arr[1]

		}
	}
	return paramObj
}


function getNews(params, cbFunction) {
	let url = 'https://lmi-news-esdc-edsc-apicast-production.api.canada.ca/clmix-wsx/gcapis/news/data?wildcards=true'
	if (params) {
		url = `${url}${params}`
	}
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		success: function(response) {
			if (cbFunction) {
				cbFunction(response)
			}
		},
		//error: errorHandle,
		beforeSend: function(request) {
			request.setRequestHeader('user-key', "ac27f6380a63b0901847bdfb036597e9");
		}
	})
}
