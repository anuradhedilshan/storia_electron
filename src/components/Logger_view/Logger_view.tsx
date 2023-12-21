import { Card, CardContent, IconButton } from "@mui/joy";
import { useContext, useState } from "react";
import { context } from "../../store/app.store";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const Logger_View = () => {
  const { state } = useContext(context);
  const [expand, setExpand] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div>
        <Card
          component="span"
          sx={{
            p: 2,
            border: "1px solid black",
            mt: 2,
            width: "100%",
            display: "block",
            minHeight: expand ? "500px" : "200px",
            maxHeight: 100,
            overflowY: "auto"
          }}
          style={{
            fontSize: 13,
            textAlign: "left",
            backgroundColor: "#1f2937",
          }}
        >
          {" "}
          <IconButton
            variant="solid"
            color="neutral"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
          </IconButton>
          <CardContent>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  state.logger_data == "" ? "no log here" : state.logger_data,
              }}
            ></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Logger_View;
