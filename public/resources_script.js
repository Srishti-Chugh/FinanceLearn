function openGoogleForm() {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSeN4hn9IpxXGt--O_5McUZtaZVC7Z72u7sj1aBht-t7o_VTfw/viewform?usp=sf_link", "_blank");
}
document.addEventListener("DOMContentLoaded", function() {
    // Array of task details
    var tasks = [
        "Automate Your Savings and Investments: Set up automatic transfers to your savings and investment accounts. This ensures consistent contributions and takes advantage of dollar-cost averaging, smoothing out market fluctuations over time and helping you reach your financial goals faster.",
        "Create and Stick to a Budget: Develop a realistic budget outlining your income and expenses. Track your spending regularly and adjust your budget as needed to align with your financial goals. Sticking to a budget helps control expenses, avoid debt, and build savings for emergencies and future plans.",
        "Prioritize High-Interest Debt Repayment:Focus on paying off high-interest debt first, such as credit cards or payday loans. High-interest debt can quickly spiral out of control, so allocating extra funds towards repayment can save you money on interest and accelerate your journey towards financial freedom.",
        "Invest in Your Financial Education: Continuously educate yourself about personal finance topics such as budgeting, investing, and retirement planning. Take advantage of online resources, books, podcasts, and workshops to enhance your financial literacy and make informed decisions about your money.",
        "Build an Emergency Fund: Establish an emergency fund with 3-6 months' worth of living expenses. This fund acts as a financial safety net, providing peace of mind and protection against unexpected expenses like medical bills, car repairs, or job loss, without resorting to high-interest loans or liquidating investments."
    ];

    // Pick a random task from the array
    var randomTask = tasks[Math.floor(Math.random() * tasks.length)];

    // Display the random task in the HTML
    document.getElementById("task-details").textContent = randomTask;

    var readCaseStudyBtns = document.querySelectorAll(".read-case-study-btn");

    readCaseStudyBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            var caseStudySection = this.nextElementSibling;
            if (caseStudySection.style.display === "none") {
                caseStudySection.style.display = "block";
            } else {
                caseStudySection.style.display = "none";
            }
        });
    });
    var accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(function(item) {
        var header = item.querySelector(".accordion-header");
        var content = item.querySelector(".accordion-content");

        header.addEventListener("click", function() {
            if (content.style.display === "none") {
                content.style.display = "block";
            } else {
                content.style.display = "none";
            }
        });
    });
});
