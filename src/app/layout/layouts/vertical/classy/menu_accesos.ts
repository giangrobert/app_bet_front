import {FuseNavigationItem} from "../../../../../@fuse/components/navigation";

export class MenuAcceso {
    id?: string;
    title?: string;
    type?: string;
    icon?: string;
    link?: string;
    children?: MenuAcceso[];
}

export const dataMenu: FuseNavigationItem[] = [
    {
        id: 'config',
        title: 'Configuración',
        type: 'collapsable',
        icon: 'heroicons_outline:cog-6-tooth',
        link: '/setup/',
        children: [
            {
                id: 'period',
                title: 'Usuarios',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/setup/user',
            },
        ],
    },

];
