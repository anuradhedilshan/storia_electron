import { Button, Card, CardActions, CardContent } from "@mui/joy";
import Proxy from "./proxy_view";
import React, { useContext } from "react";
import ProxyInput from "./Proxyinput";
import { context } from "../../store/app.store";
const Proxylist = () => {
  const { state} = useContext(context);
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Card sx={{ maxHeight: "410px", width: 300, overflowY: "auto" }}>
      <CardContent sx={{ justifyContent: "flex-end" }}>
        {state.proxyList.length <= 0 && <h3>No Proxy Found</h3>}
        {state.workingList.map((e) => (
          <Proxy ip={e} key={e} />
        ))}
      </CardContent>
      <CardActions sx={{ gridColumn: "1/-1" }}>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add/Edit ip Proxy list
        </Button>
        <ProxyInput open={open} onClose={() => setOpen(false)} />
      </CardActions>
    </Card>
  );
};

export default Proxylist;
