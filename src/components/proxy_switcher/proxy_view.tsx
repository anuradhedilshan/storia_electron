import {
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/joy";

const Proxy_View = ({ ip }: { ip: string }) => {
  return (
    <Card variant="soft" invertedColors sx={{ mt: 1, p: 1 }}>
      <CardContent orientation="horizontal" sx={{ justifyContent: "center" }}>
        <Stack direction="row" spacing={2}>
          <Typography color="neutral" level="title-md" variant="plain">
            {ip}
          </Typography>
          <div style={{ padding: 2 }}>
            <div className="online-indicator">
              <span className="blink"></span>
            </div>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Proxy_View;
