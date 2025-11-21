import type {Advertisement} from "../../types/ad.ts";
import {Link} from "react-router-dom";


type CardProps = {
    advert: Advertisement;
    index: number;
    ids: number[];
}

const Card = ({ advert, index, ids }: CardProps) => {
    return (
        <div>
            <h3>{advert.title}</h3>
            <p> Цена: {advert.price}</p>
            <p> Категория: {advert.category}</p>
            <p> Дата создания: {advert.createdAt}</p>
            <p> Статус: {advert.status}</p>
            <p> Приоритет: {advert.priority}</p>
            <Link to={`/item/${advert.id}`} state={{ ids, index }}>Открыть →</Link>
        </div>
        )
}

export default Card