import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../constants/routes';

export default function CreateScreeningForm() {
  const [formData, setFormData] = useState([]);
  const moviesid = useLocation().state.movieid;
  const id = useLocation().state.type;
  const navigate = useNavigate();

  const handleChange = (Event) => {
    setFormData({
      ...formData,
      [Event.target.name]: Event.target.value,
    });
  };

  const handleSubmit = (Event) => {
    Event.preventDefault();

    const postToCreate = {
      hall: formData.hall,
      price: formData.price,
      seatnumber: formData.seatnumber,
    };

    axios.post(`${routes}/cinemas/${id}/movies/${moviesid}/screening`, postToCreate).catch((error) => { console.log(error); });
    navigate('/screenings', {
      state: {
        type: id,
        movieid: moviesid,
      },
    });
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Add Screening</h1>

      <div className="mt-5">
        <label className="h3 form-label">Screening Hall</label>
        <input value={formData.hall} name="hall" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Screening price</label>
        <input value={formData.price} name="price" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Screening seatnumber</label>
        <input value={formData.seatnumber} name="seatnumber" type="text" className="form-control" onChange={handleChange} />
      </div>

      <button className="btn btn-dark btn-lg w-100 mt-5" onClick={handleSubmit}>Submit</button>
    </form>
  );
}
