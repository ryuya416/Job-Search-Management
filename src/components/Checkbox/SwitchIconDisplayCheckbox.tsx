import { Checkbox } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { isCheckedState } from "src/components/store/CheckBox/SwitchIconDisplayCheckboxState";

type CheckboxPropsType = {
  defaultChecked: boolean;
  colorScheme: string;
};

export const SwitchIconDisplayCheckbox = () => {
  const CheckboxProps: CheckboxPropsType = {
    defaultChecked: true,
    colorScheme: "cyan",
  };
  const [isChecked, setIsChecked] = useRecoilState(isCheckedState);
  const handleOnChange = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
  };
  return (
    <>
      <Checkbox {...CheckboxProps} onChange={handleOnChange}>
        {isChecked ? "アイコンを表示" : "アイコンを非表示"}
      </Checkbox>
    </>
  );
};
