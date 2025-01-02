$(document).ready(function () {
    const samplePrompts = [
        "Hello, [name]! Welcome to [place].",
        "Your order #[orderNumber] is ready for pickup.",
        "Dear {customer}, your appointment is scheduled for {date} at {time}.",
        "Hi [user], your password reset code is [code].",
        "Simulate a conversation between [character 1] and [character 2] discussing [topic].",
        "Create a plan for a [type of event] for [number] people, including [specific requirement].",
        "Design a [type of workout] plan for [fitness level] individuals aiming to [goal] in [timeframe].",
        "Teach me [language] phrases related to [topic], with examples of usage.",
        "Develop a [content type] strategy for a business in the [industry] targeting [audience]. Include an analysis of audience needs, content formats, distribution channels, frequency, and methods to measure engagement and success.",
        "Describe a scenario where [problem] arises in [context]. Provide a step-by-step approach to identify the root cause, propose [number] solutions, and evaluate their effectiveness. Include any tools or frameworks that could assist in resolving the issue.",
        "Perform a comparative analysis of [option 1] and [option 2] in the context of [specific use case]. Discuss their pros and cons, implementation requirements, costs, and suitability for [target audience]. Conclude with a recommendation and justification.",
        "Write a detailed step-by-step guide for [task], intended for [experience level] users. Include prerequisites, tools required, detailed instructions, common mistakes to avoid, and tips for troubleshooting.",
        "Provide personalized advice for [type of individual] looking to [goal]. Include steps they should take, potential challenges they may face, and resources they can use to succeed. Tailor the advice based on [specific context].",
        "Create a curriculum for teaching [topic] to [target audience]. The curriculum should span [timeframe] and include learning objectives, daily or weekly lesson plans, recommended resources, practical exercises, and evaluation methods.",
        "Recommend [number] [type of product/service] for someone interested in [interest/hobby].",
        "Create a study plan for learning [topic] in [timeframe], including daily tasks and resources.",
        "Write a [genre] story set in [time period] where the main character is a [profession] facing [challenge].",
        "Suggest [number] solutions for [problem] considering [constraints]."
    ];

    $('#samplePrompts').click(function () {
        const samplePromptsList = $('#samplePromptsList');
        samplePromptsList.empty();
        samplePrompts.forEach((prompt, index) => {
            const listItem = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${prompt}
                    <button class="btn-glitch" data-prompt="${prompt}">Use</button>
                </li>
            `;
            samplePromptsList.append(listItem);
        });
        $('#samplePromptsModal').modal('show');
    });

    $('#samplePromptsList').on('click', '.use-sample-prompt', function () {
        const prompt = $(this).data('prompt');
        $('#promptInput').val(prompt);
        $('#samplePromptsModal').modal('hide');
    });

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