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
        },
        {
            name: "Strep Throat",
            symptoms: ['sore throat', 'fever', 'swollen lymph nodes', 'headache', 'nausea'],
            weight: 0
        },
        {
            name: "COVID-19",
            symptoms: ['fever', 'cough', 'shortness of breath', 'fatigue', 'loss of taste or smell', 'sore throat', 'muscle aches'],
            weight: 0
        },
        {
            name: "Allergic Rhinitis",
            symptoms: ['sneezing', 'runny/stuffy nose', 'itchy eyes', 'watery eyes', 'cough'],
            weight: 0
        },
        {
            name: "Migraine",
            symptoms: ['headache', 'nausea', 'vomiting', 'sensitivity to light', 'sensitivity to sound'],
            weight: 0
        },
        {
            name: "Bronchitis",
            symptoms: ['cough', 'mucus production', 'fatigue', 'shortness of breath', 'chest discomfort'],
            weight: 0
        },
        {
            name: "Pneumonia",
            symptoms: ['cough', 'fever', 'chills', 'shortness of breath', 'chest pain'],
            weight: 0
        },
        {
            name: "Sinusitis",
            symptoms: ['facial pain', 'nasal congestion', 'runny nose', 'loss of smell', 'cough'],
            weight: 0
        },
        {
            name: "Asthma",
            symptoms: ['shortness of breath', 'chest tightness', 'wheezing', 'cough'],
            weight: 0
        },
        {
            name: "Gastroenteritis",
            symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach cramps', 'fever'],
            weight: 0
        },
        {
            name: "Mononucleosis",
            symptoms: ['fever', 'sore throat', 'swollen lymph nodes', 'fatigue', 'headache'],
            weight: 0
        },
        {
            name: "Chickenpox",
            symptoms: ['fever', 'rash', 'itching', 'fatigue', 'loss of appetite'],
            weight: 0
        },
        {
            name: "Lyme Disease",
            symptoms: ['fever', 'chills', 'headache', 'fatigue', 'muscle and joint aches', 'swollen lymph nodes'],
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
