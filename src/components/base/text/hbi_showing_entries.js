


const ShowingEntires = ({paginationData}) => {
    const { page = 0, pageSize = 0, total = 0 } = paginationData
    const end = Math.min(page * pageSize, total)
    return `Showing ${end} out of ${total} Entires`
 
};

export default ShowingEntires;