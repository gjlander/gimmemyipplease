import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { DateTime } from "luxon";
import "./styles.css";
import InfoCard from "./components/InfoCard";
import MyMap from "./components/MyMap";

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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 5,
                    maxWidth: 1,
                }}
            >
                <Typography align="center" variant="h1" gutterBottom={true}>
                    Gimme My IP Please...
                </Typography>
                {myData && myCountry && (
                    <>
                        <InfoCard {...myData} {...myCountry} />

                        <MyMap
                            lat={myData.location.lat}
                            lng={myData.location.lng}
                        />
                    </>
                )}
            </Box>
        </>
    );
}

export default App;
