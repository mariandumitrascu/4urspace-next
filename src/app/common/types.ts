export type Vendor = {
    cid?: string;
    cn?: string;
    pic?: string;
    bid?: string;
    bn?: string;
    pc?: string;
    prjs?: string;
    citys: string[];
    malls: string[];
    brands: string[];
    bcatgs?: string[];
    nr?: string;
    ar?: string;
    ip?: string;
    pr?: string;
    un?: string;
    countryid?: string;
    statecode?: string;
    otherstate?: string;
    city?: string;
    streetname?: string;
    zipcode?: string;
};

export type Mall = {
    cid?: string;
    pid?: string;
    lid?: string;
    bid?: string;
    brand?: string;
    mid?: string;
    mall?: string;
    st?: string;
    city?: string;
    area?: string;
    sc?: string;
    ip?: string;
};

export type Category = {
    cid?: string;
    pid?: string;
    lid?: string;
    cgid?: string;
    cgname?: string;
};
