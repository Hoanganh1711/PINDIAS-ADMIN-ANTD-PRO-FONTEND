import Cookies from "universal-cookie";
import { authorizationDomain } from "../config/config";

const cookies = new Cookies();

const tokenExpiredHandler = () => {
    // If working in development mode, local returns true
    const local = window.location.href.includes("localhost:");

    // remove token from cookies
    if (local) {
        cookies.remove("accessToken", { path: "/" });
    } else {
        cookies.remove("accessToken", { path: "/", domain: ".pindias.com" });
    }

    const continueLink = window.location.href;

    // redirect to login url
    const loginUrl = `${authorizationDomain}/service/login?service=AGENT_METAWAY${local ? `&local=${local}` : ""}&continue=${continueLink}`;

    window.location.href = loginUrl;
};

const executeJsonFetch = async (link: string, options: any, setLoading: any, functionName: string) => {
    try {
        const response = await fetch(link, options);
        if (response.status === 403 || response.status === 401) {
            // token expired
            tokenExpiredHandler();
        } else if (response.status === 200) {
            const data = await response.json();
            return {
                status: response.status,
                data,
            };
        } else {
            const data = await response.json();
            return {
                status: response.status,
                data: data.message,
            };
        }
    } catch (error) {
        console.log(error, `catch ${functionName} error`);
    } finally {
        if (setLoading) {
            // return setLoading(false);
            setLoading(false);
        }
    }
};

const executeTextFetch = async (link: string, options: any, setLoading: any, functionName: string) => {
    try {
        const response = await fetch(link, options);
        if (response.status === 403 || response.status === 401) {
            // token expired
            tokenExpiredHandler();
        } else if (response.status === 200) {
            const data = await response.text();
            return {
                status: response.status,
                data,
            };
        } else {
            const data = await response.json();
            return {
                status: response.status,
                data: data.message,
            };
        }
    } catch (error) {
        console.log(error, `catch ${functionName} error`);
    } finally {
        if (setLoading) setLoading(false);
    }
};

export { executeJsonFetch, executeTextFetch, tokenExpiredHandler };
