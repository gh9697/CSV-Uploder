import React, { useState, useEffect } from 'react';

function FieldSelection({currentView}){
    const [curView, setCurView] = useState(currentView);
    const [value, setValue] = useState();

    useEffect(() => {
        setCurView(currentView);
    },[currentView]);

    return (
        <span>
        {curView === "table" ? (
            <select id="head" onChange={(e) => setValue(e.target.value)}>
                <option value=""></option>
                <option value="firstname">First Name</option>
                <option value="lastname">Last Name</option>
                <option value="contact number">Contact Number</option>
                <option value="timezone">Timezone</option>
            </select>
        ) : (
            value
        )}
        </span>
    )
}
export default FieldSelection;
