import React from 'react';
import { Button } from 'govuk-react';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <b><h1><u>Welcome to NetCompany</u></h1></b>



            <div>
                <Link to="/Book"><Button><b>Make a Booking --> </b></Button></Link><br/>
                <Link to="/View"><Button><b>View available Bookings --> </b></Button></Link>
            </div>

        </div>
    );
};

export default Menu;