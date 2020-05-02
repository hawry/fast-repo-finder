let targetQuery = document.getElementById("query-target")
let queryInput = document.getElementById("frf-query-param")
let tabItems = document.getElementsByClassName("tab-item")

findRepo = e => {
  e.preventDefault()
  let target = targetQuery.value
  let query = queryInput.value

  let url = target.replace("<frfterm>", query)
  storeLastQuery(target, query)

  browser.tabs.create({
    url: url,
  })
}

toggleSelectedClassName = (list, current) => {
  if (current == null) return

  for (let i = 0; i < list.length; i++) {
    let elem = list[i]
    let telem = elem.getAttribute("data-query")
    if (telem === current) {
      elem.classList.add("selected")
    } else {
      elem.classList.remove("selected")
    }
  }
}

changeActiveRepo = e => {
  let queryAttribute = e.target.getAttribute("data-query")
  toggleSelectedClassName(tabItems, queryAttribute)
  if (queryAttribute != null) {
    targetQuery.value = queryAttribute
    queryInput.focus()
  } else {
    console.error("query attribute has invalid or missing value")
  }
}

storeLastQuery = (targetUrl, queryParam) => {
  browser.storage.sync.set({
    lastTarget: {
      targetUrl,
      queryParam,
    },
  })
}

getLastQuery = async () => {
  return await browser.storage.sync
    .get("lastTarget")
    .then(rsp => {
      return rsp["lastTarget"]
    })
    .catch(err => {
      console.error("could not fetch last target from storage", err)
      return null
    })
}

init = async () => {
  const storedValues = await getLastQuery()
  if (storedValues == null) return

  const { targetUrl, queryParam } = storedValues
  targetQuery.value = targetUrl
  queryInput.value = queryParam
  toggleSelectedClassName(tabItems, targetUrl)
}

for (let i = 0; i < tabItems.length; i++) {
  let element = tabItems[i]
  element.addEventListener("click", changeActiveRepo, false)
}

document.addEventListener("DOMContentLoaded", init)

document.getElementById("frf-search-form").addEventListener("submit", findRepo)
