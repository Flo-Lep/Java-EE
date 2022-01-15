class DataScientistChart{
   /*Data format :
        canva_id : String - id of the HTML canva
		type : String - type of chart (bar, line, ...) 
		title : String - title of the chart
		labels : Array - X.Axis values - Ex : ["label1","label2","label3"]
        datasets : Array - Y.Axis values - Ex : [{label: 'Station 1',data: ["1","2","3","4","5"],borderColor: "#ff0000",backgroundColor: "#ff0000",}]
        config : JSON - contains the graph configuration
        data : JSON - contains the graph data including datasets
        ctx : DOM - links js object to the HTML canva  
        chart : Chart - chart object
	*/
    constructor(newCanvaId, newType, newTitle, newLabels){
        this.canvaId = newCanvaId;
        this.type = newType;
        this.title = newTitle;
        this.labels = newLabels;
        this.datasets = [];
        this.data = {
            labels: this.labels,
            datasets: this.datasets,
        };
        this.config = {
            type: this.type,
            data: this.data,
            options: {
              indexAxis: 'x',
              elements: {
                bar: {
                  borderWidth: 2,
                }
              },
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: true,
                  text: this.title,
                }
              }
            },
        };
        this.ctx = document.getElementById(this.canvaId).getContext('2d');
        this.chart = new Chart(this.ctx, this.config);
		this.chart.update();
    }

    addDatasets(newDatasets){
		newDatasets.forEach(dataset=>{
			this.datasets.push(dataset);
		});
    }

	clearDatasets(){
		this.datasets = [];
	}

    formatTramwaysDataset(tramwayStations, rtTramways){
        let datasests = [];
        tramwayStations.forEach(station=>{
            let newDataset = {}
            newDataset.label = station.fields.stop_name;
            newDataset.data = ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"];
            rtTramways.forEach(tramway=>{
                if(tramway.fields.nomarret==newDataset.label){
                    if(tramway.fields.ecart>60 || tramway.fields.ecart<-60){
                        var time = new Date(tramway.fields.harret);
                        let string_time = time.toLocaleTimeString();
                        let index = parseInt(string_time);
                        newDataset.data[index] = tramway.fields.ecart/60;
                    }
                }
            });
			let color = this.getStationColor(newDataset.label);
            newDataset.borderColor = color;
            newDataset.backgroundColor = color;
            datasests.push(newDataset);
        });
        return datasests;
    }

    formatBusesDataset(busesStations){
        let datasests = [];
        busesStations.forEach(station=>{
            let newDataset = {}
            newDataset.label = station.name;
            newDataset.data = "";
            newDataset.borderColor = "#000000";
            newDataset.backgroundColor = "000000";
            datasests.push(newDataset);
        });
        return datasests;
    }

    getTestingDatasets(){
        let datasets = [
            {
                label: 'Station 1',
                data: ["1","2","3","4","5"],
                borderColor: "#ff0000",
                backgroundColor: "#ff0000",
            },
            {
                label: 'Station 2',
                data: ["-10","-2","30","40","50"],
                borderColor: "#0000ff",
                backgroundColor: "#0000ff",
            }
        ];
        return datasets;
    }

	setDisplayedInterval(range, start_time, update){
		if(update){
			this.labels = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
		}
		if(range==24){
			return 0;
		}
		else if(this.labels.length>range){
			let time_to_start = parseInt(start_time);
			//Update labels
			let newLabels = this.labels.splice(time_to_start,range);
			this.labels = newLabels;
			//update data
			this.datasets.forEach(dataset=>{
				let newData = dataset.data.splice(time_to_start, range);
				dataset.data = newData;
			});
		}
	}
	
	updateChart(){
		this.chart.data.labels = this.labels;
		this.chart.data.datasets = this.datasets;
		this.chart.update();
	}
	
	logChartInfo(){
		console.log("this.chart", this.chart);
		console.log("this.datasets", this.datasets)
		console.log("this.labels", this.labels);
		/*console.log("this.labels", this.labels);
		console.log("this.datasets", this.datasets);
		console.log("chart labels", this.chart.data.labels);
		console.log("chart datasets", this.chart.data.datasets);*/
	}

    getAverageDelay(delaysList){
        let average = 0;
        delaysList.forEach(time=>{

        });
        return average;
    }

	getRandomColor() {
  		var letters = '0123456789ABCDEF';
  		var color = '#';
  		for (var i = 0; i < 6; i++) {
    		color += letters[Math.floor(Math.random() * 16)];
 		 }
  		return color;
	}
	
	getStationColor(stationName){
		switch(stationName){
			case "AVRILLE - ARDENNE":
				return "#64b656";
		  	case "BASCULE":
		    	return "#3a7cc1";
		  	case "BERGES DE MAINE":
		    	return "#e58226";
			case "HÔTEL DE VILLE":
		    	return "#904196";
			case "HAUTS DE SAINT AUBIN":
		    	return "#f8dc0a";
			case "SAINT SERGE UNIVERSITE":
		    	return "#5b5d4a";
			case "FOCH HARAS":
		    	return "#919acd";
			case "CHU - HOPITAL":
		    	return "#b5823f";
			case "JEAN XXIII":
		    	return "#d9118c";
			case "PLACE LA FAYETTE":
		    	return "#9dcc96";
			case "LES GARES":
		    	return "#59a4dc";
			case "BAMACO":
		    	return "#d38fbc ";
			case "CENTRE DE CONGRES":
		    	return "#a6c559";
			case "JEAN VILAR":
		    	return "#d9212b";
			case "PLATEAU DE MAYENNE":
		    	return "#e16882";
			default :
				return "#000000"
		}
	}
}