import { Button, Grid } from "@mui/material";

interface Props {
  digit: string;
  enterDigit: (digit: string) => void;
  xs?: number;
}

export const GridDigitButton = ({ digit, enterDigit, xs = 3 }: Props) => {
  return (
    <Grid item xs={xs}>
      <Button fullWidth variant="outlined" onClick={() => enterDigit(digit)}>
        {digit}
      </Button>
    </Grid>
  );
};