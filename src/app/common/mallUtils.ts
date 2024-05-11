import { Category, Mall } from "./types";

export function groupAndCountCities(malls: Mall[]): { city: string; count: number }[] {
    // Step 1: Filter out only those entries that have both 'cid' and 'city'
    const filteredMalls = malls.filter(mall => mall.cid && mall.city);

    // Step 2: Group by 'cid'
    const cidGroup = new Map<string, Mall[]>();
    filteredMalls.forEach(mall => {
        if (!cidGroup.has(mall.cid!)) {
            cidGroup.set(mall.cid!, []);
        }
        cidGroup.get(mall.cid!)!.push(mall);
    });

    // Step 3: Regroup by 'city'
    const cityGroup = new Map<string, Set<string>>();
    cidGroup.forEach((value, key) => {
        value.forEach(mall => {
            if (!cityGroup.has(mall.city!)) {
                cityGroup.set(mall.city!, new Set());
            }
            cityGroup.get(mall.city!)!.add(key);
        });
    });

    // Step 4: Prepare final count result
    const result: { city: string; count: number }[] = [];
    cityGroup.forEach((cidSet, city) => {
        result.push({ city, count: cidSet.size });
    });

    return result;
}

export function groupAndCountByMall(malls: Mall[]): { mid: string; mall: string; count: number }[] {
    // Step 1: Filter out only those entries that have both 'mid', 'mall' and ensure they are not empty
    const filteredMalls = malls.filter(mall => mall.mid && mall.mall && mall.mid.trim() !== "" && mall.mall.trim() !== "");

    // Step 2: Group by 'mid'
    const midGroup = new Map<string, Mall[]>();
    filteredMalls.forEach(mall => {
        if (!midGroup.has(mall.mid!)) {
            midGroup.set(mall.mid!, []);
        }
        midGroup.get(mall.mid!)!.push(mall);
    });

    // Step 3: Regroup by 'mall'
    const mallGroup = new Map<string, Map<string, Set<string>>>();
    midGroup.forEach((values, mid) => {
        values.forEach(mall => {
            if (!mallGroup.has(mid)) {
                mallGroup.set(mid, new Map());
            }
            if (!mallGroup.get(mid)!.has(mall.mall!)) {
                mallGroup.get(mid)!.set(mall.mall!, new Set());
            }
            if (mall.cid) {
                mallGroup.get(mid)!.get(mall.mall!)!.add(mall.cid);
            }
        });
    });

    // Step 4: Prepare final count result
    const result: { mid: string; mall: string; count: number }[] = [];
    mallGroup.forEach((malls, mid) => {
        malls.forEach((cidSet, mall) => {
            result.push({ mid, mall, count: cidSet.size });
        });
    });

    return result;
}

export function groupAndCountByBrand(malls: Mall[]): { bid: string; brand: string; count: number }[] {
    // Step 1: Filter out only those entries that have both 'bid', 'brand' and ensure they are not empty
    const filteredMalls = malls.filter(mall => mall.bid && mall.brand && mall.bid.trim() !== "" && mall.brand.trim() !== "");

    // Step 2: Group by 'bid'
    const bidGroup = new Map<string, Mall[]>();
    filteredMalls.forEach(mall => {
        if (!bidGroup.has(mall.bid!)) {
            bidGroup.set(mall.bid!, []);
        }
        bidGroup.get(mall.bid!)!.push(mall);
    });

    // Step 3: Regroup by 'brand'
    const brandGroup = new Map<string, Map<string, Set<string>>>();
    bidGroup.forEach((values, bid) => {
        values.forEach(mall => {
            if (!brandGroup.has(bid)) {
                brandGroup.set(bid, new Map());
            }
            if (!brandGroup.get(bid)!.has(mall.brand!)) {
                brandGroup.get(bid)!.set(mall.brand!, new Set());
            }
            if (mall.cid) {
                brandGroup.get(bid)!.get(mall.brand!)!.add(mall.cid);
            }
        });
    });

    // Step 4: Prepare final count result
    const result: { bid: string; brand: string; count: number }[] = [];
    brandGroup.forEach((brands, bid) => {
        brands.forEach((cidSet, brand) => {
            result.push({ bid, brand, count: cidSet.size });
        });
    });

    return result;
}

export function groupAndCountByBusinessCategory(categories: Category[]): { cgid: string; cgname: string; count: number }[] {
    // Step 1: Filter out only those entries that have both 'cgid' and 'cgname' and ensure they are not empty
    const filteredCategories = categories.filter(cat => cat.cgid && cat.cgname && cat.cgid.trim() !== "" && cat.cgname.trim() !== "");

    // Step 2: Group by 'cgid'
    const cgidGroup = new Map<string, Category[]>();
    filteredCategories.forEach(cat => {
        if (!cgidGroup.has(cat.cgid!)) {
            cgidGroup.set(cat.cgid!, []);
        }
        cgidGroup.get(cat.cgid!)!.push(cat);
    });

    // Step 3: Regroup by 'cgname'
    const cgnameGroup = new Map<string, Map<string, Set<string>>>();
    cgidGroup.forEach((values, cgid) => {
        values.forEach(cat => {
            if (!cgnameGroup.has(cgid)) {
                cgnameGroup.set(cgid, new Map());
            }
            if (!cgnameGroup.get(cgid)!.has(cat.cgname!)) {
                cgnameGroup.get(cgid)!.set(cat.cgname!, new Set());
            }
            if (cat.cid) {
                cgnameGroup.get(cgid)!.get(cat.cgname!)!.add(cat.cid);
            }
        });
    });

    // Step 4: Prepare final count result
    const result: { cgid: string; cgname: string; count: number }[] = [];
    cgnameGroup.forEach((names, cgid) => {
        names.forEach((cidSet, cgname) => {
            result.push({ cgid, cgname, count: cidSet.size });
        });
    });

    return result;
}