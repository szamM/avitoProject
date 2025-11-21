import {Link, useNavigate, useParams} from 'react-router-dom'
import {getAdById, approveAd, rejectAd, requestChangesAd} from "../shared/api/functionsForRequests.ts";
import {useEffect, useState} from "react";
import type {Advertisement} from "../shared/types/ad.ts";
import { useLocation } from 'react-router-dom'




const ItemPage = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const numberId = Number(id);
    const location = useLocation()
    const state = location.state as { ids?: number[]; index?: number } | undefined
    const ids = state?.ids
    const index = state?.index
    const [ad, setAd] = useState<Advertisement | null>(null)
	const [isLoading, setIsLoading] = useState(false)
    const [approveMes, setApproveMes] = useState<string>("")
    const [onReject, setOnReject] = useState<boolean>(false)
    const [onChanges, setOnChanges] = useState<boolean>(false)
    const [reasonOfRej, setReasonOfRej] = useState<string>("")
    const [customReasonOfRej, setCustomReasonOfRej] = useState<string>("")
    const hasReason = reasonOfRej !== ""
    const hasCustomIfNeeded = reasonOfRej !== "Другое" || customReasonOfRej.trim() !== ""
    const isSendable = hasReason && hasCustomIfNeeded
    const toggleSendReject = async () => {
        try {

            if (customReasonOfRej !== ""){
                const res = await rejectAd(numberId, {reason: reasonOfRej, comment: customReasonOfRej})
                setAd(res.ad)
                setApproveMes(res.message);
                setOnReject(false);
                setReasonOfRej("")
                setCustomReasonOfRej("")
            }
            else{
                const res = await rejectAd(numberId, {reason:reasonOfRej})
                setAd(res.ad)
                setApproveMes(res.message);
                setOnReject(false);
                setReasonOfRej("")
                setCustomReasonOfRej("")
            }

        }
        catch (error) {
            console.log(error);
        }
    }
    const toggleSendChanges = async () => {
        try {
            if (customReasonOfRej !== ""){
                const res = await requestChangesAd(numberId, {reason: reasonOfRej, comment: customReasonOfRej})
                setAd(res.ad)
                setApproveMes(res.message);
                setOnChanges(false);
                setReasonOfRej("")
                setCustomReasonOfRej("")
            }
            else{
                const res = await requestChangesAd(numberId, {reason:reasonOfRej})
                setAd(res.ad)
                setApproveMes(res.message);
                setOnChanges(false);
                setReasonOfRej("")
                setCustomReasonOfRej("")
            }

        }
        catch (error) {
            console.log(error);
        }
    }
    const toggleReject = () => {
        setOnReject(!onReject)
    }
    const toggleChanges = () => {
        setOnChanges(!onChanges)
    }
    const toggleApprove = async () => {
        try {
            const res = await approveAd(numberId)
            setApproveMes(res.message);
            setAd(res.ad)
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        async function load() {
            try{
            setIsLoading(true);
            const data = await getAdById(numberId);
            setAd(data);
        }
        catch (error){
            console.log(error);

        }
        finally {
            setIsLoading(false);
        }}
        load()
        }, [numberId])
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!ad){
        return <div>Такого объявления нет</div>
    }
    else{
        return <div>
            <h2>
                {ad.title}
            </h2>
            <div>{ad.images.map((url, index) => (
                <img
                    key={index}
                    src={url}
                />
            ))}</div>
            <div><h4>Характеристика товара:</h4>
                {Object.entries(ad.characteristics).map(([key, value]) => {
                return <div key={key}>{key}: {value}</div>
            })}
            </div>

            <h4>Цена: {ad.price}</h4>
            <div><h4>Описание:</h4>
                {ad.description}</div>
            <div> <h3>Информация о продавце:</h3>
                <div>Имя: {ad.seller.name}</div>
                <div>Рейтинг продавца: {ad.seller.rating}</div>
                <div>Кол-во объявлений: {ad.seller.totalAds}</div>
                <div>Пользуется Авито с: {ad.seller.registeredAt}</div>
            </div>
            <div><h3>История Модерации:</h3>
                <div>{ad.moderationHistory.map((a) => <div key={a.id}>
                    <div>{a.action}</div>
                    <div>{a.moderatorName}</div>
                    <div>{a.timestamp}</div>
                    <div>{a.reason}</div>
                    <div>{a.comment}</div>
                </div>)}</div>
            </div>
            {approveMes !== "" && (<div> {approveMes} </div>)}
            {approveMes === "" && !onReject && !onChanges && (<div>
                <button type="button" onClick={toggleApprove}>Одобрить</button>
                <button type="button" onClick={toggleReject}>Отклонить</button>
                <button type="button" onClick={toggleChanges}>Доработка</button>
            </div>)}
            {onReject && (
                <h3>Отклонение</h3>)}
            {onChanges && (
                <h3>Доработка</h3>)}
            {(onReject || onChanges) && (<div>

                <div>Укажите причину:
                    <div>
                        <input
                            type="radio"
                            name="reason"
                            value="Запрещенный товар"
                            checked={reasonOfRej === "Запрещенный товар"}
                            onChange={(e) => setReasonOfRej(e.currentTarget.value)}
                        />
                        Запрещенный товар
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="reason"
                            value="Неверная категория"
                            checked={reasonOfRej === "Неверная категория"}
                            onChange={(e) => setReasonOfRej(e.currentTarget.value)}
                        />
                        Неверная категория
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="reason"
                            value="Некорректное описание"
                            checked={reasonOfRej === "Некорректное описание"}
                            onChange={(e) => setReasonOfRej(e.currentTarget.value)}
                        />
                        Некорректное описание
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="reason"
                            value="Проблемы с фото"
                            checked={reasonOfRej === "Проблемы с фото"}
                            onChange={(e) => setReasonOfRej(e.currentTarget.value)}
                        />
                        Проблемы с фото
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="reason"
                            value="Подозрение на мошенничество"
                            checked={reasonOfRej === "Подозрение на мошенничество"}
                            onChange={(e) => setReasonOfRej(e.currentTarget.value)}
                        />
                        Подозрение на мошенничество
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="reason"
                            value="Другое"
                            checked={reasonOfRej === "Другое"}
                            onChange={(e) => setReasonOfRej(e.currentTarget.value)}
                        />
                        Другое
                    </div>
                    {reasonOfRej === "Другое" && (
                        <input
                            type="text"
                            placeholder="Укажите причину"
                            value={customReasonOfRej}
                            onChange={(e) => setCustomReasonOfRej(e.target.value)}
                        />
                    )}
                </div>
            </div>)}
            {onReject && (
            <button type="button"
                    disabled={!isSendable}
                    onClick={toggleSendReject}>
                Отправить</button>)}
            {onChanges && (
                <button type="button"
                        disabled={!isSendable}
                        onClick={toggleSendChanges}>
                    Отправить</button>)}
            <Link to={`/list`}>К списку</Link>
            {ids && typeof index === 'number' && (
                <div>
                    <button
                        type="button"
                        disabled={index === 0}
                        onClick={() =>
                            navigate(`/item/${ids[index - 1]}`, {
                                state: { ids, index: index - 1 },
                            })
                        }
                    >
                        ← Предыдущее
                    </button>

                    <button
                        type="button"
                        disabled={index === ids.length - 1}
                        onClick={() =>
                            navigate(`/item/${ids[index + 1]}`, {
                                state: { ids, index: index + 1 },
                            })
                        }
                    >
                        Следующее →
                    </button>
                </div>
            )}

            </div>


    }
}

export default ItemPage