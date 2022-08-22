import { executeJsonFetch, executeTextFetch } from "../Hooks/fetchHandler";
import { pindiasDomain, accessToken, allProjectApi } from "../config/config";

const path = "/api/v2/project";

const fetchGetAllProjects = (searchItems: any, setLoading: any) => {
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
    return executeJsonFetch(`${pindiasDomain}${allProjectApi}?${params}`, options, false, "fetchGetAllProjects");
};

export { fetchGetAllProjects };
