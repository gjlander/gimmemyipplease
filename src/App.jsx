import axios from "axios";
import { useState, useEffect } from "react";

function App() {
    const [myData, setMyData] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `https://geo.ipify.org/api/v2/country,city?apiKey=${
                        import.meta.env.VITE_API_KEY
                    }`
                );
                setMyData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, []);
    return (
        <>
            {myData && (
                <>
                    <h3>My IP address is: {myData.ip}</h3>
                    <h4>
                        My physical address is: {myData.location.city},{" "}
                        {myData.location.region}, {myData.location.country}
                    </h4>
                </>
            )}
        </>
    );
}

export default App;
