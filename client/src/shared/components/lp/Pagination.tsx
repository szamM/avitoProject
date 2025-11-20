type PaginationProps = {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => {

    return <div>
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}> Назад </button>
        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}> Вперед </button>
        <p>Страница {currentPage} из {totalPages}</p>
    </div>
}

export default Pagination