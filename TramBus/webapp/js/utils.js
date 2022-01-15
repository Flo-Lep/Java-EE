//----------------------- MISCELLANEOUS FUNCTIONS --------------------------
//To replace multiple items in one string
String.prototype.replaceAll = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

function get_file_name(){
	var path = window.location.pathname;
	var page = path.split("/").pop();
	return page
}