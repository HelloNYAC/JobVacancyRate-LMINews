$(document).ready(function() {

	$.get("com_header.html", function(data) {
		$("#page_header").replaceWith(data);
	});

	$.get("com_social.html", function(data) {
		$("#social_placeholder").replaceWith(data);
	});

	$.get("com_footer.html", function(data) {
		$("#page_footer").replaceWith(data);
	});

	$.get("com_navbar.html", function(data) {
		$("#nav-placeholder").replaceWith(data);
	});

	const $productId = 14100326;

	$.ajax({
		url: 'https://statcan-web-data-service-statcan.api.canada.ca/v1/getCubeMetadata',
		method: 'POST',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify([{
			"productId": $productId
		}]),
		beforeSend: function(request) {
			request.setRequestHeader("user_key", "8d876c0e71f1468164d21a9acca7c1c1");
			request.setRequestHeader("Access-Control-Allow-Origin", "*");
		},
		success: function(response) {
			console.log(response);
		}
	})

	const $vector = 104279672;
	const $latestN = 3;

	$.ajax({
		url: 'https://statcan-web-data-service-statcan.api.canada.ca/v1/getDataFromVectorsAndLatestNPeriods',
		method: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify([{
			"vectorId": $vector,
			"latestN": $latestN
		}]),
		beforeSend: function(request) {
			request.setRequestHeader("user_key", "8d876c0e71f1468164d21a9acca7c1c1");
			request.setRequestHeader("Access-Control-Allow-Origin", "*");
		},
		success: function(response) {
			console.log(response);
		}
	});


})
