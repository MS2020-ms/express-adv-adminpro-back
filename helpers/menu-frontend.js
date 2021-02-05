
const getMenuFrontEnd = (role = 'USER_ROLE') => {
    //Opciones de mi menu lateral
    const menu = [
        {
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'ProgressBar', url: '/dashboard/progress' },
                { titulo: 'Graficas', url: '/dashboard/grafica1' },
                { titulo: 'Promesas', url: '/dashboard/promesas' },
                { titulo: 'rxjs', url: '/dashboard/rxjs' },
            ]
        },
        {
            titulo: 'Mantenimiento',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                //Si no es ADMIN no lo envio:
                //{ titulo: 'Usuarios', url: '/dashboard/usuarios' },
                { titulo: 'Hospitales', url: '/dashboard/hospitales' },
                { titulo: 'Medicos', url: '/dashboard/medicos' }
            ]
        },
    ];

    if (role === 'ADMIN_ROLE') {
        //anado el submenu
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/dashboard/usuarios' })
    }
    return menu;
}

module.exports = {
    getMenuFrontEnd
}