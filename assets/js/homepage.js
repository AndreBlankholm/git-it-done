var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term"); //<span> element to write the search term to so that users know whose repositories they're looking at.

//----------------------------------------------------------------

var getUserRepos = function (user) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {

    if (response.ok){                                           // valid response check or alert if the status is 200 or not

      response.json().then(function (data) {           
        displayRepos(data, user);
        //console.log(data);
      });

    } else {
      alert("Error: Guthub user not found!")
    }
    
  })                                                         //--( Now that we've created the function, let's set it up so that when the response data is-

  .catch(function(error) {
    alert("Unable to connect to Github");
  });

};                                                             //  converted to JSON, it will be sent from getUserRepos() to displayRepos()  --).

//------------------------------------------------------------------

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var username = nameInputEl.value.trim();                      //git the input data from the form and trim all the extra space out of the front and back

  if (username) {
    getUserRepos(username);                                     // If there is in fact a value to username, we pass that data to getUserRepos() as an argument
    nameInputEl.value = "";                                     // then we clear out input feild
  } else {
    alert("Please enter a GitHub username");                    // pop up alert for empty input field
  }
  console.log(event);
};

//------------------------------------------------------------------------

var displayRepos = function (repos, searchTerm) {
  

  if(repos.length === 0 ) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  };
  // Create a Function to Display Repos
  console.log(repos);
  console.log(searchTerm);

  repoContainerEl.textContent = "";                                 // be sure to clear out the old content before displaying new content.
  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {                             //the for loop, we're taking each repository (repos[i]) and writing some of its data to the page
                           
    // loop over repos name

    var repoName = repos[i].owner.login + "/" + repos[i].name;             //repos[i]) and writing some of its data to the page.   (NAME)

    var repoEl = document.createElement("a");                            // create a  <div> container for each repo              (DIV)
    repoEl.classList = "list-item flex-row justify-space-between align-center";                         //                         (STYLE)
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    var titleEl = document.createElement("span");                         // create a span element to hold repository name
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);                                          // append to container

    repoContainerEl.appendChild(repoEl);                                  // append container to the dom

    
    var statusEl = document.createElement("span");                        // create a status element
    statusEl.classList = "flex-row align-center";

   
    if (repos[i].open_issues_count > 0) {                                 // check if current repo has issues or not
      
      statusEl.innerHTML =
      
        "<i class='fas fa-times status-icon icon-danger'></i>" +  repos[i].open_issues_count + " issue(s)"; 
             
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    
    repoEl.appendChild(statusEl);                                        // append to container
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);
