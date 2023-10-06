import axios from "axios";
import { useState, useEffect } from "react";
import "./styles.css";
import MyMap from "./components/MyMap";

const getData = async () => {
    try {
        const response = await axios.get(
            `https://geo.ipify.org/api/v2/country,city?apiKey=${
                import.meta.env.VITE_API_KEY
            }`
        );
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
function App() {
    const [myData, setMyData] = useState();
    const [myCountry, setMyCountry] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `https://geo.ipify.org/api/v2/country,city?apiKey=${
                        import.meta.env.VITE_API_KEY
                    }`
                );
                setMyData(response.data);
                // console.log(response.data);
                // return response.data;

                const response2 = await axios.get(
                    `https://restcountries.com/v3.1/alpha/${response.data.location.country}`
                );
                console.log(response2.data[0]);
                setMyCountry(response2.data[0]);
            } catch (error) {
                console.error(error);
            }
        };

        getData();

        // getData()
        //     .then((data) => setMyData(data))
        //     .catch((error) => console.error(error));
    }, []);

    // useEffect(() => {
    //     const getCountryData = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `https://restcountries.com/v3.1/alpha/${myData.location.country}`
    //             );
    //             setMyCountry(response.data);
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     getCountryData();
    // }, [myData]);

    return (
        <>
            {myData && myCountry && (
                <>
                    <h3>My IP address is: {myData.ip}</h3>
                    <h4>
                        My physical address is: {myData.location.city},{" "}
                        {myData.location.region}, {myData.location.country}
                    </h4>
                    <img alt={myCountry.flags.alt} src={myCountry.flags.png} />
                    <MyMap
                        lat={myData.location.lat}
                        lng={myData.location.lng}
                    />
                </>
            )}
        </>
    );
}

export default App;
