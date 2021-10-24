import React, { useState } from 'react';
import FormDonation from './formDonation'
import Accordion from './acordion'
import Button from '@mui/material/Button';
import "./style.css"
const ListDonation = () => {

    const [show, setShow] = useState(false);
    const [arr, setArr] = useState(JSON.parse(localStorage.getItem("arr") || "[]"));

    function addDonation() {
        setShow(true);
    }

    return (
        <div className="list">
            <h2> :רשימת תרומות </h2>
            {arr.map((t, i) => (
                <div >
                    <Accordion setArr={setArr} t={t} index={i}> </Accordion>
                </div>
            ))}
            <Button class="button" onClick={addDonation}>הוספת תרומה</Button>

            {show ? <FormDonation className="ff"setArr={setArr} setShow={setShow} /> : null}
        </div>
    )
};
export default ListDonation;
