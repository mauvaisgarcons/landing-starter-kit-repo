export default {
    theme : {
        breakpoints: {
            xs: "400px",
            sm: "600px",
            mobile: "600px",
            md: "820px",
            tablet: "820px",
            lg: "1024px",
            xl: "1280px",
            xxl: "1440px",
            menu: "1100px",
        },
        colors: {
            primary: {
                background: "#212121",
                foreground: "#ffffff",
                factors: {
                    light: 3,
                    dark: 0.9,
                },
                shades_foreground: {
                    50: {
                        foreground: "black",   
                    },
                    100: {
                        foreground: "black",   
                    },
                    200: {
                        foreground: "black",   
                    }
                }
            },
            secondary: {
                background: "#ffffff",  
                foreground: "#000000", 
                factors: {
                    light: 0,
                    dark: 0.3,
                },
                shades_foreground: {
                    800: {
                        foreground: "white",   
                    },
                    900: {
                        foreground: "white",   
                    },
                    950: {
                        foreground: "white",   
                    }
                }  
            },
            accent: {
                background: "#F53003",
                foreground: "#ffffff",
                factors: {
                    light: 1,
                    dark: 0.6,
                }, 
                shades_foreground: {
                    50: {
                        foreground: "black",   
                    },
                    100: {
                        foreground: "black",   
                    },
                    200: {
                        foreground: "black",   
                    },
                    300: {
                        foreground: "black",   
                    },
                    400: {
                        foreground: "black",   
                    }
                }  
            },
            gray: {
                background: "#808080",
                foreground: "#ffffff",   
                shades_foreground: {
                    50: {
                        foreground: "black",   
                    },
                    100: {
                        foreground: "black",   
                    },
                    200: {
                        foreground: "black",   
                    },
                    300: {
                        foreground: "black",   
                    }
                }  
            },
            light: {
                background: "#ffffff",
                foreground: "#000000",   
            },
            dark: {
                background: "#000000",
                foreground: "#ffffff",   
            },
            success: {
                background: "#51cc48",
                foreground: "#ffffff",   
            },
            warning: {
                background:"#ffc46d",
                foreground: "#00000",  
                 factors: {
                    light: 0.3,
                    dark: 0.3,
                },  
            },
            error: {
                background: "#F04F44",
                foreground: "#ffffff",   
            },

        },
        fonts: {
            // The base number that font will be claculated from
            base: {
                desktop: 18,
                mobile: 14,
            }
        },
        // 
        spacing: {
            base: 20,
        }

    }
};
