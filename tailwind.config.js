module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "all-colorsbrand-colors-green-3500":
          "var(--all-colorsbrand-colors-green-3500)",
        "black-06": "var(--black-06)",
        "blue-dark": "var(--blue-dark)",
        "branding-accentsgreen-2": "var(--branding-accentsgreen-2)",
        "dashboard-colorsheader-colorblue-1":
          "var(--dashboard-colorsheader-colorblue-1)",
        "dashboard-colorsheader-colorgreen":
          "var(--dashboard-colorsheader-colorgreen)",
        "dashboard-colorsheader-colorpink":
          "var(--dashboard-colorsheader-colorpink)",
        "dashboard-colorsheader-colorpurple":
          "var(--dashboard-colorsheader-colorpurple)",
        "gravyfa6-navy": "var(--gravyfa6-navy)",
        "green-dark": "var(--green-dark)",
        "image-placeholder": "var(--image-placeholder)",
        "neutral-color-palettegray-1": "var(--neutral-color-palettegray-1)",
        "neutral-color-palettegray-4": "var(--neutral-color-palettegray-4)",
        "neutral-color-palettegray-5": "var(--neutral-color-palettegray-5)",
        "neutral-color-palettegray-7": "var(--neutral-color-palettegray-7)",
        "neutral-color-palettegray-8": "var(--neutral-color-palettegray-8)",
        "neutral-color-palettegray-9": "var(--neutral-color-palettegray-9)",
        "neutralgrey-0": "var(--neutralgrey-0)",
        "neutralgrey-2": "var(--neutralgrey-2)",
        "neutralgrey-6": "var(--neutralgrey-6)",
        "purplepurple-3": "var(--purplepurple-3)",
        "purplepurple-5": "var(--purplepurple-5)",
        "redred-4": "var(--redred-4)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "medium-100": "var(--medium-100-font-family)",
        "medium-200-h4": "var(--medium-200-h4-font-family)",
        "medium-500-h1": "var(--medium-500-h1-font-family)",
        "medium-600": "var(--medium-600-font-family)",
        "medium-75-labels": "var(--medium-75-labels-font-family)",
        "regular-100-paragraph": "var(--regular-100-paragraph-font-family)",
        "regular-12px-20px": "var(--regular-12px-20px-font-family)",
        "regular-14px-22px": "var(--regular-14px-22px-font-family)",
        "regular-500-h2": "var(--regular-500-h2-font-family)",
        "regular-75-caption": "var(--regular-75-caption-font-family)",
        "semibold-14px-22px": "var(--semibold-14px-22px-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
