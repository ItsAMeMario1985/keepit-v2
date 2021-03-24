import { useState } from 'react'

export default function useForm(initialData) {
  const [formData, setFormData] = useState(initialData ?? {})
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  return {
    handleInputChange,
    validatePassword,
    formData,
    isPasswordValid,
    setIsPasswordValid,
  }

  function handleInputChange(event) {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    setFormData({ ...formData, [fieldName]: fieldValue })
  }

  function validatePassword(password) {
    if (!password.match('^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')) {
      setIsPasswordValid(false)
      return false
    }
    setIsPasswordValid(true)
    return true
  }
}
