document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const conditionName = urlParams.get('name');

    const conditions = [
        {
            name: "Influenza (Flu)",
            info: "Influenza, commonly known as the flu, is a contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness, and at times can lead to death. The best way to prevent the flu is by getting a flu vaccine each year.",
            symptoms: ['fever', 'chills', 'muscle aches'],
            medications: [
                { name: "Oseltamivir (Tamiflu)", dosage: "75 mg twice daily for 5 days", ageRange: [13, 100], allergies: [] },
                { name: "Zanamivir (Relenza)", dosage: "10 mg (two inhalations) twice daily for 5 days. Please avoid taking this medication if a milk allergy is present.", ageRange: [7, 100], allergies: ["milk"] },
                { name: "Baloxavir marboxil (Xofluza)", dosage: "40 mg single dose for those between 40-80 kg,  and 80 mg single dose for those with a weight higher than 80 kg", ageRange: [12, 100], allergies: [] },
                { name: "Peramivir (Rapivab)", dosage: "600 mg IV single dose", ageRange: [18, 100], allergies: [] }
            ],
            recommendations: "For symptom relief, over-the-counter medications like Tylenol or Advil can help manage fever and pain. Rest, stay hydrated, and avoid close contact with others to prevent spreading the virus."
        },
        {
            name: "Common Cold",
            info: "The Common Cold is a viral infection, typically caused by rhinoviruses, affecting the upper respiratory system. It spreads easily through droplets from coughing or sneezing. Symptoms often include a runny or stuffy nose, sore throat, cough, mild headache, sneezing, and sometimes a low-grade fever. Cold symptoms usually last about 7 to 10 days, though they can occasionally linger longer, especially in those with weakened immune systems.",
            symptoms: ['runny nose', 'sneezing', 'mild headache'],
            medications: [
                { name: "Decongestants", dosage: "As per package instructions", ageRange: [12, 100], allergies: [] },
                { name: "Antihistamines", dosage: "As per package instructions", ageRange: [12, 100], allergies: [] },
                { name: "Pain relievers", dosage: "As per package instructions", ageRange: [12, 100], allergies: [] }
            ],
            recommendations: "Rest, stay hydrated, and use over-the-counter medications like decongestants, antihistamines, and pain relievers to manage symptoms. Avoid close contact with others to prevent spreading the virus."
        },
        // Add more conditions as needed
    ];

    const condition = conditions.find(c => c.name === conditionName);

    if (condition) {
        document.getElementById('conditionName').textContent = condition.name;
        document.getElementById('conditionInfo').innerHTML = `<h3>Information</h3><p>${condition.info}</p>`;
        document.getElementById('conditionMedications').innerHTML = `<h3>Medications and Dosage</h3><p>${condition.medications.map(med => `${med.name}: ${med.dosage}`).join('<br>')}</p>`;
        document.getElementById('conditionRecommendations').innerHTML = `<h3>Recommendations</h3><p>${condition.recommendations}</p>`;
    } else {
        document.getElementById('conditionName').textContent = "Condition not found";
        document.getElementById('conditionInfo').innerHTML = `<p>The condition you are looking for does not exist.</p>`;
    }
});
