import { useMemo } from 'react';

interface PagerData {
    count: number;
    pageSize: number;
    page: number;
}

type PagerParams = {
    data: PagerData | null | undefined;
    onPageChange: (page: number) => void;
    hideWhenOnePage?: boolean | null;
};

export default function Pager(params: PagerParams) {
    if (!params.data) {
        return <></>;
    }

    const { count, pageSize, page } = params.data;

    if (params.hideWhenOnePage && page == 1 && count <= pageSize) {
        return <></>;
    }

    const pageCount = Math.ceil(count / pageSize);

    function pageHandler(i: number) {
        params.onPageChange(i);
    }

    const pages = Array(pageCount);
    return (
        <ul className="text-list">
            {
                pages.map((_, index) => (<li><button className={index == page ? "page-button-active" : "page-button"} >{index}</button></li>))
            }
        </ul>
    );

}
