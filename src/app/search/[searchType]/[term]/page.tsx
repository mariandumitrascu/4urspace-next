'use client'

import { Vendor } from "@/app/common/types";
import VendorComponent from "@/app/components/vendor";
import { useEffect, useState } from "react";

type SearchType = "city" | "mall" | "brand" | "state";
type SearchParams = {
    searchType: SearchType;
    term: string;
}

type SearchResultProps = {
    params: SearchParams;
};


export default function SearchResult({ params: { term, searchType } }: SearchResultProps) {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/vendors?q=${term}&t=${searchType}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Vendor[] = await response.json();
                setVendors(data);
            } catch (error) {
                console.error('Failed to fetch vendors:', error);
            } finally { }
        };

        fetchData();
    }, []);

    return (
        <section className="section section-searchresult" id="section-searchresult">
            <div className="row row-form normal">
                <div className="text-box">
                    <h1><a className="text-show active"></a>Filters</h1>
                </div>
            </div>
            <div className="row row-title normal">
                <h1 id="vendorcount">{vendors.length} Found</h1>
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
                        vendors && vendors.length && (
                            vendors.map((v) => <VendorComponent vendor={v} term={term} key={`vendor-${v.cid}`} />)
                        )
                    }
                </ul>
            </div>
        </section>
    );
}

//export default SearchResult;