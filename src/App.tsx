import { useState } from "react";
import { Button, Container, Grid, Paper, styled } from "@mui/material";
import { GridDigitButton } from "./components/GridDigitButton";
import { GridOperationButton } from "./components/GridOperationButton";

const OutputContainer = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "right",
  padding: theme.spacing(2),
  fontSize: "2.5rem",
  minHeight: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

const CalculatorBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 20,
  width: "100%",
  maxWidth: "420px",
}));

function App() {
  const [prevValue, setPrevValue] = useState("");
  const [currentValue, setCurrentValue] = useState("0");
  const [operation, setOperation] = useState("");
  const [overwrite, setOverwrite] = useState(true);

  const calculate = () => {
    if (!prevValue || !operation) return currentValue;

    const curr = parseFloat(currentValue);
    const prev = parseFloat(prevValue);

    if (operation === "÷" && curr === 0) return "Error";

    switch (operation) {
      case "÷":
        return (prev / curr).toString();
      case "*":
        return (prev * curr).toString();
      case "-":
        return (prev - curr).toString();
      case "+":
        return (prev + curr).toString();
      default:
        return currentValue;
    }
  };

  const equals = () => {
    const val = calculate();
    setCurrentValue(val);
    setPrevValue("");
    setOperation("");
    setOverwrite(true);
  };

  const clear = () => {
    setPrevValue("");
    setOperation("");
    setCurrentValue("0");
    setOverwrite(true);
  };

  const del = () => {
    setCurrentValue("0");
    setOverwrite(true);
  };

  const percent = () => {
    const curr = parseFloat(currentValue);
    setCurrentValue((curr / 100).toString());
  };

  const selectOperation = (op: string) => {
    if (prevValue) {
      const val = calculate();
      setPrevValue(val);
      setCurrentValue(val);
    } else {
      setPrevValue(currentValue);
    }
    setOperation(op);
    setOverwrite(true);
  };

  const setDigit = (digit: string) => {
    if (currentValue === "0" && digit === "0") return;
    if (currentValue.includes(".") && digit === ".") return;

    if (overwrite) {
      setCurrentValue(digit);
    } else {
      setCurrentValue(currentValue + digit);
    }
    setOverwrite(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CalculatorBase elevation={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <OutputContainer>{currentValue}</OutputContainer>
          </Grid>

          <Grid container spacing={2}>
            <GridOperationButton operation="AC" selectOperation={clear} selectedOperation={operation} />
            <GridOperationButton operation="C" selectOperation={del} selectedOperation={operation} />
            <GridOperationButton operation="%" selectOperation={percent} selectedOperation={operation} />
            <GridOperationButton operation="÷" selectOperation={selectOperation} selectedOperation={operation} />
          </Grid>

          {[
            ["7", "8", "9", "*"],
            ["4", "5", "6", "-"],
            ["1", "2", "3", "+"],
          ].map((row, i) => (
            <Grid container spacing={2} key={i}>
              {row.map((item) =>
                isNaN(Number(item)) ? (
                  <GridOperationButton
                    key={item}
                    operation={item}
                    selectOperation={selectOperation}
                    selectedOperation={operation}
                  />
                ) : (
                  <GridDigitButton key={item} digit={item} enterDigit={setDigit} />
                )
              )}
            </Grid>
          ))}

          <Grid container spacing={2}>
            <GridDigitButton xs={6} digit="0" enterDigit={setDigit} />
            <GridDigitButton digit="." enterDigit={setDigit} />

            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={equals}>
                =
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CalculatorBase>
    </Container>
  );
}

export default App;