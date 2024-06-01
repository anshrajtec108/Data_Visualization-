import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, } from "react-redux";
import { makeGetRequest } from '../services/ApiCalls';
import { saveFilterCountry, saveFilterPestle, saveFilterRegion, saveFilterSector, saveFilterTopic } from '../store/reducres/serachReducre';

const FilterDropdown = ({ FilterField }) => {
    const dispatch=useDispatch()
    let sendData=''
    const [searchValue, setSearchValue] = useState('');
    const [visibleItems, setVisibleItems] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(10);
    const [dropdownValue, setDropdownValue] = useState(FilterField);
    const [allItems, setAllItems] = useState([]);

    useEffect(() => {
        // Fetch all items when the component mounts
        const fetchFilterItems = async () => {
            try {
                const res = await makeGetRequest(`/dashboard/getFilter/${FilterField}`, {}, {}, {});
                // console.log('res',res);
                if (res && res.data) {
                    setAllItems(res.data);
                    setVisibleItems(res.data.slice(0, itemsToShow));
                }
            } catch (error) {
                console.error("Error fetching filter items:", error);
            }
        };

        fetchFilterItems();
    }, [FilterField, itemsToShow]);

    useEffect(() => {
        // Filter and slice the items based on the search value and items to show
        const filteredItems = allItems.filter(item =>
            item.toLowerCase().includes(searchValue.toLowerCase())
        );
        setVisibleItems(filteredItems.slice(0, itemsToShow));
    }, [searchValue, itemsToShow, allItems]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        setItemsToShow(10);
    };

    const handleLoadMore = () => {
        setItemsToShow(prevCount => prevCount + 10);
    };

    const handleClick = (item) => {;
        setDropdownValue(item);
        sendData=item
        if (FilterField === 'country') dispatch(saveFilterCountry(sendData));
        if (FilterField === 'topic') dispatch(saveFilterTopic(sendData));
        if (FilterField === 'sector') dispatch(saveFilterSector(sendData));
        if (FilterField === 'pestle') dispatch(saveFilterPestle(sendData));
        if (FilterField === 'region') dispatch(saveFilterRegion(sendData));
        };

    return (
        <div style={{margin:'20px'}}>
        <Dropdown>
            <Dropdown.Toggle id="dropdown-custom-components">
                {dropdownValue}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Form.Control
                    autoFocus
                    placeholder="Type to filter..."
                    onChange={handleSearchChange}
                    value={searchValue}
                    className="mx-3 my-2 w-auto"
                />
                <ul className="list-unstyled">
                    <Dropdown.Item onClick={() => handleClick(FilterField)}>Null</Dropdown.Item>
                    {visibleItems.map((item, index) => (
                        <Dropdown.Item key={index} onClick={() => handleClick(item)}>
                            {item}
                        </Dropdown.Item>
                    ))}
                </ul>
                {visibleItems.length < allItems.filter(item =>
                    item.toLowerCase().includes(searchValue.toLowerCase())
                ).length && (
                        <Button variant="link" onClick={handleLoadMore} className="dropdown-item">
                            Load More
                        </Button>
                    )}
            </Dropdown.Menu>
        </Dropdown>
        </div>
    );
};

export default FilterDropdown;
