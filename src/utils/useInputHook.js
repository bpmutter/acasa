import { useState, useCallback } from "react";
const useUserInput = (defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);
  const onChange = useCallback((e) => setValue(e.target.value), []);

  return { value, onChange };
};
export default useUserInput;
