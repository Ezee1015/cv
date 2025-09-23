function loadEducation(json) {
  for (const ed of json.education) {
    document.getElementById("education").innerHTML += `
      <li>
        <p><b>${ed.degree} | ${ed.name}</b></p>
        <p>${ed.start} - ${ed.end}</p>
        <br>
      </li>
    `
  }
}

function loadExperience(json) {
  for (const ex of json.experience) {
    document.getElementById("experience").innerHTML += `
      <li>
        <p><b>${ex.name}</b></p>
        <p>${ex.start} - ${ex.end}</p>
        <br>
      </li>
    `
  }
}

function loadCourses(json) {
  for (const c of json.courses) {
    document.getElementById("courses").innerHTML += `
      <li>
        <p><b>${c.name}</b> from <b>${c.issuer}</b></p>
        <p>${c.date}</p>
        <br>
      </li>
    `
  }
}

function loadSocial(json) {
  for (const c of json.personal.social) {
    document.getElementById("social").innerHTML += `
      <li>
        <a href="${c.link}"><img class="social_logo" src="${c.logo}"> <b>${c.name}</b>: <b>${c.text}</b></a>
      </li>
    `
  }
}

function loadProfilePicture(json) {
  if (json.personal.image == undefined) return
  document.head.innerHTML+=`<link rel=\"icon\" href=\"${json.personal.image}\" type=\"image/x-icon\">`
  document.getElementById("logo").src = json.personal.image
}

function loadName(json) {
  if (json.personal.name == undefined) return
  document.getElementById("name").innerText = json.personal.name
}

function parse_json(json) {
  loadProfilePicture(json)
  loadName(json)
  loadEducation(json)
  loadExperience(json)
  loadCourses(json)
  loadSocial(json)
}

// const data_url = "../data.json" // For local testing
const data_url = "https://ezee1015.github.io/cv/data.json"

// Resource: https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
fetch(data_url)
  .then(function (response) {
    if (response.ok) {
      response.json().then(parse_json)
    } else {
      console.log(`Failed while getting the info`) // TODO Print it as a popup error in the html
      console.log(response)
    }
  })
  .catch(function (error) {
    console.log("An error occurred with the Fetch petition:" + error.message); // TODO Print it as a popup error in the html
  });
