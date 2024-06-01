import Data from "../models/Data.model.js";
import { ApiResponse } from "../utils/ApiRespose.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const ChartStart_year = asyncHandler(async(req,res)=>{
    let yearList = await Data.distinct("start_year")
    let info=[]

    for (let i = 0; i < yearList.length; i++) {
        if (yearList[i] == ''){
            continue;
        }
        let result = await Data.countDocuments({ start_year: yearList[i] });
        info.push({[yearList[i]]:result})
    }
    return res.status(200).json(new ApiResponse(200, info, 'suceesfully Chart  data'))
})

const ChartEnd_year = asyncHandler(async (req, res) => {
    let yearList = await Data.distinct("end_year")
    let info = []

    for (let i = 0; i < yearList.length; i++) {
        if (yearList[i] == '') {
            continue;
        }
        let result = await Data.countDocuments({ end_year: yearList[i] });
        info.push({ [yearList[i]]: result })
    }
    return res.status(200).json(new ApiResponse(200, info, 'suceesfully Chart  data'))
})

const chartSectorAndRelevance = asyncHandler(async (req, res) => {
  
        const result = await Data.aggregate([
            {
                $group: {
                    _id: '$sector', // Group by sector
                    sector: { $first: '$sector' },
                    totalRelevance: { $sum: '$relevance' },
                    average: { $avg: '$relevance' },
                    documentCount: { $sum: 1 }
                }
            }
        ]);

    

    res.status(200).json(new ApiResponse(200, result , 'suceesfully Chart  data'));
});

const chartsectorAndLikelihood = asyncHandler(async (req, res) => {
   
        const result = await Data.aggregate([
            {
                $group: {
                    _id: '$sector', // Group by sector
                    sector: { $first: '$sector' },
                    totalRelevance: { $sum: '$likelihood' },
                    average: { $avg: '$likelihood' },
                    documentCount: { $sum: 1 }
                }
            }
        ]);

    res.status(200).json(new ApiResponse(200,  result , 'suceesfully Chart  data'));
});

const chartsectorAndIntensity = asyncHandler(async (req, res) => {
        const result = await Data.aggregate([
            {
                $group: {
                    _id: '$sector', // Group by sector
                    sector: { $first: '$sector' },
                    totalRelevance: { $sum: '$intensity' },
                    average: { $avg: '$intensity' },
                    documentCount: { $sum: 1 }
                }
            }
        ]);

    res.status(200).json(new ApiResponse(200, result, 'suceesfully Chart  data'));
});

const chartPieCountry = asyncHandler(async (req, res) => {
    const results = await Data.aggregate([
        {
            $group: {
                _id: '$country', 
                country: { $first: '$country' },
                documentCount: { $sum: 1 } 
            }
        },
        {
            $sort: { documentCount: -1 } 
        }
    ]);

    res.status(200).json(new ApiResponse(200, results, 'suceesfully Chart  data'));
});

const chartPieRegion = asyncHandler(async (req, res) => {
    const results = await Data.aggregate([
        {
            $group: {
                _id: '$region', // Group by country
                country: { $first: '$region' },
                documentCount: { $sum: 1 } 
            }
        },
        {
            $sort: { documentCount: -1 } 
        }
    ]);

    res.status(200).json(new ApiResponse(200, results, 'suceesfully Chart  data'));
});


export {
    ChartStart_year,
    ChartEnd_year,
    chartSectorAndRelevance,
    chartsectorAndLikelihood,
    chartsectorAndIntensity,
    chartPieCountry,
    chartPieRegion
    
 };
