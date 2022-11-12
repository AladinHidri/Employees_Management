import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom"
import axios from "axios"
import "./AddEdit.css"
import { toast } from 'react-toastify';


const AddEdit = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [state, setState] = useState({
        name: "",
        email: "",
        contact: ""
    })
    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        if (id) {
            getSingleUser(id)
        }
    }, [id])

    const getSingleUser = async (id) => {
        const response = await axios.get(`http://localhost:5000/user/${id}`)
        if (response.status === 200) {
            setState({ ...response.data[0] })
            console.log(response.data[0].name)
            setName(response.data[0].name)
            setEmail(response.data[0].email)
            setContact(response.data[0].contact)

        }
    }

    const addUser = async () => {
        let data = {
            name: name,
            email: email,
            contact: contact
        }
        const response = await axios.post("http://localhost:5000/user", data)
        if (response.status === 200) {
            toast.success(response.data)
        }
    }
    const updateUser = async (id) => {
        let data = {
            name: name,
            email: email,
            contact: contact
        }
        const response = await axios.put(`http://localhost:5000/user/${id}`, data)
        if (response.status === 200) {
            toast.success(response.data)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !contact) {
            toast.error("Please provide value into each input fiels")
        }
        if (!id) {
            addUser({ name, email, contact })
        }
        else {
            updateUser(id)
        }
        setTimeout(() => navigate("/"), 500)

    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleContactChange = (event) => {
        setContact(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }}
                onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder='Enter Name ...' onChange={handleNameChange} value={name} />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder='Enter Email ...' onChange={handleEmailChange} value={email} />
                </div>

                <div>
                    <label htmlFor="contact">Contact</label>
                    <input type="text" id="contact" name="contact" placeholder='Enter Contact No. ...' onChange={handleContactChange} value={contact} />
                </div>


                <input type="submit" value={id ? "Update" : "Add"} />
            </form>
        </div>
    )
};

export default AddEdit;