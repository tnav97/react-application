import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { IReduxRootState } from '../../../client/redux/reducers';
import { PrevUrl } from '../../pages/RedirectTo/PrevUrl';

interface ProtectedRoute {
  component: Function;
  path?: string | undefined;
  exact?: boolean | undefined;
}

function ProtectedRoute({
  component: Component,
  exact,
  path,
  ...props
}: ProtectedRoute) {
  const confirmationState = useSelector(
    (state: IReduxRootState) => state.payment
  );
  const redirectBack = (prevpage) => {
    const prevPageLength = Object.keys(prevpage).length;
    const prevPageValues = Object.values(prevpage).indexOf(undefined);
    let redirectD = 0;
    if (prevPageValues > -1) {
      redirectD = 1;
    }
    if (prevPageLength === 0) {
      redirectD = 2;
    }
    return redirectD;
  };
  const companyDetailsSelector = useSelector(
    (state: IReduxRootState) => state.companyDetails
  );
  const employeeCardValue = useSelector(
    (state: IReduxRootState) => state.employee
  );
  const companyTypeValue = useSelector(
    (state: IReduxRootState) => state.companyType
  );
  const choosePlansSelector = useSelector(
    (state: IReduxRootState) => state.choosePlans
  );
  const referralValue = useSelector((state: IReduxRootState) => state.referral);
  const responseTimeSelector = useSelector(
    (state: IReduxRootState) => state.responseTime
  );
  const needSupportSelector = useSelector(
    (state: IReduxRootState) => state.needSupport
  );
  const ssipValueSelector = useSelector((state: IReduxRootState) => state.ssip);
  const subsidiaryListSelector = useSelector(
    (state: IReduxRootState) => state.subsidiary
  );
  const createAccountState = useSelector(
    (state: IReduxRootState) => state.createAccount
  );
  const isRedirect: string = confirmationState.to ?? '/';
  const pathArray = path?.split('/');
  const pathName = pathArray?.slice(-1)[0];
  if (pathName === 'referral') {
    const redirectDRef = redirectBack(createAccountState);
    if (redirectDRef === 1) {
      return <Redirect to="/" />;
    } else if (redirectDRef === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'employee') {
    const redirectDEmp = redirectBack(referralValue);
    if (redirectDEmp === 1) {
      return <Redirect to="/" />;
    } else if (redirectDEmp === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'companyType') {
    const redirectDCT = redirectBack(employeeCardValue);
    if (redirectDCT === 1) {
      return <Redirect to="/" />;
    } else if (redirectDCT === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'SSIPQuestion') {
    const redirectDCT = redirectBack(companyTypeValue);
    if (redirectDCT === 1) {
      return <Redirect to="/" />;
    } else if (redirectDCT === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'subsidiaryBusiness') {
    const redirectDSub = redirectBack(ssipValueSelector);
    if (redirectDSub === 1) {
      return <Redirect to="/" />;
    } else if (redirectDSub === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'responseTime') {
    const redirectDRes = redirectBack(subsidiaryListSelector);
    if (redirectDRes === 1) {
      return <Redirect to="/" />;
    } else if (redirectDRes === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'needSupport') {
    const redirectDNeed = redirectBack(responseTimeSelector);
    if (redirectDNeed === 1) {
      return <Redirect to="/" />;
    } else if (redirectDNeed === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'choosePlan') {
    const subsidiaryPageLength = Object.keys(subsidiaryListSelector).length;
    const subsidiaryPageValues = Object.values(subsidiaryListSelector).indexOf(
      undefined
    );
    if (subsidiaryPageValues > -1) {
      return <Redirect to="/" />;
    } else if (subsidiaryPageLength === 0) {
      return <PrevUrl />;
    } else {
      if (subsidiaryListSelector?.selectedValue === 'Yes') {
        const redirectDS = redirectBack(companyTypeValue);
        if (redirectDS === 1) {
          return <Redirect to="/" />;
        } else if (redirectDS === 2) {
          return <PrevUrl />;
        }
      } else {
        const redirectDn = redirectBack(needSupportSelector);
        if (redirectDn === 1) {
          return <Redirect to="/" />;
        } else if (redirectDn === 2) {
          return <PrevUrl />;
        }
      }
    }
  }
  if (pathName === 'companyDetails') {
    const redirectDComp = redirectBack(choosePlansSelector);
    if (redirectDComp === 1) {
      return <Redirect to="/" />;
    } else if (redirectDComp === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'paymentDetails') {
    const redirectDPay = redirectBack(companyDetailsSelector);
    if (redirectDPay === 1) {
      return <Redirect to="/" />;
    } else if (redirectDPay === 2) {
      return <PrevUrl />;
    }
  }
  if (pathName === 'orderConfirmation') {
    const redirectDOrder = redirectBack(confirmationState);
    if (redirectDOrder === 1) {
      return <Redirect to="/" />;
    } else if (redirectDOrder === 2) {
      return <PrevUrl />;
    }
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        confirmationState.isRegistered ? (
          <Redirect to={isRedirect} />
        ) : (
          <Component {...props} />
        )
      }
      {...props}
    />
  );
}

export default ProtectedRoute;