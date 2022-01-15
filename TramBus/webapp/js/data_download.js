function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'TramBus_data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
};

function parseJSONToCSVStr(jsonData) {
    if(jsonData.length == 0) {
        return '';
    }

    let keys = Object.keys(jsonData[0]);

    let columnDelimiter = ',';
    let lineDelimiter = '\n';

    let csvColumnHeader = keys.join(columnDelimiter);
    let csvStr = csvColumnHeader + lineDelimiter;

    jsonData.forEach(item => {
        keys.forEach((key, index) => {
            if( (index > 0) && (index < keys.length-1) ) {
                csvStr += columnDelimiter;
            }
            csvStr += item[key];
        });
        csvStr += lineDelimiter;
    });

    return encodeURIComponent(csvStr);;
};

function exportToCsvFile(jsonData) {
    let csvStr = parseJSONToCSVStr(jsonData);
    let dataUri = 'data:text/csv;charset=utf-8,'+ csvStr;

    let exportFileDefaultName = 'data.csv';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
};

//DOM elements
let download_button = document.getElementById("download_button_data");
let select_button = document.getElementById("select_button_data");

//DOM elements values
let download_type = select_button.value; //By default

select_button.oninput = function(){
	download_type = this.value;
};

download_button.onclick = function(){
	console.log("Generating file for download...");
	let json_data = "";
	_last_rt_tramways_1.forEach(element =>{
		json_data+=JSON.stringify(element);
	});
	_last_rt_tramways_2.forEach(element=>{
		json_data+=JSON.stringify(element);
	});
	if(download_type=='json'){
		exportToJsonFile(json_data);
	}
	else if(download_type=='csv'){
		exportToCsvFile(json_data);
	}
};	
