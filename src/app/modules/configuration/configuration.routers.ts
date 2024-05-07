import {Routes} from '@angular/router';
import {ConfigurationComponent} from "./configuration.component";
import {UserContainersComponent} from "./user/containers/user-containers-component";


export default [
    {
        path: '',
        component: ConfigurationComponent,
        children: [
             {
                path: 'user',
                component: UserContainersComponent,
            }
        ],
    },
] as Routes;
