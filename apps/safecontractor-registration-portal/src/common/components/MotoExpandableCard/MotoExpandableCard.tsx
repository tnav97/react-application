import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import TaskIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import CardContent from '@material-ui/core/CardContent';
import { Grid, makeStyles } from '@material-ui/core';
import { StyleVariables } from '@alcumus/components';
import { ChoosePlanList } from '../../constants';
import { PlanDetail } from '../../../server/models/choosePlan';

const useStyles = makeStyles(() => ({
  separator: {
    background: StyleVariables.colors.border.default,
    height: '0.1em',
    marginBottom: '1em',
    marginRight: '0.5rem',
  },
  title: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.bold,
    fontSize: StyleVariables.fonts.size.h5,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
  },
  detailstitle: {
    fontSize: StyleVariables.fonts.size.regular,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  subtitle: {
    fontSize: StyleVariables.fonts.size.small,
    marginTop: '20px',
  },
  cardContainer: {
    background: StyleVariables.colors.surface.neutral.selected,
  },
  showDetails: {
    float: 'left',
    marginTop: '12px',
  },
  expandDetails: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  showDetails1: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '0.5rem',
  },
  card: {
    background: StyleVariables.colors.surface.neutral.selected,
    marginTop: '1rem',
    border: 'none',
  },
  iconDetails: {
    color: StyleVariables.colors.base.primary,
  },
  iconDetailsCard: {
    color: StyleVariables.colors.base.primary,
    paddingTop: '12px',
  },
}));
export default function MotoExpandableCard() {
  const [show, setShow] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetail>();
  const choosePlansSelector = useSelector((state) => state.motoChoosePlans);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleShow = () => {
    setShow((value) => !value);
  };

  useEffect(() => {
    const choosePlan = choosePlansSelector.selectedValue;
    ChoosePlanList.forEach((value) => {
      if (choosePlan === value.id) {
        setSelectedPlan(value);
        dispatch({
          type: 'motoCard',
          payload: { choosePlan_rate: JSON.stringify(value.rate) },
        });
      }
    });
  }, []);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography variant="inherit" className={classes.subtitle}>
            Selected plan:
          </Typography>
          <Grid container>
            <Grid item xs={7}>
              <Typography variant="inherit" className={classes.title}>
                {selectedPlan?.label}
              </Typography>
            </Grid>
            <Box
              onClick={handleShow}
              title={
                show === true
                  ? 'Click here to Collpase'
                  : 'Click here to Expand'
              }
              className={classes.showDetails1}
            >
              <Grid item xs={2}>
                <Typography
                  className={clsx(classes.expandDetails, classes.iconDetails)}
                >
                  {show ? (
                    <ExpandLessOutlinedIcon data-testid="minimize" />
                  ) : (
                    <ExpandMoreOutlinedIcon data-testid="expand" />
                  )}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  variant="inherit"
                  className={clsx(classes.detailstitle, classes.iconDetails)}
                >
                  Details
                </Typography>
              </Grid>
            </Box>
          </Grid>
          {show && (
            <div>
              <div>
                <Box className={classes.separator} />
              </div>
              <Grid container>
                <Grid item xs={2}>
                  <Typography className={classes.iconDetailsCard}>
                    <PersonOutlineIcon />
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    variant="inherit"
                    className={clsx(classes.subtitle, classes.showDetails)}
                  >
                    {selectedPlan?.benefits}
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Typography className={classes.iconDetailsCard}>
                    <CallOutlinedIcon />
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    variant="inherit"
                    className={clsx(classes.subtitle, classes.showDetails)}
                  >
                    {selectedPlan?.callInfo}
                  </Typography>
                </Grid>

                <Grid item xs={2}>
                  <Typography className={classes.iconDetailsCard}>
                    <TaskIcon />
                  </Typography>
                </Grid>

                <Grid item xs={10}>
                  <Typography
                    variant="inherit"
                    className={clsx(classes.subtitle, classes.showDetails)}
                  >
                    {selectedPlan?.task}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}