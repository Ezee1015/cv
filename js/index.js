////////////////////////////////////////////// Messages
const iconUnderConstruction = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/UnderCon_icon.svg/1200px-UnderCon_icon.svg.png"
const iconAlert = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Warning.svg/1200px-Warning.svg.png"
const iconError = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/OOjs_UI_icon_error-destructive.svg/768px-OOjs_UI_icon_error-destructive.svg.png"

// Available types: "warning", "error"
function addMessage(type, iconPath, titleStr, messageStr) {
  const close = document.createElement("button")
  close.classList.add("message_close")
  close.innerText = "X"

  const title = document.createElement("h2")
  title.classList.add("message_title")
  title.innerText = titleStr

  const message = document.createElement("p")
  message.innerText = messageStr

  const message_container = document.createElement("div")
  message_container.classList.add("message_content")
  message_container.appendChild(close)
  message_container.appendChild(title)
  message_container.appendChild(document.createElement("hr"))
  message_container.appendChild(message)

  const image = document.createElement("img")
  image.classList.add("message_icon")
  image.src = iconPath

  const container = document.createElement("div")
  container.classList.add("message", `message_${type}`)
  container.appendChild(image)
  container.appendChild(message_container)

  const firstElement = document.getElementById("content").firstChild
  document.getElementById("content").insertBefore(container, firstElement)

  close.onclick = () => {
    container.style.display = "none"
  }
}

////////////////////////////////////////////// LOAD data.json
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
  document.getElementById("logo").src = json.personal.image
}

function loadName(json) {
  if (json.personal.name == undefined) return
  document.getElementById("name").innerText = json.personal.name
  document.title = json.personal.name
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
      addMessage("error", iconError, "The response is not ok", "Failed while getting the info")
      console.log(response)
    }
  })
  .catch(function (error) {
    addMessage("error", iconError, "Fetch error", "An error occurred with the Fetch petition: " + error.message)
  });

addMessage("warning", iconUnderConstruction, "Under Construction", "This web page is under construction...")
