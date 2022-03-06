import React from 'react'

export interface MenuItem {
  url: string;
  ariaLabel: string;
  text: string;
  icon: React.ReactElement;
}
