import {useMemo} from "react";

export const useSortedUnits = (units, sort) => {
    const sortedUnits = useMemo(() => {
        if(sort) {
            if(!sort.localeCompare("user_name"))
            {
              let unitsTemp = [...units]
                unitsTemp.forEach(function(item,i){
                  if(!item.user_name){
                    let e = unitsTemp.splice(i, 1);
                    unitsTemp.unshift(e[0]);
                  }
                });
                return unitsTemp;
            }
            else if (!sort.localeCompare("breaked_at"))
            {
              let unitsTemp = [...units]
                unitsTemp.forEach(function(item,i){
                  if(item.breaked_at){
                    let e = unitsTemp.splice(i, 1);
                    unitsTemp.unshift(e[0]);
                  }
                });
                return unitsTemp;
            }
            else return [...units].sort((a, b) => a["created_date"].localeCompare(b["created_date"])).reverse()
        }
        return units;
    }, [sort, units])

    return sortedUnits;
}

export const useUnits = (units, sort, query) => {
    const sortedUnits = useSortedUnits(units, sort);

    const sortedAndSearchedUnits = useMemo(() => {
        return sortedUnits.filter(unit => unit.nomination_name.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedUnits])

    return sortedAndSearchedUnits;
}
