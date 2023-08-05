/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/**/*.{js,jsx,ts,tsx}",
   ],
   corePlugins: {
      preflight: false,
   },
   important: "#root",  
   theme: {
     extend: {
         screens: {
            900: '900px',
            800: '800px',
            730: '730px',
            600: '600px',
            550: '550px',
            500: '500px',
            450: '450px',
            400: '400px', 
            350: '350px'
         },
         keyframes: {
            sizeGrow : {
               '0%': { width: 'max', height: '0px', opacity: '0' },
               '100%': { width: 'max', height: '180px', opacity: '1' }
            },
            bookmarkIconShow : {
               '0%': { transform: 'translateX(-150%)',opacity: '0', display: 'hidden'},
               '100%': { transform: 'translateX(0)',opacity: '1', display: 'flex'}
            },
            bookmarkIconHide : {
               '0%': { transform: 'translateX(0)', opacity: '1', display: 'flex'},
               '100%': { transform: 'translateX(-150%)', opacity: '0', display: 'hidden'}
            }
         },
         animation: {
            sizeGrow: 'sizeGrow .3s ease',
            bookmarkIconShow: 'bookmarkIconShow .3s ease',
            bookmarkIconHide: 'bookmarkIconHide .3s ease'
         },
         colors: {
            searchBar: '#E9EFF4',
            disableTab: '#393939',
            mainColor: '#1E293B'
         },
         gridAutoRows: {
            '100%': '100%',
            250: '250px'
         }, 
         gridAutoColumns: {
            '100%': '100%',
            '50%': '50%',
            '433': '433px',
            390: '390px',
            370: '370px',
            '30%': '30%',
            '25%': '25%'
         }, 
         gridTemplateColumns: {
            '100%' : '100%',
            '50%': '50%',
            '30%' : '1/3',
            '433': '433px',
            390: '390px',
            370: '370px',
            280: '280px',
         },
         gridTemplateRows: {
            '100%': '100%',
            'fit': 'repeat(3,fit-content)'
         },
         gradientColorStops: {
            '-10%': '-10%'
         },
         borderWidth: {
            '0.5': '0.5px'
         },
         width: {
            380: '380px',
            130: '130px',
            115: '115px',
            50: '50px',
            40: '40px',
            '110%': '110%',
            '98%': '98%',
            '95%': '95%',
            '90%': '90%',
            '76%': '24%',
            '70%': '70%',
            '60%': '60%',
            '40%': '40%',
            '45%': '45%',
            '35%' : '35%',
            '24%': '24%',
            '20%': '20%',
            '15%': '15%',
            '12%': '12%',
            '10%': '10%'
         },
         minWidth: {
            430: '430px',
            378: '378px',
            220: '220px',
            125: '125px',
            120: '120px'
         },
         maxWidth: {
            433: '433px',
            410: '410px',
            '76%': '76%',
            '24%': '24%'
         },
         height: {
            '100-header': 'calc(100vh - 56px)',
            750: '750px',
            450: '450px',
            400: '400px',
            360: '360px',
            350: '350px',
            320: '320px',
            300: '300px',
            275: '275px',
            265: '265px',
            260: '260px',
            270: '270px',
            250: '250px',
            240: '240px',
            220: '220px',
            200: '200px',
            190: '190px',
            180: '180px',
            170: '170px',
            162: '162px',
            150: '150px',
            120: '120px',
            110: '110px',
            100: '100px',
            90: '90px',
            88: '88px',
            80: '80px',
            70: '70px',
            50: '50px',
            36: '36px',
            '110%': '110%',
            '80%': '80%',
            '75%': '75%',
            '70%': '70%',
            '60%': '60%',
            '57%': '57%',
            '55%': '55%',
            '50%': '50%',
            '40%': '40%',
            '35%': '35%',
            '33%': '33%',
            '30%': '30%',
            '25%': '25%',
            '20%': '20%',
            '10%': '10%',
            '15%': '15%'
         },
         minHeight: {
            '100-header': 'calc(100vh - 56px)',
            500: '500px',
            287: '287px',
            270: '270px',
            260: '260px',
            193: '193px',
            180: '180px',
            175: '175px',
            165: '165px',
            64: '64px'  
         },
         gap: {
            25: '25px'
         },
         fontSize: {
            '3.5rem': '3.5rem',
            '3rem': '3rem',
            '2.5rem': '2.5rem',
            '2rem': '2rem',
            '1.8rem': '1.8rem',
            '1.7rem': '1.7rem',
            '1.5rem': '1.5rem',
            '1.4rem': '1.4rem',
            '1.2rem': '1.2rem',
            '1.1rem': '1.1rem',
            '1.07rem': '1.07rem',
            '1.05rem': '1.05rem',
            '0.95rem': '0.95rem',
            '0.9rem': '.9rem',
            '0.8rem': '0.8rem'
         },
         padding: {
            '5px': '5px'
         },
         boxShadow: {
            'arrowButton': '0px 2px 5px -1.5px black',
            'commentGrid': '0px 3px 15px -10px black',
            'bannerShadow': '0px 2px 7px -3px black',
            'blogCard': '0px 5px 15px -9px black',
            'authorCard': '0 2px 3px 0'
         },
         opacity: {
            15: '15%'
         },
         translate: {
            '150%': '150%'
         },
         scale: {
            120: '120%'
         },
         lineHeight: {
            23: '23px'
         }
     },
   },
   plugins: [],
}