document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
        contentType: document.querySelector('#content-type').value,
        goal: document.querySelector('#goal').value,
        feel: document.querySelector('#feel').value,
        experience: document.querySelector('#experience').value,
        investment: document.querySelector('#investment').value,
        time: document.querySelector('#time').value,
        teamSize: document.querySelector('#team-size').value,
        strengths: document.querySelector('#strengths').value,
        weaknesses: document.querySelector('#weaknesses').value,
        topVideos: document.querySelector('#top-videos').value,
    };

    const response = await fetch('https://ai-helper-app-4ba8cc976315.herokuapp.com/generate-idea', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const { idea } = await response.json();

    document.querySelector('#idea').textContent = idea;
});