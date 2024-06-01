// src/DisplayData.js
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';


const DisplayData = ({ data }) => {
    const [activeKey, setActiveKey] = useState(null);

    const handleToggle = (key) => {
        setActiveKey(activeKey === key ? null : key);
    };

    return (
        <Accordion activeKey={activeKey}>
            <Accordion.Item eventKey="0">
                <Accordion.Header onClick={() => handleToggle("0")}>
                    {data?.title}
                </Accordion.Header>
                <Accordion.Body>
                    <p><strong>Insight:</strong> {data?.insight}</p>
                    <p><strong>Sector:</strong> {data?.sector}</p>
                    <p><strong>Topic:</strong> {data?.topic}</p>
                    <p><strong>Region:</strong> {data?.region}</p>
                    <p><strong>Country:</strong> {data?.country}</p>
                    <p><strong>Source:</strong> <a href={data?.url} target="_blank" rel="noopener noreferrer">{data?.source}</a></p>
                    <p><strong>Start Year:</strong> {data?.start_year || 'N/A'}</p>
                    <p><strong>End Year:</strong> {data?.end_year}</p>
                    <p><strong>Intensity:</strong> {data?.intensity}</p>
                    <p><strong>Relevance:</strong> {data?.relevance}</p>
                    <p><strong>Likelihood:</strong> {data?.likelihood}</p>
                    <p><strong>Pestle:</strong> {data?.pestle}</p>
                    <p><strong>Impact:</strong> {data?.impact || 'N/A'}</p>
                    <p><strong>Added:</strong> {data?.added}</p>
                    <p><strong>Published:</strong> {data?.published}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default DisplayData;
