import {Routes} from '@angular/router';
import {SaleComponent} from "./sale.component";
import {OrderContainersComponent} from "./order/containers/order-containers-component";

export default [
    {
        path: '',
        component: SaleComponent,
        children: [
            {
                path: 'order',
                component: OrderContainersComponent,
            }
        ],
    },
] as Routes;
