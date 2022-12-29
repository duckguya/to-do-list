import { useRecoilState } from "recoil";
import styled from "styled-components";

import { FaSun, FaMoon } from "react-icons/fa";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  /* align-items: flex-end; */
  position: fixed;
  padding-right: 10px;
`;
const DarkBtn = styled.button<{ isDark: boolean }>`
  border-radius: 25px;
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px solid #eee;
  cursor: pointer;
  outline: none;
  box-shadow: 1px 2px 0
    ${(props) =>
      props.isDark ? "rgb(255, 255, 255, 0.5)" : "rgb(0, 0, 0, 0.5)"};
  &:active {
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    /* position: relative; */
    /* top: 10px; */
  }
`;
function DarkToggle() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  const toggleDarkAtom = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Container>
      <DarkBtn isDark={isDark} onClick={toggleDarkAtom}>
        {isDark ? (
          <FaSun
            style={{
              color: "#ffc048",
              left: "-1px",
              top: "1.5px",
              position: "relative",
            }}
            size="30px"
          />
        ) : (
          <FaMoon
            style={{
              color: "#2c5072",
              left: "-1px",
              top: "1.5px",
              position: "relative",
            }}
            size="30px"
          />
        )}
      </DarkBtn>
    </Container>
  );
}

export default DarkToggle;
