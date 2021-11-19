let ptList = ['10', '11', '12', '13', '24', '35', '46', '47', '48', '59', '60', '61', '62'];
let naicsList = ['11', '21', '22', '23', '31-33', '41', '44-45', '48-49', '51', '52', '53', '54', '55', '56', '61',
	'62', '71', '72', '81', '91'
];
let ptCodeArray = return_PTcodes_array();
let erCodeArray = return_ECcodes_array();
let naicsArray = return_NAICSCodes_array();

function return_PTcodes_array() {
	let PTcode_array = [];
	$.each(ptList, function(i, d) {
		let pt = [];
		pt.push(d);
		pt.push(pruidToPTlabel(d));
		PTcode_array.push(pt);
	});
	return PTcode_array;
}

function return_NAICSCodes_array() {
	let NAICScode_array = [];
	$.each(naicsList, function(i, d) {
		let naic = [];
		naic.push(d);
		naic.push(naicCodeToNAICSLabel(d));
		NAICScode_array.push(naic);
	});
	return NAICScode_array;
}

// Returns Array of ERUIDs
function return_ECcodes_array() {
	let ERcode_array = [];
	ERcode_array = [
		[10, 1010, "Avalon Peninsula"],
		[10, 1020, "South Coast--Burin Peninsula"],
		[10, 1030, "West Coast--Northern Peninsula--Labrador"],
		[10, 1040, "Notre Dame--Central Bonavista Bay"],
		[11, 1110, "Prince Edward Island"],
		[12, 1210, "Cape Breton"],
		[12, 1220, "North Shore"],
		[12, 1230, "Annapolis Valley"],
		[12, 1240, "Southern"],
		[12, 1250, "Halifax"],
		[13, 1310, "Campbellton--Miramichi"],
		[13, 1320, "Moncton--Richibucto"],
		[13, 1330, "Saint John--St. Stephen"],
		[13, 1340, "Fredericton--Oromocto"],
		[13, 1350, "Edmundston--Woodstock"],
		[24, 2410, "Gaspésie--Îles-de-la-Madeleine"],
		[24, 2415, "Bas-Saint-Laurent"],
		[24, 2420, "Capitale-Nationale"],
		[24, 2425, "Chaudière-Appalaches"],
		[24, 2430, "Estrie"],
		[24, 2433, "Centre-du-Québec"],
		[24, 2435, "Montérégie"],
		[24, 2440, "Montréal"],
		[24, 2445, "Laval"],
		[24, 2450, "Lanaudière"],
		[24, 2455, "Laurentides"],
		[24, 2460, "Outaouais"],
		[24, 2465, "Abitibi-Témiscamingue"],
		[24, 2470, "Mauricie"],
		[24, 2475, "Saguenay--Lac-Saint-Jean"],
		[24, 2480, "Côte-Nord"],
		[24, 2490, "Nord-du-Québec"],
		[35, 3510, "Ottawa"],
		[35, 3515, "Kingston--Pembroke"],
		[35, 3520, "Muskoka--Kawarthas"],
		[35, 3530, "Toronto"],
		[35, 3540, "Kitchener--Waterloo--Barrie"],
		[35, 3550, "Hamilton--Niagara Peninsula"],
		[35, 3560, "London"],
		[35, 3570, "Windsor--Sarnia"],
		[35, 3580, "Stratford--Bruce Peninsula"],
		[35, 3590, "Northeast"],
		[35, 3595, "Northwest"],
		[46, 4610, "Southeast"],
		[46, 4620, "South Central"],
		[46, 4630, "Southwest"],
		[46, 4640, "North Central"],
		[46, 4650, "Winnipeg"],
		[46, 4660, "Interlake"],
		[46, 4670, "Parklands"],
		[46, 4680, "North"],
		[47, 4710, "Regina--Moose Mountain"],
		[47, 4720, "Swift Current--Moose Jaw"],
		[47, 4730, "Saskatoon--Biggar"],
		[47, 4740, "Yorkton--Melville"],
		[47, 4750, "Prince Albert"],
		[47, 4760, "Northern"],
		[48, 4810, "Lethbridge--Medicine Hat"],
		[48, 4820, "Camrose--Drumheller"],
		[48, 4830, "Calgary"],
		[48, 4840, "Banff--Jasper--Rocky Mountain House"],
		[48, 4850, "Red Deer"],
		[48, 4860, "Edmonton"],
		[48, 4870, "Athabasca--Grande Prairie--Peace River"],
		[48, 4880, "Wood Buffalo--Cold Lake"],
		[59, 5910, "Vancouver Island and Coast"],
		[59, 5920, "Lower Mainland--Southwest"],
		[59, 5930, "Thompson--Okanagan"],
		[59, 5940, "Kootenay"],
		[59, 5950, "Cariboo"],
		[59, 5960, "North Coast"],
		[59, 5970, "Nechako"],
		[59, 5980, "Northeast"],
		[60, 6010, "Yukon"],
		[61, 6110, "Northwest Territories"],
		[62, 6210, "Nunavut"]
	];
	return ERcode_array;
}

let erCheckList = ['1010', '1020', '1030', '1040', '1110', '1210', '1220', '1230', '1240', '1250', '1310', '1320',
	'1330', '1340', '1350', '2410', '2415', '2420', '2425', '2430', '2433', '2435', '2440', '2445', '2450', '2455',
	'2460', '2465', '2470', '2475', '2480', '2490', '3510', '3515', '3520', '3530', '3540', '3550', '3560', '3570',
	'3580', '3590', '3595', '4610', '4620', '4630', '4640', '4650', '4660', '4670', '4680', '4710', '4720', '4730',
	'4740', '4750', '4760', '4810', '4820', '4830', '4840', '4850', '4860', '4870', '4880', '5910', '5920', '5930',
	'5940', '5950', '5960', '5970', '5980', '6010', '6110', '6210'
];

let erList = {
	10: ['1010', '1020', '1030', '1040'],
	11: ['1110'],
	12: ['1210', '1220', '1230', '1240', '1250'],
	13: ['1310', '1320', '1330', '1340', '1350'],
	24: ['2410', '2415', '2420', '2425', '2430', '2433', '2435', '2440', '2445', '2450', '2455', '2460', '2465',
		'2470', '2475', '2480', '2490'
	],
	35: ['3510', '3515', '3520', '3530', '3540', '3550', '3560', '3570', '3580', '3590', '3595'],
	46: ['4610', '4620', '4630', '4640', '4650', '4660', '4670', '4680'],
	47: ['4710', '4720', '4730', '4740', '4750', '4760'],
	48: ['4810', '4820', '4830', '4840', '4850', '4860', '4870', '4880'],
	59: ['5910', '5920', '5930', '5940', '5950', '5960', '5970', '5980'],
	60: ['6010'],
	61: ['6110'],
	62: ['6210']
};

let naicsList_sub = {
	'11': ['111', '112', '113', '114', '115'],
	'21': ['211', '212', '213'],
	'22': ['221'],
	'23': ['236', '237', '238'],
	'31-33': ['311', '312', '313', '314', '315', '316', '321', '322', '323', '324', '325', '326', '327', '331',
		'332', '333', '334', '335', '336', '337', '339'
	],
	'41': ['411', '412', '413', '414', '415', '416', '417', '418', '419'],
	'44-45': ['441', '442', '443', '444', '445', '446', '447', '448', '451', '452', '453', '454'],
	'48-49': ['481', '482', '483', '484', '485', '486', '487', '488', '491', '492', '493'],
	'51': ['511', '512', '515', '517', '518', '519'],
	'52': ['521', '522', '523', '524', '526', ],
	'53': ['531', '532', '533'],
	'54': ['541'],
	'55': ['551'],
	'56': ['561', '562'],
	'61': ['611'],
	'62': ['621', '622', '623', '624'],
	'71': ['711', '712', '713'],
	'72': ['721', '722'],
	'81': ['811', '812', '813', '814'],
	'91': ['911', '912', '913', '914', '919']
};

function getJobEventLabel(je) {
	if (lmixLang != 'fr') {
		switch (je) {
			case '1':
				return 'Job Creation';
			case '2':
				return 'Layoff';
			case '3':
				return 'Other';
			case '4':
				return 'Construction';
			case '5':
				return 'Investment';
			default:
				return 'Other';
				// default: return 'N/A'
		}
	} else {
		switch (je) {
			case '1':
				return 'Création d\'emplois';
			case '2':
				return 'Mise à pied';
			case '3':
				return 'Autre type d\'événement';
			case '4':
				return 'Construction';
			case '5':
				return 'Investissement';
			default:
				return 'Autre type d\'événement';
				// default: return 'N/A'
		}
	}
}

function naicCodeToNAICSLabel(naic) {
	switch (naic) {
		case '11':
			return 'Agriculture, forestry, fishing and hunting';
		case '21':
			return 'Mining, quarrying, and oil and gas extraction';
		case '22':
			return 'Utilities';
		case '23':
			return 'Construction';
		case '31':
		case '32':
		case '33':
		case '31-33':
			return 'Manufacturing';
		case '41':
			return 'Wholesale trade';
		case '44':
		case '45':
		case '44-45':
			return 'Retail trade';
		case '48':
		case '49':
		case '48-49':
			return 'Transportation and warehousing';
		case '51':
			return 'Information and cultural industries';
		case '52':
			return 'Finance and insurance';
		case '53':
			return 'Real estate and rental and leasing';
		case '54':
			return 'Professional, scientific and technical services';
		case '55':
			return 'Management of companies and enterprises';
		case '56':
			return 'Administrative and support, waste management and remediation services';
		case '61':
			return 'Educational services';
		case '62':
			return 'Health care and social assistance';
		case '71':
			return 'Arts, entertainment and recreation';
		case '72':
			return 'Accommodation and food services';
		case '81':
			return 'Other services (except public administration)';
		case '91':
			return 'Public administration';
		default:
			return 'letious';
	}
}

$(document).on({
	'lity:ready': function(event, lightbox) {
		$('body').css('overflow', 'hidden');
		if (event.target.firstChild.localName == 'iframe') {
			jQuery(event.currentTarget.activeElement).find('.lity-iframe-container > iframe').attr('title',
				lightbox.opener().data('title'));
		}
	},
	'lity:close': function(e) {
		$('body').css('overflow', 'visible');
	}
});



function closeLity() {
	$('.lity-opened > [data-lity-close]').click();
}


// jump to a section when opening a lightbox if it has data-section ------------
$(document).on('lity:ready', function(event, instance) {
	let anchor;
	if (typeof instance.opener()[0] != "undefined") {
		if (typeof instance.opener()[0].dataset.section != "undefined") {
			if (pageTopic == 'occupations') {
				$('#noc-regulation-modal-content details').attr('open', false);
				let oldID = instance.opener()[0].dataset.section;
				let oldIDArray = instance.opener()[0].dataset.section.split('-');
				let newID = oldIDArray[0] + '-' + oldIDArray[1];
				$(newID).attr('open', true);
				$(oldID).attr('open', true);
				anchor = '' + instance.opener()[0].dataset.section;
			} else {
				anchor = '' + instance.opener()[0].dataset.section;
			}
			$(anchor)[0].scrollIntoView();
		}
	}
	if (anchor) {
		$(anchor).focus();
	}
});

// Province data transform functions -------------------------------------------
function pruidToProvCode(pruid) {
	switch (pruid) {
		case "10":
			return 'NL';
		case "11":
			return 'PE';
		case "12":
			return 'NS';
		case "13":
			return 'NB';
		case "24":
			return 'QC';
		case "35":
			return 'ON';
		case "46":
			return 'MB';
		case "47":
			return 'SK';
		case "48":
			return 'AB';
		case "59":
			return 'BC';
		case "60":
			return 'YT';
		case "61":
			return 'NT';
		case "62":
			return 'NU';
		default:
			return 'ON';
	}
}

function provCodeToPTlabel(provCode) {
	switch (provCode) {
		case "NL":
			return 'Newfoundland and Labrador';
		case "PE":
			return 'Prince Edward Island';
		case "NS":
			return 'Nova Scotia';
		case "NB":
			return 'New Brunswick';
		case "QC":
			return 'Québec';
		case "ON":
			return 'Ontario';
		case "MB":
			return 'Manitoba';
		case "SK":
			return 'Saskatchewan';
		case "AB":
			return 'Alberta';
		case "BC":
			return 'British Columbia';
		case "YT":
			return 'Yukon';
		case "NT":
			return 'Northwest Territories';
		case "NU":
			return 'Nunavut';
		default:
			return 'Ontario';
	}
}

function ptLabeltoProvCode(ptLabel, defaultValue) {
	switch (ptLabel) {
		case 'Terre-Neuve-et-Labrador':
		case 'Newfoundland and Labrador':
			return 'NL';
		case 'Île-du-Prince-Édouard':
		case 'Prince Edward Island':
			return 'PE';
		case 'Nouvelle-Écosse':
		case 'Nova Scotia':
			return 'NS';
		case 'Nouveau-Brunswick':
		case 'New Brunswick':
			return 'NB';
		case 'Québec':
		case 'Quebec':
			return 'QC';
		case 'Ontario':
			return 'ON';
		case 'Manitoba':
			return 'MB';
		case 'Saskatchewan':
			return 'SK';
		case 'Alberta':
			return 'AB';
		case 'Colombie-Britannique':
		case 'BC':
		case 'C.-B.':
		case 'British Columbia':
			return 'BC';
		case 'Yukon':
			return 'YK';
		case 'Territoires du Nord-Ouest':
		case 'Northwest Territories':
			return 'NT';
		case 'Nunavut':
			return 'NU';
		default:
			return (defaultValue || 'CA');
	}
}

function provCodeToPruid(provCode, defaultValue) {
	switch (provCode) {
		case "NL":
			return '10';
		case "PE":
			return '11';
		case "NS":
			return '12';
		case "NB":
			return '13';
		case "QC":
			return '24';
		case "ON":
			return '35';
		case "MB":
			return '46';
		case "SK":
			return '47';
		case "AB":
			return '48';
		case "BC":
			return '59';
		case "YT":
			return '60';
		case "NT":
			return '61';
		case "NU":
			return '62';
		default:
			return (defaultValue || pageERname);
	}
}

function pruidToPTlabel(pruid, defaultValue) {
	switch (pruid) {
		case "10":
			return 'Newfoundland and Labrador';
		case "11":
		case "1110":
			return 'Prince Edward Island';
		case "12":
			return 'Nova Scotia';
		case "13":
			return 'New Brunswick';
		case "24":
			return 'Québec';
		case "35":
			return 'Ontario';
		case "46":
			return 'Manitoba';
		case "47":
			return 'Saskatchewan';
		case "48":
			return 'Alberta';
		case "59":
			return 'British Columbia';
		case "60":
		case "6010":
			return 'Yukon';
		case "61":
		case "6110":
			return 'Northwest Territories';
		case "62":
		case "6210":
			return 'Nunavut';
		default:
			return defaultValue || false;
	}
}
