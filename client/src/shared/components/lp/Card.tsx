import type {Advertisement} from "../../types/ad.ts";


type CardProps = {
    advert: Advertisement;
}

const Card = ({ advert }: CardProps) => {
    return (
        <div>
            <h3>{advert.title}</h3>
            <p> Цена: {advert.price}</p>
            <p> Категория: {advert.category}</p>
            <p> Дата создания: {advert.createdAt}</p>
            <p> Статус: {advert.status}</p>
            <p> Приоритет: {advert.priority}</p>
        </div>
        )
}

export default Card