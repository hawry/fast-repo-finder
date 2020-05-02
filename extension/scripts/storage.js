// Contains code that needs to be shared between options/configurations page & popups

const getSourcesFromStorage = () => {
  return browser.storage.sync
    .get("sources")
    .then(r => r)
    .catch(err => console.error("could not read from storage: " + err))
}
const defaultConfiguration = () => {
  return [
    {
      name: "Maven",
      address: "https://mvnrepository.com/search?q=<frfterm>",
    },
    {
      name: "PyPi",
      address: "https://pypi.org/search/?q=<frfterm>",
    },
    {
      name: "NPMJS",
      address: "https://www.npmjs.com/search?q=<frfterm>",
    },
    {
      name: "RubyGems",
      address: "https://rubygems.org/search?query=<frfterm>",
    },
  ]
}
