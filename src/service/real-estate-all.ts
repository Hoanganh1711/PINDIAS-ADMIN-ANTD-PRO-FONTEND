import { message } from "antd";
import {
    pindiasDomain,
    accessToken,
    allNewsRealEstate,
    searchFilterRealEstate,
    userRolesAllRealEstateApi,
    fetchRealEstateInfo,
    updateRealEstateStatus,
    getRealEstateByStatus
} from "../config/config";
import { executeJsonFetch, executeTextFetch } from "../Hooks/fetchHandler";

const getAllNewsRealEstate = (searchItems: any, setLoading: any) => {
    setLoading(true);
    let params = "";
    for (const key in searchItems) {
        if (searchItems[key] || searchItems[key] === 0) {
            params += `${key}=${searchItems[key]}&`;
        }
    }
    // if last character is &, remove it
    if (params.charAt(params.length - 1) === "&") {
        params = params.slice(0, params.length - 1);
    }

    const options: any = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: accessToken },
    };
    return executeJsonFetch(`${pindiasDomain}${allNewsRealEstate}?${params}`, options, false, "getAllNewsRealEstate");
};

const fetchGetRealEstateDetails = (realEstateId: any, setLoading: any = false) => {
    const options: any = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: accessToken },
    };
    return executeJsonFetch(`${pindiasDomain}${fetchRealEstateInfo}/${realEstateId}`, options, setLoading, "fetchGetRealEstateDetails");
};

const getAllNewsRealEstateSearchFilter = (searchItems: any, setLoading: any, searchFilter: any) => {
    setLoading(true);
    let params = "";
    for (const key in searchItems) {
        if (searchItems[key] || searchItems[key] === 0) {
            params += `${key}=${searchItems[key]}&`;
        }
    }
    // if last character is &, remove it
    if (params.charAt(params.length - 1) === "&") {
        params = params.slice(0, params.length - 1);
    }

    const options: any = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: accessToken },
    };
    if (searchFilter === true) {
        return executeJsonFetch(`${pindiasDomain}${searchFilterRealEstate}?${params}`, options, false, "getAllNewsRealEstateSearchFilter");
    } else {
        return executeJsonFetch(`${pindiasDomain}${allNewsRealEstate}?${params}`, options, false, "getAllNewsRealEstateSearchFilter");
    }
};

const fetchGetAllRealEstateForUserRoles = (searchItems: any, setLoading: any) => {
    setLoading(true);
    let params = "";
    for (const key in searchItems) {
        if (searchItems[key] || searchItems[key] === 0) {
            params += `${key}=${searchItems[key]}&`;
        }
    }
    // if last character is &, remove it
    if (params.charAt(params.length - 1) === "&") {
        params = params.slice(0, params.length - 1);
    }

    const options: any = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: accessToken },
    };
    return executeJsonFetch(`${pindiasDomain}${userRolesAllRealEstateApi}`, options, false, "fetchGetAllProjects");
};

const fetchChangeRealEstateStatus = async (userIdArray: any, status: string, message: string, setLoading: any) => {
    const body = JSON.stringify({
        ids: userIdArray,
        status: status,
        message: message,
    });
    const options: any = {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: accessToken },
        body: body,
    };
    return executeTextFetch(`${pindiasDomain}${updateRealEstateStatus}`, options, setLoading, "fetchChangeRealEstateStatus");
};

const fetchGetRealEstatesByStatus = (filters: any, status: string, setLoading: any) => {
    let params = ''
    for (const key in filters) {
        if (filters[key] || filters[key] === 0 || filters[key] === false) {
            params += `${key}=${filters[key]}&`
        }
    }
    // if last character is &, remove it
    if (params.charAt(params.length - 1) === '&') {
        params = params.slice(0, params.length - 1)
    }
    const options: any = {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: accessToken },
    };
    return executeJsonFetch(`${pindiasDomain}${getRealEstateByStatus}/${status}?${params}`, options, setLoading, "fetchGetRealEstatesByStatus");
};

export {
    getAllNewsRealEstate,
    fetchGetRealEstateDetails,
    fetchGetAllRealEstateForUserRoles,
    fetchChangeRealEstateStatus,
    getAllNewsRealEstateSearchFilter,
    fetchGetRealEstatesByStatus
    
};
