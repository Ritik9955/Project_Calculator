import { Button as MuiButton, Grid, styled } from "@mui/material";

interface Props {
  selectedOperation: string;
  operation: string;
  selectOperation: (operation: string) => void;
}

const StyledButton = styled(MuiButton)<{ selected: boolean }>(({ selected }) => ({
  borderColor: selected ? "#fff" : "rgba(255, 241, 73, 0.5)",
}));

export const GridOperationButton = ({
  selectedOperation,
  operation,
  selectOperation,
}: Props) => {
  const isSelected = selectedOperation === operation;

  return (
    <Grid item xs={3}>
      <StyledButton
        fullWidth
        variant="outlined"
        onClick={() => selectOperation(operation)}
        selected={isSelected}
      >
        {operation}
      </StyledButton>
    </Grid>
  );
};