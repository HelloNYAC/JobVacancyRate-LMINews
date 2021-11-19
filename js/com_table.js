var avgRCountryArray = []
var avgCountryArray = []
var coordinateFlag = ''

function updateCountryAvg(coordinate) {
    var vectorID = (vectorIDMap[coordinate] || '').replace('v', '')
    getDataFromVectorByReferencePeriodRange(vectorID, '2014-01-01', '2030-01-01', function(res) {
        if (coordinate.endsWith('4')) {
            avgRCountryArray = res[0].object.vectorDataPoint.map(d => {
                return {
                    refPer: d.refPer,
                    value: d.value
                }
            })
            console.log('-----avgRCountryArray----' + coordinate)
            console.log(avgRCountryArray)
            localStorage.setItem("avgRCountryArray", JSON.stringify(avgRCountryArray))
        } else {
            avgCountryArray = res[0].object.vectorDataPoint.map(d => {
                return {
                    refPer: d.refPer,
                    value: d.value
                }
            })
            console.log('-----avgCountryArray----' + coordinate)
            console.log(avgCountryArray)
            localStorage.setItem("avgCountryArray", JSON.stringify(avgCountryArray))
        }
        // console.log(JSON.parse(localStorage.getItem("avgRCountryArray")))
    })
}

function updateProvinceAvg(coordinate) {
    var vectorID = (vectorIDMap[coordinate] || '').replace('v', '')
    getDataFromVectorByReferencePeriodRange(vectorID, '2014-01-01', '2030-01-01', function(res) {
        if (coordinate.endsWith('4')) {
            var updateRProvinceAvg = res[0].object.vectorDataPoint.map(d => {
                return {
                    refPer: d.refPer,
                    value: d.value
                }
            })
            console.log('-----updateRProvinceAvg----' + coordinate)
            console.log(updateRProvinceAvg)
            localStorage.setItem("updateRProvinceAvg", JSON.stringify(updateRProvinceAvg))
        } else {
            var updateProvinceAvg = res[0].object.vectorDataPoint.map(d => {
                return {
                    refPer: d.refPer,
                    value: d.value
                }
            })
            console.log('-----updateProvinceAvg----' + coordinate)
            console.log(updateProvinceAvg)
            localStorage.setItem("updateProvinceAvg", JSON.stringify(updateProvinceAvg))
        }
        // console.log(JSON.parse(localStorage.getItem("avgRCountryArray")))
    })
}

$(function() {
    let data = ''
    if (getUrlParam()) {
        data = getUrlParam().data
        data = decodeURIComponent(data)
        data = JSON.parse(data)
        // console.log(data)
    }



    const productId = 14100326


    var economic_region = data.economic_region
    var statisticsVal = statistics[data.statistics]

    var coordinate = `${data.province}.${data.naics}.${data.statistics}.0.0.0.0.0.0.0`
    if (data.province == 1 || data.naics == 1) {
        coordinate = `${data.province}.${data.naics}.${data.statistics}`
    }
    coordinateFlag = `1.1.${data.statistics}`
    updateCountryAvg(`1.1.${data.statistics}`)
    updateProvinceAvg(`${data.province}.1.${data.statistics}`)
    var geo = data.province == -1 ? 'all' : provinces[data.province]
    var naicsVal = data.naics == -1 ? 'all' : naics[data.naics]
    var vectorIdKey = `${data.province}.${data.naics}.${data.statistics}`
    var vectorID = (vectorIDMap[vectorIdKey] || '').replace('v', '')
    var startRefPeriod = data.startRefPeriod || ''
    var endReferencePeriod = data.endReferencePeriod || ''

    console.log(
        `vectorID= ${vectorID} , statistics= ${statisticsVal} , coordinate=${coordinate}  , geo= ${geo}  ,  naicsVal= ${naicsVal}`
    )

    $('#Province').html('Province:' + geo)
    $('#Statistics').html('Statistics:' + statisticsVal)
    $('#NAICS').html('NAICS:' + naicsVal)

    getDataFromVectorByReferencePeriodRange(vectorID, startRefPeriod, endReferencePeriod, function(res) {
        console.log('-----getDataFromVectorByReferencePeriodRange----')
        console.log(res)
        renderTable(res[0].object.vectorDataPoint)
    }, function() {
        $('#msgDiv').html('There is no data available to display for your search')
        $('#msgDiv').css('font-size', '16px')
    })

    // var params = []
    // var keys = ['province', 'naics', 'economic_region']
    // for (key in data) {
    // 	if (keys.indexOf(key) > -1 && data[key]) {
    // 		params.push(`${key}=*${encodeURIComponent(data[key])}*`)
    // 	}
    // }
    var paramStr = ''
    if (ecMap[economic_region]) {
        paramStr += `&economic_region=*${ecMap[economic_region]}*`
    }
    if (naicsMap[naicsVal]) {
        paramStr += `&naics=*${naicsMap[naicsVal]}*`
    }
    if (geo) {
        paramStr += `&province=*${ptLabeltoProvCode(geo,'')}*`
    }
    paramStr += "&from_date.gt=" + (startRefPeriod || '2021-01-01')
    console.log('--------paramStr--------')
    console.log(paramStr)
    getNews(paramStr, function(res) {
        console.log('----------news--------')
        console.log(res)
        if (res.data && res.data.length > 0) {
            renderNews(res.data)
        } else {
            paramStr = ''
            if (naicsMap[naicsVal]) {
                paramStr += `&naics=*${naicsMap[naicsVal]}*`
            }
            if (geo) {
                paramStr += `&province=*${ptLabeltoProvCode(geo,'')}*`
            }
            getNews(paramStr, function(res) {
                console.log('----------news--------')
                console.log(res)
                if (res.data && res.data.length > 0) {
                    renderNews(res.data)
                } else {
                    $('.newsDiv').html('There is no data available according to your search criterias. Please try again.');
                }
            })

        }
    })
})


function getVectorIds(data) {
    var naics = data.naics
    var province = data.province
    province = province == -1 ? '\\d+' : province
    naics = naics == -1 ? '\\d+' : naics
    var pattern = new RegExp(`${province}\.${naics}\.${data.statistics}`)

    var vectorIDs = []
    for (let key in pjv) {
        if (pattern.test(key)) {
            vectorIDs.push(pjv[key])
        }
    }
    console.log(vectorIDs.length)
    return vectorIDs
}

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

function renderTable(data) {
    data = data || []
    var avgRCountryArray = JSON.parse(localStorage.getItem("avgRCountryArray") || "[]")
    var avgCountryArray = JSON.parse(localStorage.getItem("avgCountryArray") || "[]")
    var avgArray = coordinateFlag.endsWith('4') ? avgRCountryArray : avgCountryArray

    var updateRProvinceAvg = JSON.parse(localStorage.getItem("updateRProvinceAvg") || "[]")
    var updateProvinceAvg = JSON.parse(localStorage.getItem("updateProvinceAvg") || "[]")
    var avgArray2 = coordinateFlag.endsWith('4') ? updateRProvinceAvg : updateProvinceAvg
    $('#jvrbyindustry').bootstrapTable('destroy').bootstrapTable({
        columns: [{
                field: 'refPer',
                title: 'Reference Period'
            },
            {
                field: 'frequencyCode',
                title: 'Data Frequency',
                formatter: function(value, row, index) {
                    var tt = frequency.find(s => +s.frequencyCode == +value)
                    if (tt) return tt.frequencyDescEn
                    return value
                }
            },
            // {
            // 	field: 'securityLevelCode',
            // 	title: 'securityLevelCode'
            // },
            {
                field: 'value',
                title: 'Data Value'
            },
            {
                field: '-',
                title: 'Average Value of All Industry',
                width:'200px',
                formatter: function(value, row, index) {

                    var tt = avgArray2.find(s => s.refPer == row.refPer)
                    if (tt) return tt.value
                    return value
                }
            },
            {
                field: '-',
                title: 'Average Value of Across the Country',
                width:'200px',
                formatter: function(value, row, index) {

                    var tt = avgArray.find(s => s.refPer == row.refPer)
                    if (tt) return tt.value
                    return value
                }
            },
            // {
            //     field: 'scalarFactorCode',
            //     title: 'scalarFactor',
            //     formatter: function(value, row, index) {
            //         var tt = scalar.find(s => +s.scalarFactorCode == +value)
            //         if (tt) return tt.scalarFactorDescEn
            //         return value
            //     }
            // },
            // {
            // 	field: 'releaseTime',
            // 	title: 'releaseTime',
            // 	formatter: function(value, row, index) {
            // 		return value.replace("T", " ");
            // 	}

            // },
            // {
            // 	field: 'statusCode',
            // 	title: 'status',
            // 	formatter: function(value, row, index) {
            // 		var tt = statusV.find(s => +s.statusCode == +value)
            // 		if (tt) return tt.statusDescEn
            // 		return value
            // 	}
            // },

        ],
        data: data.reverse(),
        dataType: 'json',
        data_locale: "zh-US",
        formatLoadingMessage: function() {
            return ' ';
        }
    });

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

function getDataFromVectorByReferencePeriodRange(vectorId, startRefPeriod, endReferencePeriod, cbFunction,
    erFunction) {
    startRefPeriod = startRefPeriod || '2020-01-01'
    endReferencePeriod = endReferencePeriod || '2022-01-01'
    var url =
        `https://www150.statcan.gc.ca/t1/wds/rest/getDataFromVectorByReferencePeriodRange?vectorIds=${vectorId}&startRefPeriod=${startRefPeriod}&endReferencePeriod=${endReferencePeriod}`
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (cbFunction) {
                cbFunction(response)
            }
        },
        error: function() {
            if (erFunction) {
                erFunction()
            }
        }
    })
}

function getBulkVectorDataByRange(vectorIds, startDataPointReleaseDate, endDataPointReleaseDate, cbFunction) {
    startDataPointReleaseDate = startDataPointReleaseDate || '2020-01-01'
    endDataPointReleaseDate = endDataPointReleaseDate || '2022-01-01'

    startDataPointReleaseDate = startDataPointReleaseDate + "T08:30"
    endDataPointReleaseDate = endDataPointReleaseDate + "T19:00"

    var url =
        `https://www150.statcan.gc.ca/t1/wds/rest/getBulkVectorDataByRange`
    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "vectorIds": vectorIds,
            "startDataPointReleaseDate": startDataPointReleaseDate,
            "endDataPointReleaseDate": endDataPointReleaseDate,
        }),
        success: function(response) {
            if (cbFunction) {
                cbFunction(response)
            }
        }
    })
}

console.log('________________________');
function getNews(params, cbFunction) {
    let url =
        'https://lmi-news-esdc-edsc-apicast-production.api.canada.ca/clmix-wsx/gcapis/news/data?wildcards=true&sort=-publish_date'
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
