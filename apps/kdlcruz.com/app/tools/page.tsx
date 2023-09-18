'use client'

import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Stack, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useState } from 'react'
import { ToolChip } from '../components/ToolChip';
import { TechLevel, techLevel } from '../utils/types';
import { useGetTools } from '../hooks/server/googleSheet';

export default function Index() {
  const myTools = useGetTools()
  const [levels, setLevels] = useState([techLevel.amateur, techLevel.experienced, techLevel.expert])

  const onLevelClick = (level: TechLevel) => {
    setLevels((previousLevels) => {
      const currentLevels = [...previousLevels]
      if (currentLevels.includes(level)) {
        const index = currentLevels.indexOf(level)
        currentLevels.splice(index, 1)
      } else  {
        currentLevels.push(level)
      }
      return currentLevels
    })
  }

  return (
    <Box sx={{ background: '#233', padding: '10px', width: '100%', height: '100%' }} textAlign="center">
      <Grid2 container spacing={2}>
        <Grid2 sm={4} md={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="h4" color="primary" fontWeight="bold">My Tools</Typography>
          <Typography color="secondary" marginBottom="10px">Tools are used for solved problems.</Typography>

          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" marginBottom="10px" paddingTop="10px">
            <Chip onClick={() => onLevelClick(techLevel.expert)} clickable={true} label="Expert" color="success" sx={{ opacity: levels.includes(techLevel.expert) ? 1 : 0.3 }} />
            <Chip onClick={() => onLevelClick(techLevel.experienced)} clickable={true} label="Experienced" color="info" sx={{ opacity: levels.includes(techLevel.experienced) ? 1 : 0.3 }} />
            <Chip onClick={() => onLevelClick(techLevel.amateur)} clickable={true} label="Amateur" color="warning" sx={{ opacity: levels.includes(techLevel.amateur) ? 1 : 0.3 }} />
          </Stack>
        </Grid2>
        <Grid2 xs={12} sm={8} md={8}>
          {myTools.data?.map((tools, key) => (
            <Accordion key={tools.title} defaultExpanded={key < 3 ? true : false}>
              <AccordionSummary
                expandIcon={<ExpandMore color="secondary" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ background: '#511' }}
              >
                <Typography color="secondary" variant="h6" fontWeight="bold" marginBottom="10px">
                  {tools.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ background: '#222', justifyContent: 'center', alignItems: 'center', padding: '10px', display: 'block' }}>
                {tools.techs.map((tech) => (
                  <ToolChip key={tech.name} tech={tech} disabled={!levels.includes(tech.level)} />
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid2>
      </Grid2>
    </Box>
  )
}
