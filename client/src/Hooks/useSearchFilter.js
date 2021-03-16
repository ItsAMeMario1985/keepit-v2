import { useState } from 'react'

export default function useSearchFilter() {
  const [search, setSearch] = useState([])

  return {
    search,
    setSearch,
    searchKeepits,
  }

  function searchKeepits(keepits, search) {
    let filteredKeepits = []
    if (search) {
      keepits.map((keepit) => {
        let tagsValues = keepit.tags.map((tag) => tag.value)
        let lowerCaseSearch = search[0].toLowerCase()
        const matches = tagsValues.filter((s) =>
          s.toLowerCase().includes(lowerCaseSearch)
        )
        if (matches.length > 0) {
          filteredKeepits = [...filteredKeepits, keepit]
        }
      })
      return filteredKeepits
    }
  }
}
