import fetch from 'node-fetch'
const execFile = require('child_process').execFile;

export default function handler(req,res) {
  console.log(`git api`, req.body)

    // RCE example
    // Vulnerable way to execute a shell command
	const { exec } = require("child_process");
	exec(`git log --oneline ${req.body.file}`, (error, stdout, stderr) => {
	    if (error) {
	        console.log(`error: ${error.message}`);
	    }
	    if (stderr) {
	        console.log(`stderr: ${stderr}`);
	    }

		if(stdout) {
	    	console.log(`stdout: ${stdout}`);
			res.json(`${stdout}`);
		}
	});

    /*
	// Better way to execute a shell command
	const command = "/usr/bin/git";
    const args = ["log", "--oneline", req.body.file];
  	execFile(command, args, (stderr, stdout) => {
    if (stderr) {
        res.status(500).send(stderr);
        return;
    }
    	res.json(stdout);
  	});
    */


}
