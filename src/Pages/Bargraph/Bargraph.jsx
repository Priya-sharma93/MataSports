import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

export default function Bargraph() {
    const [ratings, setRatings] = useState([]);
      
     useEffect(() => {
            fetch("https://sports-backend-s5za.onrender.com/api/ratings/weekly")
            .then((res) => res.json())
            .then((data) => setRatings(data))
            .catch((err) => console.error('Error Fetching Data:',err));
        }, []);
  return (
    <div>
        <>
        <div style = {{ width: '100%' ,height: 300, marginRight: 20}}>
            {/* <h6>Weekly Ratins Overview</h6> */}
            <ResponsiveContainer width= "100%" height="100%">
              <BarChart data={ratings} margin={{ top: 20, right: 40, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharry="3 3"/>
              <XAxis dataKey="day"/>
              <YAxis allowedDecimals={false}/>
             <Tooltip/>
            <Bar dataKey="count" fill="#4A90E2"/>                 
            </BarChart>
            </ResponsiveContainer>
            </div>
        </>
      
    </div>
  )
}
