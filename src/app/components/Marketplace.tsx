'use client'

import { useRouter } from 'next/router';
import React from 'react';

type SearchType = "city" | "mall" | "brand" | "state";

type SearchResultProps = {
    searchType: SearchType;
    term: string;
};

export default function Marketplace({ term, searchType }: SearchResultProps) {
    return (
        <section className=" section section-searchform index-1">
            <div className="row row-text normal index-1">
                <h1 id="page_title_message_success" style={{ "display": "block" }}>Marketplace <a href={`/search/${searchType}/${term}`} className="capitalize">{term}</a></h1>
            </div>
        </section>
    );
}
