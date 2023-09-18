'use client'

import { Android, Apple, GitHub, Web } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, SvgIcon, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useState } from 'react'
import { Link, TechLevel, linkTypes, techLevel } from '../utils/types'
import { ToolChip } from '../components/ToolChip';
import { useGetPortfolio } from '../hooks/server/googleSheet';

const NpmIcon = () => (
  <SvgIcon>
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m2 10.555h28v9.335h-14v1.556h-6.222v-1.557h-7.778zm1.556 7.779h3.111v-4.668h1.555v4.667h1.556v-6.222h-6.222zm7.778-6.223v7.779h3.111v-1.556h3.111v-6.223zm3.111 1.556h1.555v3.112h-1.556zm4.667-1.556v6.223h3.111v-4.668h1.556v4.667h1.556v-4.667h1.556v4.667h1.556v-6.222z" fill="#FF6457"/></svg>
  </SvgIcon>
)

const linkIcon = {
  [linkTypes.github]: <GitHub color="primary"/>,
  [linkTypes.npm]: <NpmIcon />,
  [linkTypes.android]: <Android color="primary"/>,
  [linkTypes.ios]: <Apple color="primary"/>,
  [linkTypes.web]: <Web color="primary"/>
}

const ButtonLink = ({ link, linkType }: Link) => {
  return (
    <Button href={link} target="_blank">{linkIcon[linkType]}</Button>
  )
}

export default function Page() {
  const projects = useGetPortfolio()
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
      <Typography variant="h4" color="primary" fontWeight="bold">Projects</Typography>

      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" marginBottom="10px" paddingTop="10px">
        <Chip onClick={() => onLevelClick(techLevel.expert)} clickable={true} label="Expert" color="success" sx={{ opacity: levels.includes(techLevel.expert) ? 1 : 0.3 }} />
        <Chip onClick={() => onLevelClick(techLevel.experienced)} clickable={true} label="Experienced" color="info" sx={{ opacity: levels.includes(techLevel.experienced) ? 1 : 0.3 }} />
        <Chip onClick={() => onLevelClick(techLevel.amateur)} clickable={true} label="Amateur" color="warning" sx={{ opacity: levels.includes(techLevel.amateur) ? 1 : 0.3 }} />
      </Stack>

      <Grid2 container spacing={2}>
        {projects.data?.map(project => (
          <Grid2 xs={12} sm={6} md={4} key={project.name}>
            <Card sx={{ background: '#233', borderWidth: '5px', borderRadius: '10px' }} variant="outlined">
              <CardMedia
                sx={{ height: '200px', width: '100%', objectFit: 'contain' }}
                image={project.cover}
                title="Freebird"
              />
              <CardContent>
                <Box textAlign="left" alignItems="flex-start">
                  {project.techs.map(tech => <ToolChip key={project.name + tech.name} tech={tech} disabled={!levels.includes(tech.level)} size="small" sx={{ margin: '4px' }}/>)}
                </Box>
                <Typography variant="h4" color="primary">{project.name}</Typography>
                <Typography color="secondary" sx={{ marginBottom: '10px' }} textAlign="left">{project.description}</Typography>
              </CardContent>

              <CardActions sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', borderTop: '5px', borderColor: 'rgba(0, 0, 0, 0.12)', borderBottom: 0, borderRight: 0, borderLeft: 0, borderStyle: 'solid' }}>
                {project.links.map(link => <ButtonLink key={`${project.name}-${link.link}`} link={link.link} linkType={link.linkType} />)}
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
