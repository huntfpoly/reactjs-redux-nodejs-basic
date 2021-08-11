// assets
import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd } from '@tabler/icons';

// constant
const icons = {
  IconTypography: IconTypography,
  IconPalette: IconPalette,
  IconShadow: IconShadow,
  IconWindmill: IconWindmill,
  IconBrandFramer: IconBrandFramer,
  IconLayoutGridAdd: IconLayoutGridAdd
};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const ecommerce = {
  id: 'ecommerce',
  title: 'Ecommerce',
  type: 'group',
  children: [
    {
      id: 'categories',
      title: 'Category',
      type: 'collapse',
      icon: icons['IconLayoutGridAdd'],
      children: [
        {
          id: 'index-category',
          title: 'Category',
          type: 'item',
          url: '/admin/category',
          breadcrumbs: false
        },
        {
          id: 'create-category',
          title: 'Create Category',
          type: 'item',
          url: '/admin/category/add',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'producst',
      title: 'Product',
      type: 'collapse',
      icon: icons['IconLayoutGridAdd'],
      children: [
        {
          id: 'index-product',
          title: 'Product',
          type: 'item',
          url: '/admin/product',
          breadcrumbs: false
        },
        {
          id: 'create-product',
          title: 'Create product',
          type: 'item',
          url: '/admin/product/add',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'orders',
      title: 'Order',
      type: 'collapse',
      icon: icons['IconLayoutGridAdd'],
      children: [
        {
          id: 'index-order',
          title: 'List Order',
          type: 'item',
          url: '/admin/order',
          breadcrumbs: false
        }
      ]
    }
  ]
};
