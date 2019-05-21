# Adding Segoe-UI fonts to the site

In order to add Segoe UI to the project follow these steps:

1. Create a new file in the project here `template\src\CreateDotnetReactApp.Web\ClientApp\src\styles\segoeUI.scss`

1. Add the following to the file:

    ```css
    @font-face {
      font-family: SegoeUI;
      src: local('Segoe UI'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff2)
          format('woff2'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff)
          format('woff'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.ttf)
          format('truetype'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.svg#web)
          format('svg');
      font-weight: normal;
    }

    @font-face {
      font-family: SegoeUILight;
      src: local('Segoe UI Light'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff2)
          format('woff2'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff)
          format('woff'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.ttf)
          format('truetype'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.svg#web)
          format('svg');
      font-weight: 100;
    }

    @font-face {
      font-family: SegoeUISemilight;
      src: local('Segoe UI Semilight'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff2)
          format('woff2'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff)
          format('woff'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.ttf)
          format('truetype'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.svg#web)
          format('svg');
      font-weight: 200;
    }

    @font-face {
      font-family: SegoeUISemibold;
      src: local('Segoe UI Semibold'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff2)
          format('woff2'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff)
          format('woff'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.ttf)
          format('truetype'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.svg#web)
          format('svg');
      font-weight: 600;
    }

    @font-face {
      font-family: SegoeUIBold;
      src: local('Segoe UI Bold'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.woff2)
          format('woff2'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.woff)
          format('woff'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.ttf)
          format('truetype'),
        url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.svg#web)
          format('svg');
      font-weight: 700;
    }
    ```

1. Add the following import to the file `template\src\CreateDotnetReactApp.Web\ClientApp\src\App.js` below the line `
import "./styles/global.scss";`

    ```javascript
    import "./styles/segoeUI.scss";
    ```

1. Then add the following to the global styles file `template\src\CreateDotnetReactApp.Web\ClientApp\src\styles\global.scss`:

    ```css
    body {
        font-family: SegoeUI;
    }
    ```