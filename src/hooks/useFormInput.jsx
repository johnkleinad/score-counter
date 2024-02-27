import { useEffect, useState } from "react";

const UseFromInputs = (initialValue, validation = () => true, format = () => null) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = () => {
        if (validation(e.target.value)) setValue(e.target.value);
    }
    useEffect(() => {
        // format(value, setValue)
    }, [value])
    return {
        value,
        onChange: handleChange,
        setValue
    }
}
export default UseFromInputs;