$(document).ready(function () {
    $('#generateFields').click(function () {
        const prompt = $('#promptInput').val();
        const regex = /\[([^\]]+)\]|\{([^}]+)\}/g;
        let match;
        const placeholders = [];
        while ((match = regex.exec(prompt)) !== null) {
            placeholders.push(match[1] || match[2]);
        }

        const fieldsContainer = $('#placeholderFields');
        fieldsContainer.empty();

        if (placeholders.length === 0) {
            fieldsContainer.html('<p class="text-danger">No placeholders found in the provided prompt!</p>');
            return;
        }

        placeholders.forEach((placeholder, index) => {
            const field = `
                <div class="mb-3">
                    <label for="field${index}" class="form-label">${placeholder}</label>
                    <input type="text" class="form-control placeholder-input input" data-placeholder="${placeholder}" id="field${index}" placeholder="Enter ${placeholder}">
                </div>
            `;
            fieldsContainer.append(field);
        });
    });

    $('#placeholderFields').on('input', '.placeholder-input', function () {
        const prompt = $('#promptInput').val();
        let previewText = prompt;

        $('.placeholder-input').each(function () {
            const placeholder = $(this).data('placeholder');
            const value = $(this).val();
            const regex = new RegExp(`\\[${placeholder}\\]|\\{${placeholder}\\}`, 'g');
            previewText = previewText.replace(regex, value);
        });

        $('#previewText').val(previewText);
    });

    $('#copyToClipboard').click(function () {
        const previewText = $('#previewText').val();
        if (previewText.trim() === '') {
            alert('Nothing to copy!');
            return;
        }
        navigator.clipboard.writeText(previewText).then(() => {
            alert('Copied to clipboard!');
        }).catch(() => {
            alert('Failed to copy!');
        });
    });
});