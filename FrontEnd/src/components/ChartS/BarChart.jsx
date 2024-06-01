import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'
import Button from 'react-bootstrap/esm/Button';

const BarChart = (props) => {
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null); 
    const Heading = props?.heading;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = props?.data;

                const labels = data.map((item) => (item.sector == "")? 'Not define': item.sector);
                const totalRelevance = data.map((item) => item.average);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Total Relevance',
                            data: totalRelevance,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [props.data]);

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
        <div style={{minHeight:'24vh',minWidth:'44vw',height:'100%',width:'100%',paddingLeft:'20px'}}>
            <h2>{Heading}</h2>
            {chartData && (
                <>
                    <Bar
                        data={chartData}
                        ref={chartRef}
                        options={{
                            indexAxis: 'x', // Changed to 'x' for vertical bars
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
    
                    />
                    <Button onClick={handleDownload}>Download Chart</Button>
                </>
            )}
        </div>
    );
};

export default BarChart;
