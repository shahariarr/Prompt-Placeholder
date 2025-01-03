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
        "Suggest [number] solutions for [problem] considering [constraints].",
        "Write a function in [language] to [task or purpose], ensuring efficiency and readability.",
        "Explain the difference between [concept 1] and [concept 2] in software development with examples.",
        "Debug the following code snippet: [code snippet]. Explain the issue and provide a fixed version.",
        "Design a database schema for [application type], including at least [number] tables and their relationships.",
        "Create a REST API specification for [use case], including endpoints, request/response formats, and authentication methods.",
        "Develop a unit test suite for the following function: [function code]. Ensure full coverage of edge cases.",
        "Compare [framework 1] and [framework 2] for building [type of application], discussing performance, scalability, and ease of use.",
        "Write a CI/CD pipeline configuration for [platform], including steps for building, testing, and deploying the application.",
        "Design an algorithm for [specific problem], explaining its time and space complexity.",
        "Create a roadmap for learning [technology stack] over [timeframe], including key concepts, tools, and projects to practice.",
        "Build a responsive UI component in [framework/library] that fulfills [specific requirement].",
        "Describe a scenario where [software issue] occurs in [context]. Propose [number] debugging steps and potential fixes.",
        "Develop a script to automate [task] in [language]. Explain how it works and its benefits.",
        "Explain the principles of [design pattern] with an example implementation in [language].",
        "Suggest best practices for securing a [type of application], including [number] actionable recommendations.",
        "Write a guide for deploying a [type of application] on [cloud platform], including prerequisites and step-by-step instructions.",
        "Propose a microservices architecture for [application type], detailing the services, communication methods, and deployment strategy.",
        "Optimize the following code snippet: [code snippet]. Explain the changes and the performance improvements achieved.",
        "Create a CLI tool in [language] that performs [specific functionality], ensuring user-friendly input/output.",
        "Write a blog post explaining [technical concept] to junior developers, including analogies and practical examples."
    ];

    $('#samplePrompts').click(function () {
        const samplePromptsList = $('#samplePromptsList');
        samplePromptsList.empty();
        samplePrompts.forEach((prompt, index) => {
            const listItem = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${prompt}
                    <button class=" btn-sm use-sample-prompt btn-glitch" data-prompt="${prompt}">Use</button>
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
            fieldsContainer.html('<p class="text-danger">Error: No placeholders were found in the provided prompt. Please ensure your prompt contains valid placeholders. For example: "Hello, [name]! Welcome to {place}."</p></br> <p class="text-success">Notice: There are some simple instructions that you can follow.</p>  ');
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

    $('#aboutButton').click(function () {
        $('#aboutModal').modal('show');
    });
});