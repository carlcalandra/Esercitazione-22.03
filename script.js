const headers = {
    Authorization:"wKe7wb0SNOQiuyp3OyTTYvpZ4E99vPA00K8sDqKsddq9HGH4fubpVZFt"
}

const fetchApi = async (queryString) => {
    const response = await fetch("https://api.pexels.com/v1/search?query=" + queryString, {headers:headers});
    const jsonData = await response.json();
    return jsonData.photos;
}

const addImages = async (queryString) => {
    const photos = await fetchApi(queryString);
    let photoContainer = document.getElementById("photo-container");
    let photoRow = photoContainer.querySelector("div");
    photoRow.innerHTML = "";
    for (let photo of photos) {
        photoRow.appendChild(createCard(photo));
    }

 }

const hideElement = (element) => {
    element.classList.add("d-none");
}

const createCard = (photo) => {
    let colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4")
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card","mb-4","shadow-sm");
    let img = document.createElement("img");
    img.classList.add("img-fluid");
    img.src = photo.src.portrait;
    let bodyDiv = document.createElement("div");
    bodyDiv.classList.add("card-body");
    let par = document.createElement('p');
    par.classList.add("card-text");
    par.innerText = photo.photographer;
    let flexDiv  = document.createElement("div");
    flexDiv.classList.add("d-flex",'justify-content-between',"align-items-center");
    let btnGroupDiv = document.createElement("div");
    btnGroupDiv.classList.add("btn-group");
    let buttonView = document.createElement("button");
    buttonView.type = "button"
    buttonView.innerText = "View"
    let buttonHide = document.createElement("button");
    buttonHide.type = "button"
    buttonHide.innerText = "Hide"
    buttonView.classList.add("btn","btn-sm","btn-outline-secondary")
    buttonHide.classList.add("btn","btn-sm","btn-outline-secondary")
    buttonHide.onclick = event => hideElement(colDiv);
    let smallText = document.createElement("small");
    smallText.innerText = photo.id;
    smallText.classList.add("text-muted")
    btnGroupDiv.append(buttonView, buttonHide);
    flexDiv.append(btnGroupDiv, smallText);
    bodyDiv.append(par, flexDiv);
    cardDiv.append(img, bodyDiv);
    colDiv.append(cardDiv);
    return colDiv;
}

//  <div class="col-md-4">
//  <div class="card mb-4 shadow-sm">
//    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
//    <div class="card-body">
//      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//      <div class="d-flex justify-content-between align-items-center">
//        <div class="btn-group">
//          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
//          <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
//        </div>
//        <small class="text-muted">9 mins</small>
//      </div>
//    </div>
//  </div>
// </div>


document.getElementById("load-main").onclick = () => addImages("dogs")
document.getElementById("load-secondary").onclick = () => addImages("cats")
document.getElementById("load-other").onclick = () => {
     let inputEl = document.getElementById("load-other-input")
     addImages(inputEl.value);
     inputEl.value = ""

}