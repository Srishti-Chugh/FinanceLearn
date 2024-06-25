document.getElementById('menuButton').addEventListener('click', function() {
  document.getElementById('sideNav').style.width = '250px';
  document.querySelector('.hero').style.marginLeft = '250px';
  document.querySelector('header').style.marginLeft = '250px';
});

document.getElementById('closeBtn').addEventListener('click', function() {
  document.getElementById('sideNav').style.width = '0';
  document.querySelector('.hero').style.marginLeft = '0';
  document.querySelector('header').style.marginLeft = '0';
});

document.getElementById('healthInsuranceCard').addEventListener('click', function() {
  showBanner("health_banner.jpg");
  showInsuranceComparison("health");
});

document.getElementById('lifeInsuranceCard').addEventListener('click', function() {
  showBanner("life_banner.jpg");
  showInsuranceComparison("life");
});

document.getElementById('cropAgricultureInsuranceCard').addEventListener('click', function() {
  showBanner("home_banner.jpg");
  showInsuranceComparison("cropAgriculture");
});

document.getElementById('naturalDisasterInsuranceCard').addEventListener('click', function() {
  showBanner("naturalDisaster_banner.jpg");
  showInsuranceComparison("naturalDisaster");
});

function showInsuranceComparison(insuranceType) {
  var insuranceComparisonSection = document.querySelector('.insurance-comparison');
  // Clear existing content
  insuranceComparisonSection.innerHTML = '';
  
  // Depending on the insurance type, populate the comparison section
  if (insuranceType === "health") {
    // Add comparison items for health insurance
    insuranceComparisonSection.innerHTML = `
      <div class="comparison-item">
          <h3>Pradhan Mantri Jan Arogya Yojana (PMJAY) - Ayushman Bharat</h3>
          <p>Description: PMJAY is a flagship scheme aimed at providing health coverage to economically vulnerable families. It offers cashless hospitalization and coverage up to INR 5 lakhs per family per year for secondary and tertiary care hospitalization</p>
          <p>Eligibility: Families identified through the Socio-Economic Caste Census (SECC) 2011 data, those enrolled in Rashtriya Swasthya Bima Yojana (RSBY) before PMJAY, and other specified categories like manual scavengers, and families of construction workers.</p>
          <a href="#">Visit Website</a>
      </div>
      <div class="comparison-item">
          <h3>Rashtriya Swasthya Bima Yojana (RSBY)</h3>
          <p>Description: RSBY provides health insurance coverage to Below Poverty Line (BPL) families, offering coverage up to INR 30,000 per family per year for hospitalization expenses.</p>
          <p>Eligibility: BPL families identified by the state governments, as well as certain other categories of unorganized workers.</p>
          <a href="#">Visit Website</a>
      </div>
      <div class="comparison-item">
          <h3>Central Government Health Scheme (CGHS)</h3>
          <p>Description: CGHS provides comprehensive healthcare facilities to Central Government employees, pensioners, and their dependents in India. The scheme offers outpatient treatment, hospitalization, and medicines.</p>
          <p>Eligibility: Serving Central Government employees, pensioners, and their dependents residing in CGHS-covered areas.</p>
          <a href="#">Visit Website</a>
      </div>
      <div class="comparison-item">
          <h3>Ayushman Bharat Health and Wellness Centres (AB-HWCs)</h3>
          <p>Description: Part of the Ayushman Bharat initiative, AB-HWCs aim to provide comprehensive primary healthcare services, including maternal and child health services and non-communicable disease care.</p>
          <p>Eligibility: All citizens, especially those in rural and underserved urban areas.</p>
          <a href="#">Visit Website</a>
      </div>
      <!-- Add more comparison items as needed -->
    `;
  } else if (insuranceType === "life") {
    // Add comparison items for life insurance
    insuranceComparisonSection.innerHTML = `
      <div class="comparison-item">
          <h3>Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)</h3>
          <p>Description: PMJJBY provides life insurance cover of INR 2 lakhs for death due to any reason. The annual premium is INR 330.</p>
          <p>Eligibility: Individuals aged between 18 and 50 years with a bank account.</p>
          <a href="#">Visit Website</a>
      </div>
      <div class="comparison-item">
          <h3>Pradhan Mantri Vaya Vandana Yojana (PMVVY)</h3>
          <p>Description: PMVVY is a pension scheme for senior citizens, providing an assured return of 7.4% per annum payable monthly. The scheme is operated by the Life Insurance Corporation (LIC) of India</p>
          <p>Eligibility: Senior citizens aged 60 years and above.</p>
          <a href="#">Visit Website</a>
      </div>
      <div class="comparison-item">
          <h3>Atal Pension Yojana (APY)</h3>
          <p>Description: APY is a pension scheme targeted at the unorganized sector. Subscribers receive a guaranteed minimum pension ranging from INR 1,000 to INR 5,000 per month after the age of 60.</p>
          <p>Eligibility: Citizens aged between 18 and 40 years with a savings bank account or post office savings account.</p>
          <a href="#">Visit Website</a>
      </div>
      <div class="comparison-item">
          <h3>Pradhan Mantri Shram Yogi Maandhan Yojana (PMSYM)</h3>
          <p>Description: PMSYM provides a monthly pension of INR 3,000 to unorganized sector workers after attaining the age of 60. The scheme is contributory in nature, with the government matching the subscriber's contribution.</p>
          <p>Eligibility: Unorganized sector workers aged between 18 and 40 years with a monthly income of INR 15,000 or less.</p>
          <a href="#">Visit Website</a>
      </div>
      <!-- Add more comparison items as needed -->
    `;
  }else if (insuranceType === "cropAgriculture") {
    // Add comparison items for life insurance
    insuranceComparisonSection.innerHTML = `
      <div class="comparison-item">
          <h3>Pradhan Mantri Fasal Bima Yojana (PMFBY)</h3>
          <p>Description: PMFBY offers comprehensive crop insurance to farmers to protect against crop loss due to natural calamities, pests, and diseases. The scheme provides financial support for replanting and helps stabilize farmers' incomes.</p>
          <p>Eligibility: All farmers growing notified crops in notified areas, including sharecroppers and tenant farmers.</p>
          <a href="#">Visit Website</a>
      </div>
      <div class="comparison-item">
          <h3>Weather-Based Crop Insurance Scheme (WBCIS)</h3>
          <p>Description: WBCIS provides insurance coverage to farmers against adverse weather conditions such as excess rainfall, drought, and temperature fluctuations, which can affect crop yield.</p>
          <p>Eligibility: Farmers growing notified crops in notified areas, including sharecroppers and tenant farmers.</p>
          <a href="#">Visit Website</a>
      </div>
      <div class="comparison-item">
          <h3>Unified Package Insurance Scheme (UPIS)</h3>
          <p>Description: UPIS is a comprehensive insurance package for farmers covering multiple risks including crop insurance, personal accident insurance, and insurance for farm implements.</p>
          <p>Eligibility: Farmers opting for PMFBY or WBCIS and fulfilling the specific criteria for the individual components of UPIS.</p>
          <a href="#">Visit Website</a>
      </div>
      <div class="comparison-item">
          <h3>Coconut Palm Insurance Scheme (CPIS)</h3>
          <p>Description: CPIS provides insurance coverage for coconut palms against natural disasters, pests, and diseases. The scheme aims to mitigate the financial loss to coconut farmers.</p>
          <p>Eligibility: Coconut growers with a minimum of 5 coconut palms in a contiguous area.</p>
          <a href="#">Visit Website</a>
      </div>
      <!-- Add more comparison items as needed -->
    `;
  }else if (insuranceType === "naturalDisaster") {
    // Add comparison items for life insurance
    insuranceComparisonSection.innerHTML = `
      <div class="comparison-item">
          <h3>Pradhan Mantri Garib Kalyan Package Insurance Scheme (PMGKPIS)</h3>
          <p>Description: PMGKPI provides comprehensive personal accident insurance coverage to healthcare workers involved in managing COVID-19. The cover is INR 50 lakhs for loss of life due to COVID-19 and accidental death.</p>
          <p>Eligibility: Healthcare workers including community health workers who may have to be in direct contact and care of COVID-19 patients.</p>
          <a href="#">Visit Website</a>
      </div>
      <div class="comparison-item">
          <h3>Pradhan Mantri Awas Bima Yojana (PMABY)</h3>
          <p>Description: PMABY provides insurance coverage for damage to houses due to natural disasters like earthquakes, floods, cyclones, and landslides.</p>
          <p>Eligibility: Homeowners in disaster-prone areas identified by the government.</p>
          <a href="#">Visit Website</a>
      </div>
      <div class="comparison-item">
          <h3>Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) - Natural Disaster Component</h3>
          <p>Description: Under MGNREGA, a special component provides financial assistance to rural households affected by natural disasters for rebuilding livelihoods through guaranteed employment.</p>
          <p>Eligibility: Rural households whose livelihoods have been affected by natural disasters and who are registered under MGNREGA.</p>
          <a href="#">Visit Website</a>
      </div>
      <div class="comparison-item">
          <h3>National Agricultural Insurance Scheme (NAIS) - Natural Disaster Component</h3>
          <p>Description: NAIS provides insurance coverage to farmers for crop loss due to natural disasters, pests, and diseases. It helps mitigate the financial loss to farmers and stabilizes income.</p>
          <p>Eligibility: Farmers growing notified crops in notified areas, including sharecroppers and tenant farmers.</p>
          <a href="#">Visit Website</a>
      </div>
      <!-- Add more comparison items as needed -->
    `;
  }
  // Repeat for other insurance types
}

function showBanner(imageSrc) {
  // Display banner section
  var bannerSection = document.querySelector('.banner');
  bannerSection.style.display = 'block';

  // Set the banner image
  bannerSection.innerHTML = '<img src="' + imageSrc + '" alt="Banner">';
}
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  const content = item.querySelector('.accordion-content');

  header.addEventListener('click', () => {
    content.classList.toggle('active');
  });
});

document.getElementById("submit-btn").addEventListener("click", function() {
  // Get user input from the form
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var gender = document.getElementById("gender").value;
  var location = document.getElementById("location").value;
  var insuranceType = document.getElementById("insuranceType").value;
  var coverage = document.getElementById("coverage").value;
  var income = document.getElementById("income").value;
  var budget = document.getElementById("budget").value;
  var coverageAmount = parseFloat(document.getElementById("coverageAmount").value);
  var policyTerm = parseFloat(document.getElementById("policyTerm").value);
  var deductible = parseFloat(document.getElementById("deductible").value);
  
  // Perform calculations based on user input
  var premium = calculatePremium(income, budget, coverageAmount, policyTerm, deductible);
  var advice = generateAdvice(age, income, coverage);
  
  // Display the investment advice and premium calculation
  document.getElementById("advice-section").innerHTML = "<h3>Premium: Rs." + premium + " per month</h3><p><strong>What is a Premium?</strong> The premium is the amount of money that you pay periodically (monthly, quarterly, or annually) to keep your insurance policy active. In this case, the premium is calculated on a monthly basis.</p><h4>Advice: " + advice + "</h4>";
  document.getElementById("advice-section").style.display = "block";
});

// Define functions for premium calculation and investment advice generation
function calculatePremium(income, budget, coverageAmount, policyTerm, deductible) {
    // Assuming a very basic premium calculation for demonstration purposes
    let premium = 0;
    if (income === "below_20k") {
        premium = 100;
    } else if (income === "20k_50k") {
        premium = 200;
    } else if (income === "50k_100k") {
        premium = 300;
    } else if (income === "above_100k") {
        premium = 400;
    }

    // Adjust the premium based on coverage amount
    if (coverageAmount === 10000) {
        premium += 1000 * 0.1; // Adds Rs.100
    } else if (coverageAmount === 50000) {
        premium += 5000 * 0.1; // Adds Rs.500
    } else if (coverageAmount === 100000) {
        premium += 10000 * 0.1; // Adds Rs.1000
    } else if (coverageAmount === 500000) {
        premium += 50000 * 0.1; // Adds Rs.5000
    } else if (coverageAmount === 1000000) {
        premium += 100000 * 0.1; // Adds Rs.10000
    }

    // Adjust the premium based on policy term
    if (policyTerm === 1) {
        premium += 1 * 10; // Adds Rs.10
    } else if (policyTerm === 5) {
        premium += 5 * 10; // Adds Rs.50
    } else if (policyTerm === 10) {
        premium += 10 * 10; // Adds Rs.100
    } else if (policyTerm === 20) {
        premium += 20 * 10; // Adds Rs.200
    } else if (policyTerm === 30) {
        premium += 30 * 10; // Adds Rs.300
    }

    // Adjust the premium based on deductible
    if (deductible === 0) {
        premium -= 0; // No change
    } else if (deductible === 100) {
        premium -= 1 * 5; // Reduces Rs.5
    } else if (deductible === 500) {
        premium -= 5 * 5; // Reduces Rs.25
    } else if (deductible === 1000) {
        premium -= 10 * 5; // Reduces Rs.50
    } else if (deductible === 2000) {
        premium -= 20 * 5; // Reduces Rs.100
    }

    // Ensure the premium fits within the budget
    let budgetLimit = 0;
    if (budget === "below_100") {
        budgetLimit = 100;
    } else if (budget === "100_200") {
        budgetLimit = 200;
    } else if (budget === "200_500") {
        budgetLimit = 500;
    } else if (budget === "above_500") {
        budgetLimit = Number.MAX_SAFE_INTEGER; // No upper limit
    }

    if (premium > budgetLimit) {
        premium = budgetLimit;
    }

    return premium;
}

function generateAdvice(age, income, coverage) {
  var advice = "";

  // Check age and income
  if (age < 30 && income === "below_20k") {
      advice += "Since you're young and have a modest income, it's crucial to prioritize building a safety net with basic insurance coverage. Opt for plans with lower premiums and essential coverage to ensure financial security in case of unexpected events.";
  } else if (age >= 30 && income === "above_100k") {
      advice += "Considering your stable income and age, you're in a favorable position to invest in comprehensive insurance. Focus on policies that offer extensive coverage and additional benefits tailored to your specific needs and circumstances.";
  } else {
      advice += "Based on your inputs, it's recommended to consult with an insurance advisor for personalized advice that aligns with your financial situation and future goals.";
  }

  // Add coverage-specific advice
  if (coverage === "family") {
      advice += " For family coverage, prioritize plans that offer comprehensive health benefits and financial protection for your loved ones. Look for policies that include coverage for medical emergencies, hospitalization, and critical illnesses, ensuring the well-being of your entire family.";
  } else if (coverage === "chronic") {
      advice += " If you're considering chronic illness coverage, ensure the policy includes provisions for long-term care and specialized treatments. Look for plans that provide coverage for ongoing medical expenses and access to necessary treatments without significant financial burden.";
  } else if (coverage === "full") {
      advice += " If you're opting for full coverage, review the policy details carefully to understand exclusions and limitations. Look for comprehensive plans that cover a wide range of medical services, including preventive care, specialist consultations, and hospitalization, ensuring comprehensive protection against unforeseen health issues.";
  } else if (coverage === "basic") {
      advice += " For basic coverage, focus on plans that provide essential protection against major risks without unnecessary frills. Prioritize coverage for critical illnesses, accidents, and hospitalization, ensuring that you have adequate financial protection in case of unexpected medical emergencies.";
  }

  return advice;
}
