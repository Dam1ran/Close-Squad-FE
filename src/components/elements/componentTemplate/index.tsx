import { styled } from "@mui/system";
import { FC, ReactNode } from "react";

export interface ComponentTemplateProps {
  content: string;
  children?: ReactNode;
}


export const ComponentTemplate: FC<ComponentTemplateProps> = ({ content, children }) => {
  const StyledDiv = styled('div')<{color: string}>(({ theme, color }) => ({
    color: color,
    backgroundColor: theme.palette.secondary.main
  }));

  return <StyledDiv color="red">{children}</StyledDiv>;
}
