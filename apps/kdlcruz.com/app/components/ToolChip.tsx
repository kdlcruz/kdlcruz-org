import { Chip, ChipOwnProps } from "@mui/material"
import { Tech, chipStatus } from "../utils/types"

type ToolChipProps = ChipOwnProps & {
  tech: Tech
}

export const ToolChip = ({ tech, ...props}: ToolChipProps) => {
  return (
    <Chip label={tech.name} color={chipStatus[tech.level]} sx={{ margin: '8px' }} {...props} />
  )
}