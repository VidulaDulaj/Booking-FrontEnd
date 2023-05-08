import React, { useEffect, useState } from 'react';
import { Input, LabelText, Label, Button, Select, Form, Radio } from 'govuk-react';
import { Link } from 'react-router-dom';
import { GetAvailableBookings, MakeABooking, getdoctors } from '../services/appointment.service';


function Book() {

    const [doctors, setDoctors] = useState([]);

    //form values
    const [doctor, setDoctor] = useState();
    const [patient, setPatient] = useState();
    const [reason, setReason] = useState();
    const [month, setMonth] = useState();
    const [day, setDay] = useState();
    const [time, setTime] = useState();

    const [timeslots, setTimeSlots] = useState([]);

    useEffect(() => {
        let unmounted = false;

        const getDoctors = async () => {
            const response = await getdoctors();
            if (response.success == true) {
                if (!unmounted) {
                    setDoctors(response.data.data);
                }
            }
        }

        getDoctors();

        return () => {
            unmounted = true;
        }
    }, []);

    useEffect(() => {
        const getSessions = async () => {
            const response = await GetAvailableBookings(doctor);
            if (response.success === true) {
                setTimeSlots(response.data.data.available_slots);
            }
        };

        getSessions();

    }, [doctor]);

    const placeBooking = async () => {
        const data = {
            "doctor_id": doctor,
            "patient_name": patient,
            "reason": reason,
            "booking_month": month,
            "booking_date": day,
            "booking_time": time
        };

        const response = await MakeABooking(data);

        if(response.success === true) {
            clear();
            alert(response.data.message);
        } else {
            alert(response.data.message);
        }
    }

    const clear = () => {
        setDoctor();
        setReason();
        setMonth();
        setDay();
        setTimeSlots([]);
    }

    return (
        <div>
            <div className="welcome" text-align="center">
                <b><h1><u>Welcome to Booking Page</u></h1></b>
                <i>Please fill in the following information to place a booking.</i>

            </div>


            <br />
            <div>
                <h2>
                    <Label>
                        <LabelText>
                            Enter the Doctor Name:
                        </LabelText>
                        <Select onChange={(e) => setDoctor(e.target.value)}>
                            <option value="">Select the doctor</option>
                            {doctors && doctors.map((doctor, index) =>
                                <option value={doctor.id} key={index}>{doctor.name}</option>
                            )}
                        </Select>
                    </Label>
                    <p></p>


                    <Label>
                        <LabelText>
                            Enter the Patient Name:
                        </LabelText>
                        <Input onChange={(e) => setPatient(e.target.value)} />
                    </Label>


                    <Label>
                        <LabelText>
                            Enter reason for appointment:
                        </LabelText>
                        <Input onChange={(e) => setReason(e.target.value)} />
                    </Label>
                    <p></p>


                    <Label for="month">Select Month:</Label>
                    <Select name="month" id="month" onChange={(e) => setMonth(e.target.value)}>
                        <option value="">Select the month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="Octomber">Octomber</option>
                        <option value="November">November</option>
                        <option value="December">December</option>

                    </Select>
                    <p></p>

                    <Label for="day">Select Day:</Label>
                    <Input type="date" onChange={(e) => setDay(e.target.value)}/>
                    <p></p>

                    <div>
                        <h4>
                            Select a Time:
                        </h4>
                        {timeslots && timeslots.map((slot, index) => {
                            return (
                                <>
                                    <label key={index}>
                                        <input type="radio" name="my-radio" value={slot} onChange={(e) => setTime(e.target.value)} />
                                        {slot}
                                    </label><br />
                                </>
                            );
                        })}

                        {(timeslots.length === 0) && (
                            <>
                                <label>
                                    <input type="radio" name="my-radio" value="10:00" />
                                    10:00
                                </label><br />
                                <label>
                                    <input type="radio" name="my-radio" value="11:00" />
                                    11:00
                                </label><br />
                                <label>
                                    <input type="radio" name="my-radio" value="12:00" />
                                    12:00
                                </label><br />
                                <label>
                                    <input type="radio" name="my-radio" value="13:00" />
                                    13:00
                                </label><br />
                            </>
                        )}
                    </div>


                </h2></div>
            <br />
            <div>
                <Link to="/"><Button><b>Back to Home</b></Button></Link>&nbsp;&nbsp;&nbsp;
                <Button onClick={() => placeBooking()}>Place Booking</Button>
                <Button onClick={() => clear()} style={{ marginLeft: '10px' }}>Clear</Button>
            </div>



        </div>



    );
}
export default Book;













