import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { MenuItemContent } from '../../MenuItemContent';
import { TFunction } from 'react-i18next';

export interface KebabMenuProps {
  anchorElement: Element | null;
  t: TFunction;
  onClose: () => void;
  onCancelSubscription: () => void;
}

export default function SubscriptionContextMenu({
  anchorElement,
  onClose,
  t,
  onCancelSubscription,
}: KebabMenuProps) {
  return (
    <Menu
      anchorEl={anchorElement}
      open={Boolean(anchorElement)}
      onClose={onClose}
    >
      <MenuItem onClick={onCancelSubscription}>
        <MenuItemContent
          title={t('cancelSubscription')}
          icon="highlight_off"
          critical={true}
        />
      </MenuItem>
    </Menu>
  );
}