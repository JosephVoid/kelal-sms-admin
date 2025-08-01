"use client";

import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  styled,
  StepConnector,
  stepClasses,
  StepIcon,
  StepIconProps,
} from "@mui/material";

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: "black",
  zIndex: 1,
  color: "#fff",
  width: 22,
  height: 22,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {String(props.icon)}
    </ColorlibStepIconRoot>
  );
}

export default function InfoStepper({
  steps,
}: {
  steps: { header: string; content: React.ReactNode }[];
}) {
  return (
    <Stepper orientation="vertical" nonLinear>
      {steps.map((step) => (
        <Step expanded active>
          <StepLabel slots={{ stepIcon: ColorlibStepIcon }}>
            {step.header}
          </StepLabel>
          <StepContent>{step.content}</StepContent>
        </Step>
      ))}
    </Stepper>
  );
}
