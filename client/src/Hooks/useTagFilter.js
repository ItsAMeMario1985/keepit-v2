import { useState } from 'react'
import compare from '../Util/compare'
import unique from '../Util/unique'

export default function useTagFilter() {
  const [filter, setFilter] = useState([])
  const [filterTags, setFilterTags] = useState([])

  return {
    filter,
    setFilter,
    filterTags,
    generateTagFilter,
    filterKeepits,
  }

  function generateTagFilter(keepits) {
    let collectedTags = []
    keepits.map((keepit) => {
      let tags = keepit.tags
      tags.map((tag) => {
        collectedTags = [
          ...collectedTags,
          { value: tag.value, isCustom: tag.isCustom },
        ]
      })
    })
    collectedTags.sort(compare)
    setFilterTags(unique(collectedTags, 'value'))
  }

  function filterKeepits(keepits) {
    let filteredKeepits = []
    if (filter.length !== 0) {
      keepits.map((keepit) => {
        let tagsValues = keepit.tags.map((tag) => tag.value)
        let tagsFound = filter.every((i) => tagsValues.includes(i))
        if (tagsFound) {
          filteredKeepits = [...filteredKeepits, keepit]
        }
      })
      return filteredKeepits
    }
  }
}
