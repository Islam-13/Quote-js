var siteName = document.getElementById("siteName");
var websiteURL = document.getElementById("websiteURL");
var btnSubmit = document.querySelector(".btn-submit");
var siteNameAlert = document.querySelector(".alert-name");
var websiteURLAlert = document.querySelector(".alert-website");
var imageNameAlert = document.querySelector(".alert-name-image");
var imageWebsiteAlert = document.querySelector(".alert-website-image");
var sitesList = [];

if (localStorage.getItem("sitesList")) {
  sitesList = JSON.parse(localStorage.getItem("sitesList"));
  displaySitesList();
}

siteName.addEventListener("blur", function () {
  inputAlert(
    siteNameValidation,
    siteName,
    siteNameAlert,
    imageNameAlert,
    "name"
  );
});

websiteURL.addEventListener("blur", function () {
  inputAlert(
    websiteURLValidation,
    websiteURL,
    websiteURLAlert,
    imageWebsiteAlert,
    "URL"
  );
});

btnSubmit.addEventListener("click", function () {
  if (siteNameValidation() && websiteURLValidation()) {
    var siteData = {
      name: siteName.value,
      url: websiteURL.value,
    };

    sitesList.push(siteData);
    localStorage.setItem("sitesList", JSON.stringify(sitesList));
    displaySitesList();
    reset();
  } else if (!siteNameValidation())
    inputAlert(
      siteNameValidation,
      siteName,
      siteNameAlert,
      imageNameAlert,
      "name"
    );
  else if (!websiteURLValidation())
    inputAlert(
      websiteURLValidation,
      websiteURL,
      websiteURLAlert,
      imageWebsiteAlert,
      "URL"
    );
});

function displaySitesList() {
  var content = ``;
  for (var i = 0; i < sitesList.length; i++) {
    content += `
    <tr>
        <td>${i + 1}</td>
        <td>${sitesList[i].name}</td>
        <td>
            <a href="http://${
              sitesList[i].url
            }" target="_blank" class="btn btn-visit">
                <i class="fa-solid fa-eye pe-2"></i>Visit
            </a>
        </td>
        <td>
            <button onclick="deleteSite(${i})" class="btn btn-delete pe-2" data-index="0">
                <i class="fa-solid fa-trash-can"></i> Delete
            </button>
        </td>
  </tr>
`;
  }
  document.getElementById("content").innerHTML = content;
}

function reset() {
  siteName.value = "";
  siteName.style.borderColor = "#dee2e6";
  siteNameAlert.innerHTML = "";
  imageNameAlert.innerHTML = "";
  websiteURL.value = "";
  websiteURL.style.borderColor = "#dee2e6";
  websiteURLAlert.innerHTML = "";
  imageWebsiteAlert.innerHTML = "";
}

function deleteSite(index) {
  sitesList.splice(index, 1);
  localStorage.setItem("sitesList", JSON.stringify(sitesList));
  displaySitesList();
}

function siteNameValidation() {
  var siteNameVal = siteName.value;
  var nameReg = /^[A-Za-z]{3,9}$/;

  if (nameReg.test(siteNameVal)) {
    return true;
  } else return false;
}

function websiteURLValidation() {
  var websiteVal = websiteURL.value;
  var websiteReg =
    /^(www.)[a-zA-Z0-9][a-zA-Z0-9-.]{1,50}[a-zA-Z0-9]\.[a-zA-Z]{2,3}$/;

  if (websiteReg.test(websiteVal)) {
    return true;
  } else return false;
}

function inputAlert(validation, name, nameA, nameImg, msg) {
  validation();
  if (validation()) {
    name.style.borderColor = "green";
    nameA.innerHTML = "";
    nameA.classList.remove("danger-msg");
    nameImg.innerHTML = `<img src="./check.png" class="w-100" alt="" />`;
  } else {
    name.style.borderColor = "red";
    nameA.innerHTML = `This ${msg} is not correct, <strong>Please enter a vaild one</strong>`;
    nameA.classList.add("danger-msg");
    nameImg.innerHTML = `<img src="./error.png" class="w-100" alt="" />`;
  }
}
