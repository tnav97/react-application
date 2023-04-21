import React from 'react';
import { Box, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import { Image, Page, StyleVariables, Button } from '@alcumus/components';
import { Link } from 'react-router-dom';
import MotoRightHomeSection from '../../components/MotoRightHomeSection';
import { liveChatContainer } from '../../constants';

const useStyles = makeStyles((theme) => ({
  linksContainer: {
    marginTop: '178px',
    [theme.breakpoints.down('md')]: {
      marginTop: '126px',
      textAlign: 'center',
      marginLeft: 0,
    },
  },
  logo: {
    alignItems: 'center',
    marginTop: '64px',
    maxWidth: '250px',
    maxHeight: '56px',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      marginTop: '40px',
      maxWidth: '313px',
      maxHeight: '56px',
    },
  },
  title: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.h2,
    lineHeight: StyleVariables.fonts.lineHeight.h2,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    [theme.breakpoints.down('lg')]: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      fontSize: StyleVariables.fonts.size.h3,
      lineHeight: StyleVariables.fonts.lineHeight.h3,
      marginTop: '30px',
    },
    [theme.breakpoints.down('md')]: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      fontSize: StyleVariables.fonts.size.h2,
      lineHeight: StyleVariables.fonts.lineHeight.h2,
      marginTop: '60px',
      textAlign: 'center',
    },
    marginTop: '64px',
  },
  link: {
    marginTop: '80px',
    textDecoration: 'none',
    color: StyleVariables.colors.text.link,
  },
  logoLink: {
    textDecoration: 'none',
  },
  subtitle: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    [theme.breakpoints.down('lg')]: {
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.size.h6,
      lineHeight: StyleVariables.fonts.lineHeight.h6,
    },
    [theme.breakpoints.down('md')]: {
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.mobile.size.h5,
      lineHeight: StyleVariables.fonts.mobile.lineHeight.h4,
      marginTop: '24px',
      textAlign: 'center',
    },
    marginTop: '20px',
  },
  subtitleNext: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    [theme.breakpoints.down('lg')]: {
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.size.h6,
      lineHeight: StyleVariables.fonts.lineHeight.h6,
    },
    [theme.breakpoints.down('md')]: {
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.mobile.size.h5,
      lineHeight: StyleVariables.fonts.mobile.lineHeight.h4,
      marginTop: '16px',
      textAlign: 'center',
    },
    marginTop: '20px',
  },
  phone: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.h6,
    lineHeight: StyleVariables.fonts.lineHeight.h6,
    [theme.breakpoints.down('lg')]: {
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.size.h6,
      lineHeight: StyleVariables.fonts.lineHeight.h6,
    },
    [theme.breakpoints.down('md')]: {
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.mobile.size.h6,
      lineHeight: StyleVariables.fonts.mobile.lineHeight.h6,
      margin: 'auto',
      textAlign: 'center',
    },
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  buttonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.mobile.size.h3,
    lineHeight: StyleVariables.fonts.mobile.lineHeight.h4,
  },
  padding: {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  aboutSection: {
    textAlign: 'center',
    backgroundColor: '#ffe9d7',
    padding: '1rem',
  },
  containerPadding: {
    paddingRight: '1rem',
    paddingLeft: '1rem',
    [theme.breakpoints.down('md')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
}));
export default function MotoHomePage() {
  const classes = useStyles();
  return (
    <Page className={classes.cssPage}>
      <style type="text/css">{liveChatContainer}</style>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.aboutSection}>
            You are viewing the internal registration portal
          </Typography>
        </Grid>
        <Grid item md={8} lg={6} xl={6}>
          <Grid container className={classes.containerPadding}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <div className={classes.logoLink}>
                <Image
                  src="images/SafeContractorLogo.png"
                  alt="Alcumus-logo"
                  className={classes.logo}
                />
              </div>
              <Typography className={classes.title}>
                Register for SafeContractor membership
              </Typography>
              <Typography className={classes.subtitle}>
                SafeContractor is the leading Health and Safety Accreditation,
                recognised by 34,000 contractors and 480 big name brands.
              </Typography>
              <Typography className={classes.subtitleNext}>
                Signing up is easy and only takes a few minutes. Simply complete
                our questions and we&apos;ll match your needs with the right
                level of service.
              </Typography>
              <Typography className={classes.subtitle}>
                <Link to="/moto/register" className={classes.logoLink}>
                  <Button
                    title="Click here to get started"
                    data-testid="getStartedButton"
                    className={classes.padding}
                    rounded
                  >
                    <Typography className={classes.buttonText}>
                      Get started
                    </Typography>
                  </Button>
                </Link>
              </Typography>
              <Box className={classes.linksContainer}>
                <a
                  className={classes.link}
                  href="https://www.safecontractor.com"
                  target="_blank"
                  title="www.safecontractor.com"
                  rel="noreferrer"
                >
                  www.safecontractor.com
                </a>
              </Box>
              <Typography className={classes.phone}>029 2026 6242</Typography>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Grid>
        <MotoRightHomeSection></MotoRightHomeSection>
      </Grid>
    </Page>
  );
}
