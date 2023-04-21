import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import DoneIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import { CompanyDetails, BasketRequest, Subsidiaries } from '../../types';
import { Grid, makeStyles, CircularProgress } from '@material-ui/core';
import { DefaultBrand } from '../../constants';
import { StyleVariables, Input, Button } from '@alcumus/components';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  basketDetail,
  Memberships,
  Discount,
} from '../../../server/models/basketCode';

interface SidePanelProps {
  basketCode: Function;
  messageFromApi?: string;
  isFetching: boolean;
  error?: string;
}

const useStyles = makeStyles((theme) => ({
  separator: {
    background: StyleVariables.colors.border.default,
    height: '0.1em',
    fontSize: StyleVariables.fonts.size.smaller,
    marginLeft: '1px',
    marginRight: '1px',
    marginBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '3px',
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '0px',
      marginRight: '6px',
    },
  },
  separator1: {
    background: StyleVariables.colors.border.default,
    height: '0.1em',
    marginBottom: '1rem',
    fontSize: StyleVariables.fonts.size.smaller,
    marginLeft: '1px',
    marginRight: '1px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('xl')]: {
      width: '100%',
      marginBottom: '1rem',
    },
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
  spacingDetails: {
    marginBottom: '0.5rem',
  },
  greentickMarkIcon: {
    position: 'absolute',
    color: StyleVariables.colors.base.success,
    top: '8px',
    right: '10px',
  },
  subtitle: {
    fontSize: StyleVariables.fonts.size.small,
  },
  cardContainer: {
    background: StyleVariables.colors.surface.neutral.selected,
  },
  showDetails: {
    marginTop: '0.1rem',
    float: 'right',
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
    [theme.breakpoints.down('xs')]: {
      marginLeft: '16px',
      marginRight: '16px',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '117px',
      marginRight: '117px',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '0px',
      marginRight: '0px',
    },
  },
  subText: {
    color: StyleVariables.colors.text.subdued,
  },
  iconDetails: {
    color: StyleVariables.colors.base.primary,
  },
  discountContainer: {
    color: `${StyleVariables.colors.base.interactive} !important`,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  discountDetails: {},
  displayInput: {
    position: 'relative',
    width: '100%',
  },
  cardContentContainer: {
    padding: '1px 1px',
    marginTop: '5px',
    [theme.breakpoints.up('xl')]: {
      padding: '0rem',
      marginTop: '5px',
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: 0,
    },
  },
  applyButton: {
    marginTop: '1rem',

    borderRadius: '6.25rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '1rem',
      marginTop: '0',
    },
  },
  errorMessage: {
    color: StyleVariables.colors.text.critical,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.small,
  },
  expandDetails: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  removeCode: {
    width: '100%',
    marginTop: '1.3rem',
    marginLeft: '-1rem',
    fontSize: StyleVariables.fonts.size.small,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  totalText: {
    fontWeight: StyleVariables.fonts.weight.bold,
  },
}));
export default function MotoSidePanel(SidePanelProps: SidePanelProps) {
  const [show, setShow] = useState(true);
  const [discountShow, setDiscountShow] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<basketDetail>();

  const [discountPlan, setDiscountPlan] = useState<Discount>();
  const [planDetails, setPlanDetails] = useState<Memberships>();
  const [subscriberQty, setSubscriberQty] = useState(0);
  const dispatch = useDispatch();
  const [discountError, setDiscountError] = useState(false);
  const [subscriptionCount, setSubscriptionCount] = useState(0);

  const [detailsShow, setDetailsShow] = useState(true);

  const [discountDetails, setDiscountDetails] = useState('');
  const [basketRequest, setBasketRequest] = useState<BasketRequest>();
  const [total, setTotal] = useState(0);
  const [discountErrorMessage, setDiscountErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const referralValue = useSelector((state) => state.motoReferral);
  const employeeCardValue = useSelector((state) => state.motoEmployee);
  const companyTypeValue = useSelector((state) => state.motoCompanyType);
  const choosePlansSelector = useSelector((state) => state.motoChoosePlans);
  const companyDetailsSelector = useSelector(
    (state) => state.motoCompanyDetails
  );
  const subsidiaryListSelector = useSelector((state) => state.motoSubsidiary);
  let subscriptionValue = 0;
  const classes = useStyles();

  const handleShow = () => {
    setShow((value) => !value);
  };

  const handleClick = () => {
    setDetailsShow((value) => !value);
  };

  useEffect(() => {
    const organisationType = companyTypeValue.selectedValue;
    const otherOrganisationType = companyTypeValue.companyType;

    const choosePlan = choosePlansSelector.selectedValue;

    const subsidiaryList = subsidiaryListSelector.companyList;
    const subsidiaries: Subsidiaries[] = subsidiaryList ?? [];
    const noOfSubsidiaries = subsidiaries.length;

    const companyDetailsValue = companyDetailsSelector.companyDetails;

    if (companyDetailsValue !== undefined && companyDetailsValue !== null) {
      const companyDetails: CompanyDetails = JSON.parse(companyDetailsValue);
      if (companyDetails) {
        setBasketRequest({
          scProductVersion: referralValue.scProductVersion ?? '',
          company: {
            noOfEmployees: parseInt(employeeCardValue.selectedValue),
            noOfSubsidiaries,
            organisationType,
            otherOrganisationType,
          },
          productSelection: [
            {
              brand: DefaultBrand,
              memberships: choosePlan ? [choosePlan] : [],
            },
          ],
        });
      }
    }
  }, []);

  useEffect(() => {
    if (basketRequest) {
      SidePanelProps?.basketCode(basketRequest).then((res) => {
        if (res?.payload?.response?.success) {
          const planDetails = res?.payload?.response?.brands[0].memberships;

          planDetails.map((value, index) => {
            if (index) {
              subscriptionValue = value.qty * value.price.value;

              setSubscriptionCount(subscriptionValue);
              setSubscriberQty(value.qty);
            } else {
              setPlanDetails(value);
            }
            return value;
          });

          const responsePlan = res?.payload?.response?.total || 0;
          const total = responsePlan?.value + responsePlan?.vatAmount || 0;
          setTotal(total);
          setSelectedPlan(responsePlan);
          dispatch({
            type: 'motoBasketDetails',
            payload: {
              total: responsePlan?.value + responsePlan?.vatAmount || 0,
            },
          });
        }
      });
    }
  }, [basketRequest]);
  const apply = () => {
    const discountBasketRequest: BasketRequest = {
      ...basketRequest,
      productSelection: [
        {
          ...basketRequest?.productSelection?.[0],
          discountCodes: [discountDetails],
        },
      ],
    };
    setLoading(true);
    SidePanelProps?.basketCode(discountBasketRequest).then((res) => {
      setLoading(false);

      if (res?.payload?.response?.success) {
        const discountplanDetails = res?.payload?.response?.brands[0].discounts;
        const total = res?.payload?.response?.total;
        if (discountplanDetails[0].type !== 'INVALID') {
          setDiscountPlan(discountplanDetails);
          setDiscountShow(true);
          setSelectedPlan(total);
          setDiscountErrorMessage('');
          setDiscountError(false);

          const totalCount = total?.value + total?.vatAmount || 0;
          setTotal(totalCount);
          dispatch({
            type: 'motoBasketDetails',
            payload: {
              total: totalCount,
              discountCode: discountDetails,
            },
          });
        } else {
          setDiscountErrorMessage('Invalid or expired discount code');
          setDiscountError(true);
          setDiscountShow(false);
        }
      }
    });
  };
  const handleRemove = () => {
    setDiscountDetails('');
    handleValidate();
  };
  const handleValidate = () => {
    setDiscountShow(false);
    setDiscountErrorMessage('');
    setDiscountError(false);
  };
  const handleDiscountCode = (e) => {
    setDiscountDetails(e.target.value);
    handleValidate();
  };

  return (
    <Box sx={{ minWidth: 266 }}>
      <Card
        variant="outlined"
        className={classes.card}
        data-testid="detailplancontainer"
      >
        <CardContent>
          <Typography variant="inherit" className={classes.subtitle}>
            Order summary:
          </Typography>

          <Grid container>
            <Grid item xs={7}>
              <Typography variant="inherit" className={classes.title}>
                {planDetails?.label} plan
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
                <Grid
                  item
                  xs={9}
                  className={clsx(classes.spacingDetails, classes.title)}
                >
                  <Typography>{planDetails?.label} plan:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant="inherit"
                    className={clsx(
                      classes.subtitle,
                      classes.showDetails,
                      classes.spacingDetails
                    )}
                  >
                    £{planDetails?.price?.value}
                  </Typography>
                </Grid>

                {discountShow && (
                  <Grid
                    container
                    className={clsx(
                      classes.discountContainer,
                      classes.spacingDetails
                    )}
                  >
                    <Grid item xs={9}>
                      <Typography>Discount applied:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="inherit"
                        className={clsx(classes.subtitle, classes.showDetails)}
                      >
                        -£{discountPlan?.[0].price?.value}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {subscriptionCount > 0 && (
                  <Grid container>
                    <Grid item xs={9}>
                      <Typography>Subsidiaries:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="inherit"
                        className={clsx(classes.subtitle, classes.showDetails)}
                      >
                        £{subscriptionCount}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        className={clsx(
                          classes.spacingDetails,
                          classes.subText
                        )}
                      >
                        {subscriberQty}x £309.00 each
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                <Grid item xs={9} className={classes.spacingDetails}>
                  <Typography>Sub Total:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant="inherit"
                    className={clsx(classes.subtitle, classes.showDetails)}
                  >
                    £{selectedPlan?.value}
                  </Typography>
                </Grid>

                <Grid item xs={9} className={classes.spacingDetails}>
                  <Typography>VAT:</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography
                    variant="inherit"
                    className={clsx(classes.subtitle, classes.showDetails)}
                  >
                    £{selectedPlan?.vatAmount?.toFixed(2)}
                  </Typography>
                </Grid>

                <Grid item xs={9} className={classes.spacingDetails}>
                  <Typography className={classes.totalText}>
                    Total price
                  </Typography>
                </Grid>

                <Grid item xs={3} className={classes.totalText}>
                  <Typography
                    variant="inherit"
                    className={clsx(classes.subtitle, classes.showDetails)}
                  >
                    £{total?.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>

              <Grid className={classes.cardContentContainer}>
                <Box className={classes.separator1} />
              </Grid>

              {detailsShow ? (
                <div>
                  <Grid container>
                    <Typography
                      className={clsx(
                        classes.discountDetails,
                        classes.discountContainer
                      )}
                      title="Click here for a discount code"
                      onClick={handleClick}
                    >
                      <u>Got a discount code?</u>
                    </Typography>
                  </Grid>
                </div>
              ) : (
                <Grid container>
                  <Grid
                    xs={8}
                    md={12}
                    lg={12}
                    xl={12}
                    className={classes.displayInput}
                  >
                    <Grid>
                      <Input
                        type="text"
                        state={discountError ? 'error' : 'default'}
                        required={true}
                        value={discountDetails}
                        data-testid="discountDetails"
                        placeholder="Paste discount code here"
                        onChange={handleDiscountCode}
                      />
                      <Typography className={classes.errorMessage}>
                        {discountErrorMessage}
                      </Typography>
                      <div className={classes.greentickMarkIcon}>
                        {discountShow ? (
                          <DoneIcon />
                        ) : loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : (
                          ''
                        )}
                      </div>
                    </Grid>
                  </Grid>

                  <Grid item xs={4}>
                    <Button
                      className={classes.applyButton}
                      data-testid="apply"
                      disabled={
                        !discountDetails ||
                        discountShow ||
                        discountErrorMessage !== ''
                      }
                      onClick={apply}
                    >
                      Apply
                    </Button>
                  </Grid>

                  {(discountShow || discountError) && (
                    <Grid item xs={6}>
                      <Typography
                        className={classes.removeCode}
                        data-testid="removecode"
                        onClick={handleRemove}
                        title="Remove code"
                      >
                        Remove code
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}