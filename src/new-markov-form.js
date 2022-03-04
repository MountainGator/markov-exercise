const NewMarkovForm = ({ formData, setFormData, makeMarkov }) => {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => (
            { ...formData, [name]: value }
        ))
    }

    return (
        <form>
            <label htmlFor="starting-text" onSubmit={makeMarkov}>Start your markov</label>
            <input 
                type="text"
                name="name"
                placeholder="markov-ify me"
                value={formData.name}
                onChange={handleChange}
                />
                <button type="submit">Markov!</button>
        </form>
    )
}

export default NewMarkovForm;