(function() {

	var app = angular.module('myApp', []);
	app.controller('MyController', ['$scope', myController]);

	var excelJsonObj = [];

	function myController($scope) {
		$scope.uploadExcel = function() {
			var myFile = document.getElementById('file');
			var input = myFile;
			var reader = new FileReader();
			reader.onload = function() {
				var fileData = reader.result;
				var workbook = XLSX.read(fileData, {
					type: 'binary'
				});
				workbook.SheetNames.forEach(function(sheetName) {
					var rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[
					sheetName]);
					excelJsonObj = rowObject;
				});
				for (var i = 0; i < excelJsonObj.length; i++) {
					var data = excelJsonObj[i];
					$('#myTable tbody:last-child').append("<tr><td>" + data.REF_DATE + "</td><td>" + data
						.GEO + "</td><td>" + data.DGUID + "</td><td>" + data.NAICS + "</td><td>" + data
						.STATUS + "</td><td>" + data.UOM + "</td><td>" + data.UOM_ID + "</td><td>" +
						data.SCALAR_FACTOR + "</td><td>" + data.SCALAR_ID + "</td><td>" + data.VECTOR +
						"</td><td>" + data.COORDINATE + "</td><td>" + data.VALUE + "</td><td>" + data
						.STATUS + "</td><td>" + data.SYMBOL + "</td><td>" + data.TERMINATED +
						"</td><td>" + data.DECIMALS + "</td></tr>");
				}
			};

			reader.readAsBinaryString(input.files[0]);

		};
	}

})();
