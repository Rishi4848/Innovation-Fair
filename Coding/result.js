document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const symptoms = urlParams.get('symptoms').toLowerCase().split(',').map(s => s.trim());

    const conditions = [
        {
            name: "the Influenza, also known as the Flu",
            symptoms: ['fever', 'chills', 'cough', 'sore throat', 'runny/stuffy nose', 'muscle aches', 'fatigue'],
            weight: 0
        },
        {
            name: "the Common Cold",
            symptoms: ['runny/stuffy nose', 'sore throat', 'cough', 'sneezing', 'fatigue', 'nausea', 'vomiting', 'diarrhea'],
            weight: 0
        },
        {
            name: "Norovirus, also known as the Stomach Flu",
            symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach cramps', 'fever'],
            weight: 0
        }
    ];

    // Calculate weights for each condition
    symptoms.forEach(symptom => {
        conditions.forEach(condition => {
            if (condition.symptoms.includes(symptom)) {
                condition.weight += 1;
            }
        });
    });

    // Determine the condition with the highest weight
    let diagnosisResult = "Based on your symptoms, we have diagnosed you with ";
    const maxWeightCondition = conditions.reduce((prev, current) => (prev.weight > current.weight) ? prev : current);

    if (maxWeightCondition.weight > 0) {
        diagnosisResult += maxWeightCondition.name;
    } else {
        diagnosisResult += "an unknown condition. Please consult a healthcare professional for further evaluation and treatment.";
    }

    document.getElementById('diagnosisResult').textContent = diagnosisResult;
});
