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
    title.classList.add("knowledge_title")
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
    title.classList.add("knowledge_title")
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
    title.classList.add("knowledge_title")
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
    image.alt = c.name
    image.src = c.logo

    const username = document.createElement("span")
    username.innerHTML = ` @<b>${c.username}</b>`

    const link = document.createElement("a")
    link.href = c.link
    link.appendChild(image)
    link.appendChild(username)

    const item = document.createElement("div")
    item.classList.add("social_item")
    item.appendChild(link)

    document.getElementById("social").appendChild(item)
  }
}

// Logo Easter Egg
const rotationDuration = 5000
var onLogoEvent = false
var logoClickCount = 0;

function rotateLogoToMouse(event) {
  const cursorPos = {
    x: event.clientX,
    y: event.clientY,
  }

  const logoPos = {
    x: logo.offsetLeft + logo.width / 2,
    y: logo.offsetTop + logo.height / 2,
  }

  const adj = cursorPos.x - logoPos.x
  const op = cursorPos.y - logoPos.y

  const rotation = Math.atan(op / adj)

  logo.style.transform = "rotate(" + rotation + "rad)"
}

var logoEvents = [
  {
    count: 0,
    action: () => { }
  },

  {
    count: 5,
    action: () => {
      logo.style.borderColor = "var(--yellow)"

      // Resources:
      // - https://github.com/tsoding/button/blob/fef36d7ccd9b75585f3c2f766839d14ef1423074/index.js#L80C21-L80C28.
      // - https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
      logo.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(-10deg)" },
          { transform: "rotate(10deg)" },
          { transform: "rotate(0deg)" },
          { transform: "rotate(5deg)" },
          { transform: "rotate(-5deg)" },
          { transform: "rotate(0deg)" },
          { transform: "rotate(-5deg)" },
          { transform: "rotate(5deg)" },
          { transform: "rotate(-5deg)" },
          { transform: "rotate(0deg)" },
        ], {
          duration: 500,
        }
      )
    }
  },

  {
    count: 10,
    action: () => {
      onLogoEvent = true

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // Source: https://stackoverflow.com/a/29509267
      logo.style.borderColor = "var(--red)"

      if (isMobile) {
        const animDuration = 500
        logo.animate([
          { transform: "translate(1px, 1px)  " },
          { transform: "translate(-1px, -2px)" },
          { transform: "translate(-3px, 0px) " },
          { transform: "translate(3px, 2px)  " },
          { transform: "translate(1px, -1px) " },
          { transform: "translate(-1px, 2px) " },
          { transform: "translate(-3px, 1px) " },
          { transform: "translate(3px, 1px)  " },
          { transform: "translate(-1px, -1px)" },
          { transform: "translate(1px, 2px)  " },
          { transform: "translate(1px, -2px) " },
        ], {
          duration: animDuration,
          iterations: rotationDuration / animDuration,
        })
      } else {
        rotateLogoToMouse(event)
        document.onmousemove = rotateLogoToMouse
      }

      setTimeout(() => {
        document.onmousemove = null

        logo.style.transition = "transform 0.5s, border-color 0.5s"
        logo.style.transform = ""
        logo.style.borderColor = ""

        logo.offsetLeft; // Hack to refresh. Source: https://stackoverflow.com/a/21665117

        logo.style.transition = ""

        onLogoEvent = false
        logoClickCount = 0 // RESET CLICK COUNT
      }, rotationDuration)
    }
  },
]
logoEvents.reverse()

function loadProfilePicture(json) {
  if (json.personal.image == undefined) return
  const logo = document.getElementById("logo")
  logo.src = json.personal.image

  logo.onclick = (event) => {
    if (onLogoEvent) return

    logo.animate([
      { transform: "scale(1)  " },
      { transform: "scale(0.9)" },
      { transform: "scale(1) " },
    ], {
      duration: 50,
    })

    logoClickCount++

    for (const e of logoEvents) {
      if (logoClickCount >= e.count) {
        e.action()
        break;
      }
    }
  }
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
