import axios from "axios";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import "./styles.css";
import MyMap from "./components/MyMap";

function App() {
    const [myData, setMyData] = useState();
    const [myCountry, setMyCountry] = useState();
    const localTime = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
    const nyTime = DateTime.now()
        .setZone("America/New_York")
        .toLocaleString(DateTime.DATETIME_MED);
    const tokyoTime = DateTime.now()
        .setZone("Asia/Tokyo")
        .toLocaleString(DateTime.DATETIME_MED);

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
                setMyCountry(response2.data[0]);

                //this was trying to use the info received from the api, but because
                // they use the UTC offset to describe the timezone, it get's really complicated

                // console.log(response2.data[0]);
                // const timeZone = response2.data[0].timezones[0];
                // const formattedZone = timeZone
                //     .replaceAll("0", "")
                //     .replaceAll(":", "");
                // console.log(formattedZone);
                // console.log(DateTime.utc());
                // const currentTime = DateTime.local().setZone(formattedZone);
                // console.log(currentTime.toLocaleString(DateTime.DATETIME_MED));
                // console.log(timeZone);
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
                    <h5>
                        Local Time: {localTime} <br />
                        New York Time: {nyTime} <br />
                        Tokyo Time: {tokyoTime}
                    </h5>
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
