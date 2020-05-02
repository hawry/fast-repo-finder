const saveToStorage = json => {
  browser.storage.sync.set({
    sources: json,
  })
}

const configTextBox = () => {
  return document.getElementById("frf-configuration-textbox")
}

const handleSubmit = e => {
  e.preventDefault()
  let newConf = configTextBox().value
  saveToStorage(JSON.parse(newConf))
}

const initOptionsPage = () => {
  document
    .getElementById("frf-options-configuration")
    .addEventListener("submit", handleSubmit)

  getSourcesFromStorage().then(s => {
    if (!("sources" in s)) {
      configTextBox().value = JSON.stringify(defaultConfiguration(), null, "  ")
    } else {
      configTextBox().value = JSON.stringify(s["sources"], null, "  ")
    }
  })
}
document.addEventListener("DOMContentLoaded", initOptionsPage)
