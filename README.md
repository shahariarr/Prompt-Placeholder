# Prompt Placeholder Filler

This project is a web application that allows users to fill placeholders in text prompts effortlessly. The application provides sample prompts, generates input fields for placeholders, and allows users to preview and copy the filled prompts.

## Project Structure

### [`index.html`](index.html)

The main HTML file that contains the structure of the web application. It includes the following sections:
- Header
- Loader
- Prompt input area
- Buttons to generate placeholders and show sample prompts
- Placeholder fields container
- Preview area
- Copy to clipboard button
- Modal for displaying sample prompts

### [`script.js`](script.js)

The main JavaScript file that contains the logic for the web application. It includes the following functionalities:
- Sample prompts array
- Event handler for showing sample prompts
- Event handler for generating placeholder fields
- Event handler for updating the preview text
- Event handler for copying the preview text to the clipboard

### [`style.css`](style.css)

The main CSS file that contains the styles for the web application. It includes styles for:
- Body and container
- Header
- Buttons
- Preview container
- Form labels
- Input fields
- Loader
- Modal

## Usage

1. Open [`index.html`](index.html) in a web browser.
2. Enter your prompt in the "Enter Your Prompt" textarea.
3. Click the "Generate Placeholders" button to generate input fields for the placeholders in the prompt.
4. Fill in the placeholder fields.
5. The preview text will be updated automatically as you fill in the fields.
6. Click the "Copy to Clipboard" button to copy the filled prompt to the clipboard.
7. Click the "Sample Prompts" button to view and use sample prompts.

## Dependencies

- [Bootstrap 5.3.0-alpha1](https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css)
- [Google Fonts - Roboto](https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap)
- [jQuery 3.6.0](https://code.jquery.com/jquery-3.6.0.min.js)
- [Bootstrap Bundle JS](https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
