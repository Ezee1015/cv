////////////////////////////////////////////// Messages
const iconUnderConstruction = "img/under_construction.png"
const iconAlert = "img/warning.png"
const iconError = "img/error.png"

const logoDefaultEducation = "img/education.png"
const logoDefaultExperience = "img/experience.png"
const logoDefaultCourses = "img/education.png"

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
  message_container.classList.add("box_content", "message_content")
  message_container.appendChild(close)
  message_container.appendChild(title)
  message_container.appendChild(document.createElement("hr"))
  message_container.appendChild(message)

  const image = document.createElement("img")
  image.classList.add("box_icon")
  image.src = iconPath

  const container = document.createElement("div")
  container.classList.add("box", `message_${type}`)
  container.appendChild(image)
  container.appendChild(message_container)

  const firstElement = document.getElementById("content").firstChild
  document.getElementById("content").insertBefore(container, firstElement)

  close.onclick = () => {
    container.style.display = "none"
  }
}

function createKnowledgeItem(containerID, icon, body) {
  const text = document.createElement("div")
  text.classList.add("knowledge_content")
  text.appendChild(body)

  const image = document.createElement("img")
  image.classList.add("box_icon")
  image.src = icon

  const container = document.createElement("div")
  container.classList.add("box")
  container.appendChild(image)
  container.appendChild(text)

  document.getElementById(containerID).appendChild(container)
}

////////////////////////////////////////////// LOAD data.json
function loadEducation(json) {
  for (const ed of json.education) {
    const title = document.createElement("p")
    title.style.fontWeight = "bold";
    title.innerHTML = `${ed.degree} | ${ed.name}`

    const time = document.createElement("p")
    time.innerText = `${ed.start} - ${ed.end}`

    const body = document.createElement("div")
    body.appendChild(title)
    body.appendChild(time)

    createKnowledgeItem(
      "education",
      (ed.logo) ? ed.logo : logoDefaultEducation,
      body
    )
  }
}

function loadExperience(json) {
  for (const ex of json.experience) {
    const title = document.createElement("p")
    title.style.fontWeight = "bold";
    title.innerHTML = ex.name

    const time = document.createElement("p")
    time.innerText = `${ex.start} - ${ex.end}`

    const body = document.createElement("div")
    body.appendChild(title)
    body.appendChild(time)

    createKnowledgeItem(
      "experience",
      (ex.logo) ? ex.logo : logoDefaultExperience,
      body
    )
  }
}

function loadCourses(json) {
  for (const c of json.courses) {
    const title = document.createElement("p")
    title.innerHTML = `<b>${c.name}</b> from <b>${c.issuer}</b>`

    const time = document.createElement("p")
    time.innerText = c.date

    const body = document.createElement("div")
    body.appendChild(title)
    body.appendChild(time)

    createKnowledgeItem(
      "courses",
      (c.logo) ? c.logo : logoDefaultCourses,
      body
    )
  }
}

function loadSocial(json) {
  for (const c of json.personal.social) {
    const image = document.createElement("img")
    image.classList.add("social_logo")
    image.src = c.logo

    const link = document.createElement("a")
    link.href = c.link
    link.appendChild(image)
    link.innerHTML += ` <b>${c.name}</b>: <b>${c.text}</b>`

    const item = document.createElement("li")
    item.appendChild(link)

    document.getElementById("social").appendChild(item)
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
