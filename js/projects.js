"use strict";

$(document).ready(function () {
  // $.each(naics, function(i, d) {
  // 	$('.nacis-select-details').append('<option>' + naicList[i][1] + '</option>');
  // });
  // $.each(provinces, function(i, d) {
  // 	$('.pt-select-details').append('<option>' + provinces[i][1] + '</option>');
  // });
  // $('.nacis-select-details').append(`<option value="-1"> all</option>`);
  for (var key in naics) {
    $(".nacis-select-details").append(
      '<option value="'.concat(key, '"> ').concat(naics[key], "</option>")
    );
  } // $('.pt-select-details').append(`<option value="-1"> all</option>`);
  // $('.pt-select-details').append(`<option value="">all industrial</option>`);

  for (var _key in provinces) {
    $(".pt-select-details").append(
      '<option value="'.concat(_key, '">').concat(provinces[_key], "</option>")
    );
  }

  var erList = return_ECcodes_array();
  $.each(erList, function (i, d) {
    $(".er-select-details").append("<option>" + erList[i][2] + "</option>");
  });
  $(".vacancyRate .pt-select-details").change(function () {
    var val = $(this).val();
    console.log("----province----change  " + val);
    var erList = return_ECcodes_array();

    if (+val != 1) {
      var ecCodeList = percList[val];
      console.log(ecCodeList);
      erList = [];

      for (var _key2 in ecMap) {
        if (ecCodeList.indexOf(ecMap[_key2]) > -1) {
          erList.push(_key2);
        }
      }
    }

    $(".vacancyRate .er-select-details").html("");
    $.each(erList, function (i, d) {
      $(".vacancyRate .er-select-details").append(
        "<option>" + erList[i] + "</option>"
      );
    });
  });
  $(".marketNews .pt-select-details").change(function () {
    var val = $(this).val();
    console.log("----province----change  " + val);
    var erList = return_ECcodes_array();

    if (+val != 1) {
      var ecCodeList = percList[val];
      console.log(ecCodeList);
      erList = [];

      for (var _key3 in ecMap) {
        if (ecCodeList.indexOf(ecMap[_key3]) > -1) {
          erList.push(_key3);
        }
      }
    }

    $(".marketNews .er-select-details").html("");
    $.each(erList, function (i, d) {
      $(".marketNews .er-select-details").append(
        "<option>" + erList[i] + "</option>"
      );
    });
  });

  function getUrlParam() {
    var url = document.location.toString();
    console.log(url + "   ----------");
    var arrObj = url.split("?");
    var paramObj = {};

    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;

      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        paramObj[arr[0]] = arr[1];
      }
    }

    return paramObj;
  }

  var vectorID = "104273109";

  if (getUrlParam()) {
    vectorID = getUrlParam().vectorID; //console.log(vectorID);
  }

  $('.vacancyRate input[name="year"]').click(function () {
    $('.vacancyRate input[name="year"]').parent().removeClass("active");
    var year = $(this).val();
    var nextYear = parseInt(year) + 1;
    $(this).parent().addClass("active");
    console.log("year=" + year);
    $(".vacancyRate .startRefPeriod").val("".concat(year, "-01-01"));
    $(".vacancyRate .endReferencePeriod").val("".concat(year, "-12-31"));
  });
  $('.marketNews input[name="year"]').click(function () {
    $('.marketNews input[name="year"]').parent().removeClass("active");
    var year = $(this).val();
    var nextYear = parseInt(year) + 1;
    $(this).parent().addClass("active");
    console.log("year=" + year);
    $(".marketNews .startRefPeriod").val("".concat(year, "-01-01"));
    $(".marketNews .endReferencePeriod").val("".concat(year, "-12-31"));
  });
  $("#jbvr-industry-btn").on("click", function () {
    var naics = $(".vacancyRate .nacis-select-details").val();
    var province = $(".vacancyRate .pt-select-details").val();
    var economic_region = $(".vacancyRate .er-select-details").val();
    var startRefPeriod = $(".vacancyRate .startRefPeriod").val();
    var endReferencePeriod = $(".vacancyRate .endReferencePeriod").val();
    var data = {
      province: province,
      economic_region: economic_region,
      naics: naics,
      statistics: "4",
      startRefPeriod: startRefPeriod,
      endReferencePeriod: endReferencePeriod
    };
    console.log(data);
    data = encodeURIComponent(JSON.stringify(data));
    window.location.href = "common/com_Table_JVRbyIndustry.html?data=" + data;
  });
  $("#lmn-industry-btn").on("click", function () {
    var naics = $(".marketNews .nacis-select-details").val();
    var province = $(".marketNews .pt-select-details").val();
    var economic_region = $(".marketNews .er-select-details").val();
    var startRefPeriod = $(".marketNews .startRefPeriod").val();
    var endReferencePeriod = $(".marketNews .endReferencePeriod").val();
    var data = {
      province: province,
      economic_region: economic_region,
      naics: naics,
      startRefPeriod: startRefPeriod,
      endReferencePeriod: endReferencePeriod,
      statistics: "1"
    };
    console.log(data);
    data = encodeURIComponent(JSON.stringify(data));
    window.location.href = "common/com_Table_JVRbyIndustry.html?data=" + data;
  });
  $("#comp-jbr-btn").on("click", function () {
    var keyWord = $("#keyWord").val();
    var startdate = $("#startdate").val();
    var enddate = $("#enddate").val();
    var data = {
      startdate: startdate,
      enddate: enddate,
      keyWord: keyWord
    };
    console.log(data);
    data = encodeURIComponent(JSON.stringify(data));
    window.location.href = "common/com_LMINews.html?data=" + data;
  });
});
