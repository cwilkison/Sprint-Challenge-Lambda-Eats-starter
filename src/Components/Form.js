import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";
const formSchema = yup.object().shape({
    name: yup.string().required("Please input a name").min(2, "Name must be at least 2 characters"),
    directions: yup.string().required("Please type in special directions"),
    size: yup.string().required("Pizza size required"),
    pepperoni: yup.boolean().oneOf([true || false], "choose a topping"),
    mushrooms: yup.boolean().oneOf([true || false], "choose a topping"),
    chicken: yup.boolean().oneOf([true || false], "choose a topping"),
    veggies: yup.boolean().oneOf([true || false], "choose a topping"),
 

});

export default function Form() {
    const [button, setButton] = useState(true);

    const [formState, setFormState] = useState({
        name: "",
        directions: "",
        size: "",
        pepperoni: "",
        mushrooms: "",
        chicken: "",
        veggies: "",
    });
    // state for errors
    const [errors, setErrors] = useState({
        name: "",
        directions: "",
        size: "",
        pepperoni: "",
        mushrooms: "",
        chicken: "",
        veggies: "",
    });
    // state for post request 
    const [post, setPost] = useState([]);
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButton(!valid);
        });
    }, [formState]);
    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/orders", formState)
            .then(res => {
                setPost(res.data); 
                setFormState({
                    name: "",
                    size: "",
                    pepperoni: "",
                    mushrooms: "",
                    chicken: "",
                    veggies: "",
                });
            })
            .catch(err => console.log("something went wrong when submitting your form", err.response));
    };
    const validateChange = e => {
        yup 
            .reach(formSchema, e.target.name)
            .validate(e.target.name === "pepperoni" ? e.target.checked : e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };
    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState, [e.target.name]:
            e.target.type  === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };

    return (
        <form onSubmit={formSubmit}>
            <h1>Take your time to make the Perfect Pizza!</h1>
            <label htmlFor="name">
                Name: 
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
                 {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null} 
            </label> <br/>
            <label htmlFor="size">
                What is your pizza size?
                 <select 
                    id="size" 
                    name="size" 
                    onChange={inputChange}>
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                </select>
            </label> <br/>
            <label htmlFor="directions">
                Insert Special Directions Here: 
                <textarea
                    id="directions"
                    name="directions"
                    value={formState.directions}
                    onChange={inputChange}
                />
                 {errors.directions.length > 0 ? <p className="error">{errors.directions}</p> : null} 
            </label> <br/>
            
            <label htmlFor="pepperoni">
                Pepperoni
                <input
                    id="pepperoni"
                    type="checkbox"
                    name="pepperoni"
                    checked={formState.pepperoni}
                    onChange={inputChange}
                />
            </label> <br />
            <label htmlFor="mushrooms">
                Mushrooms
                <input
                    id="mushrooms"
                    type="checkbox"
                    name="mushrooms"
                    checked={formState.mushrooms}
                    onChange={inputChange}
                />
            </label>
            <br />
            <label htmlFor="chicken">
                Chicken
                <input
                    id="chicken"
                    type="checkbox"
                    name="chicken"
                    checked={formState.chicken}
                    onChange={inputChange}
                />
            </label>
            <br />
            <label htmlFor="veggies">
                Veggies
                <input
                    id="veggies"
                    type="checkbox"
                    name="veggies"
                    checked={formState.veggies}
                    onChange={inputChange}
                />
            </label>
            <br />
              <pre>{JSON.stringify(post, null, 2)}</pre>
              <button>Order</button>
        </form>
    )
}