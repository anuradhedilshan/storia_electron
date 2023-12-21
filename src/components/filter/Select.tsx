import { Select, Option, FormControl, SvgIconProps } from "@mui/joy";

type Props = {
  options: string[];
  handlerW: (name: string, newValue: string | null) => void;
  min?: boolean;
  startDecorator?: React.ReactElement<SvgIconProps>;
  name: string;
  value: string;
};
const Input = (props: Props) => {
  const { options, startDecorator, name, value, handlerW } = props;
  return (
    <>
      <FormControl
        sx={{ m: 1, minWidth: "150px", maxWidth: "200px" }}
        size="md"
      >
        <Select
          name={name}
          startDecorator={startDecorator}
          defaultValue={options[0]}
          value={value}
          onChange={(_, e) => {
            handlerW(name, e);
          }}
        >
          {options.map((e) => (
            <Option key={e} value={e}>
              {e}
            </Option>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Input;
