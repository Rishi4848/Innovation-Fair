document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const symptoms = urlParams.get('symptoms').toLowerCase().split(',').map(s => s.trim());
    const age = parseInt(urlParams.get('age'), 10);
    const allergies = urlParams.get('allergies').toLowerCase().split(',').map(a => a.trim());

    const conditions = [
        {
            name: "Influenza (Flu)",
            info: "The Flu is a contagious respiratory illness caused by flu viruses. It typically causes symptoms like fever, cough, sore throat, body aches, fatigue, and congestion. The flu spreads through droplets from coughs or sneezes, and it can lead to serious complications, especially in young children, the elderly, and those with weakened immune systems. Vaccination is the primary method of prevention.",
            symptoms: ['fever', 'chills', 'muscle aches'],
            medications: [
                { name: "Oseltamivir (Tamiflu)", dosage: "75 mg twice daily for 5 days", ageRange: [13, 100], allergies: [] },
                { name: "Zanamivir (Relenza)", dosage: "10 mg (two inhalations) twice daily for 5 days. Please avoid taking this medication if a milk allergy is present.", ageRange: [7, 100], allergies: ["milk"] },
                { name: "Baloxavir marboxil (Xofluza)", dosage: "40 mg single dose for those between 40-80 kg,  and 80 mg single dose for those with a weight higher than 80 kg", ageRange: [12, 100], allergies: [] },
                { name: "Peramivir (Rapivab)", dosage: "600 mg IV single dose", ageRange: [18, 100], allergies: [] }
            ],
            recommendations: "For symptom relief, over-the-counter medications like acetaminophen or ibuprofen can help manage fever and pain. Rest, stay hydrated, and avoid close contact with others to prevent spreading the virus.",
            weight: 0
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
            recommendations: "Rest, stay hydrated, and use over-the-counter medications like decongestants, antihistamines, and pain relievers to manage symptoms. Avoid close contact with others to prevent spreading the virus.",
            weight: 0
        },
        {
            name: "Norovirus (Stomach Flu)",
            info: "Norovirus is a highly contagious viral infection that causes gastroenteritis, inflammation of the stomach and intestines. It spreads through contaminated food, water, surfaces, or close contact with infected individuals. Symptoms include nausea, vomiting, diarrhea, stomach cramps, and sometimes low-grade fever or headache. Symptoms usually last 1 to 3 days but can be severe, especially in young children, the elderly, and those with weakened immune systems.",
            symptoms: ['nausea', 'vomiting', 'diarrhea'],
            medications: [
                { name: "Oral rehydration solutions", dosage: "As needed", ageRange: [0, 100], allergies: [] },
                { name: "Clear fluids", dosage: "As needed", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Stay hydrated to prevent dehydration. Oral rehydration solutions or clear fluids are recommended. Avoid solid foods until vomiting and diarrhea subside. Rest and practice good hygiene, such as frequent hand washing and disinfecting surfaces.",
            weight: 0
        },
        {
            name: "Strep Throat",
            info: "Strep throat is a bacterial infection caused by Group A Streptococcus bacteria. It causes a sore, scratchy throat and can lead to complications if untreated. Symptoms include sudden severe sore throat, pain when swallowing, red and swollen tonsils, and sometimes fever.",
            symptoms: ['severe sore throat', 'pain when swallowing', 'red swollen tonsils'],
            medications: [
                { name: "Penicillin", dosage: "250 mg four times daily for 10 days. Please avoid taking this medication if a Penicillin allergy is present.", ageRange: [0, 100], allergies: ["penicillin"] },
                { name: "Amoxicillin", dosage: "500 mg three times daily for 10 days", ageRange: [0, 100], allergies: [] },
                { name: "Cephalexin", dosage: "500 mg twice daily for 10 days. Please avoid taking this medication if a Cephalosporins allergy is present.", ageRange: [0, 100], allergies: ["cephalosporins"] }
            ],
            recommendations: "Take prescribed antibiotics as directed. Rest, stay hydrated, and use over-the-counter pain relievers to manage symptoms. Avoid close contact with others to prevent spreading the infection.",
            weight: 0
        },
        {
            name: "Chickenpox",
            info: "Chickenpox is a highly contagious viral infection caused by the varicella-zoster virus. It causes an itchy rash with red spots and blisters all over the body. Other symptoms include fever, tiredness, and loss of appetite.",
            symptoms: ['itchy rash', 'red spots', 'blisters'],
            medications: [
                { name: "Acyclovir", dosage: "800 mg five times daily for 5 days", ageRange: [2, 100], allergies: [] },
                { name: "Valacyclovir", dosage: "1000 mg three times daily for 7 days", ageRange: [12, 100], allergies: [] }
            ],
            recommendations: "Rest, stay hydrated, and use over-the-counter antihistamines to relieve itching. Avoid scratching the rash to prevent infection. Vaccination is the primary method of prevention.",
            weight: 0
        },
        {
            name: "Measles",
            info: "Measles is a highly contagious viral infection that causes a red rash, fever, cough, runny nose, and inflamed eyes. It spreads through respiratory droplets from coughs or sneezes. Measles can lead to serious complications, especially in young children and those with weakened immune systems.",
            symptoms: ['red rash', 'fever', 'cough'],
            medications: [
                { name: "Vitamin A", dosage: "200,000 IU once daily for 2 days", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Rest, stay hydrated, and use over-the-counter medications to manage fever and pain. Vaccination is the primary method of prevention.",
            weight: 0
        },
        {
            name: "Mumps",
            info: "Mumps is a viral infection that primarily affects the salivary glands, causing swelling and pain. Other symptoms include fever, headache, muscle aches, and fatigue. Mumps spreads through respiratory droplets from coughs or sneezes.",
            symptoms: ['swollen salivary glands', 'painful chewing', 'fever'],
            medications: [
                { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Rest, stay hydrated, and use over-the-counter pain relievers to manage symptoms. Vaccination is the primary method of prevention.",
            weight: 0
        },
        {
            name: "Rubella (German Measles)",
            info: "Rubella is a contagious viral infection that causes a red rash, fever, and swollen lymph nodes. It spreads through respiratory droplets from coughs or sneezes. Rubella can cause serious complications in pregnant women, leading to birth defects.",
            symptoms: ['red rash', 'swollen lymph nodes', 'fever'],
            medications: [
                { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Rest, stay hydrated, and use over-the-counter pain relievers to manage symptoms. Vaccination is the primary method of prevention.",
            weight: 0
        },
        {
            name: "Pertussis (Whooping Cough)",
            info: "Pertussis is a highly contagious bacterial infection that causes severe coughing fits followed by a whooping sound. It spreads through respiratory droplets from coughs or sneezes. Pertussis can lead to serious complications, especially in young children and those with weakened immune systems.",
            symptoms: ['severe coughing fits', 'whooping sound', 'vomiting after coughing'],
            medications: [
                { name: "Azithromycin", dosage: "500 mg on day 1, then 250 mg once daily for 4 days", ageRange: [0, 100], allergies: [] },
                { name: "Clarithromycin", dosage: "500 mg twice daily for 7 days", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Take prescribed antibiotics as directed. Rest, stay hydrated, and use over-the-counter medications to manage symptoms. Vaccination is the primary method of prevention.",
            weight: 0
        },
        {
            name: "Diphtheria",
            info: "Diphtheria is a serious bacterial infection that affects the mucous membranes of the throat and nose. It causes a thick, gray coating in the throat, leading to difficulty breathing, sore throat, and swollen glands. Diphtheria spreads through respiratory droplets from coughs or sneezes.",
            symptoms: ['thick gray coating in throat', 'difficulty breathing', 'swollen glands'],
            medications: [
                { name: "Diphtheria antitoxin", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
                { name: "Erythromycin", dosage: "500 mg four times daily for 14 days", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Take prescribed medications as directed. Rest, stay hydrated, and avoid close contact with others to prevent spreading the infection. Vaccination is the primary method of prevention.",
            weight: 0
        },
        {
            name: "Tetanus",
            info: "Tetanus is a bacterial infection caused by Clostridium Tetani. It affects the nervous system, leading to muscle stiffness and spasms. Tetanus can enter the body through cuts or wounds contaminated with the bacteria. Symptoms include jaw cramping, muscle stiffness, and difficulty swallowing.",
            symptoms: ['jaw cramping', 'muscle stiffness', 'difficulty swallowing'],
            medications: [
                { name: "Tetanus immune globulin", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
                { name: "Metronidazole", dosage: "500 mg every 6 hours for 7-10 days", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Take prescribed medications as directed. Rest, stay hydrated, and practice good wound care to prevent infection. Vaccination is the primary method of prevention.",
            weight: 0
        },
        {
            name: "Hepatitis A",
            info: "Hepatitis A is a viral infection that affects the liver, causing inflammation. It spreads through contaminated food or water. Symptoms include jaundice, fatigue, abdominal pain, and loss of appetite.",
            symptoms: ['jaundice', 'abdominal pain', 'loss of appetite'],
            medications: [
                { name: "Supportive care", dosage: "As needed", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Rest, stay hydrated, and avoid alcohol to reduce liver strain. Practice good hygiene and avoid contaminated food or water. Vaccination is the primary method of prevention.",
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
            info: "Gastritis is an inflammation, irritation, or erosion of the lining of the stomach. It can occur suddenly (acute) or gradually (chronic). Symptoms include upper abdominal pain, nausea, and bloating.",
            symptoms: ['upper abdominal pain', 'nausea', 'bloating'],
            medications: [
                { name: "Antacids", dosage: "As per package instructions", ageRange: [12, 100], allergies: [] },
                { name: "Proton pump inhibitors", dosage: "As per doctor's instructions", ageRange: [12, 100], allergies: [] }
            ],
            recommendations: "Avoid hot and spicy foods, alcohol, and smoking. Eat smaller, more frequent meals and manage stress.",
            weight: 0
        },
        {
            name: "Migraine",
            info: "A migraine is a headache that can cause severe throbbing pain or a pulsing sensation, usually on one side of the head. It's often accompanied by nausea, vomiting, and extreme sensitivity to light and sound.",
            symptoms: ['severe headache', 'nausea', 'sensitivity to light'],
            medications: [
                { name: "Sumatriptan", dosage: "50-100 mg at onset of symptoms", ageRange: [18, 100], allergies: [] },
                { name: "Rizatriptan", dosage: "10 mg at onset of symptoms", ageRange: [18, 100], allergies: [] }
            ],
            recommendations: "Rest in a quiet, dark room. Apply a cool cloth or ice pack to your forehead. Stay hydrated and avoid known migraine triggers.",
            weight: 0
        },
        {
            name: "Appendicitis",
            info: "Appendicitis is an inflammation of the appendix, a small tube-shaped pouch attached to your large intestine. Symptoms include sudden pain that begins on the right side of the lower abdomen, nausea, and loss of appetite.",
            symptoms: ['right lower abdominal pain', 'nausea', 'loss of appetite'],
            medications: [
                { name: "Antibiotics", dosage: "As per doctor's instructions.", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Seek immediate medical attention. Surgery is often required to remove the inflamed appendix.",
            weight: 0
        },
        {
            name: "Kidney Stones",
            info: "Kidney stones are hard deposits made of minerals and salts that form inside your kidneys. Symptoms include severe pain in the side and back, pain that radiates to the lower abdomen and groin, and pain that comes in waves and fluctuates in intensity.",
            symptoms: ['severe side pain', 'pain radiating to lower abdomen', 'pain in waves'],
            medications: [
                { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] },
                { name: "Alpha blockers", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Drink plenty of water to help pass the stones. Follow your doctor's recommendations for pain management and treatment.",
            weight: 0
        },
        {
            name: "Pancreatitis",
            info: "Pancreatitis is inflammation of the pancreas. It can occur as acute pancreatitis, which means it appears suddenly and lasts for days, or as chronic pancreatitis, which occurs over many years. Symptoms include upper abdominal pain, abdominal pain that radiates to your back, and tenderness when touching the abdomen.",
            symptoms: ['upper abdominal pain', 'pain radiating to back', 'abdominal tenderness'],
            medications: [
                { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] },
                { name: "Enzyme supplements", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Take prescribed medications as directed. Rest, stay hydrated, and avoid alcohol. Follow a low-fat diet.",
            weight: 0
        },
        {
            name: "Pneumonia",
            info: "Pneumonia is an infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus, causing cough with phlegm or pus, fever, chills, and difficulty breathing.",
            symptoms: ['chest pain', 'cough with phlegm', 'shortness of breath'],
            medications: [
                { name: "Amoxicillin", dosage: "500 mg three times daily for 7-10 days", ageRange: [0, 100], allergies: [] },
                { name: "Clarithromycin", dosage: "500 mg twice daily for 7-10 days", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Take prescribed antibiotics as directed. Rest, stay hydrated, and use over-the-counter medications to manage fever and pain.",
            weight: 0
        },
        {
            name: "Bronchitis",
            info: "Bronchitis is an inflammation of the lining of your bronchial tubes, which carry air to and from your lungs. It often causes coughing up thickened mucus, which can be discolored.",
            symptoms: ['persistent cough', 'mucus production', 'fatigue'],
            medications: [
                { name: "Cough suppressants", dosage: "As per package instructions", ageRange: [12, 100], allergies: [] },
                { name: "Bronchodilators", dosage: "As per doctor's instructions", ageRange: [12, 100], allergies: [] }
            ],
            recommendations: "Rest, stay hydrated, and use over-the-counter medications to manage symptoms. Avoid smoking and other lung irritants.",
            weight: 0
        },
        {
            name: "Sinusitis",
            info: "Sinusitis is an inflammation or swelling of the tissue lining the sinuses. It can cause a blocked or runny nose, facial pain or pressure, and a reduced sense of smell.",
            symptoms: ['facial pain', 'blocked nose', 'reduced sense of smell'],
            medications: [
                { name: "Decongestants", dosage: "As per package instructions", ageRange: [12, 100], allergies: [] },
                { name: "Nasal corticosteroids", dosage: "As per doctor's instructions", ageRange: [12, 100], allergies: [] }
            ],
            recommendations: "Use over-the-counter medications to manage symptoms. Stay hydrated and use a humidifier to keep the air moist.",
            weight: 0
        },
        {
            name: "Urinary Tract Infection (UTI)",
            info: "A UTI is an infection in any part of your urinary system — your kidneys, ureters, bladder, and urethra. It often causes a strong, persistent urge to urinate, a burning sensation when urinating, and cloudy urine.",
            symptoms: ['burning sensation when urinating', 'persistent urge to urinate', 'cloudy urine'],
            medications: [
                { name: "Trimethoprim/sulfamethoxazole", dosage: "160/800 mg twice daily for 3 days", ageRange: [12, 100], allergies: [] },
                { name: "Nitrofurantoin", dosage: "100 mg twice daily for 5 days", ageRange: [12, 100], allergies: [] }
            ],
            recommendations: "Take prescribed antibiotics as directed. Drink plenty of water to help flush out the bacteria.",
            weight: 0
        },
        {
            name: "Gout",
            info: "Gout is a form of arthritis characterized by severe pain, redness, and tenderness in joints. It often affects the joint at the base of the big toe.",
            symptoms: ['severe joint pain', 'redness in joints', 'tenderness in joints'],
            medications: [
                { name: "Colchicine", dosage: "1.2 mg at the first sign of a gout flare, followed by 0.6 mg one hour later", ageRange: [18, 100], allergies: [] },
                { name: "Allopurinol", dosage: "100-300 mg once daily", ageRange: [18, 100], allergies: [] }
            ],
            recommendations: "Take prescribed medications as directed. Avoid foods high in purines, such as red meat and seafood.",
            weight: 0
        },
        {
            name: "Sciatica",
            info: "Sciatica refers to pain that radiates along the path of the sciatic nerve, which branches from your lower back through your hips and buttocks and down each leg.",
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
            info: "Tonsillitis is an inflammation of the tonsils, two oval-shaped pads of tissue at the back of the throat. It often causes sore throat, difficulty swallowing, and tender lymph nodes.",
            symptoms: ['sore throat', 'difficulty swallowing', 'tender lymph nodes'],
            medications: [
                { name: "Penicillin", dosage: "250 mg four times daily for 10 days. Please avoid taking this medication if a Penicillin allergy is present.", ageRange: [0, 100], allergies: ["penicillin"] },
                { name: "Amoxicillin", dosage: "500 mg three times daily for 10 days", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Take prescribed antibiotics as directed. Rest, stay hydrated, and use over-the-counter pain relievers to manage symptoms.",
            weight: 0
        },
        {
            name: "Eczema",
            info: "Eczema is a condition that makes your skin red and itchy. It's common in children but can occur at any age. Eczema is long-lasting (chronic) and tends to flare periodically.",
            symptoms: ['itchy skin', 'red patches on skin', 'dry skin'],
            medications: [
                { name: "Topical corticosteroids", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
                { name: "Antihistamines", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Use prescribed medications as directed. Keep your skin moisturized and avoid triggers that cause flare-ups.",
            weight: 0
        },
        {
            name: "Psoriasis",
            info: "Psoriasis is a skin disease that causes red, itchy scaly patches, most commonly on the knees, elbows, trunk, and scalp.",
            symptoms: ['red scaly patches', 'itchy skin', 'dry cracked skin'],
            medications: [
                { name: "Topical corticosteroids", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
                { name: "Vitamin D analogues", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Use prescribed medications as directed. Keep your skin moisturized and avoid triggers that cause flare-ups.",
            weight: 0
        },
        {
            name: "Osteoarthritis",
            info: "Osteoarthritis is the most common form of arthritis, affecting millions of people worldwide. It occurs when the protective cartilage that cushions the ends of your bones wears down over time.",
            symptoms: ['joint pain', 'stiffness', 'loss of flexibility'],
            medications: [
                { name: "NSAIDs", dosage: "As per package instructions", ageRange: [18, 100], allergies: [] },
                { name: "Acetaminophen", dosage: "As per package instructions", ageRange: [18, 100], allergies: [] }
            ],
            recommendations: "Use over-the-counter pain relievers as directed. Maintain a healthy weight and stay active to manage symptoms.",
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
            info: "Asthma is a condition in which your airways narrow and swell and may produce extra mucus. This can make breathing difficult and trigger coughing, wheezing, and shortness of breath.",
            symptoms: ['wheezing', 'shortness of breath', 'chest tightness'],
            medications: [
                { name: "Inhaled corticosteroids", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] },
                { name: "Bronchodilators", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Avoid asthma triggers. Use prescribed inhalers and medications as directed. Monitor your breathing and seek medical help if symptoms worsen.",
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
            info: "Fibromyalgia is a disorder characterized by widespread musculoskeletal pain accompanied by fatigue, sleep, memory, and mood issues.",
            symptoms: ['widespread pain', 'fatigue', 'sleep disturbances'],
            medications: [
                { name: "Pain relievers", dosage: "As per package instructions", ageRange: [0, 100], allergies: [] },
                { name: "Antidepressants", dosage: "As per doctor's instructions", ageRange: [0, 100], allergies: [] }
            ],
            recommendations: "Exercise regularly, practice stress management techniques, and get adequate sleep. Follow your doctor's treatment plan.",
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
                { name: "Vaccination", dosage: "Doctor administered vaccination is highly required.", ageRange: [0, 1], allergies: [] },
            ],
            recommendations: "Seek doctor's advice for vaccination. Avoid mosquito bites by using insect repellent and wearing protective clothing.",
            weight: 0
        }
    ];

    // Calculate the weight for each condition based on the provided symptoms
    conditions.forEach(condition => {
        condition.weight = condition.symptoms.reduce((weight, symptom) => {
            return weight + (symptoms.includes(symptom) ? 1 : 0);
        }, 0);
    });

    // Determine the condition with the highest weight
    let diagnosisResult = "Based on your symptoms, we have diagnosed you with ";
    const maxWeightCondition = conditions.reduce((prev, current) => (prev.weight > current.weight) ? prev : current);

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
            medicationInfo = suitableMedications.map(med => `${med.name}: ${med.dosage}`).join('<br>');
        }

        document.getElementById('diagnosisResult').innerHTML = `
            <h2>Diagnosis & Information</h2>
            <p>${diagnosisResult}</p>
            <p>${conditionInfo}</p>
            <h2>Medications and Dosage</h2>
            <p>${medicationInfo}</p>
            <h2>Personalized Recommendations</h2>
            <p>${conditionRecommendations}</p>
        `;
    } else {
        document.getElementById('diagnosisResult').innerHTML = `
            <h2>Diagnosis & Information</h2>
            <p>No condition matched your symptoms. Please consult a healthcare professional for further evaluation.</p>
        `;
    }
});
