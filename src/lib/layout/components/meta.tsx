import { Helmet } from "react-helmet-async";

const APP_NAME = "ToDo sandbox";

export const Meta = () => {
  return (
    <Helmet>
      <title>{APP_NAME}</title>
      <meta
        name="description"
        content="Vite React Tailwind ToDo App sandbox for APIs"
      />

      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="default"
      />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#FFFFFF" />

      <link rel="shortcut icon" href="/assets/favicon.svg" />
    </Helmet>
  );
};
