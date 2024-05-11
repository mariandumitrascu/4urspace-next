'use client'

import { CategoryFilter, ParentCategoryFilter, VendorFilter } from "@/app/common/filter";
import { Category, Mall, Vendor } from "@/app/common/types";
import Marketplace from "@/app/components/Marketplace";
import SearchHeader from "@/app/components/Header";
import VendorComponent from "@/app/components/Vendor";
import VendorsFiltersComponent from "@/app/components/VendorsFiltersComponent";
import { useEffect, useState } from "react";
import { groupAndCountByBrand, groupAndCountByBusinessCategory, groupAndCountByMall, groupAndCountCities } from "@/app/common/mallUtils";

type SearchType = "city" | "mall" | "brand" | "state";
type SearchParams = {
    searchType: SearchType;
    term: string;
}

type SearchResultProps = {
    params: SearchParams;
};

export default function SearchResult({ params: { term, searchType } }: SearchResultProps) {
    const [globalFilter, setGlobalFilter] = useState<VendorFilter>();
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
    const [malls, setMalls] = useState<Mall[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch(`/api/vendors?q=${term}&t=${searchType}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Vendor[] = await response.json();
                return data;
            } catch (error) {
                console.error('Failed to fetch vendors:', error);
            } finally { }
        };

        const fetchMalls = async () => {
            try {
                const response = await fetch(`/api/malls?q=${term}&t=${searchType}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Mall[] = await response.json();
                return data;
            } catch (error) {
                console.error('Failed to fetch malls:', error);
            } finally { }
        }

        const fetchCategories = async () => {
            try {
                const response = await fetch(`/api/categories?q=${term}&t=${searchType}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Category[] = await response.json();
                return data;
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally { }
        }

        const fetchAllData = async () => {
            const vendorsList = await fetchVendors();
            const malls = await fetchMalls();
            const categories = await fetchCategories();

            vendorsList?.forEach(v => {
                v.brands = malls?.filter(m => m.cid == v.cid).map(m => m.bid ?? "") ?? [];

                v.malls = [...new Set(malls?.filter(m => m.cid == v.cid).map(m => m.mid ?? ""))] ?? [];
                v.citys = [...new Set(malls?.filter(m => m.cid == v.cid).map(m => m.city ?? ""))] ?? [];
                v.bcatgs = [...new Set(categories?.filter(m => m.cid == v.cid).map(m => m.cgid ?? ""))] ?? [];

                v.prjs = [...new Set(categories?.filter(m => m.cid == v.cid).map(m => m.pid ?? ""))] ?? [];
                v.prjs2 = [...new Set(malls?.filter(m => m.cid == v.cid).map(m => m.pid ?? ""))] ?? [];
            });

            const typeResult = vendorsList!.reduce((acc, vendor) => {
                if (!acc[vendor.bid]) {
                    acc[vendor.bid] = { filterKey: vendor.bid, filterName: vendor.bn, projectsCount: 0, selected: false };
                }
                acc[vendor.bid].projectsCount++;
                return acc;
            }, {} as { [bid: string]: { filterKey: string, filterName: string, projectsCount: number, selected: boolean } });

            const typeFilter = Object.values(typeResult).sort((a, b) => (a.filterName > b.filterName) ? 1 : (a.filterName < b.filterName) ? -1 : 0);

            const cityFilters = groupAndCountCities(malls!).map(r => ({ filterKey: r.city, filterName: r.city, projectsCount: r.count, selected: false }))
                .sort((a, b) => (a.filterName > b.filterName) ? 1 : (a.filterName < b.filterName) ? -1 : 0);

            const mallFilter = groupAndCountByMall(malls!).map(r => ({ filterKey: r.mid, filterName: r.mall, projectsCount: r.count, selected: false }))
                .sort((a, b) => (a.filterName > b.filterName) ? 1 : (a.filterName < b.filterName) ? -1 : 0);

            const brandFilter = groupAndCountByBrand(malls!).map(r => ({ filterKey: r.bid, filterName: r.brand, projectsCount: r.count, selected: false }))
                .sort((a, b) => (a.filterName > b.filterName) ? 1 : (a.filterName < b.filterName) ? -1 : 0);

            const businessCategoryFilter = groupAndCountByBusinessCategory(categories!).map(r => ({ filterKey: r.cgid, filterName: r.cgname, projectsCount: r.count, selected: false }))
                .sort((a, b) => (a.filterName > b.filterName) ? 1 : (a.filterName < b.filterName) ? -1 : 0);


            setGlobalFilter({
                typeFilter: { categoryName: "By Type", filters: typeFilter, expanded: true, showMore: true },
                cityFilter: { categoryName: "By City", filters: cityFilters, expanded: true, showMore: true },
                mallFilter: { categoryName: "By Mall", filters: mallFilter, expanded: true, showMore: true },
                brandFilter: { categoryName: "By Brand", filters: brandFilter, expanded: true, showMore: true },
                businessCategoryFilter: { categoryName: "By Business Category", filters: businessCategoryFilter, expanded: true, showMore: true },
            });

            setVendors(vendorsList ?? []);
            setFilteredVendors([...vendorsList!]);
            setMalls(malls ?? []);
            setCategories(categories ?? []);
        }

        fetchAllData();
    }, []);

    const updateFiltersHandler = (categoryName: keyof VendorFilter, subFilter: CategoryFilter) => {
        const filter = { ...globalFilter, [categoryName]: { ...globalFilter![categoryName] } };
        const filters = filter[categoryName]!.filters;
        const index = filters.findIndex(f => f.filterKey == subFilter.filterKey);
        filters[index] = subFilter;
        setGlobalFilter(filter as VendorFilter);
        applyGlobalFilter();
    }

    const applyGlobalFilter = () => {
        var vendorsList = [...vendors];
        const typeFilter = globalFilter?.typeFilter.filters.filter(k => k.selected).map(f => f.filterKey) ?? [];
        const cityFilter = globalFilter?.cityFilter.filters.filter(k => k.selected).map(f => f.filterKey) ?? [];
        const mallFilter = globalFilter?.mallFilter.filters.filter(k => k.selected).map(f => f.filterKey) ?? [];
        const brandFilter = globalFilter?.brandFilter.filters.filter(k => k.selected).map(f => f.filterKey) ?? [];
        const businessCategoryFilter = globalFilter?.businessCategoryFilter.filters.filter(k => k.selected).map(f => f.filterKey) ?? [];


        if (typeFilter.length != 0 || cityFilter.length != 0 || mallFilter.length != 0 || brandFilter.length != 0 || businessCategoryFilter.length != 0) {
            // by type:
            var result1 = vendorsList.filter(v => typeFilter.length == 0 || typeFilter.some(k => k == v.bid));
            if (typeFilter.length == 0)
                result1 = []

            // by city:
            // it should select first the records in malls where city == filter.key
            // then select the records in vendors where cid == malls.cid
            // this is not working corectly if i select multiple checkboxes
            var resultTemp2 = malls.filter(v => cityFilter.length == 0 || cityFilter.some(k => k == v.city));
            var result2 = vendorsList.filter(v => resultTemp2.length == 0 || resultTemp2.some(k => k.cid == v.cid));
            if (cityFilter.length == 0)
                result2 = []

            // by mall:
            // select first the records in malls that mid == filter.ley
            // then select the records in vendors where cid == malls.cid
            var resultTemp3 = malls.filter(v => mallFilter.length == 0 || mallFilter.some(k => k == v.mid));
            var result3 = vendorsList.filter(v => resultTemp3.length == 0 || resultTemp3.some(k => k.cid == v.cid));
            if (mallFilter.length == 0)
                result3 = []

            // by brand:
            // select first the records in malls that bid == filter.ley
            // then select the records in vendors where cid == malls.cid
            var resultTemp4 = malls.filter(v => brandFilter.length == 0 || brandFilter.some(k => k == v.bid));
            var result4 = vendorsList.filter(v => resultTemp4.length == 0 || resultTemp4.some(k => k.cid == v.cid));
            if (brandFilter.length == 0)
                result4 = []

            // by business category:
            // select first the records in categories that cgid == filter.ley
            // then select the records in vendors where cid == categories.cid
            var resultTemp5 = categories.filter(v => businessCategoryFilter.length == 0 || businessCategoryFilter.some(k => k == v.cgid));
            var result5 = vendorsList.filter(v => resultTemp5.length == 0 || resultTemp5.some(k => k.cid == v.cid));
            if (businessCategoryFilter.length == 0)
                result5 = []

            // aggregate, make distincst and sort the results by name
            // but should combine only if checkboxes are selected
            // this is working ok if both filterType and cityFilter have some checkboxes selected
            const combinedResults = [...result1, ...result2, ...result3, ...result4, ...result5];
            const uniqueMap = new Map();
            combinedResults.forEach(vendor => uniqueMap.set(vendor.cid, vendor));
            const uniqueResults = Array.from(uniqueMap.values());

            // setFilteredVendors(result1);
            setFilteredVendors(uniqueResults);
        } else {
            setFilteredVendors([...vendorsList]);
        }
    }

    const showMoreHandler = (categoryName: keyof VendorFilter, showMore: boolean) => {
        const filter = { ...globalFilter };
        filter[categoryName]!.showMore = showMore;
        setGlobalFilter(filter as VendorFilter);
    }

    return (
        <div className="nav_view" id="epage">
            <SearchHeader />
            <div className="container">
                <Marketplace term={term} searchType={searchType} />
                <section className="section section-searchresult" id="section-searchresult">
                    <div className="row row-form normal">
                        {globalFilter && (<VendorsFiltersComponent filter={globalFilter} onSelectFilter={updateFiltersHandler} onShowMore={showMoreHandler} />)}
                    </div>
                    <div className="row row-title normal">
                        <h1 id="vendorcount">{filteredVendors.length} Found</h1>
                        <ul className="text-list" id="pagination">
                            <li><a className="active">1</a>
                            </li><li><a >2</a></li>
                        </ul>
                        <div className="einvite" data-einvite="rfpvendors" data-max="5">
                            <form action="/dashboard/rfp" method="post" id="rfpform">
                                <input type="hidden" name="hdnaction" id="hdnaction" value="vendorsearch" />
                                <div className="einvite-section">
                                    <h2>Request a Proposal</h2>
                                    <p><span className="einvite-selected">0</span> <strong>Vendors selected</strong></p>
                                    <a className="einvite-submit">Next</a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row row-list">
                        <ul className="text-list match-parent" id="vendor_results">
                            {
                                filteredVendors && filteredVendors.length && (
                                    filteredVendors.map((v) => <VendorComponent vendor={v} term={term} key={`vendor-${v.cid}`} />)
                                )
                            }
                        </ul>
                    </div>
                </section>
            </div>
        </div>

    );
}
