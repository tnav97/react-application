import React from 'react';
import { Image, StyleVariables } from '@alcumus/components';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

interface AboutSection {
  count?: number;
  progress?: number;
}

const BorderLinearProgress = withStyles(() => ({
  root: {
    height: 6,
    borderRadius: 8,
  },
  colorPrimary: {
    backgroundColor: StyleVariables.colors.surface.neutral.disabled,
  },
  bar: {
    borderRadius: 0,
    backgroundColor: StyleVariables.colors.interactive.default,
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    height: '4.5rem',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      boxShadow: '0 4px 4px rgb(0,0,0,0.25)',
    },
  },
  logo: {
    height: '2rem',
    alignItems: 'center',
    marginLeft: '1.5rem',
    marginTop: '1rem',
    [theme.breakpoints.down('md')]: {
      marginLeft: '1rem',
      marginTop: '1.5rem',
      maxWidth: '8.25rem',
      maxHeight: '1.5rem',
    },
  },
  title: {
    textAlign: 'center',
    fontWeight: StyleVariables.fonts.weight.medium,
  },
  ellipsis: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  detailsContainer: {
    marginTop: '1rem',
    display: 'flex',
    fontSize: StyleVariables.fonts.size.regular,
    lineHeight: StyleVariables.fonts.lineHeight.h6,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    justifySelf: 'right',
    [theme.breakpoints.down('md')]: {
      marginTop: '1.188rem',
      fontSize: StyleVariables.fonts.size.xs,
      lineHeight: StyleVariables.fonts.lineHeight.xs,
      fontWeight: StyleVariables.fonts.weight.regular,
    },
    [theme.breakpoints.down('lg')]: {
      marginLeft: '-2rem',
      marginBottom: '0.5rem',
    },
  },
  disclaimerLink: {
    marginTop: '-9px',
    fontSize: StyleVariables.fonts.size.xs,
    fontWeight: StyleVariables.fonts.weight.regular,
    lineHeight: StyleVariables.fonts.lineHeight.xs,
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      marginTop: '-19px',
    },
    color: StyleVariables.colors.base.primary,
    justifySelf: 'right',
  },
  additional: {
    display: 'inline-grid',
    paddingRight: '24px',
    [theme.breakpoints.down('md')]: {
      paddingRight: '15px',
    },
  },
  progressContainer: {
    marginTop: '22px',
    width: '152px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textContainer: {
    marginBottom: '4px',
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.xs,
    fontWeight: StyleVariables.fonts.weight.regular,
  },
}));

export default function AboutSection(aboutSectionProps: AboutSection) {
  const classes = useStyles();

  return (
    <header>
      <Grid container className={classes.logoContainer}>
        <Grid item xs={6} sm={4} md={4}>
          <Image
            data-testid="alcumusLogo"
            src="/images/SafeContractorLogo.png"
            alt="SafeContractor - Safer, Healthier, Stronger"
            className={classes.logo}
          />
        </Grid>
        <Grid item sm={4} md={4} className={classes.ellipsis}>
          {typeof aboutSectionProps?.progress === 'number' ? (
            <Grid className={classes.progressContainer}>
              <Typography className={classes.textContainer}>
                {`${aboutSectionProps?.progress}% complete`}
              </Typography>
              <BorderLinearProgress
                variant="determinate"
                value={aboutSectionProps?.progress}
              />
            </Grid>
          ) : (
            ''
          )}
        </Grid>
        <Grid item xs={6} sm={4} md={4} className={classes.additional}>
          <Typography variant="h6" className={classes.detailsContainer}>
            Register for SafeContractor
          </Typography>
          <Typography variant="h6" className={classes.disclaimerLink}>
            Need help? 029 2026 6242
          </Typography>
        </Grid>
      </Grid>
    </header>
  );
}
