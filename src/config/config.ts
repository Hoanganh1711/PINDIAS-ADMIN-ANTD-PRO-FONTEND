import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("accessToken");
const accessToken = "Bearer " + token;

const pindiasDomain = "https://v2.pindias.com";
const authorizationDomain = "https://accounts.metawayholdings.com";

// API Category
const categoriesApi = "/api/v2/category/all";

// API Investor
const allInvestorApi = "/api/v2/investor/all";

// API Project
const allProjectApi = "/api/v2/project/all";

// API Real Estate
const allNewsRealEstate = "/api/v2/real-estate/me";
const fetchRealEstateInfo = "/api/v2/real-estate";
const updateRealEstateStatus = "/api/v2/real-estate/update-status";
const deleteRealEstate = "/api/v2/real-estate";
const searchFilterRealEstate = "/api/v2/real-estate/search";
const uploadImage = "/api/v2/image/upload";

// API for user roles
const userRolesAllRealEstateApi = "/api/v2/real-estate/me";

export {
    pindiasDomain,
    accessToken,
    categoriesApi,
    allInvestorApi,
    allProjectApi,
    fetchRealEstateInfo,
    allNewsRealEstate,
    deleteRealEstate,
    authorizationDomain,
    uploadImage,
    searchFilterRealEstate,
    userRolesAllRealEstateApi,
    updateRealEstateStatus
};
