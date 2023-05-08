import React, { useEffect, useState } from 'react';
import { Select, LabelText, Label, Button } from 'govuk-react';
import { Link } from 'react-router-dom';
import { GetAvailableBookings, getdoctors } from '../services/appointment.service';

function View() {

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState();
    const [availableBookings, setAvailableBookings] = useState();

    useEffect(() => {
        let unmounted = false;

        const getDoctors = async () => {
            const response = await getdoctors();
            if (response.success == true) {
                if(!unmounted) {
                    setDoctors(response.data.data);
                }
            }
        }

        getDoctors();

        return () => {
            unmounted = true;
        }
    }, []);

    const viewAvailableBookings = async () => {
        const response = await GetAvailableBookings(selectedDoctor);
        if (response.success === true) {
            setAvailableBookings(response.data.data);
        }
    };

    const clearBookings = () => {
        setSelectedDoctor(null);
        setAvailableBookings();
    }

    return (
        <div>
            <div className="welcome" text-align="center">
                <b><h1><u>Welcome to View Available Booking Page</u></h1></b>
                <i>Please fill in the following information to find an available booking.</i>

            </div>

            <br />
            <div>
                <h2>
                    <Label>
                        <LabelText>
                            Enter the Doctor Name:
                        </LabelText>
                        <Select onChange={(e) => setSelectedDoctor(e.target.value)}>
                            <option value="">Select the doctor</option>
                            {doctors && doctors.map((doctor, index) =>
                                <option value={doctor.id} key={index}>{doctor.name}</option>
                            )}
                        </Select>
                    </Label>
                    <p></p>
                </h2>
            </div>

            <div>
                <Link to="/"><Button><b>Back to Home</b></Button></Link>&nbsp;&nbsp;&nbsp;
                <Button onClick={() => viewAvailableBookings()}>View Available Bookings</Button>
            </div>


            {availableBookings && (
                <div>
                    <h1>View Available Bookings</h1>

                    <ul>
                        <li>Doctor Name - {availableBookings.doctor.name ?? '-'}</li>
                        <li>Doctor E-mail - {availableBookings.doctor.email ?? '-'}</li>
                        <li>Doctor Mobile No - {availableBookings.doctor.mobile_no ?? '-'}</li>
                    </ul>

                    <p>Date</p>
                    <p>{availableBookings.date}</p>

                    <p>Available time slots</p>
                    {availableBookings.available_slots.map((slot, index) => <span key={index} style={{ backgroundColor: '#eeee', marginRight: '10px' }}>{slot}</span>)}

                    <br/>
                    <br/>
                    <Button onClick={() => clearBookings()}>Clear Results</Button>
                </div>
            )}

        </div>
    );
};

export default View;