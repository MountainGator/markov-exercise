const MarkovText = ({n, chains}) => {
    return <p>{chains.get(n)}</p>
}

export default MarkovText;