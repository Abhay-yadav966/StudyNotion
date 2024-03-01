import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import {categories} from "../apis"

export const getCatalogPageData = async (categoryId) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try{
        const responce = await apiConnector("POST", categories.GETCATALOGPAGEDETAILPAGE_API,  categoryId);

        if( !responce?.data?.success ){
            throw new Error("Could not fetch category page data")
        }

        result = responce?.data?.data;
    } 
    catch(error){
        console.log("CATAGORY PAGE DATA API ERROR....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result; 
} 