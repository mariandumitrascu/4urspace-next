import { useMemo } from 'react';

type PagerParams = {
    count: number;
    page: number;
    pageSize?: number;
    onPageChange: (page: number) => void;
    hideWhenOnePage?: boolean | null;
};

export default function Pager(params: PagerParams) {
    const { count, pageSize = 12, page } = params;
    if (params.hideWhenOnePage && page == 1 && count <= pageSize) {
        return <></>;
    }
    const pageCount = Math.ceil(count / pageSize);

    function pageHandler(i: number) {
        params.onPageChange(i);
    }

    const pages = Array.from({ length: pageCount }, (_, index) => index);

    return (
        <ul className="text-list">
            {
                pages.map((_, index) => <li key={index}><button onClick={() => (index + 1) !== page ? pageHandler(index + 1) : undefined} className={(index + 1) === page ? "page-button-active" : "page-button"} >{index + 1}</button></li>)
            }
        </ul>
    );

}
