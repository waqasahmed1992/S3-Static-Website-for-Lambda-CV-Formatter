var API_ENDPOINT = 'https://<>.execute-api.<region>.amazonaws.com/prod/v1';

var errorDiv = document.getElementById('error-message')
var successDiv = document.getElementById('success-message')
var resultsDiv = document.getElementById('results-message')

function messageValue() { return document.getElementById('message').value }
function emailValue() { return document.getElementById('email').value }


function clearNotifications() {
    errorDiv.textContent = '';
    resultsDiv.textContent = '';
    successDiv.textContent = '';
}

document.getElementById('emailButton').addEventListener('click', function(e) {
    sendData(e, 'email');
});

function sendData (e) {
    e.preventDefault()
    clearNotifications()
    fetch(API_ENDPOINT, {
        headers:{
            "Content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify({
            message: messageValue(),
            email: emailValue(),
        }),
        mode: 'cors'
    })
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data)
        successDiv.textContent = 'Looks ok. But check the result below!';
        resultsDiv.textContent = JSON.stringify(data);
    })
    .catch(function(err) {
        errorDiv.textContent = 'Yikes! There was an error:\n' + err.toString();
        console.log(err)
    });
};
