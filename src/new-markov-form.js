const NewMarkovForm = ({ formData, setFormData, makeMarkov }) => {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => (
            { ...formData, [name]: value }
        ))
    }

    return (
        <form onSubmit={makeMarkov}>
            <label htmlFor="start" >Sentence</label>
            <input 
                type="text"
                name="start"
                placeholder="markov-ify me"
                value={formData.start}
                onChange={handleChange}
                />

            <label htmlFor="numb">Number of Markovs</label>
            <input 
                type="number"
                name="numb"
                value={formData.numb}
                onChange={handleChange}
                min={20}
                max={150}
                />

            <button type="submit">Markov!</button>
        </form>
    )
}

export default NewMarkovForm;