document.addEventListener('DOMContentLoaded', function() { // Contact a doctor
    const urlParams = new URLSearchParams(window.location.search); // Contact a doctor
    const symptoms = urlParams.get('symptoms') ? urlParams.get('symptoms').toLowerCase().split(',').map(s => s.trim()) : []; // Contact a doctor
    const age = urlParams.get('age') ? parseInt(urlParams.get('age'), 10) : null; // Contact a doctor
    const allergies = urlParams.get('allergies') ? urlParams.get('allergies').toLowerCase().split(',').map(a => a.trim()) : []; // Contact a doctor

    const conditions = [ {
        name: "the Flu",
        info: "The flu is a common illness that can make you feel tired and achy, with symptoms like fever, chills, and a sore throat. Taking care of yourself and getting a flu shot every year can help you stay healthy.",
        symptoms: ['fever', 'chills', 'muscle aches', 'sore throat'],
        medications: [
            { name: "Tamiflu (Oseltamivir)", dosage: "Take 75 mg twice daily for 5 days", ageRange: [13, 100], allergies: [], link: "https://www.healthlinkbc.ca/healthwise/oseltamivir-oral" },
            { name: "Relenza (Zanamivir)", dosage: "Inhale 10 mg twice daily for 5 days. Avoid if you have a milk allergy.", ageRange: [7, 100], allergies: ["milk"], link: "https://www.healthlinkbc.ca/healthwise/zanamivir-inhaler-oral-inhalation" },
            { name: "Xofluza", dosage: "Take 40 mg once if you weigh 40-80 kg, or 80 mg once if you weigh more than 80 kg", ageRange: [12, 100], allergies: [], link: "https://www.guidelinecentral.com/drug/e49e1a61-1b7c-4be5-ac84-af6240b511e7/Xofluza/" },
            { name: "Rapivab", dosage: "600 mg IV once", ageRange: [18, 100], allergies: [], link: "https://www.drugs.com/mtm/rapivab.html" }
        ],
        recommendations: "Make sure to rest, drink plenty of fluids, and use over-the-counter medications like Tylenol or Advil to feel better. Stay home and rest to help yourself recover and keep others healthy.",
        weight: 0
    },
    {
        name: "the Common Cold",
        info: "The common cold is a mild illness that can cause a runny nose, sneezing, and a scratchy throat. It usually goes away on its own in about a week.",
        symptoms: ['runny nose', 'sneezing', 'mild headache', 'sore throat', 'cough'],
        medications: [
            { name: "Decongestants", dosage: "Follow the instructions on the package", ageRange: [12, 100], allergies: [], link: "https://www.healthlinkbc.ca/healthwise/decongestants" },
            { name: "Antihistamines", dosage: "Follow the instructions on the package", ageRange: [12, 100], allergies: [], link: "https://www.healthlinkbc.ca/healthwise/antihistamines" },
        ],
        recommendations: "Take it easy, drink lots of fluids, and use over-the-counter medications to feel better. Avoid close contact with others to help everyone stay well.",
        weight: 0
    },
    {
        name: "Typhoid",
        info: "Typhoid is an illness that can cause a high fever and stomach discomfort. It’s often linked to food or water that isn’t clean. Taking care of yourself and following your doctor’s advice can help you recover.",
        symptoms: ['high fever', 'stomach pain', 'feeling very tired or fatigue'],
        medications: [
            { name: "Ciprofloxacin", dosage: "Take 500 mg twice daily for 7-14 days", ageRange: [18, 100], allergies: [], link: "https://www.webmd.com/drugs/2/drug-7797/ciprofloxacin-oral/details" },
            { name: "Azithromycin", dosage: "Take 500 mg once daily for 7 days", ageRange: [0, 100], allergies: [], link: "https://www.webmd.com/drugs/2/drug-6476/azithromycin-oral/details" }
        ],
        recommendations: "Follow your doctor’s instructions for medication, drink plenty of water, and eat small, gentle meals. Avoid raw foods and unclean water to stay safe.",
        weight: 0
    },
    {
        name: "Hand, Foot, and Mouth Disease",
        info: "This is a common illness in children that can cause small sores in the mouth and a rash on the hands and feet. With care and rest, children usually recover quickly.",
        symptoms: ['sores in mouth', 'rash on hands', 'rash on feet'],
        medications: [
            { name: "Pain relievers", dosage: "Follow the instructions on the package", ageRange: [0, 100], allergies: [], link: "https://www.webmd.com/drugs/2/drug-17706/pain-relievers-oral/details" },
            { name: "Topical ointments", dosage: "Follow the instructions on the package", ageRange: [0, 100], allergies: [], link: "https://www.webmd.com/drugs/2/drug-17710/topical-ointments/details" }
        ],
        recommendations: "Encourage your child to drink fluids, avoid spicy or sour foods, and use pain relievers or ointments to help them feel better. Wash hands often to keep everyone healthy.",
        weight: 0
    },
    {
        name: "Norovirus (Stomach Flu)",
        info: "Norovirus is a common illness that can upset your stomach and cause nausea or diarrhea. It spreads easily, so good hygiene is important.",
        symptoms: ['nausea', 'vomiting', 'diarrhea'],
        medications: [
            { name: "Oral rehydration solutions", dosage: "As needed", ageRange: [0, 100], allergies: [] },
            { name: "Clear fluids", dosage: "As needed", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Stay hydrated with clear fluids or oral rehydration solutions. Rest and avoid solid foods until you feel better. Keep your hands clean and disinfect surfaces to protect others.",
        weight: 0
    },
    {
        name: "Strep Throat",
        info: "Strep throat is an infection that can cause a sore throat and fever. With proper care and medication, you’ll feel better soon.",
        symptoms: ['severe sore throat', 'pain when swallowing', 'red swollen tonsils'],
        medications: [
            { name: "Penicillin", dosage: "250 mg four times daily for 10 days. Please avoid taking this medication if a Penicillin allergy is present.", ageRange: [0, 100], allergies: ["penicillin"] },
            { name: "Amoxicillin", dosage: "500 mg three times daily for 10 days", ageRange: [0, 100], allergies: [] },
            { name: "Cephalexin", dosage: "500 mg twice daily for 10 days. Please avoid taking this medication if a Cephalosporins allergy is present.", ageRange: [0, 100], allergies: ["cephalosporins"] }
        ],
        recommendations: "Take prescribed antibiotics as directed, rest, and drink plenty of fluids. Over-the-counter pain relievers can help with discomfort.",
        weight: 0
    },
    {
        name: "Chickenpox",
        info: "Chickenpox is a common illness that causes an itchy rash and red spots. With rest and care, you’ll feel better soon.",
        symptoms: ['itchy rash', 'red spots', 'blisters'],
        medications: [
            { name: "Acyclovir", dosage: "800 mg five times daily for 5 days", ageRange: [2, 100], allergies: [] },
            { name: "Valacyclovir", dosage: "1000 mg three times daily for 7 days", ageRange: [12, 100], allergies: [] },
            { name: "Calamine Lotion", dosage: "Apply as needed", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Rest, drink plenty of fluids, and use over-the-counter creams to relieve itching. Avoid scratching to prevent infection.",
        weight: 0
    },
    {
        name: "Measles",
        info: "Measles is an illness that can cause a red rash, cough, and runny nose. Resting and taking care of yourself will help you recover.",
        symptoms: ['red rash', 'high fever', 'dry cough', 'runny nose'],
        medications: [
            { name: "Vitamin A", dosage: "200,000 IU once daily for 2 days", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Stay hydrated, rest, and use over-the-counter medications to manage fever and discomfort. Vaccination is the best way to prevent measles.",
        weight: 0
    },
    {
        name: "Mumps",
        info: "Mumps is an illness that can cause swelling in the cheeks and jaw. Rest and hydration are key to feeling better.",
        symptoms: ['swollen salivary glands', 'painful chewing', 'high fever'],
        medications: [
            { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Drink plenty of fluids, rest, and use over-the-counter pain relievers to feel better. Vaccination is the best way to prevent mumps.",
        weight: 0
    },
    {
        name: "Rubella (German Measles)",
        info: "Rubella is a mild illness that can cause a red rash and swollen glands. Resting and taking care of yourself will help you recover.",
        symptoms: ['red rash', 'swollen lymph nodes', 'high fever'],
        medications: [
            { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Stay hydrated, rest, and use over-the-counter medications to manage symptoms. Vaccination is the best way to prevent rubella.",
        weight: 0
    },
    {
        name: "Whooping Cough",
        info: "Whooping cough is an illness that can cause severe coughing fits. With proper care and medication, you’ll feel better soon.",
        symptoms: ['severe coughing fits', 'whooping sound', 'vomiting after coughing'],
        medications: [
            { name: "Azithromycin", dosage: "500 mg on day 1, then 250 mg once daily for 4 days", ageRange: [0, 100], allergies: [] },
            { name: "Clarithromycin", dosage: "500 mg twice daily for 7 days", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Take prescribed antibiotics as directed, rest, and stay hydrated. Use over-the-counter medications to manage symptoms. Vaccination is the best way to prevent it.",
        weight: 0
    },
    {
        name: "Diphtheria",
        info: "Diphtheria is an illness that can affect your throat and make it hard to breathe. Following your doctor’s advice will help you recover.",
        symptoms: ['thick gray coating in throat', 'difficulty breathing', 'swollen glands'],
        medications: [
            { name: "Diphtheria antitoxin", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
            { name: "Erythromycin", dosage: "500 mg four times daily for 14 days", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Take prescribed medications as directed, rest, and stay hydrated. Avoid close contact with others to prevent spreading the illness. Vaccination is the best way to prevent it.",
        weight: 0
    },
    {
        name: "Tetanus",
        info: "Tetanus is an illness that can cause muscle stiffness. Taking care of any wounds and following your doctor’s advice will help you recover.",
        symptoms: ['jaw cramping', 'muscle stiffness', 'difficulty swallowing'],
        medications: [
            { name: "Tetanus immune globulin", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
            { name: "Metronidazole", dosage: "500 mg every 6 hours for 7-10 days", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Take prescribed medications as directed, rest, and keep any wounds clean. Vaccination is the best way to prevent tetanus.",
        weight: 0
    },
    {
        name: "Hepatitis A",
        info: "Hepatitis A is an illness that can cause fatigue and stomach discomfort. Rest and hydration are key to recovery.",
        symptoms: ['jaundice', 'abdominal pain', 'loss of appetite'],
        medications: [
            { name: "Supportive care", dosage: "As needed", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Rest, drink plenty of fluids, and avoid alcohol to help your liver heal. Practice good hygiene to prevent spreading the illness.",
        weight: 0
    },
    {
        name: "Hepatitis B",
        info: "Hepatitis B is a viral infection that affects the liver, causing inflammation. It spreads through contact with infected blood or body fluids. Symptoms include jaundice, fatigue, abdominal pain, and dark urine.",
        symptoms: ['dark urine', 'fatigue', 'jaundice'],
        medications: [
            { name: "Entecavir", dosage: "0.5 mg once daily", ageRange: [0, 100], allergies: [] },
            { name: "Tenofovir", dosage: "300 mg once daily", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Take prescribed medications as directed. Rest, stay hydrated, and avoid alcohol to reduce liver strain. Practice safe sex and avoid sharing needles. Vaccination is the primary method of prevention.",
        weight: 0
    },
    {
        name: "Hepatitis C",
        info: "Hepatitis C is a viral infection that affects the liver, causing inflammation. It spreads through contact with infected blood. Symptoms include jaundice, fatigue, abdominal pain, and dark urine.",
        symptoms: ['dark urine', 'fatigue', 'jaundice'],
        medications: [
            { name: "Sofosbuvir", dosage: "400 mg once daily", ageRange: [0, 100], allergies: [] },
            { name: "Ledipasvir", dosage: "90 mg once daily", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Take prescribed medications as directed. Rest, stay hydrated, and avoid alcohol to reduce liver strain. Practice safe sex and avoid sharing needles.",
        weight: 0
    },
    {
        name: "Irritable Bowel Syndrome (IBS)",
        info: "IBS is a common disorder that affects the large intestine. Symptoms include cramping, abdominal pain, bloating, gas, and diarrhea or constipation, or both. IBS is a chronic condition that you'll need to manage long term.",
        symptoms: ['abdominal pain', 'bloating', 'gas'],
        medications: [
            { name: "Loperamide", dosage: "2 mg after each loose stool", ageRange: [12, 100], allergies: [] },
            { name: "Dicyclomine", dosage: "20 mg four times daily", ageRange: [12, 100], allergies: [] }
        ],
        recommendations: "Manage stress, make dietary changes, and use medications as prescribed. Regular exercise and adequate sleep can also help manage symptoms.",
        weight: 0
    },
    {
        name: "Gastritis",
        info: "Gastritis can cause stomach discomfort and bloating. Eating smaller meals and avoiding spicy foods can help.",
        symptoms: ['upper abdominal pain', 'nausea', 'bloating'],
        medications: [
            { name: "Antacids", dosage: "As per package instructions", ageRange: [12, 100], allergies: [] },
            { name: "Proton pump inhibitors", dosage: "As per doctor's instructions", ageRange: [12, 100], allergies: [] }
        ],
        recommendations: "Avoid spicy foods, eat smaller meals, and manage stress. Over-the-counter antacids can help with discomfort.",
        weight: 0
    },
    {
        name: "Migraine",
        info: "Migraines can cause severe headaches and sensitivity to light. Resting in a quiet, dark room can help you feel better.",
        symptoms: ['severe headache', 'nausea', 'sensitivity to light'],
        medications: [
            { name: "Sumatriptan", dosage: "50-100 mg at onset of symptoms", ageRange: [18, 100], allergies: [] },
            { name: "Rizatriptan", dosage: "10 mg at onset of symptoms", ageRange: [18, 100], allergies: [] }
        ],
        recommendations: "Rest in a quiet, dark room, stay hydrated, and avoid known triggers. Over-the-counter medications can help with pain relief.",
        weight: 0
    },
    {
        name: "Hay Fever",
        info: "Hay fever can cause sneezing and itchy eyes. Avoiding allergens and using medications can help you feel better.",
        symptoms: ['sneezing', 'runny nose', 'itchy eyes'],
        medications: [
            { name: "Antihistamines", dosage: "Take 10 mg once daily", ageRange: [12, 100], allergies: [], link: "https://www.webmd.com/drugs/2/drug-17705/antihistamines-oral/details" },
            { name: "Nasal sprays", dosage: "Use 2 sprays in each nostril once daily", ageRange: [12, 100], allergies: [], link: "https://www.webmd.com/drugs/2/drug-17707/nasal-corticosteroids/details" }
        ],
        recommendations: "Stay indoors during high pollen times, use air purifiers, and take your medications as directed.",
        weight: 0
    },
    {
        name: "Pink Eye",
        info: "Pink eye can make your eyes red and itchy. Keeping your hands clean and avoiding touching your eyes will help you recover.",
        symptoms: ['red or pink eyes', 'itchy eyes', 'eye discharge'],
        medications: [
            { name: "Artificial tears", dosage: "Use as needed", ageRange: [0, 100], allergies: [], link: "https://www.webmd.com/drugs/2/drug-17708/artificial-tears/details" },
            { name: "Antibiotic eye drops", dosage: "Use 1-2 drops in each eye every 4 hours", ageRange: [0, 100], allergies: [], link: "https://www.webmd.com/drugs/2/drug-17709/antibiotic-eye-drops/details" }
        ],
        recommendations: "Wash your hands often, avoid touching your eyes, and use eye drops as directed. Use a clean towel each day.",
        weight: 0
    },
    {
        name: "Appendicitis",
        info: "Appendicitis happens when the appendix becomes inflamed. It can cause pain in the lower right side of your belly. Getting medical care quickly can help you feel better.",
        symptoms: ['right lower abdominal pain', 'nausea', 'loss of appetite'],
        medications: [
            { name: "Antibiotics", dosage: "As per doctor's instructions.", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "If you think you might have appendicitis, seek medical attention right away. Surgery is often needed to remove the appendix.",
        weight: 0
    },
    {
        name: "Kidney Stones",
        info: "Kidney stones are small, hard deposits that can form in your kidneys. They can cause pain in your back or side. Drinking plenty of water can help.",
        symptoms: ['severe side pain', 'pain radiating to lower abdomen', 'pain in waves'],
        medications: [
            { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] },
            { name: "Alpha blockers", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Drink lots of water to help pass the stones. Follow your doctor’s advice for managing pain and treatment.",
        weight: 0
    },
    {
        name: "Pancreatitis",
        info: "Pancreatitis is when the pancreas becomes inflamed. It can cause pain in your upper belly that might spread to your back. Rest and care can help you recover.",
        symptoms: ['upper abdominal pain', 'pain radiating to back', 'abdominal tenderness'],
        medications: [
            { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] },
            { name: "Enzyme supplements", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Take prescribed medications, rest, and avoid alcohol. Eating a low-fat diet can also help.",
        weight: 0
    },
    {
        name: "Pneumonia",
        info: "Pneumonia is an infection in the lungs that can make it hard to breathe. It can cause coughing, fever, and chills. With the right care, you’ll feel better soon.",
        symptoms: ['cough with phlegm', 'high fever', 'difficulty breathing'],
        medications: [
            { name: "Antibiotics", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
            { name: "Antivirals", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Rest, drink plenty of fluids, and take prescribed medications. If symptoms worsen, see a doctor right away.",
        weight: 0
    },
    {
        name: "Bronchitis",
        info: "Bronchitis is when the tubes that carry air to your lungs become inflamed. It can cause coughing and fatigue. Rest and hydration can help you recover.",
        symptoms: ['persistent cough', 'mucus production', 'fatigue'],
        medications: [
            { name: "Cough suppressants", dosage: "As per package instructions", ageRange: [12, 100], allergies: [] },
            { name: "Bronchodilators", dosage: "As per doctor's instructions", ageRange: [12, 100], allergies: [] }
        ],
        recommendations: "Stay hydrated, rest, and use over-the-counter medications to ease symptoms. Avoid smoking or other irritants.",
        weight: 0
    },
    {
        name: "Sinusitis",
        info: "Sinusitis happens when the sinuses become inflamed. It can cause a stuffy nose and facial pressure. Simple home remedies can help you feel better.",
        symptoms: ['facial pain', 'blocked nose', 'reduced sense of smell'],
        medications: [
            { name: "Decongestants", dosage: "As per package instructions", ageRange: [12, 100], allergies: [] },
            { name: "Nasal corticosteroids", dosage: "As per doctor's instructions", ageRange: [12, 100], allergies: [] }
        ],
        recommendations: "Drink plenty of fluids, use a humidifier, and try over-the-counter medications to ease symptoms.",
        weight: 0
    },
    {
        name: "Urinary Tract Infection (UTI)",
        info: "A UTI is an infection in the urinary system that can cause discomfort when urinating. Drinking lots of water can help flush out the bacteria.",
        symptoms: ['burning sensation when urinating', 'persistent urge to urinate', 'cloudy urine'],
        medications: [
            { name: "Trimethoprim/sulfamethoxazole", dosage: "160/800 mg twice daily for 3 days", ageRange: [12, 100], allergies: [] },
            { name: "Nitrofurantoin", dosage: "100 mg twice daily for 5 days", ageRange: [12, 100], allergies: [] }
        ],
        recommendations: "Take prescribed antibiotics as directed and drink plenty of water. If symptoms persist, see a doctor.",
        weight: 0
    },
    {
        name: "Gout",
        info: "Gout is a type of arthritis that can cause sudden pain and swelling in the joints. Avoiding certain foods can help prevent flare-ups.",
        symptoms: ['severe joint pain', 'redness in joints', 'tenderness in joints'],
        medications: [
            { name: "Colchicine", dosage: "1.2 mg at the first sign of a gout flare, followed by 0.6 mg one hour later", ageRange: [18, 100], allergies: [] },
            { name: "Allopurinol", dosage: "100-300 mg once daily", ageRange: [18, 100], allergies: [] }
        ],
        recommendations: "Take prescribed medications as directed. Avoid foods high in purines, like red meat and seafood.",
        weight: 0
    },
    {
        name: "Sciatica",
        info: "Sciatica is pain that travels along the sciatic nerve, which runs from your lower back down your leg. Rest and gentle stretches can help.",
        symptoms: ['lower back pain', 'pain radiating down leg', 'numbness in leg'],
        medications: [
            { name: "NSAIDs", dosage: "As per package instructions", ageRange: [18, 100], allergies: [] },
            { name: "Muscle relaxants", dosage: "As per doctor's instructions", ageRange: [18, 100], allergies: [] }
        ],
        recommendations: "Rest, use over-the-counter pain relievers, and apply heat or ice to the affected area. Physical therapy may also help.",
        weight: 0
    },
    {
        name: "Tonsillitis",
        info: "Tonsillitis is when the tonsils become inflamed. It can cause a sore throat and difficulty swallowing. Rest and care can help you recover.",
        symptoms: ['sore throat', 'difficulty swallowing', 'tender lymph nodes'],
        medications: [
            { name: "Penicillin", dosage: "250 mg four times daily for 10 days. Avoid if allergic to Penicillin.", ageRange: [0, 100], allergies: ["penicillin"] },
            { name: "Amoxicillin", dosage: "500 mg three times daily for 10 days", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Take prescribed antibiotics as directed, rest, and drink plenty of fluids. Over-the-counter pain relievers can help with discomfort.",
        weight: 0
    },
    {
        name: "Psoriasis",
        info: "Psoriasis is a skin condition that can cause red, scaly patches. Keeping your skin moisturized can help reduce symptoms.",
        symptoms: ['red scaly patches', 'itchy skin', 'dry cracked skin'],
        medications: [
            { name: "Topical corticosteroids", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
            { name: "Vitamin D analogues", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Use prescribed creams, keep your skin moisturized, and avoid triggers that cause flare-ups.",
        weight: 0
    },
    {
        name: "Anemia",
        info: "Anemia is a condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues. It can cause fatigue, weakness, and pale skin.",
        symptoms: ['fatigue', 'weakness', 'pale skin'],
        medications: [
            { name: "Iron supplements", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
            { name: "Vitamin B12 injections", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Eat a diet rich in iron and vitamins. Take prescribed supplements as directed. Rest and avoid strenuous activities.",
        weight: 0
    },
    {
        name: "Asthma",
        info: "Asthma is a condition that can make breathing difficult. Using your inhaler and avoiding triggers will help you stay comfortable.",
        symptoms: ['wheezing', 'shortness of breath', 'chest tightness'],
        medications: [
            { name: "Inhaled corticosteroids", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
            { name: "Bronchodilators", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Use your prescribed inhaler as directed, avoid asthma triggers, and monitor your breathing. Seek medical help if symptoms worsen.",
        weight: 0
    },
    {
        name: "Celiac Disease",
        info: "Celiac disease is an immune reaction to eating gluten, a protein found in wheat, barley, and rye. It can cause digestive discomfort and damage to the small intestine.",
        symptoms: ['diarrhea', 'bloating', 'weight loss'],
        medications: [
            { name: "Gluten-free diet", dosage: "Lifelong", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Follow a strict gluten-free diet. Avoid foods containing wheat, barley, and rye. Consult a dietitian for guidance.",
        weight: 0
    },
    {
        name: "Chronic Fatigue Syndrome (CFS)",
        info: "CFS is a complex disorder characterized by extreme fatigue that can't be explained by any underlying medical condition. The fatigue may worsen with physical or mental activity but doesn't improve with rest.",
        symptoms: ['extreme fatigue', 'unrefreshing sleep', 'muscle pain'],
        medications: [
            { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] },
            { name: "Antidepressants", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Manage stress, maintain a balanced diet, and get regular exercise. Follow your doctor's treatment plan.",
        weight: 0
    },
    {
        name: "Diverticulitis",
        info: "Diverticulitis occurs when one or more diverticula in your digestive tract become inflamed or infected. It can cause severe abdominal pain, fever, and changes in bowel habits.",
        symptoms: ['lower left abdominal pain', 'fever', 'constipation'],
        medications: [
            { name: "Antibiotics", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
            { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Follow a liquid or low-fiber diet during flare-ups. Take prescribed medications as directed. Gradually increase fiber intake as symptoms improve.",
        weight: 0
    },
    {
        name: "Fibromyalgia",
        info: "Fibromyalgia can cause widespread pain and fatigue. Gentle exercise and stress management can help improve symptoms.",
        symptoms: ['widespread pain', 'fatigue', 'sleep disturbances'],
        medications: [
            { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] },
            { name: "Antidepressants", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Exercise regularly, practice relaxation techniques, and get enough sleep. Follow your doctor’s treatment plan.",
        weight: 0
    },
    {
        name: "Gallstones",
        info: "Gallstones are hardened deposits of digestive fluid that can form in your gallbladder. They can cause sudden and rapidly intensifying pain in the upper right portion of your abdomen.",
        symptoms: ['upper right abdominal pain', 'nausea', 'vomiting'],
        medications: [
            { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] },
            { name: "Ursodiol", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Avoid fatty foods, maintain a healthy weight, and follow your doctor's treatment plan. Surgery may be required to remove the gallbladder.",
        weight: 0
    },
    {
        name: "Hyperthyroidism",
        info: "Hyperthyroidism is a condition in which your thyroid gland produces too much of the hormone thyroxine. It can accelerate your body's metabolism, causing unintentional weight loss and a rapid or irregular heartbeat.",
        symptoms: ['weight loss', 'rapid heartbeat', 'nervousness'],
        medications: [
            { name: "Antithyroid medications", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
            { name: "Beta-blockers", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Take prescribed medications as directed. Monitor your thyroid levels regularly. Follow your doctor's treatment plan.",
        weight: 0
    },
    {
        name: "Hypothyroidism",
        info: "Hypothyroidism is a condition in which your thyroid gland doesn't produce enough of certain crucial hormones. It can cause fatigue, weight gain, and depression.",
        symptoms: ['fatigue', 'weight gain', 'depression'],
        medications: [
            { name: "Levothyroxine", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Take prescribed medications as directed. Monitor your thyroid levels regularly. Follow your doctor's treatment plan.",
        weight: 0
    },
    {
        name: "Lupus",
        info: "Lupus is a systemic autoimmune disease that occurs when your body's immune system attacks your own tissues and organs. It can cause inflammation and damage to various body systems.",
        symptoms: ['joint pain', 'butterfly-shaped rash on face', 'fatigue'],
        medications: [
            { name: "NSAIDs", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] },
            { name: "Corticosteroids", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Take prescribed medications as directed. Protect yourself from the sun, and maintain a healthy lifestyle. Follow your doctor's treatment plan.",
        weight: 0
    },
    {
        name: "Tuberculosis",
        info: "Tuberculosis (TB) is a potentially serious infectious disease that mainly affects your lungs. The bacteria that cause tuberculosis are spread from person to person through tiny droplets released into the air via coughs and sneezes.",
        symptoms: ['night sweats', 'continuous coughing', 'coughing blood', 'coughing sputum'],
        medications: [
            { name: "Isoniazid", dosage: "Adults: 5 mg/kg daily (maximum 300 mg per day); Children: 10-15 mg/kg daily (maximum 300 mg per day). ", ageRange: [0, 100], allergies: [] },
            { name: "Rifampin", dosage: "Adults: 10 mg/kg daily (maximum 600 mg per day); Children: 10-20 mg/kg daily (maximum 600 mg per day).", ageRange: [0, 100], allergies: [] },
            { name: "Pyrazinamide", dosage: "Adults: 15-30 mg/kg daily (maximum 2 g per day); Children: 15-30 mg/kg daily (maximum 2 g per day).", ageRange: [0, 100], allergies: [] },
            { name: "Ethambutol", dosage: "Adults: 15-25 mg/kg daily (maximum 2.5 g per day); Children: 15-25 mg/kg daily (maximum 2.5 g per day).", ageRange: [0, 100], allergies: [] }
        ],
        recommendations: "Take prescribed medications as directed. Protect yourself from the sun, and maintain a healthy lifestyle. Follow your doctor's treatment plan.",
        weight: 0
    },
    {
        name: "Yellow Fever",
        info: "Yellow fever is a viral infection spread by a particular type of mosquito. The infection is most common in areas of Africa and South America, affecting travelers to and residents of those areas.",
        symptoms: ['jaundice', 'high fever', 'abdominal pain', 'muscle pain', 'bleeding from nose, mouth, eyes, or stomach'],
        medications: [
            { name: "Vaccination", dosage: "Doctor administered vaccination is highly required.", ageRange: [0, 100], allergies: [] },
        ],
        recommendations: "Seek doctor's advice for vaccination. Avoid mosquito bites by using insect repellent and wearing protective clothing.",
        weight: 0
    },
    {
        name: "Multiple Sclerosis (MS)",
        info: "Multiple sclerosis (MS) is a potentially disabling disease of the brain and spinal cord (central nervous system). In MS, the immune system attacks the protective sheath (myelin) that covers nerve fibers and causes communication problems between your brain and the rest of your body.",
        symptoms: ['dizziness', 'blurred vision', 'fatigue', 'numb or tingling limbs'],
        medications: [
            { name: "Ocrelizumab (Ocrevus)", dosage: "300 mg every 6 months (split into two doses of 300 mg each, given at an initial dose).", ageRange: [0, 100], allergies: [] },
            { name: "Dimethyl Fumarate (Tecfidera)", dosage: " 240 mg twice daily.", ageRange: [0, 100], allergies: [] },
            { name: "Interferon beta-1a (Avonex, Rebif)", dosage: "30 mcg intramuscularly once a week.", ageRange: [0, 100], allergies: [] },
            { name: "Fingolimod (Gilenya)", dosage: "0.5 mg orally once daily.", ageRange: [0, 100], allergies: [] },
        ],
        recommendations: "Seek doctor's advice for vaccination. Avoid mosquito bites by using insect repellent and wearing protective clothing.",
        weight: 0
    },
    {
        name: "Alzheimer's Disease",
        info: "Alzheimer's disease is a progressive neurological disorder that causes brain cells to degenerate and die, leading to memory loss and cognitive decline.",
        symptoms: ['memory loss', 'confusion', 'difficulty completing familiar tasks', 'poor judgment'],
        medications: [
            { name: "Donepezil (Aricept)", dosage: "5 mg once daily.", ageRange: [0, 100], allergies: [] },
            { name: "Memantine (Namenda)", dosage: "10 mg twice daily.", ageRange: [0, 100], allergies: [] },
        ],
        recommendations: "Engage in mental exercises, maintain a healthy diet, and seek support from caregivers.",
        weight: 0
    },
    {
        name: "Parkinson's Disease",
        info: "Parkinson's disease is a progressive nervous system disorder that affects movement.",
        symptoms: ['tremors', 'slowed movement', 'rigid muscles', 'impaired posture and balance'],
        medications: [
            { name: "Levodopa-Carbidopa (Sinemet)", dosage: "25/100 mg three times daily.", ageRange: [0, 100], allergies: [] },
            { name: "Ropinirole (Requip)", dosage: "0.25 mg three times daily.", ageRange: [0, 100], allergies: [] },
        ],
        recommendations: "Regular exercise and physical therapy to maintain mobility and balance.",
        weight: 0
    },
    {
        name: "Rheumatoid Arthritis",
        info: "Rheumatoid arthritis is a chronic inflammatory disorder that can affect more than just your joints.",
        symptoms: ['tender, warm, swollen joints', 'joint stiffness', 'fatigue', 'fever'],
        medications: [
            { name: "Methotrexate", dosage: "7.5 mg once weekly.", ageRange: [0, 100], allergies: [] },
            { name: "Adalimumab (Humira)", dosage: "40 mg every other week.", ageRange: [0, 100], allergies: [] },
        ],
        recommendations: "Physical activity, joint care, and anti-inflammatory diet.",
        weight: 0
    },
    {
        name: "Osteoporosis",
        info: "Osteoporosis is a condition in which bones become weak and brittle.",
        symptoms: ['back pain', 'loss of height over time', 'stooped posture', 'bone fractures'],
        medications: [
            { name: "Alendronate (Fosamax)", dosage: "70 mg once weekly.", ageRange: [0, 100], allergies: [] },
            { name: "Raloxifene (Evista)", dosage: "60 mg once daily.", ageRange: [0, 100], allergies: [] },
        ],
        recommendations: "Calcium and vitamin D supplementation, weight-bearing exercises.",
        weight: 0
    },
    {
        name: "Chronic Obstructive Pulmonary Disease (COPD)",
        info: "COPD is a chronic inflammatory lung disease that obstructs airflow from the lungs.",
        symptoms: ['shortness of breath', 'wheezing', 'chronic cough', 'frequent respiratory infections'],
        medications: [
            { name: "Tiotropium (Spiriva)", dosage: "18 mcg inhaled once daily.", ageRange: [0, 100], allergies: [] },
            { name: "Salmeterol (Serevent)", dosage: "50 mcg inhaled twice daily.", ageRange: [0, 100], allergies: [] },
        ],
        recommendations: "Avoid smoking, pulmonary rehabilitation, and flu vaccination.",
        weight: 0
    },
    {
        name: "Epilepsy",
        info: "Epilepsy is a central nervous system disorder in which brain activity becomes abnormal, causing seizures.",
        symptoms: ['recurrent seizures', 'temporary confusion', 'loss of consciousness', 'anxiety'],
        medications: [
            { name: "Valproic Acid (Depakote)", dosage: "500 mg twice daily.", ageRange: [0, 100], allergies: [] },
            { name: "Lamotrigine (Lamictal)", dosage: "100 mg once daily.", ageRange: [0, 100], allergies: [] },
        ],
        recommendations: "Medication adherence, seizure precautions, and regular follow-ups with a neurologist.",
        weight: 0
    },
    // Add these to the `conditions` array
{
    name: "Acne",
    info: "Acne is a skin condition that causes pimples, blackheads, and whiteheads.",
    symptoms: ["pimples", "blackheads", "whiteheads"],
    medications: [
        { name: "Benzoyl Peroxide", dosage: "Apply once daily", ageRange: [12, 100], allergies: [] },
        { name: "Salicylic Acid", dosage: "Apply twice daily", ageRange: [12, 100], allergies: [] }
    ],
    recommendations: "Wash your face gently, avoid touching your face, and use acne creams as directed.",
    weight: 0
},
{
    name: "Athlete's Foot",
    info: "A fungal infection that causes itchy, cracked skin on the feet.",
    symptoms: ["itchy feet", "cracked skin", "redness"],
    medications: [
        { name: "Antifungal Cream", dosage: "Apply twice daily", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Keep your feet clean and dry, and wear breathable shoes.",
    weight: 0
},
{
    name: "Conjunctivitis",
    info: "Also known as pink eye, it causes redness and itching in the eyes.",
    symptoms: ["red eyes", "itchy eyes", "eye discharge"],
    medications: [
        { name: "Artificial Tears", dosage: "Use as needed", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Avoid touching your eyes, wash your hands often, and use eye drops.",
    weight: 0
},
{
    name: "Dehydration",
    info: "Dehydration can make you feel dizzy or tired. Drinking plenty of water can help you feel better quickly.",
    symptoms: ["dry mouth", "dizziness", "dark urine"],
    medications: [
        { name: "Oral Rehydration Solution", dosage: "As needed", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Drink plenty of water and avoid caffeine or alcohol.",
    weight: 0
},
{
    name: "Ear Infection",
    info: "An ear infection can cause discomfort and trouble hearing. Warm compresses can help ease the pain.",
    symptoms: ["ear pain", "fever", "trouble hearing"],
    medications: [
        { name: "Pain Relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Use warm compresses, take over-the-counter pain relievers, and follow your doctor’s advice if needed.",
    weight: 0
},
{
    name: "Eczema",
    info: "Eczema is a skin condition that causes red, itchy, and dry patches.",
    symptoms: ["itchy skin", "red patches", "dry skin"],
    medications: [
        { name: "Moisturizing Cream", dosage: "Apply twice daily", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Keep your skin moisturized and avoid triggers like harsh soaps.",
    weight: 0
},
{
    name: "Food Poisoning",
    info: "Food poisoning can cause stomach upset and nausea. Staying hydrated is key to recovery.",
    symptoms: ["nausea", "vomiting", "diarrhea"],
    medications: [
        { name: "Oral Rehydration Solution", dosage: "As needed", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Drink clear fluids, rest, and avoid solid foods until symptoms improve. Seek medical help if symptoms persist.",
    weight: 0
},
{
    name: "Frostbite",
    info: "Damage to the skin and tissues caused by extreme cold.",
    symptoms: ["numbness", "pale skin", "blisters"],
    medications: [
        { name: "Pain Relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Warm the affected area slowly and seek medical attention if severe.",
    weight: 0
},
{
    name: "Gingivitis",
    info: "A gum disease that causes redness, swelling, and bleeding gums.",
    symptoms: ["bleeding gums", "red gums", "bad breath"],
    medications: [
        { name: "Antiseptic Mouthwash", dosage: "Rinse twice daily", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Brush and floss regularly, and use mouthwash as directed.",
    weight: 0
},
{
    name: "Hives",
    info: "A skin reaction that causes itchy, raised welts.",
    symptoms: ["itchy welts", "red patches", "swelling"],
    medications: [
        { name: "Antihistamines", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Avoid triggers and use antihistamines to reduce itching.",
    weight: 0
},
{
    name: "Indigestion",
    info: "A feeling of discomfort in the stomach after eating.",
    symptoms: ["stomach pain", "bloating", "nausea"],
    medications: [
        { name: "Antacids", dosage: "As per package instructions", ageRange: [12, 100], allergies: [] }
    ],
    recommendations: "Eat smaller meals and avoid spicy or fatty foods.",
    weight: 0
},
{
    name: "Jaundice",
    info: "A condition that causes yellowing of the skin and eyes.",
    symptoms: ["yellow skin", "yellow eyes", "dark urine"],
    medications: [
        { name: "Supportive Care", dosage: "As needed", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Stay hydrated and avoid alcohol.",
    weight: 0
},
{
    name: "Lice",
    info: "Tiny insects that live on the scalp and cause itching.",
    symptoms: ["itchy scalp", "visible lice", "red bumps"],
    medications: [
        { name: "Lice Shampoo", dosage: "Use as directed", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Use lice shampoo and wash bedding and clothes in hot water.",
    weight: 0
},
{
    name: "Poison Ivy",
    info: "A skin rash caused by contact with poison ivy plants.",
    symptoms: ["itchy rash", "redness", "blisters"],
    medications: [
        { name: "Hydrocortisone Cream", dosage: "Apply twice daily", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Wash the area with soap and water and avoid scratching.",
    weight: 0
},
{
    name: "Ringworm",
    info: "A fungal infection that causes a red, circular rash.",
    symptoms: ["red rash", "itchy skin", "scaly patches"],
    medications: [
        { name: "Antifungal Cream", dosage: "Apply twice daily", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Keep the area clean and dry, and use antifungal cream as directed.",
    weight: 0
},
{
    name: "Sunburn",
    info: "Skin damage caused by too much exposure to the sun.",
    symptoms: ["red skin", "pain", "peeling skin"],
    medications: [
        { name: "Aloe Vera Gel", dosage: "Apply as needed", ageRange: [0, 100], allergies: [] }
    ],
    recommendations: "Stay out of the sun and apply aloe vera or cool compresses.",
    weight: 0
},

        
    ];

    // Calculate the weight for each condition based on the provided symptoms
    conditions.forEach(condition => {
        condition.weight = condition.symptoms.reduce((weight, symptom) => {
            return weight + (symptoms.includes(symptom) ? 1 : 0);
        }, 0);
        console.log(`Condition: ${condition.name}, Weight: ${condition.weight}`);
    });

    // Sort conditions by weight in descending order
    conditions.sort((a, b) => b.weight - a.weight);

    // Determine the condition with the highest weight
    let diagnosisResult = "Based on your symptoms, your condition closely aligns with ";
    const maxWeightCondition = conditions[0];

    console.log(`Max Weight Condition: ${maxWeightCondition.name}, Weight: ${maxWeightCondition.weight}`);

    if (maxWeightCondition.weight > 0) {
        diagnosisResult += maxWeightCondition.name;
        const conditionInfo = maxWeightCondition.info;
        const conditionRecommendations = maxWeightCondition.recommendations;

        // Filter medications based on age and allergies
        const suitableMedications = maxWeightCondition.medications.filter(med => {
            return age >= med.ageRange[0] && age <= med.ageRange[1] && !allergies.some(allergy => med.allergies.includes(allergy));
        });

        let medicationInfo = "No suitable medications found for your age or allergies.";
        if (suitableMedications.length > 0) {
            medicationInfo = suitableMedications.map(med => `<p><a href="${med.link}" target="_blank">${med.name}</a>: ${med.dosage}</p>`).join('');
        }

        // Get the next top two conditions
        const nextTopConditions = conditions.slice(1, 3);
        let nextTopConditionsInfo = "";
        nextTopConditions.forEach(condition => {
            nextTopConditionsInfo += `<p>${condition.name}: ${condition.info}</p>`;
        });

        document.getElementById('diagnosisResultContent').innerHTML = `
            <h2>Most Likely Diagnosis</h2>
            <p>${diagnosisResult}</p>
            <p>${conditionInfo}</p>
            <h2>Other Possible Conditions</h2>
            <h3>If symptoms persist after a period of medicine consumption and monitoring here are other related possibilities. Please consult a medical professional for further advice and treatment.</h3>
            ${nextTopConditionsInfo}
            <h2>Medications and Dosage</h2>
            ${medicationInfo}
            <h2>Personalized Recommendations</h2>
            <p>${conditionRecommendations}</p>
        `;
    } else {
        document.getElementById('diagnosisResultContent').innerHTML = `
            <h2>Diagnosis & Information</h2>
            <p>We couldn't match your symptoms to a specific condition. Please consider reaching out to a healthcare professional for personalized advice.</p>
        `;
    }
});
