// assets
import DashboardIcon from '@material-ui/icons/Dashboard';

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

export const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/admin/dashboard',
            icon: DashboardIcon,
            breadcrumbs: false
        }
    ]
};
