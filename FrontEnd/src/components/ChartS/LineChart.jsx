import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { makeGetRequest } from '../../services/ApiCalls';
import 'chart.js/auto'
import Button from 'react-bootstrap/esm/Button';
const LineChart = (props) => {
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null); 
    let heading = props?.heading
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const data = props?.data;
                console.log(data);
                if (data && data.length > 0) {
                    const labels = data.map(item => Object.keys(item)[0]);
                    const counts = data.map(item => Object.values(item)[0]);
                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Number of Events Start Year',
                                data: counts,
                                fill: false,
                                backgroundColor: 'rgb(75, 192, 192)',
                                borderColor: 'rgba(75, 192, 192, 0.2)',
                            }
                        ]
                    });
                } else {
                    setChartData(null);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setChartData(null);
            }
        };

        fetchData();

       
        return () => {
            setChartData(null);
        };
    }, []); 

    if (!chartData) {
        return <div>Loading...</div>;
    }
        const handleDownload = () => {
            if (chartRef.current) {
                const canvas = chartRef.current.canvas; // Access the canvas element through the ref
                const imageURL = canvas.toDataURL('image/png');

                // Create a link element to trigger the download
                const link = document.createElement('a');
                link.href = imageURL;
                link.download = `${props?.name}.png`;
                link.click();
            }
        };
    return (
        <div style={{height:'100%',width:'100%'}}>
            <h2>{heading}</h2>
            <Line
                data={chartData}
                ref={chartRef}
                options={{
                    scales: {
                        x: {
                            type: 'category', // Specify category scale for the x-axis
                        },
                    },
                }}
            />
            <Button onClick={handleDownload}>Download Chart</Button>
        </div>
    );
};

export default LineChart;
