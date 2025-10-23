import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const PlantsPage = () => {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        fetch('/plants.json')
            .then(response => response.json())
            .then(data => setPlants(data));
    }, []);

    return (
        <div className="container mx-auto my-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Plants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {plants.map(plant => (
                    <div key={plant.plantId} className="card  shadow-xl bg-green-100">
                        <figure><img className="h-96 w-85 p-5 object-cover" src={plant.image} alt={plant.plantName} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{plant.plantName}</h2>
                            <p>Price: ${plant.price}</p>
                            <p>Rating: {plant.rating}</p>
                            <div className="card-actions justify-end">
                                <Link to ={`/plantdetails/${plant.plantId}`}><button className="btn btn-primary">View Details</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlantsPage;