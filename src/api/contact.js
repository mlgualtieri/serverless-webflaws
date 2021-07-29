//npm install node-serialize
const serialize = require('node-serialize');
const execFile = require('child_process').execFile;

export default function handler(req,res) {
    console.log(`contact api`, req.body)

    // Get form data by unserializing
    let data = serialize.unserialize(req.body)

    // ... This is where you would do something with the form data ...

    res.json(`Thank you ${data.name}!<br/>We will get back to you soon.`)
}
