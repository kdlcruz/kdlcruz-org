'use client'

import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';
import { Avatar, Box, Chip, Divider, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Resume, TechLevel, chipStatus, techLevel } from '../server/types';

export const Client = ({ resume }: { resume: Resume[]}) => {
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
    <Box sx={{ background: '#233' }}>

      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" marginBottom="10px" paddingTop="10px">
        <Chip onClick={() => onLevelClick(techLevel.expert)} clickable={true} label="Expert" color="success" sx={{ opacity: levels.includes(techLevel.expert) ? 1 : 0.3 }} />
        <Chip onClick={() => onLevelClick(techLevel.experienced)} clickable={true} label="Experienced" color="info" sx={{ opacity: levels.includes(techLevel.experienced) ? 1 : 0.3 }} />
        <Chip onClick={() => onLevelClick(techLevel.amateur)} clickable={true} label="Amateur" color="warning" sx={{ opacity: levels.includes(techLevel.amateur) ? 1 : 0.3 }} />
      </Stack>

      <Timeline sx={{ margin: 0 }}>
        {resume.map(detail => (
          <React.Fragment key={detail.companyName}>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: 'auto 0', width: '50%', display: { xs: 'none', md: 'block' } }}
                align="right"
                variant="body2"
              >
                <Typography fontWeight="bold" variant="h4" color="primary">
                  {detail.companyName}
                </Typography>
                <Typography variant="h6" color="secondary">
                  {detail.employmentDate}
                </Typography>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot>
                  <Avatar alt={detail.companyName} src={detail.cover}>{detail.companyName[0]}</Avatar>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent sx={{ py: '12px', px: 2, width: '50%' }}>
                <Typography sx={{ display: { xs: 'block', md: 'none' } }} fontWeight="bold" variant="h6" color="primary">
                  {detail.position} at {detail.companyName}
                </Typography>
                <Typography sx={{ display: { xs: 'block', md: 'none' } }} color="primary">
                  {detail.employmentDate}
                </Typography>

                <Typography sx={{ display: { xs: 'none', md: 'block' } }} variant="h4" color="primary">{detail.position}</Typography>
                <Typography color="secondary" sx={{ marginBottom: '10px' }}>{detail.description}</Typography>

                {detail.techs.map(tech => <Chip key={detail.companyName + tech.name} sx={{ marginRight: '10px', marginBottom: '10px' }} size="small" label={tech.name} color={chipStatus[tech.level]} disabled={!levels.includes(tech.level)} />)}

              </TimelineContent>
            </TimelineItem>

            <Divider color="#bdbdbd" />
          </React.Fragment>
          
        ))}

      </Timeline>
    </Box>
  );
}
