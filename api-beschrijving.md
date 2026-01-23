
# API beschrijving # {#api-beschrijving}

<div id="swagger-ui"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css">

<script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-standalone-preset.js"></script>

<style>
  .swagger-ui .opblock .opblock-summary .view-line-link.copy-to-clipboard,
  .swagger-ui .info, .swagger-ui .scheme-container { display:none }
  img, svg { max-width: 100% }
</style>

<script>
  window.addEventListener("load", () => {
    SwaggerUIBundle({
      dom_id: "#swagger-ui",
      url: "openapi.yaml", 
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
      layout: "BaseLayout",
    });
  });
</script>
