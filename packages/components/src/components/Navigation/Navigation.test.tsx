import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DescriptionIcon from '@material-ui/icons/Description';
import PaymentIcon from '@material-ui/icons/Payment';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './Navigation';
import Text from '../Text';
import { DrawerContent } from './DrawerContent';

const DrawerItems = [
  {
    title: 'Documents',
    icon: <DescriptionIcon fontSize="medium" />,
    dataTestId: 'documents',
  },
  {
    title: 'Billing',
    icon: <PaymentIcon fontSize="medium" />,
    dataTestId: 'billing',
  },
  {
    title: 'Users',
    icon: <PeopleIcon fontSize="medium" />,
    dataTestId: 'users',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon fontSize="medium" />,
    dataTestId: 'settings',
  },
];

describe('Navigation', () => {
  test('it should render', () => {
    render(
      <BrowserRouter>
        <Navigation
          logoUrl="https://coredevuksstorage01.z33.web.core.windows.net/alcumus-logo.svg"
          logoAltText="Alcumus Logo"
          logoRedirect="/"
          userContent={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text as="small">user@company.com</Text>
              <AccountCircleIcon fontSize="large" color="primary" />
            </div>
          }
          drawerContent={<DrawerContent drawerItems={DrawerItems} />}
        />
      </BrowserRouter>
    );

    expect(screen.getByAltText('Alcumus Logo')).toBeInTheDocument();
    expect(screen.getByText('user@company.com')).toBeInTheDocument();

    // Drawer item titles are open on default
    DrawerItems.forEach((item) => {
      expect(screen.queryByText(item.title)).toBeInTheDocument();
    });

    const drawerIcon = screen.getByTestId('drawerIcon');
    fireEvent.click(drawerIcon);

    // Drawer item titles hidden after clicking icon
    DrawerItems.forEach((item) => {
      expect(screen.queryByText(item.title)).not.toBeInTheDocument();
    });
  });
});
