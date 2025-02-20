document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const symptoms = urlParams.get('symptoms').toLowerCase().split(',').map(s => s.trim());

    const conditions = [
        {
            name: "the Influenza, also known as the Flu. The Flu is a contagious respiratory illness caused by flu viruses. It typically causes symptoms like fever, cough, sore throat, body aches, fatigue, and congestion. The flu spreads through droplets from coughs or sneezes, and it can lead to serious complications, especially in young children, the elderly, and those with weakened immune systems. Vaccination is the primary method of prevention. The primary medications for the flu are antiviral drugs, which can help reduce the severity and duration of symptoms if taken early. These include: Oseltamivir (Tamiflu) which is taken orally, Zanamivir (Relenza) which you inhale, Baloxavir marboxil (Xofluza) which is taken orally, typically in a single dose, and Peramivir (Rapivab) which is administered intravenously. These antivirals work best when started within 48 hours of symptom onset. For symptom relief, over-the-counter medications like acetaminophen or ibuprofen can help manage fever and pain. We always reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['fever', 'chills', 'cough', 'sore throat', 'runny/stuffy nose', 'muscle aches', 'fatigue'],
            weight: 0
        },
        {
            name: "the Common Cold. The Common Cold is a viral infection, typically caused by rhinoviruses, affecting the upper respiratory system. It spreads easily through droplets from coughing or sneezing. Symptoms often include a runny or stuffy nose, sore throat, cough, mild headache, sneezing, and sometimes a low-grade fever. Cold symptoms usually last about 7 to 10 days, though they can occasionally linger longer, especially in those with weakened immune systems. Treatment for the common cold focuses on symptom relief, such as rest, hydration, and over-the-counter medications like decongestants, antihistamines, and pain relievers. Antibiotics are not effective against cold viruses. We always reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['runny/stuffy nose', 'sore throat', 'cough', 'sneezing', 'fatigue', 'nausea', 'vomiting', 'diarrhea'],
            weight: 0
        },
        {
            name: "Norovirus, which is often referred to as the stomach flu, is a highly contagious viral infection that causes gastroenteritis, inflammation of the stomach and intestines. It spreads through contaminated food, water, surfaces, or close contact with infected individuals. Symptoms include nausea, vomiting, diarrhea, stomach cramps, and sometimes low-grade fever or headache. Symptoms usually last 1 to 3 days but can be severe, especially in young children, the elderly, and those with weakened immune systems. There is no specific antiviral treatment for norovirus, so management focuses on staying hydrated to prevent dehydration, which is a common complication. Oral rehydration solutions or clear fluids are recommended, while avoiding solid foods until vomiting and diarrhea subside. Resting and practicing good hygiene, such as frequent hand washing and disinfecting surfaces, can help prevent the spread of the virus. Most people recover without complications within a few days, but we always reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach cramps', 'fever'],
            weight: 0
        },
        {
            name: "Strep throat, which is a bacterial infection caused by *Streptococcus* bacteria, primarily affecting the throat and tonsils. It spreads through respiratory droplets from coughing or sneezing. Symptoms include a severe sore throat, difficulty swallowing, fever, swollen lymph nodes, and red or white patches on the tonsils. Unlike viral throat infections, strep throat can lead to more serious complications if left untreated, such as rheumatic fever or kidney inflammation. Treatment for strep throat typically involves a course of antibiotics, such as penicillin or amoxicillin (do not take if allergic), to kill the bacteria and reduce the risk of complications. Over-the-counter pain relievers can help manage fever and sore throat discomfort. Resting, staying hydrated, and gargling with warm salt water can also help alleviate symptoms. It's important to finish the entire course of antibiotics to ensure full recovery and prevent the spread of infection. We always reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['sore throat', 'fever', 'swollen lymph nodes', 'headache', 'nausea'],
            weight: 0
        },
        {
            name: "Covid-19, which is a viral respiratory illness caused by the SARS-CoV-2 virus. It spreads primarily through respiratory droplets when an infected person coughs, sneezes, or talks. Symptoms range from mild to severe and may include fever, cough, shortness of breath, fatigue, sore throat, loss of taste or smell, and body aches. In more severe cases, it can lead to pneumonia, acute respiratory distress syndrome (ARDS), and even death, especially in older adults or those with underlying health conditions. Treatment for COVID-19 depends on the severity of the illness. For mild cases, rest, hydration, and over-the-counter medications for symptom relief may be sufficient. Antiviral medications, such as Paxlovid, may be prescribed for high-risk individuals to reduce the severity of symptoms. Hospitalization may be required for severe cases, including the use of oxygen or mechanical ventilation. Vaccination is the best preventive measure, along with wearing masks and practicing good hygiene to reduce transmission. Following public health guidelines, like isolation during illness, is crucial to preventing the spread of the virus. We highly reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['fever', 'cough', 'shortness of breath', 'fatigue', 'loss of taste or smell', 'sore throat', 'muscle aches'],
            weight: 0
        },
        {
            name: "Allergic rhinitis, commonly known as hay fever, is an allergic reaction that affects the nasal passages, typically triggered by airborne allergens like pollen, dust mites, mold, or pet dander. Symptoms include sneezing, runny or stuffy nose, itchy or watery eyes, and postnasal drip. It can occur seasonally (due to pollen) or year-round (due to indoor allergens). Treatment often involves antihistamines, nasal corticosteroids, decongestants, and leukotriene inhibitors to manage symptoms. Allergy shots (immunotherapy) may be recommended for long-term relief. Avoiding allergens, such as staying indoors during high pollen seasons or using air purifiers, can also help reduce symptoms. Keeping windows closed, washing bedding frequently, and using saline nasal sprays can provide additional relief. We reccomend visiting a healthcare professional for further evaluation and treatment.",
            symptoms: ['sneezing', 'runny/stuffy nose', 'itchy eyes', 'watery eyes', 'cough'],
            weight: 0
        },
        {
            name: "A migraine, which is a neurological condition characterized by intense, recurring headaches, often accompanied by nausea, vomiting, and sensitivity to light and sound. Migraines can last anywhere from a few hours to several days and may be triggered by factors such as stress, certain foods, hormonal changes, or environmental factors. Some individuals experience an aura before the headache, which can include visual disturbances like flashing lights or blind spots. Treatment for migraines typically involves medications for pain relief, such as triptans, NSAIDs, or acetaminophen. Preventive treatments, including beta-blockers, antidepressants, or anticonvulsants, may be prescribed for frequent migraines. Lifestyle changes, such as maintaining a consistent sleep schedule, managing stress, staying hydrated, and avoiding known triggers, can also help reduce the frequency and severity of migraines. We reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['headache', 'nausea', 'vomiting', 'sensitivity to light', 'sensitivity to sound'],
            weight: 0
        },
        {
            name: "Bronchitis, which is an inflammation of the bronchial tubes, which carry air to the lungs. It can be acute or chronic. Acute bronchitis is typically caused by viral infections, like the common cold or flu, and is characterized by coughing, mucus production, wheezing, shortness of breath, and chest discomfort. Chronic bronchitis, often linked to smoking or long-term exposure to irritants, involves persistent coughing and mucus production lasting for at least three months a year over two consecutive years. Treatment for acute bronchitis focuses on relieving symptoms, including rest, staying hydrated, using over-the-counter cough medicine, and taking pain relievers for fever or discomfort. In cases where bacterial infection is suspected, antibiotics may be prescribed. Chronic bronchitis is managed by quitting smoking, using inhalers or steroids to reduce inflammation, and avoiding lung irritants. In some cases, pulmonary rehabilitation may be recommended. We reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['cough', 'mucus production', 'fatigue', 'shortness of breath', 'chest discomfort'],
            weight: 0
        },
        {
            name: "Pneumonia, which is an infection that inflames the air sacs in one or both lungs, which can fill with fluid or pus. It can be caused by bacteria, viruses, or fungi. Common symptoms include cough (often with phlegm), fever, chills, shortness of breath, chest pain, fatigue, and confusion, especially in older adults. Pneumonia can range from mild to severe and is a leading cause of illness and death worldwide, particularly in young children, the elderly, and those with weakened immune systems. Treatment depends on the cause of the infection. Bacterial pneumonia is typically treated with antibiotics, while viral pneumonia may be managed with antiviral medications and supportive care, such as rest, fluids, and fever reducers. In severe cases, hospitalization and oxygen therapy may be needed. Vaccines are available to help prevent certain types of pneumonia, such as the pneumococcal vaccine and the flu vaccine. We reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['cough', 'fever', 'chills', 'shortness of breath', 'chest pain'],
            weight: 0
        },
        {
            name: "Sinusitis, or a sinus infection, is the inflammation or infection of the sinuses, which are air-filled cavities in the skull. It is often caused by a viral infection, but can also result from bacterial or fungal infections, allergies, or nasal polyps. Symptoms include a blocked or stuffy nose, facial pain or pressure, headache, thick nasal discharge, reduced sense of smell, cough, and fatigue. Treatment for sinusitis depends on the cause. Viral sinusitis typically resolves on its own, with rest, hydration, saline nasal sprays, and over-the-counter pain relievers offering symptom relief. Bacterial sinusitis may require antibiotics if symptoms persist for more than 10 days or worsen. Decongestants or nasal corticosteroids can help reduce inflammation, while avoiding allergens and irritants can prevent recurrence. In chronic cases, further treatments such as surgery or long-term medications may be needed. We reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['facial pain', 'nasal congestion', 'runny nose', 'loss of smell', 'cough'],
            weight: 0
        },
        {
            name: "Asthma, which is a chronic respiratory condition in which the airways become inflamed and narrowed, making it difficult to breathe. It is often triggered by allergens, exercise, cold air, smoke, or respiratory infections. Symptoms include wheezing, shortness of breath, chest tightness, and coughing, especially at night or early in the morning. Asthma can range from mild to severe and may be life-threatening if not properly managed. Asthma is typically treated with inhaled medications, including bronchodilators (e.g., albuterol) to relieve acute symptoms and corticosteroids (e.g., fluticasone) to reduce inflammation. Long-term control medications, such as leukotriene modifiers or biologics, may be prescribed for persistent asthma. Managing asthma involves avoiding triggers, using prescribed medications regularly, and monitoring symptoms. In emergency situations, a quick-relief inhaler can help alleviate sudden asthma attacks. We reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['shortness of breath', 'chest tightness', 'wheezing', 'cough'],
            weight: 0
        },
        {
            name: "Gastroenteritis, which is an inflammation of the stomach and intestines, typically caused by viral, bacterial, or parasitic infections. Common viruses that cause gastroenteritis include norovirus and rotavirus. Symptoms include diarrhea, nausea, vomiting, stomach cramps, fever, and dehydration. It is highly contagious and can spread through contaminated food, water, or contact with infected individuals. Treatment focuses on staying hydrated to prevent dehydration, which is a common complication, especially in young children and the elderly. Oral rehydration solutions or clear fluids like broth and water are recommended. Over-the-counter anti-diarrheal medications can help in some cases, but they should be avoided in children with viral gastroenteritis. Antibiotics may be prescribed if a bacterial cause is suspected. Most cases resolve within a few days, but good hygiene practices, such as frequent handwashing, can help prevent the spread of the infection. We reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach cramps', 'fever'],
            weight: 0
        },
        {
            name: "Mononucleosis, which is a viral infection most often caused by the Epstein-Barr virus (EBV). It is typically spread through saliva, which is why it's sometimes called the kissing disease, though it can also spread through other bodily fluids. Symptoms include extreme fatigue, sore throat, fever, swollen lymph nodes, and swollen tonsils. Some individuals may also experience a rash or an enlarged spleen. There is no specific treatment for mono, as it is a viral infection that usually resolves on its own. Management focuses on relieving symptoms, such as using pain relievers for fever and sore throat, staying hydrated, and resting. In some cases, corticosteroids may be prescribed to reduce swelling. Since mono can lead to complications like a ruptured spleen, it's important to avoid strenuous activities during recovery. Most people recover within a few weeks, though fatigue may last longer. We reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['fever', 'sore throat', 'swollen lymph nodes', 'fatigue', 'headache'],
            weight: 0
        },
        {
            name: "Chickenpox, which is a highly contagious viral infection caused by the varicella-zoster virus. It is characterized by an itchy rash that starts as red spots, which develop into fluid-filled blisters that eventually crust over. Other symptoms may include fever, fatigue, loss of appetite, and headache. Chickenpox is most common in children but can occur in adults, where it may be more severe. Treatment for chickenpox typically involves managing symptoms, such as using antihistamines or calamine lotion to relieve itching, and taking pain relievers like acetaminophen to reduce fever and discomfort. Antiviral medications may be prescribed for adults or individuals at high risk for complications. It's important to stay home to prevent spreading the virus. A vaccine is available to prevent chickenpox and is commonly given during childhood. Once recovered, the virus remains dormant in the body and can reactivate later in life as shingles. We reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['fever', 'rash', 'itching', 'fatigue', 'loss of appetite'],
            weight: 0
        },
        {
            name: "Lyme disease, which is a bacterial infection transmitted to humans through the bite of an infected black-legged (deer) tick. The bacteria responsible for Lyme disease is *Borrelia burgdorferi*. Early symptoms often include a characteristic circular rash, called erythema migrans, which may look like a bull's eye, along with fever, fatigue, headache, muscle and joint aches. If left untreated, it can cause more severe complications, including joint pain, neurological issues, and heart problems. Treatment for Lyme disease typically involves antibiotics, such as doxycycline, amoxicillin, or cefuroxime, which are most effective when started early. In more advanced stages, longer courses of antibiotics or intravenous treatment may be required. Preventing Lyme disease involves avoiding tick bites by using insect repellents, wearing long sleeves and pants, and checking for ticks after outdoor activities, especially in areas where Lyme disease is common. We reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['fever', 'chills', 'rash', 'headache', 'fatigue', 'muscle and joint aches', 'swollen lymph nodes'],
            weight: 0
        },
        {
            name: "Fibromyalgia, which is a chronic condition that causes widespread musculoskeletal pain, along with other symptoms like muscle cramps, joint pain, fatigue, sleep disturbances, and cognitive difficulties often referred to as fibro fog. The exact cause of fibromyalgia is unclear, but it is believed to involve abnormal processing of pain signals in the brain and nervous system, leading to an increased sensitivity to pain. Stress, genetics, infections, or physical trauma can sometimes trigger or worsen the condition. Treatment typically involves a combination of pain management, physical therapy, exercise, and medications, including pain relievers, antidepressants, and anti-seizure drugs to help alleviate symptoms. Lifestyle changes, such as managing stress, improving sleep, and regular low-impact exercise, are also important for managing the condition. While there is no cure, many people with fibromyalgia find relief through a combination of therapies tailored to their needs. We reccomend consulting a healthcare professional for further evaluation and treatment.",
            symptoms: ['muscle pain', 'fatigue', 'sleep disturbances', 'cognitive difficulties', 'joint pain', 'headaches', 'Irritable Bowel Syndrome (IBS)'], 
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
    let diagnosisResult = "<p>Based on your symptoms, we have diagnosed you with:</p>";
    const maxWeightCondition = conditions.reduce((prev, current) => (prev.weight > current.weight) ? prev : current);

    if (maxWeightCondition.weight > 0) {
        diagnosisResult += `<p>${maxWeightCondition.name}</p>`;
    } else {
        diagnosisResult += "<p>an unknown condition. Please consult a healthcare professional for further evaluation and treatment.</p>";
    }

    document.getElementById('diagnosisResult').innerHTML = diagnosisResult;
});
