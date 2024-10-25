import {
    UilUsersAlt ,
    UilClipboardAlt,
    UilBriefcase ,
    UilBell,
    UilArchive,
    UilUsdSquare,
    UilChart,
    UilMoneyWithdrawal, 
} from '@iconscout/react-unicons'

import cleaning from '../cleaning.jpeg'
import controle from '../controle.jpg'
import legume from '../legume.jpg'
import reboisement from '../reboisement.jpg'
import agro from '../agro.png'

export const SideBarData = [
   
    {
        icon : UilBriefcase ,
        heading : "Offre",
        path : "/",
    },
    {
        icon : UilBell,
        heading : "Notifications",
        path : "/notification",
    },
    {
        icon : UilUsersAlt ,
        heading : "Candidature",
        path : "/candidat",
    },
    {
        icon : UilArchive,
        heading : "Archive",
        path : "/archive",
    },
    {
        icon : UilChart,
        heading : "Statistique",
        path : "/statistique",
    },
]

export const CardsData = [
    {
        title: "Sales",
        color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",  // Corrigé
            boxShadow: "0px 10px 20px 0px #e0c6f5"
        },
        barValue: 70,
        value: "25,970",
        png: UilUsdSquare,
        series: [
            {
                name: "Sales",
                data: [31, 40, 28, 42, 109, 100],
            },
        ],
    },
    {
        title: "Revenue",
        color: {
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",  // Corrigé
            boxShadow: "0px 10px 20px 0px #FDC0C7"
        },
        barValue: 35,
        value: "25,970",
        png: UilMoneyWithdrawal,
        series: [
            {
                name: "Revenue",
                data: [10, 100, 50, 70, 80, 30, 40],
            },
        ],
    },
    {
        title: "Expenses",
        color: {
            backGround: "linear-gradient(146.42deg, rgb(248, 212, 154) -46.42%, rgb(255, 202, 113) 100%)",  // Corrigé
            boxShadow: "0px 10px 20px 0px #FDC0C7"
        },
        barValue: 60,
        value: "4,270",
        png: UilClipboardAlt,
        series: [
            {
                name: "Expenses",
                data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
    }
];


export const ServiceData = [
    {
        titre: "Opération de cleaning",
        description: "Nos services de nettoyage spécialisés, qu'ils soient destinés aux sols ou à la purification de l'air, garantissent des environnements propres et sains, adaptés à vos besoins.",
        image: cleaning,
        numero: '01'
    },
    {
        titre: "Activité de reboisement sur le térritoire de Madagascar",
        description: "Engagés dans la protection de l'environnement, nous participons activement au reboisement de Madagascar, contribuant ainsi à la restauration et à la préservation des écosystèmes",
        image: reboisement,
        numero: '02'
    },
    {
        titre: "Contrôle de marchandise et produits pétroliers",
        description: "Nous assurons un contrôle rigoureux des marchandises, produits pétroliers et leurs dérivés, garantissant leur conformité et leur qualité tout au long du processus logistique.",
        image: controle,
        numero: '03'
    },
    {
        titre: "Agrostologie",
        description: "Nos experts en agrostologie offrent des solutions durables pour la gestion des pâturages et des ressources végétales, favorisant une agriculture responsable et écologique.",
        image: agro,
        numero: '04'

    },
    {
        titre: "Culture de légume",
        description: "Nous développons des cultures de légumes de qualité, privilégiant des méthodes durables pour fournir des produits frais et sains tout en respectant l'environnement.",
        image: legume,
        numero: '05'   
    },
    
];

export const TeamData = [
    {
        Nom: "Pierre Giraud",
        Titre: "Responsable Ressource Humaine",
    },
    {
        Nom: "Pierre Giraud",
        Titre: "Responsable Ressource Humaine",
    },
    {
        Nom: "Pierre Giraud",
        Titre: "Responsable Ressource Humaine",
    },
    {
        Nom: "Pierre Giraud",
        Titre: "Responsable Ressource Humaine",
    },
    {
        Nom: "Pierre Giraud",
        Titre: "Responsable Ressource Humaine",
    },
    {
        Nom: "Pierre Giraud",
        Titre: "Responsable Ressource Humaine",
    },
    {
        Nom: "Pierre Giraud",
        Titre: "Responsable Ressource Humaine",
    },
    
];