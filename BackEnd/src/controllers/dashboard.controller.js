import Data from "../models/Data.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespose.js";
import { asyncHandler } from "../utils/asyncHandler.js";


//To get distinct Values from field, To get dynamical for filter
const getFilter=asyncHandler(async(req,res)=>{

    const { field } = req.params

    if(!field){
        throw new ApiError(500, "Please provide the filed to get the distinct Values ")
    }
    const distinctValues = await Data.distinct(field);

    if(!distinctValues){
        throw new ApiError(500,"Error while getting distinct Values from DB")
    }

    return res.status(200).json(new ApiResponse(200, distinctValues,`Successful get ${field}`))
})


const getAllValue=asyncHandler(async(req,res)=>{
 
    let {page,limit,sort}=req.body;
   
    let skip=(page-1)*(limit||10);
    sort = sort || 'relevance';

    const getAllData =await Data.find().skip(skip).limit(limit||10).sort(sort)

    // const getAllData = await Data.find()
    // console.log(getAllData);
    if (getAllData.length === 0){
        throw new ApiError(500, "Error while getting all Data Values from DB");
    }

    return res.status(200).json(new ApiResponse(200, getAllData, `Successful get getAllData ${getAllData.length}`));

})


const quickSearchBaseonField=asyncHandler(async(req,res)=>{
    const { searchQuery, field, page, limit  }=req.body;
    let skip = (page - 1) * (limit || 10);
    let query = { [field]: searchQuery }
    let pages=null; 

    //Pagination
       pages= await Data.find(query)
        pages = (Math.ceil((pages.length )/ limit))
    

    let dataOfSearch = await Data.find(query).skip(skip).limit(limit || 10);

    if(dataOfSearch.length===0){
        return res.status(400).json(new ApiResponse(400, 'Data Not Found', `Data Not Found`));
  
    }else{
        return res.status(200).json(new ApiResponse(200, [dataOfSearch, pages], `Successful get getAllData  ${dataOfSearch.length}`));
    }
})


const FilterMutiple=asyncHandler(async(req,res)=>{

    let { topic, sector, region, country, pestle, end_year, start_year, page, limit, searchQuery, }=req.body
    let skip = (page - 1) * (limit || 10);

    let searchField =searchQuery?.field
    let searchquery= searchQuery?.query

    let baseQueryForFilter={}
    if (searchField && searchquery) baseQueryForFilter[searchField] = searchquery;
    if (topic) baseQueryForFilter.topic=topic
    if (sector) baseQueryForFilter.sector = sector
    if (region) baseQueryForFilter.region = region
    if (pestle) baseQueryForFilter.pestle = pestle
    if (country) baseQueryForFilter.country = country
    if (end_year) baseQueryForFilter.end_year = end_year
    if (start_year) baseQueryForFilter.start_year = start_year
    // console.log('baseQueryForFilter',baseQueryForFilter);
    //Pagination
    let pages = null;
  
    pages = await Data.find(baseQueryForFilter)
    pages = (Math.ceil((pages.length) / limit))

    const result = await Data.find(baseQueryForFilter).skip(skip).limit(limit || 10)
    // console.log('result',result);
    if (result.length === 0) {
        return res.status(400).json(new ApiResponse(400, 'Data Not Found', `Data Not Found`));
    } else {
        return res.status(200).json(new ApiResponse(200, [result, pages], `Successful get getAllData ${result.length}`));
    }
})

const recentPublished = asyncHandler(async (req, res) => {
    const recent = await Data.find().sort({ published: -1 }).limit(20);
    return res.status(200).json(new ApiResponse(200, recent ,'suceesfully get data'))
})

const topEvents = asyncHandler(async (req, res) => {
    const topEventsData = await Data.find({ relevance: { $ne: '' } }).sort({ relevance: 1 }).limit(20)


    return res.status(200).json(new ApiResponse(200, topEventsData, 'Successfully fetched top events data.'));
});


const endingDate = asyncHandler(async (req, res) => {
    const endingDateData = await Data.find({ end_year: { $ne: "" } }).sort({ end_year: 1 }).limit(20);
    return res.status(200).json(new ApiResponse(200, endingDateData ,'suceesfully get data'))   
})


const Demochart = asyncHandler(async (req, res) => {
    try {
        // Fetch intensity data from the database
        const intensities = await Data.find({}, 'intensity');

        // Process the data as needed for the chart
        const intensityCounts = {}; // Object to store intensity counts

        // Count the frequency of each intensity value
        intensities.forEach(({ intensity }) => {
            if (intensity !== null && intensity !== undefined) {
                // Increment count for each intensity value
                intensityCounts[intensity] = (intensityCounts[intensity] || 0) + 1;
            }
        });

        // Convert intensityCounts object into arrays of labels and data
        const labels = Object.keys(intensityCounts); // Intensity values
        const data = Object.values(intensityCounts); // Frequency counts

        // Return the processed data as JSON response
        res.json({ labels, data });
    } catch (error) {
        console.error('Error fetching intensity chart data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


export {
    getFilter,
    getAllValue,
    quickSearchBaseonField,
    FilterMutiple,
    recentPublished,
    topEvents,
    endingDate,
    Demochart

}