const RANGE_TYPE_1 = "0-3h";
const RANGE_TYPE_2 = "3-6h";
const RANGE_TYPE_3 = "6-9h";
const RANGE_TYPE_4 = "9-12h";
const RANGE_TYPE_5 = "12-15h";
const RANGE_TYPE_6 = "15-18h";
const RANGE_TYPE_7 = "18-21h";
const RANGE_TYPE_8 = "21-24h";

class Stats_computer{
	//Attributes
	//bdd_data
	//line_1_cars = [] //[novh,novh,...]
	//line_2_cars = [] //[novh,novh,...]
	//Constructor
	Stats_computer(bdd_data){
		this.bdd_data = bdd_data;
		this.line_1_cars = [];
		this.line_2_cars = [];
	}
	//Methods
	parse_line_cars(){
		this.bdd_data.forEach(data=>{
			data.forEach(record=>{
				if(record.fields.nomligne==TRAMWAY_TRACK_1){
					this.line_1_cars.push(Number(record.fields.novh));
				}
				else{
					this.line_2_cars.push(Number(record.fields.novh));
				}
			});
		});
	}
	
	get_average_data(RANGE_TYPE, line_number){
		if(line_number==1){
			this.line_1_cars.forEach(car=>{
				if(RANGE_TYPE==RANGE_TYPE_1){
		
				}
				else if(RANGE_TYPE==RANGE_TYPE_2){
					
				}
				else if(RANGE_TYPE==RANGE_TYPE_3){
					
				}
				else if(RANGE_TYPE==RANGE_TYPE_4){
					
				}
				else if(RANGE_TYPE==RANGE_TYPE_5){
					
				}
				else if(RANGE_TYPE==RANGE_TYPE_6){
					
				}
				else if(RANGE_TYPE==RANGE_TYPE_7){
					
				}
				else if(RANGE_TYPE==RANGE_TYPE_8){
					
				}
			});
		}
		else if(line_number==2){
			
		};
	}
	
	get_line_1_day_average_traffic(){
		
	}
	
	get_line_2_day_average_traffic(){
		
	}
	
	//Output format : [{"novh": int, "traffic_per_day": int}]
	get_car_traffic_average_per_day(){
		let all_traffic_cars = this.line_1_cars;
		this.line_2_cars.forEach(item=>{
			temp.push(item);
		});
		let result = [];
		all_traffic_cars.forEach(car=>{
			//If the car already exists
			if(get_novh_index()!=-1){
				let number_of_cars = result[index].data_traffic_per_day+1;
				result[index].data_traffic_per_day = number_of_cars;
			}else{
				let data = {}
				data.novh = car;
				data.traffic_per_day = 1;
				result.push(data);
			}
		});
		return result;
	}
	
	//UTILS
	get_novh_index(tab_to_parse, novh){
		let found = false;
		tab_to_parse.forEach(element=>{
			if(element.novh==novh){
				found = true;
			}
		});
		if(found){
			return tab_to_parse.indexOf(element);
		}
		else{
			return -1;
		}
	}
		

}