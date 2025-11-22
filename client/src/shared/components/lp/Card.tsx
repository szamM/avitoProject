import type {Advertisement} from "../../types/ad.ts";
import {Link} from "react-router-dom";
import "./card.css"


type CardProps = {
    advert: Advertisement;
    index: number;
    ids: number[];
}

const Card = ({ advert, index, ids }: CardProps) => {
    const thumbnail = advert.images[0]
    return (
        <div className={"cardView"}>
            <img src={thumbnail} className="cardImage"></img>
            <div className={"cardInfo"}>
                <h3 className={"cardTitle"}>{advert.title}</h3>
                <p className={"cardPrice"}> Цена: {advert.price} ₽</p>
                <p className={"cardCategory"}> Категория: {advert.category}</p>
                <p className={"cardDate"}> Дата создания: {advert.createdAt}</p>
                <p className={"cardStatus"}> Статус: {advert.status}</p>
                <p className={"cardPriority"}> Приоритет: {advert.priority}</p>
                <Link to={`/item/${advert.id}`} state={{ ids, index }} className={"openCard"}>Открыть</Link>
            </div>


        </div>
        )
}

export default Card