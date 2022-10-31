import {useMemo} from "react";

export const useSortedBids = (bids, sort) => {
    const sortedBids = useMemo(() => {
        if(sort) {
            if (!sort.localeCompare("opened"))
            {
              let bidsTemp = [...bids]
                bidsTemp.forEach(function(item,i){
                  if(!item.unit_id){
                    let e = bidsTemp.splice(i, 1);
                    bidsTemp.unshift(e[0]);
                  }
                });
                return bidsTemp;
            } else if(!sort.localeCompare("urgent_unit_id")){
              let bidsTemp = [...bids]
                bidsTemp.forEach(function(item,i){
                  if(!item.unit_id && item.is_urgent){
                    let e = bidsTemp.splice(i, 1);
                    bidsTemp.unshift(e[0]);
                  }
                });
                return bidsTemp;
            } else if(!sort.localeCompare("closed"))
            {
              let bidsTemp = [...bids]
                bidsTemp.forEach(function(item,i){
                  if(item.unit_id){
                    let e = bidsTemp.splice(i, 1);
                    bidsTemp.unshift(e[0]);
                  }
                });
                return bidsTemp;
            }


            else return [...bids].sort((a, b) => a["created_at"].localeCompare(b["created_at"])).reverse()
        }
        return bids;
    }, [sort, bids])

    return sortedBids;
}

export const useBids = (bids, sort, query) => {
    const sortedBids = useSortedBids(bids, sort);

    const sortedAndSearchedBids = useMemo(() => {
        return sortedBids.filter(bid => bid.nomination_name.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedBids])

    return sortedAndSearchedBids;
}
