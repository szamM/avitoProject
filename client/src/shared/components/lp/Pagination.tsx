import "./pagination.css"

type PaginationProps = {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => {

    return <div className={"pagination"}>
        <div className={"buttonsMove"}>
            <button className={"navigation"} disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>◀ Назад </button>
            <button className={"navigation"} disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}> Вперед ▶</button>
        </div>
        <p>Страница {currentPage} из {totalPages}</p>
    </div>

}

export default Pagination