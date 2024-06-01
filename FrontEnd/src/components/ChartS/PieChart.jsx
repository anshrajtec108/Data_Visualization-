import React, { useEffect, useRef,useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import Button from 'react-bootstrap/esm/Button';

const PieChart = (props) => {
    const [chartData, setChartData] = useState(null);
    const chartRef = useRef(null); 
    const Heading = props.heading;
    console.log(props);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = props?.data;
                if (data && data.length > 0) { // Check if data exists and is not empty
                    const labels = data.map((item) => (item._id == "") ? "Not define": item._id);
                    const documentCounts = data.map((item) => item.documentCount);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Event',
                                data: documentCounts,
                                backgroundColor: [
                                    '#FF6384',
                                    '#36A2EB',
                                    '#FFCE56',
                                    '#FF8C00',
                                    '#8A2BE2',
                                    '#00CED1',
                                    '#008000',
                                    '#FF1493',
                                    '#FF6347',
                                    '#8B0000',
                                    '#808000',
                                    '#2F4F4F',
                                    '#000080',
                                    '#696969',
                                    '#8B4513',
                                    '#20B2AA',
                                    '#808080',
                                    '#0000FF',
                                    '#DAA520',
                                    '#ADFF2F',
                                    '#FFD700',
                                    '#1E90FF',
                                    '#B22222',
                                    '#40E0D0',
                                    '#4682B4',
                                    '#2E8B57',
                                    '#00FF7F',
                                    '#3CB371',
                                    '#FF4500',
                                    '#FA8072',
                                    '#9370DB',
                                    '#800080',
                                    '#FAEBD7',
                                    '#000000',
                                    '#C0C0C0',
                                    '#ADD8E6',
                                    '#FFFF00',
                                    '#800000',
                                    '#FFA07A',
                                    '#F08080',
                                    '#87CEFA',
                                    '#8B008B',
                                    '#00FFFF',
                                    '#00FF00',
                                    '#FF69B4',
                                    '#DC143C',
                                    '#7FFF00',
                                    '#20B2AA',
                                    '#1E90FF',
                                    '#87CEFA',
                                    '#8B008B',
                                    '#00FFFF',
                                    '#00FF00',
                                    '#FF69B4',
                                    '#DC143C',
                                    '#7FFF00',
                                    '#20B2AA',
                                    '#1E90FF',
                                    '#A0522D',
                                    '#FFA500',
                                ],
                            },
                        ],
                    });
                } else {
                    setChartData(null); // Reset chartData if data is empty
                }
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
        <div style={{ height: '500px', width: '500px',padding:'50px' }}>
            <h2>{Heading}</h2>
            {chartData ? <Pie ref={chartRef}  data={chartData} /> : <div>No data available</div>}
            <Button onClick={handleDownload}>Download Chart</Button>
        </div>

    );
};

export default PieChart;
