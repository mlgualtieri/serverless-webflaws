import fetch from 'node-fetch'

export default function handler(req,res) {
  console.log(`submitted form`, req.body)

    // Simulate SSRF response on AWS 
    if(req.body.url == "http://169.254.169.254/latest/meta-data")
	{
		res.json(`ami-id 
			ami-launch-index  
			ami-manifest-path 
			block-device-mapping/ 
			events/ 
			hostname 
			identity-credentials/ 
			instance-action 
			instance-id 
			instance-life-cycle 
			instance-type 
			local-hostname 
			local-ipv4 
			mac 
			metrics/ 
			network/ 
			placement/ 
			profile 
			public-hostname 
			public-ipv4 
			public-keys/ 
			reservation-id 
			security-groups 
			services/`).exit()
	}

    // SSRF vulnerability
    // Fetch URL from user input
    if(req.body.url) {
	    var url = req.body.url;
        console.log(req.body.url);
	    fetch(url)
        	.then(res => res.text())
        	//.then(text => console.log(text))
        	.then(text => res.json(text))
    }


}
