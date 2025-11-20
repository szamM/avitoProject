import { useParams } from 'react-router-dom'

const ItemPage = () => {
    const { id } = useParams()

    return <div>Item page, id: {id}</div>
}

export default ItemPage