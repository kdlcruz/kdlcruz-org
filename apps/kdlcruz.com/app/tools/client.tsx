'use client'

import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useState } from 'react'

const techLevel = {
  expert: 'expert',
  experienced: 'experienced',
  amateur: 'amateur'
} as const

const chipStatus = {
  expert: 'success',
  experienced: 'info',
  amateur: 'warning'
} as const

type TechLevel = typeof techLevel[keyof typeof techLevel]

type Techs = {
  name: string
  level: TechLevel
}

type MyTools = {
  title: string
  techs: Techs[]
}

export const Client = ({ myTools }: { myTools: MyTools[]}) => {
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
      <Typography variant="h4" color="primary" fontWeight="bold">My Tools</Typography>
      <Typography color="secondary" marginBottom="10px">Tools are used for solved problems.</Typography>

      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" marginBottom="10px" paddingTop="10px">
        <Chip onClick={() => onLevelClick(techLevel.expert)} clickable={true} label="Expert" color="success" sx={{ opacity: levels.includes(techLevel.expert) ? 1 : 0.3 }} />
        <Chip onClick={() => onLevelClick(techLevel.experienced)} clickable={true} label="Experienced" color="info" sx={{ opacity: levels.includes(techLevel.experienced) ? 1 : 0.3 }} />
        <Chip onClick={() => onLevelClick(techLevel.amateur)} clickable={true} label="Amateur" color="warning" sx={{ opacity: levels.includes(techLevel.amateur) ? 1 : 0.3 }} />
      </Stack>

      <Grid2 container spacing={2}>
        {myTools.map(tools => (
          <Grid2 xs={12} sm={6} md={4} key={tools.title}>
            <Card sx={{ background: '#233', borderWidth: '5px', borderRadius: '10px' }} variant="outlined">
              <CardContent>
                <Typography color="primary" variant="h6" fontWeight="bold" marginBottom="10px">
                  {tools.title}
                </Typography>
                {tools.techs.map(tech => (
                  <Chip key={tech.name} sx={{ marginRight: '10px', marginBottom: '10px' }} label={tech.name} color={chipStatus[tech.level]} disabled={!levels.includes(tech.level)} />
                ))}
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
