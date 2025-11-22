import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAdById, approveAd, rejectAd, requestChangesAd } from '../shared/api/functionsForRequests'
import type { Advertisement } from '../shared/types/ad'
import './item.css'

const ItemPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const numberId = Number(id)

    const location = useLocation()
    const state = location.state as { ids?: number[]; index?: number } | undefined
    const ids = state?.ids
    const index = state?.index

    const [ad, setAd] = useState<Advertisement | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const [approveMes, setApproveMes] = useState<string>('')
    const [onReject, setOnReject] = useState<boolean>(false)
    const [onChanges, setOnChanges] = useState<boolean>(false)
    const [reasonOfRej, setReasonOfRej] = useState<string>('')
    const [customReasonOfRej, setCustomReasonOfRej] = useState<string>('')

    const hasReason = reasonOfRej !== ''
    const hasCustomIfNeeded = reasonOfRej !== 'Другое' || customReasonOfRej.trim() !== ''
    const isSendable = hasReason && hasCustomIfNeeded

    // можно ли ещё модерировать это объявление
    const canModerate = ad?.status === 'pending'

    // 🧹 сброс локального состояния при смене объявления
    useEffect(() => {
        setApproveMes('')
        setOnReject(false)
        setOnChanges(false)
        setReasonOfRej('')
        setCustomReasonOfRej('')
    }, [numberId])

    useEffect(() => {
        async function load() {
            try {
                setIsLoading(true)
                const data = await getAdById(numberId)
                setAd(data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        if (!Number.isNaN(numberId)) {
            load()
        }
    }, [numberId])

    const toggleSendReject = async () => {
        try {
            const payload =
                customReasonOfRej.trim() !== ''
                    ? { reason: reasonOfRej, comment: customReasonOfRej }
                    : { reason: reasonOfRej }

            const res = await rejectAd(numberId, payload)
            setAd(res.ad)
            setApproveMes(res.message)
            setOnReject(false)
            setReasonOfRej('')
            setCustomReasonOfRej('')
        } catch (error) {
            console.log(error)
        }
    }

    const toggleSendChanges = async () => {
        try {
            const payload =
                customReasonOfRej.trim() !== ''
                    ? { reason: reasonOfRej, comment: customReasonOfRej }
                    : { reason: reasonOfRej }

            const res = await requestChangesAd(numberId, payload)
            setAd(res.ad)
            setApproveMes(res.message)
            setOnChanges(false)
            setReasonOfRej('')
            setCustomReasonOfRej('')
        } catch (error) {
            console.log(error)
        }
    }

    const toggleReject = () => {
        if (!canModerate) return
        setOnReject(prev => !prev)
        setOnChanges(false)
        setApproveMes('')
    }

    const toggleChanges = () => {
        if (!canModerate) return
        setOnChanges(prev => !prev)
        setOnReject(false)
        setApproveMes('')
    }

    const toggleApprove = async () => {
        if (!canModerate) return
        try {
            const res = await approveAd(numberId)
            setAd(res.ad)
            setApproveMes(res.message)
            setOnReject(false)
            setOnChanges(false)
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!ad) {
        return <div>Такого объявления нет</div>
    }

    // текст для уже принятого решения
    let decisionText = ''
    if (!canModerate) {
        if (ad.status === 'approved') {
            decisionText = 'Решение уже принято: объявление одобрено.'
        } else if (ad.status === 'rejected') {
            decisionText = 'Решение уже принято: объявление отклонено.'
        } else if (ad.status === 'draft') {
            decisionText = 'Решение уже принято: объявление отправлено на доработку.'
        } else {
            decisionText = 'Решение по объявлению уже зафиксировано.'
        }
    }

    return (
        <div className="itemPage">
            <h2 className="itemPage-title">{ad.title}</h2>

            {/* верхняя часть: галерея + история модерации */}
            <div className="itemPage-topRow">
                <section className="itemGallery">
                    <h4 className="itemSection-title">Галерея</h4>
                    <div className="itemGallery-grid">
                        {ad.images.map((url, index) => (
                            <img key={index} src={url} className="itemGallery-image" />
                        ))}
                    </div>
                    <div className="itemPrice">Цена: {ad.price} ₽</div>
                </section>

                <section className="itemModeration">
                    <h3 className="itemSection-title">История модерации</h3>
                    <div className="itemModeration-list">
                        {ad.moderationHistory.map(entry => (
                            <div key={entry.id} className="itemModeration-entry">
                                <div className="itemModeration-row">
                                    <span className="itemModeration-label">Действие: </span>
                                    {entry.action}
                                </div>
                                <div className="itemModeration-row">
                                    <span className="itemModeration-label">Модератор: </span>
                                    {entry.moderatorName}
                                </div>
                                <div className="itemModeration-row">
                                    <span className="itemModeration-label">Время: </span>
                                    {entry.timestamp}
                                </div>
                                {entry.reason && (
                                    <div className="itemModeration-row">
                                        <span className="itemModeration-label">Причина: </span>
                                        {entry.reason}
                                    </div>
                                )}
                                {entry.comment && (
                                    <div className="itemModeration-row">
                                        <span className="itemModeration-label">Комментарий: </span>
                                        {entry.comment}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* описание / характеристики / продавец */}
            <section className="itemDetails">
                <div className="itemDescription">
                    <h4 className="itemSection-title">Описание</h4>
                    <p>{ad.description}</p>
                </div>

                <div className="itemCharacteristics">
                    <h4 className="itemSection-title">Характеристики товара</h4>
                    <table className="itemCharacteristics-table">
                        <tbody>
                        {Object.entries(ad.characteristics).map(([key, value]) => (
                            <tr key={key}>
                                <td className="itemCharacteristics-key">{key}</td>
                                <td className="itemCharacteristics-value">{value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="itemSeller">
                    <h4 className="itemSection-title">Информация о продавце</h4>
                    <p>Имя: {ad.seller.name}</p>
                    <p>Рейтинг продавца: {ad.seller.rating}</p>
                    <p>Кол-во объявлений: {ad.seller.totalAds}</p>
                    <p>Пользуется Авито с: {ad.seller.registeredAt}</p>
                </div>
            </section>

            {/* сообщение от сервера / инфо о статусе */}
            {approveMes && <div className="itemMessage">{approveMes}</div>}
            {!canModerate && !approveMes && <div className="itemMessage">{decisionText}</div>}

            {/* кнопки действий модератора */}
            {canModerate && !onReject && !onChanges && (
                <div className="itemActionsRow">
                    <div className="itemActions">
                        <button type="button" className="itemBtn itemBtn-approve" onClick={toggleApprove}>
                            Одобрить
                        </button>
                        <button type="button" className="itemBtn itemBtn-reject" onClick={toggleReject}>
                            Отклонить
                        </button>
                        <button type="button" className="itemBtn itemBtn-changes" onClick={toggleChanges}>
                            Доработка
                        </button>
                    </div>
                </div>
            )}

            {/* форма причины (отклонение / доработка) */}
            {canModerate && (onReject || onChanges) && (
                <section className="itemDecision">
                    <h3>{onReject ? 'Отклонение' : 'Доработка'}</h3>

                    <div>Укажите причину:</div>
                    <div className="itemDecision-reasons">
                        <label className="itemRadio">
                            <input
                                type="radio"
                                name="reason"
                                value="Запрещенный товар"
                                checked={reasonOfRej === 'Запрещенный товар'}
                                onChange={e => setReasonOfRej(e.currentTarget.value)}
                            />
                            Запрещенный товар
                        </label>

                        <label className="itemRadio">
                            <input
                                type="radio"
                                name="reason"
                                value="Неверная категория"
                                checked={reasonOfRej === 'Неверная категория'}
                                onChange={e => setReasonOfRej(e.currentTarget.value)}
                            />
                            Неверная категория
                        </label>

                        <label className="itemRadio">
                            <input
                                type="radio"
                                name="reason"
                                value="Некорректное описание"
                                checked={reasonOfRej === 'Некорректное описание'}
                                onChange={e => setReasonOfRej(e.currentTarget.value)}
                            />
                            Некорректное описание
                        </label>

                        <label className="itemRadio">
                            <input
                                type="radio"
                                name="reason"
                                value="Проблемы с фото"
                                checked={reasonOfRej === 'Проблемы с фото'}
                                onChange={e => setReasonOfRej(e.currentTarget.value)}
                            />
                            Проблемы с фото
                        </label>

                        <label className="itemRadio">
                            <input
                                type="radio"
                                name="reason"
                                value="Подозрение на мошенничество"
                                checked={reasonOfRej === 'Подозрение на мошенничество'}
                                onChange={e => setReasonOfRej(e.currentTarget.value)}
                            />
                            Подозрение на мошенничество
                        </label>

                        <label className="itemRadio">
                            <input
                                type="radio"
                                name="reason"
                                value="Другое"
                                checked={reasonOfRej === 'Другое'}
                                onChange={e => setReasonOfRej(e.currentTarget.value)}
                            />
                            Другое
                        </label>
                    </div>

                    {reasonOfRej === 'Другое' && (
                        <input
                            type="text"
                            className="itemDecision-input"
                            placeholder="Укажите причину"
                            value={customReasonOfRej}
                            onChange={e => setCustomReasonOfRej(e.target.value)}
                        />
                    )}

                    <div className="itemDecision-actions">
                        {onReject && (
                            <button
                                type="button"
                                className="itemBtn itemBtn-reject"
                                disabled={!isSendable}
                                onClick={toggleSendReject}
                            >
                                Отправить отклонение
                            </button>
                        )}

                        {onChanges && (
                            <button
                                type="button"
                                className="itemBtn itemBtn-changes"
                                disabled={!isSendable}
                                onClick={toggleSendChanges}
                            >
                                Отправить на доработку
                            </button>
                        )}
                    </div>
                </section>
            )}

            {/* футер: назад / пред / след */}
            <div className="itemFooter">
                <Link to="/list" className="itemBackLink">
                    ← К списку
                </Link>

                {ids && typeof index === 'number' && (
                    <div className="itemPrevNext">
                        <button
                            type="button"
                            className="itemPrevNext-btn"
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
                            className="itemPrevNext-btn"
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
        </div>
    )
}

export default ItemPage