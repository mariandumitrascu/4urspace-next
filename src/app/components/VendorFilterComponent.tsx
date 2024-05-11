import { useState } from "react";
import { CategoryFilter, ParentCategoryFilter, VendorFilter } from "../common/filter";

export type VendorFilterProps = {
    filter: ParentCategoryFilter;
    category: keyof VendorFilter;
    onSelectFilter: (categoryName: keyof VendorFilter, subFilter: CategoryFilter) => void;
    onShowMore: (categoryName: keyof VendorFilter, showMore: boolean) => void;
}

export default function VendorFilterComponent({ filter, category, onSelectFilter, onShowMore }: VendorFilterProps) {
    const onClickHandler = (categoryFilter: CategoryFilter) => {
        categoryFilter.selected = !categoryFilter.selected;
        onSelectFilter?.(category, categoryFilter)
    }

    const onShowMoreHandler = () => {
        onShowMore?.(category, !filter.showMore);
    }

    const filters = filter.filters.slice(0, filter.showMore ? 11 : filter.filters.length);
    return (
        <li className="parent parent-show" id="vendortype_filter_parent">
            <a className={`text-show ${filter.expanded ? "" : "active"}`}></a><h2>{filter.categoryName}</h2>
            {filter.expanded && filter.filters.length && (
                <ul style={{ "display": "block" }}>
                    <>
                        {
                            filters.map(f => (
                                <li key={`sub-${f.filterKey}`}>
                                    <input className="large" type="checkbox" data-filtertype="vendortype" />
                                    <span className={`text-checkbox ${f.selected ? "active" : ""}`} onClick={() => onClickHandler(f)}></span><span className="text-checkbox"></span>
                                    <label dangerouslySetInnerHTML={{ __html: `${f.filterName} (${f.projectsCount})` }}></label>
                                </li>
                            ))
                        }
                        {filter.showMore && filter.filters.length > 11 && (
                            <li><button className="more-button" onClick={onShowMoreHandler}>more...</button></li>
                        )}
                        {!filter.showMore && filter.filters.length > 11 && (
                            <li><button className="more-button" onClick={onShowMoreHandler}>less...</button></li>
                        )}

                    </>
                </ul>
            )}
        </li>
    );
}
