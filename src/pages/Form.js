import { useState } from "react";
import { useNavigate } from "react-router-dom"

const Form = ({initialTodo, handleSubmit, buttonLabel}) => {
    const navigate = useNavigate()

    // The Form State
    const [formData, setFormData] = useState(initialTodo)

    // Handle change to update the State
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    const handleSubmission = (event) => {
        // prevent the page from refresh
        event.preventDefault()
        // Pass the formDaata to the handleSubmit function passes as props
        handleSubmit(formData)
        //send user back to main page
        navigate("/")

    }
  return <form onSubmit={handleSubmission}>
      <input
        type="text"
        onChange={handleChange}
        value={formData.subject}
        name="subject"
        />
        <input type="submit" value={buttonLabel} />
  </form>
};

export default Form;