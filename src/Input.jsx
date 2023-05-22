
import React from "react";
function Input(props) {
    let options = props.arr.map((item) => <option value={item} key={item}>{item}</option>);

    return <select className="custom-btn btn-7" onChange={props.handleChange} value={props.val}>
        {options}
    </select>;
}

export default Input;