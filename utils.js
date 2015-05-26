/* 
	This is a util functions collection
*/

function endsWith(str, token) {
	return str.indexOf(token, str.length - token.length) !== -1;
};

function startsWith(str, token) {
	return str.indexOf(token) === 0;
};

function isFile(pathname) {
	return (startsWith(pathname, '/include') || endsWith(pathname, '.html'));
};

function getFileExtention(filename) {
	var a = filename.split(".") ;
	if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
	    return "";  // without file extention 
	}
	return a.pop().toLowerCase();    // feel free to tack .toLowerCase() here if you want
}

exports.endsWith=endsWith;
exports.startsWith=startsWith;
exports.isFile=isFile;
exports.getFileExtention=getFileExtention;