import { useState } from "react";
import { CategoryFilter, ParentCategoryFilter, VendorFilter } from "../common/filter";

export type VendorFilterProps = {
    filter: ParentCategoryFilter;
    category: keyof VendorFilter;
    onSelectFilter: (categoryName: keyof VendorFilter, subFilter: CategoryFilter) => void;
}

export default function VendorFilterComponent({ filter, category, onSelectFilter }: VendorFilterProps) {
    const onClickHandler = (categoryFilter: CategoryFilter) => {
        categoryFilter.selected = !categoryFilter.selected;
        onSelectFilter?.(category, categoryFilter)
    }

    return (
        <li className="parent parent-show" id="vendortype_filter_parent">
            <a className={`text-show ${filter.expanded ? "" : "active"}`}></a><h2>{filter.categoryName}</h2>
            {filter.expanded && filter.filters.length && (
                <ul style={{ "display": "block" }}>
                    {
                        filter.filters.map(f => (
                            <li key={`sub-${f.filterKey}`}>
                                <input className="large" type="checkbox" data-filtertype="vendortype" />
                                <span className={`text-checkbox ${f.selected ? "active" : ""}`} onClick={() => onClickHandler(f)}></span><span className="text-checkbox"></span>
                                <label dangerouslySetInnerHTML={{ __html: `${f.filterName} (${f.projectsCount})` }}></label>
                            </li>
                        ))
                    }
                </ul>
            )}
        </li>
    );
}
