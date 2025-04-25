const SidebarData = [
    {
        label: "Menu",
        isMainMenu: true,
    },
    {
        label: "Dashboard",
        icon: "mdi mdi-home-variant-outline",
        url: "/dashboard",
        issubMenubadge: true,
        bgcolor: "bg-primary",
        badgeValue: "3"
    },
    {
        label: "Components",
        isMainMenu: true,
    },
    {
        label: "City",
        icon: "ri-eraser-fill",
        issubMenubadge: true,
        bgcolor: "bg-danger",
        badgeValue: "8",
        subItem: [
            { sublabel: "Add ", link: "/add-city" },
            { sublabel: "All", link: "/getall-city" },
        ],
    },
    {
        label: "Users",
        icon: "ri-table-2",
        subItem: [
            { sublabel: "Add", link: "/add-users" },
            { sublabel: "List", link: "/list-users" }
        
        ],
    },
    {
        label: "Treatments",
        icon: "ri-bar-chart-line",
        subItem: [
            { sublabel: "Add", link: "/add-treatments" },
            { sublabel: "List", link: "/list-treatments" }
        
        ],
    },
    {
        label: "Conditions",
        icon: "ri-brush-line",
        subItem: [
            { sublabel: "Add", link: "/add-conditions" },
            { sublabel: "List", link: "/list-conditions" }
        ],
    },
    {
        label: "Hospital",
        icon: "ri-table-2",
        subItem: [
            { sublabel: "Add", link: "/add-hospital" },
            { sublabel: "List", link: "/list-hospital" },
        ],
    },

    {
        label: "Doctors",
        icon: "ri-share-line",
        subItem: [
            { sublabel: "Add", link: "/add-doctor" },
            { sublabel: "List", link: "/list-doctor" },
        ],
    },
    {
        label: "Partners",
        icon: "ri-bar-chart-line",
        subItem: [
            { sublabel: "Add", link: "/add-partner" },
            { sublabel: "List", link: "/list-partner" },
        ],
    },
    {
        label: "Appointments",
        icon: "ri-table-2",
        subItem: [
            // { sublabel: "Add", link: "/add-users" },
            { sublabel: "List", link: "/list-appointments" }
        
        ],
    },
    // {
    //     label: "Doctor Refferals",
    //     icon: "ri-brush-line",
    //     subItem: [
    //         { sublabel: "List", link: "/list-doctorrefferals" }
           
    //     ],
    // },
    {
        label: "Comissions",
        icon: "ri-bar-chart-line",
        subItem: [
            // { sublabel: "Add", link: "/add-hospital" },
            { sublabel: "List", link: "/list-comissions" },
        ],
    },
    
  
    {
        label: "Banner",
        icon: "ri-eraser-fill",
        subItem: [
            { sublabel: "Add", link: "/add-banner" },
            { sublabel: "List", link: "/list-banner" },
            
        ],
    },
    // {
    //     label: "Multi Level",
    //     icon: "ri-share-line",
    //     subItem: [
    //         { sublabel: "Level 1.1", link: "/#" },
    //         {
    //             sublabel: "Level 1.2", link: "/#",
    //             subMenu: [
    //                 { title: "Level 2.1" },
    //                 { title: "Level 2.2" },
    //             ],
    //         },
    //     ],
    // },
]
export default SidebarData;