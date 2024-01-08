import {Frame, Navigation} from '@shopify/polaris';
import {HomeMinor, OrdersMinor, ProductsMinor} from '@shopify/polaris-icons';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SidBBBar() {
  return (
    <>
    <Frame>
    
      <Navigation location="/">
      <Link  to='/NewJob'>
        <Navigation.Section
     
          items={[
            
            {
              
              label: 'NewJob',
              icon: OrdersMinor,
             
            },
           
          ]}
        />
     
      </Link>

      <Link  to='/'>
        <Navigation.Section
     
          items={[
            
            {
             
              label: 'Home',
              icon: HomeMinor,
             
            },
           
          ]}
        />
     
      </Link>
      </Navigation>
    </Frame>
    </>
  );
}