import {
  Modal,
  ModalDialog,
  ModalClose,
  Textarea,
  Typography,
  Button,
  Sheet,
  CircularProgress,
} from "@mui/joy";

import { useContext, useState } from "react";
import { ActionType, context } from "../../store/app.store";
const ProxyInput = (props: { open: boolean; onClose: () => void }) => {
  const { dispatch } = useContext(context);
  const [text, setText] = useState<string>();
  const [isloding, setLoad] = useState<boolean>(false);
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalDialog layout="center" variant="soft">
        <ModalClose />

        <Typography maxWidth={400} textAlign={"center"}>
          <Typography variant="solid" color="primary" px={1} noWrap>
            protocol
          </Typography>
          ://
          <Typography variant="solid" color="primary" px={1} noWrap>
            host
          </Typography>
          :
          <Typography variant="solid" color="primary" px={1} noWrap>
            port
          </Typography>
        </Typography>
        <Typography maxWidth={400} textAlign={"center"} mt={1}>
          <Typography variant="solid" color="primary" px={1} noWrap>
            protocol
          </Typography>
          ://
          <Typography variant="solid" color="primary" px={1} noWrap>
            username
          </Typography>
          :
          <Typography variant="solid" color="primary" px={1} noWrap>
            password
          </Typography>
          @
          <Typography variant="solid" color="primary" px={1} noWrap>
            host
          </Typography>
          :
          <Typography variant="solid" color="primary" px={1} noWrap>
            port
          </Typography>
        </Typography>
        <span>ex :socks5://123:123:123.123:532</span>
        <span>socks5://uname:pass@45.155.68.129:8133</span>
        <Sheet sx={{ maxHeight: 400, overflowY: "auto" }}>
          <Textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Sheet>
        <Button
          size="sm"
          sx={{ mt: 2 }}
          startDecorator={isloding && <CircularProgress variant="solid" />}
          onClick={async () => {
            if (text != "" || text.length > 8 || !isloding) {
              setLoad(true);
              const list = await window.MyApi.setProxyList(text);
              console.log(list.map((e)=>e.full) );
              
              dispatch({ type: ActionType.SET_IPLIST, payload: list.map((e)=>e.full) });
              setLoad(false);
              const test = list.map((e) => e.full + "\n").toString();
              console.log(test);
              
              setText(test);
              dispatch({ type: ActionType.SET_WORKING_PROXY_LIST, payload: list.map((e)=>e.less) });
            }
          }}
        >
          {isloding ? "Testing Proxy Servers" : "Load Ip List"}
        </Button>
      </ModalDialog>
    </Modal>
  );
};

export default ProxyInput;
