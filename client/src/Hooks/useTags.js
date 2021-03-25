import { useState, useEffect } from 'react'
import { firstToUpper } from '../Util/string'
import { apiGetVisionLabels } from '../Services/apiRequests.js'
import useToken from '../Hooks/useToken'

export default function useTags() {
  const [tags, setTags] = useState([])

  const [customTags, setCustomTags] = useState([])
  const [apiTags, setApiTags] = useState([])
  const { token } = useToken()

  useEffect(() => {
    setTags([...tags, ...apiTags])
  }, [apiTags])

  useEffect(() => {
    setTags([...customTags, ...tags])
  }, [customTags])

  const addedTags = tags.filter((tag) => tag.added === true).sort()

  return {
    tags,
    setTags,
    addedTags,
    handleSubmitTag,
    toggleTagAdded,
    loadApiTags,
    handleApiTags,
  }

  function loadApiTags(imageIds) {
    const labelRequest = {
      imageIds,
    }

    apiGetVisionLabels(token, labelRequest)
      .then((result) => handleApiTags(result))
      .catch((error) => console.log('error', error))
  }

  function handleApiTags(response) {
    if (response.labels.length) {
      const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }
      const uniqueApiTags = response.labels.filter(unique)

      //const uniqueApiTags = [...new Set(response.labels)]
      const expandedTags = uniqueApiTags.map((value, index) => {
        return { value: value, added: false, isCustom: false }
      })
      setApiTags(expandedTags)
    } else {
      setTags([{ value: 'No tags found', added: false, isCustom: false }])
    }
  }

  function handleSubmitTag(event) {
    event.preventDefault()
    const inputValue = firstToUpper(event.target.customTag.value)
    if (tags.findIndex((tag) => tag.value === inputValue) < 0) {
      setCustomTags([{ value: inputValue, added: true, isCustom: true }])
    }
    event.target.reset()
    event.target.customTag.focus()
  }

  function toggleTagAdded(tagValue, newAddedState, isCustom) {
    var searchedIndex = tags.findIndex((tag) => tag.value === tagValue)
    var newTags = tags
    setTags([
      ...newTags.slice(0, searchedIndex),
      { value: tagValue, added: newAddedState, isCustom: isCustom },
      ...newTags.slice(searchedIndex + 1),
    ])
  }
}
