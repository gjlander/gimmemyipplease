import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";

const localTime = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
const nyTime = DateTime.now()
    .setZone("America/New_York")
    .toLocaleString(DateTime.DATETIME_MED);
const tokyoTime = DateTime.now()
    .setZone("Asia/Tokyo")
    .toLocaleString(DateTime.DATETIME_MED);

export default function InfoCard({ ip, location, flags }) {
    return (
        <Card sx={{ maxWidth: 3 / 4, minWidth: 1 / 2, mb: 10, height: 500 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    My IP address is: {ip}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    My physical address is: {location.city}, {location.region},{" "}
                    {location.country} <br />
                    Local Time: {localTime} <br />
                    New York Time: {nyTime} <br />
                    Tokyo Time: {tokyoTime}
                </Typography>
            </CardContent>
            <CardMedia
                sx={{ height: 348 }}
                image={flags.png}
                title={flags.alt}
            />
        </Card>
    );
}
