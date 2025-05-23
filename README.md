# Unofficial Cuentica API Documentation Extractor

⚠️ **DISCLAIMER: This is an unofficial repository and almost everything in this repo is generated by AI. Use at your own risk.**

This project provides a basic tool to convert the Cuentica API documentation into a more accessible HTML version that is more easily convertible to Markdown format. The project was created to address the challenges of crawling and converting the original Cuentica API documentation, which uses JavaScript for dynamic content expansion.

The outputs of this project are
- A Postman collection for Cuentica's API
- A Markdown version of the documentation that can be easily used as context for an LLM.
- An MCP (Model Context Protocol) server that exposes the Cuentica API to LLMs

## Background & Workflow

The conversion process involved several steps due to the complexity of the original documentation:

1. **HTML Preprocessing** (`preprocess_html.js`):
   - The original Cuentica API page couldn't be directly crawled (or I didn't know how) because API responses are collapsed by default
   - JavaScript execution was required to expand the responses
   - This script pre-expands all responses and generates `cuentica_api_expanded.html`
   - Note: Alternative attempts using Firecrawl were unsuccessful (see `apidocs_cuentica_firecrawl.md`)

2. **HTML to Markdown Conversion**:
   - Initial attempts using turndown.js didn't produce satisfactory results
   - After testing various Large Language Models (LLMs), Gemini 2.5 Pro was chosen for its large context window
   - The entire HTML file (340K tokens) was processed by Gemini to extract endpoints into `cuentica_api_expanded_cleaned.md`

3. **Postman Collection Generation**:
   - The final Postman collection was generated using Cursor with Claude 3.5 Sonnet

4. **MCP Server Implementation**:
   - An MCP (Model Context Protocol) server was created to expose the Cuentica API to LLMs
   - The server enables direct API interaction through LLM tools for a more seamless experience
   - Authentication is handled via environment variable

## Features

- Converts HTML documentation to clean Markdown format
- Preserves API endpoint structure and details
- Supports code blocks with proper formatting
- Maintains text emphasis and formatting
- Generates Postman collection for easy API testing
- Provides an MCP server for direct LLM integration with the Cuentica API

## MCP Server

The MCP server allows LLM systems to directly interact with the Cuentica API. It's located in the `mcp` directory and provides the following benefits:

- **Easy LLM Integration**: Exposes Cuentica API endpoints as MCP tools that LLMs can call directly
- **Authentication**: Uses a Cuentica API token passed via environment variable
- **Safety**: Only exposes reading and modification endpoints (deletion endpoints are excluded)
- **Pagination Support**: All list endpoints support pagination parameters

See the [MCP server documentation](mcp/README.md) for setup and usage information.

## License

MIT

## Contributing

Feel free to open issues or submit pull requests. However, please note that this is an unofficial project and may not be actively maintained.

## Disclaimer

This is an unofficial project and is not affiliated with or endorsed by Cuentica. The documentation and tools provided here are generated using AI and should be used with caution. Always refer to the official Cuentica API documentation for the most accurate and up-to-date information.
