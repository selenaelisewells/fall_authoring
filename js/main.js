(() => {
    // stub * just a place for non-component-specific stuff
    console.log('loaded');

    function popErrorBox(message) {
        alert("Something has gone horribly, horribly wrong");
    }

    function handleDataSet(data) {
        let userSection = document.querySelector('.user-section'),
            userTemplate = document.querySelector('#user-template').content,
            profs = Object.keys(data);

        debugger;

        for (let prof of profs) {
            let currentUser = userTemplate.cloneNode(true),
                currentUserText = currentUser.querySelector('.user').children;

            //currentUserText[1].src = `images/${data[prof].biopic}`;
            currentUserText[2].textContent = data[prof].name;
            currentUserText[3].textContent = data[prof].role;
            currentUserText[4].textContent = data[prof].nickname;

            // add this new user to the view
            userSection.appendChild(currentUser);
        }
    }

    // async is now THE WAY to do AJAX / asynchronous operations
    async function fetchData() {
        // ask for a resource, and then do something with it when it resolves
        let resource = await fetch('../DataSet.json').then(response => {
            if (response.status !== 200) {
                throw new Error(`Danger Will Robinson! Here there be monsters! Error ${response.status}`);
            }

            return response;
        });

        // fetch uses the Promise API, so it'll return with the resource or return false - either way, it resolves the promise

        // we'll assume success and pass through a parsed JavaScript object from the JSON data we get
        let dataset = await resource.json();

        return dataset;
    }

    // we can add a catch handler to a thenable if things go wrong during our data retrieval attempt
    // really, we should move all of this to an external class or function and pass arguments into it.

    // that would make it really flexible and able to handle all kinds of requests and we could pass in a callback depending on what we want to do with our data

    // but then we'd be on our way to rewriting the Axios API (you should research it)
    fetchData().then(data => handleDataSet(data)).catch(err => { console.log(err);
        popErrorBox(err); });
})();