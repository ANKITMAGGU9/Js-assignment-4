function getFoodItems() {
    const day = document.getElementById('day').value;

    // API endpooint
    const apiEndpoint = "http://localhost:80/" + day;
    fetchDataAndDisplay(apiEndpoint);


}

function postData(event) {
    event.preventDefault();
    var feedback = document.getElementById("feedbackText").value;
    console.log(feedback);
    var postData = {
        feedback: feedback,
        created: Date.now()
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //myHeaders.append("Access-Control-Allow-Origin", "true");

    var raw = JSON.stringify(postData);

    console.log(raw);
      

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:80/feedback", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


function fetchDataAndDisplay(apiEndpoint) {
    console.log(apiEndpoint);
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const foodItemsContainer = document.getElementById('foodItemsContainer');
            foodItemsContainer.innerHTML = '';
            const foodItemElement = document.createElement('div');
            foodItemElement.classList.add('food-item');
            let innerHTML = '';
            data.forEach(element => {
                innerHTML = innerHTML +  `
                <h3>${element.name}</h3>
                <p><strong>Category:</strong> ${element.category}</p>
                <p><strong>Price:</strong> $${element.price.toFixed(2)}</p>
                <p><strong>Description:</strong> ${element.description}</p>
            `;
            });
            foodItemElement.innerHTML = innerHTML;
            foodItemsContainer.appendChild(foodItemElement)
        })
        .catch(error => {
            console.log("Error fethcing data: ", error);
            const errorElement = document.createElement('div');
            errorElement.innerHTML = '<p>Failed to fetch data';
        });
}

function getFeedbacks() {
    const apiEndpoint = "http://localhost:80/getFeedbacks";
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const feedbackContainer = document.getElementById('feedbackContainer');
            feedbackContainer.innerHTML = '';
            const feedbackElement = document.createElement('div');
            feedbackElement.classList.add('feedback-item');
            let innerHTML = '';
            data.forEach(element => {
                innerHTML = innerHTML +  `
                <p><strong>Submitted timestamp:</strong> ${element.created}</p>
                <p><strong>Feeback:</strong> $${element.feedback}</p>
            `;
            });
            feedbackElement.innerHTML = innerHTML;
            feedbackContainer.appendChild(feedbackElement)
        })
        .catch(error => {
            console.log("Error fethcing data: ", error);
            const errorElement = document.createElement('div');
            errorElement.innerHTML = '<p>Failed to fetch data';
        });
}