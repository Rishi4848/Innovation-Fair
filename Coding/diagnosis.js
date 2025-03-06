function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const age = document.getElementById('age').value;
    const symptoms = document.getElementById('symptoms').value;
    const allergies = document.getElementById('allergies').value;

    const queryParams = new URLSearchParams({
        age: age,
        symptoms: symptoms,
        allergies: allergies
    });

    window.location.href = `result.html?${queryParams.toString()}`;
}
