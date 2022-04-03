export const breakpoints = {
  tablet: 660,
  desktop: 1025,
};

export const mediaQueryValues = {
  mobile: `(max-width: ${breakpoints.tablet}px)`,
  tablet: `(min-width: ${breakpoints.tablet}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
};

export const mediaQueries = {
  mobile: `@media ${mediaQueryValues.mobile}`,
  tablet: `@media ${mediaQueryValues.tablet}`,
  desktop: `@media ${mediaQueryValues.desktop}`,
};
