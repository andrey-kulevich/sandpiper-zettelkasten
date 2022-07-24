import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#161b22',
		},
		secondary: {
			main: '#FC5603',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: `
				font-family: 'sochi2014'; 
				border-radius: 0.5rem;
				`,
			},
		},
		MuiCard: {
			styleOverrides: {
				root: `
					border-radius: 1rem;
					box-shadow: none;
				`,
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: `
				border-radius: 0.5rem; 
				`,
			},
		},
	},
});
