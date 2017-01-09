/**
 * Calculus AB / Great World Texts: The Tempest
 * 
 * @project Tempest
 * @since 2017.01.06
 * 
 * @author Justin Garza
 * @author Owen Graham
 * @author Colemen Johnson
 * @author Panya Xiong
 * @author Isaac Zaman
 */

var AUTHORS = [
	{name:"Justin Garza", role:"Author"},
	{name:"Owen Graham", role:"Author"},
	{name:"Colemen \"CJ\" Johnson", role:"Author"},
	{name:"Panya Xiong", role:"Author"},
	{name:"Isaac Zaman", role:"Author"}
];

var d = new Date();


/**
 * main function to be run on page load
 */
function main() {
	var maxNameLength = 0;
	for (var i = 0; i < AUTHORS.length; i++) {
		maxNameLength = AUTHORS[i].name.length > maxNameLength ? AUTHORS[i].name.length : maxNameLength;
	}
	
	var f = function (name) {return name + " -" + "-".repeat(maxNameLength - name.length) + " "};
	
	log("Welcome to Tempest, a game by:");
	for (var i = 0; i < AUTHORS.length; i++) {
		log(f(AUTHORS[i].name) + AUTHORS[i].role);
	}
	log("...based on Shakespeare's \"The Tempest\"");
}

/**
 * returns time in HH:MM:SS format
 */
function time() {
	var f = function (x) {return (String(x)).length < 2 ? "0" + x : x};
	return f(d.getHours()) + ":" + f(d.getMinutes()) + ":" + f(d.getSeconds());
}

/**
 * logs a message with a timestamp to the console and to div#log
 */
function log(msg) {
	var log = "[" + time() + "] " + msg;
	console.log(log);
}