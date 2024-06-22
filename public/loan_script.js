document.addEventListener('DOMContentLoaded', () => {
    const applyLoanBtn = document.getElementById('apply-loan-btn');
    //const creditScoreBtn = document.getElementById('credit_score-btn');

    const newLoanSection = document.getElementById('new-loan');
    //const creditScoreSection = document.getElementById('credit_score');

    applyLoanBtn.addEventListener('click', () => {
        console.log("Apply Loan Button Clicked");
        toggleSection(newLoanSection);
    });

    /*creditScoreBtn.addEventListener('click', () => {
        console.log("Credit Score Button Clicked");
        toggleSection(creditScoreSection);
    });*/

    function toggleSection(section) {
        newLoanSection.style.display = 'none';
        //creditScoreSection.style.display = 'none';
        section.style.display = 'block';
        section.scrollIntoView({ behavior: 'smooth' });
    }

    const loanForm = document.getElementById('loan-form');
    const updatePopup = document.getElementById('update-popup');
    const updateForm = document.getElementById('update-form');
    const cancelUpdate = document.getElementById('cancel-update');
    

    loanForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newLoan = {
            loanAmount: document.getElementById('loan-amount').value,
            loanPurpose: document.getElementById('loan-purpose').value,
            loanRate: document.getElementById('loan-rate').value,
            loanDuration: document.getElementById('loan-duration').value,
            amountPaid: document.getElementById('amount-paid').value,
            loanStartDate: document.getElementById('loan-start-date').value,
            employmentStatus: document.getElementById('employment-status').value,
            monthlyIncome: document.getElementById('monthly-income').value,
            yearsEmployment: document.getElementById('years-employment').value,
            amountDebt: document.getElementById('amount-debt').value,
            creditScore: document.getElementById('credit-score').value,
            collateralType: document.getElementById('collateral-type').value,
            collateralValue: document.getElementById('collateral-value').value,
            email: sessionStorage.getItem('username')
        };

        try {
            const response = await fetch('/add-loan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newLoan)
            });

            if (response.ok) {
                alert('Loan application submitted successfully');
                loanForm.reset();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    // Function to calculate and display additional information
    const displayAdditionalInfo = (loans) => {
        const loanPurposes = {};
        
        loans.forEach(loan => {
            const loanStartDate = new Date(loan.loanStartDate);
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - loanStartDate);
            const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
            const timeLeft = loan.loanDuration - diffMonths;
            const amountLeft = loan.loanAmount - loan.amountPaid;

            if (loanPurposes[loan.loanPurpose]) {
                loanPurposes[loan.loanPurpose] += amountLeft;
            } else {
                loanPurposes[loan.loanPurpose] = amountLeft;
            }
        });

        const ctx = document.getElementById('loanPurposeChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(loanPurposes),
                datasets: [{
                    label: 'Loans Distribution',
                    data: Object.values(loanPurposes),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Loans Distribution by Amount left'
                    }
                }
            },
        });
    };

    const fetchOngoingLoans = async () => {
        const email = sessionStorage.getItem('username');
        const response = await fetch(`/loans/${email}`); 
        const loans = await response.json();
        const loanList = document.getElementById('loan-list');

        if (loans.length === 0) {
            loanList.innerHTML = '<p>No ongoing loans</p>';
        } else {
            loanList.innerHTML = '';
            loans.forEach(loan => {
                const loanItem = document.createElement('div');
                loanItem.classList.add('loan-item');
                const loanStartDate = new Date(loan.loanStartDate);
                const currentDate = new Date();
                const diffTime = Math.abs(currentDate - loanStartDate);
                const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

                loanItem.classList.add('loan-item');
                const timeLeft = loan.loanDuration - calculateMonthsElapsed(new Date(loan.loanStartDate), new Date());
                const amountLeft = loan.loanAmount - loan.amountPaid;
                const monthlyPayment = calculateMonthlyPayment(amountLeft, loan.loanRate, timeLeft);

                loanItem.innerHTML = `
                    <h3>${loan.loanPurpose} Loan</h3>
                    <div class="loan-details">
                        <div class="loan-info">
                            <p>Loan Amount: ${loan.loanAmount}</p>
                            <p>Rate of Interest: ${loan.loanRate}%</p>
                            <p>Loan Duration: ${loan.loanDuration} months</p>
                            <p>Amount Paid: ${loan.amountPaid}</p>
                        </div>
                        <div class="loan-calculations">
                            <p>Time Left: ${timeLeft} months</p>
                            <p>Amount Left to be Paid: ${amountLeft}</p>
                            <p>Monthly Payment: ${monthlyPayment}</p>
                        </div>
                    </div>
                `;
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.classList.add('update-btn');
                // Check if loan._id exists and set dataset.id accordingly
                if (loan._id) {
                    updateButton.dataset.id = loan._id; // Ensure correct dataset ID
                } else {
                    console.error('Loan ID not found:', loan);
                }

                updateButton.addEventListener('click', openUpdatePopup); // Attach event listener

                loanItem.appendChild(updateButton);
                loanList.appendChild(loanItem);
            });
            displayAdditionalInfo(loans);
        }
    };
    const calculateMonthsElapsed = (startDate, endDate) => {
        return Math.max((endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth(), 0);
    };

    const calculateMonthlyPayment = (principal, rate, months) => {
        if (rate === 0 || months === 0) return principal / months;
        const monthlyRate = rate / 100 / 12;
        return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
    };

    const openUpdatePopup = (event) => {
        const loanId = event.target.dataset.id;
        console.log("Loan ID:", loanId); // Log the loan ID
        fetch(`/loans/${loanId}`)
            .then(response => response.json())
            .then(loan => {
                console.log(loan); // Log the loan data to check if it's fetched correctly
                document.getElementById('update-loan-amount').value = loan.loanAmount;
                document.getElementById('update-loan-rate').value = loan.loanRate;
                document.getElementById('update-loan-duration').value = loan.loanDuration;
                document.getElementById('update-amount-paid').value = loan.amountPaid;
                
                updateForm.dataset.id = loanId;
                updatePopup.classList.add('visible');
            });
    };

    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', openUpdatePopup);
    });

    updateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const loanId = updateForm.dataset.id;
        const updatedLoan = {
            loanAmount: document.getElementById('update-loan-amount').value,
            loanRate: document.getElementById('update-loan-rate').value,
            loanDuration: document.getElementById('update-loan-duration').value,
            amountPaid: document.getElementById('update-amount-paid').value
            
        };
        fetch(`/loans/${loanId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedLoan)
        })
            .then(response => response.json())
            .then(() => {
                updatePopup.classList.remove('visible');
                fetchOngoingLoans(); // Fetch and display ongoing loans again after update
            });
    });

    cancelUpdate.addEventListener('click', () => {
        updatePopup.classList.remove('visible');
    }); 
    
    fetchOngoingLoans();
    showInfo('home-loan-info');
});
function showInfo(infoId) {
    // Hide all loan info sections
    const infoSections = document.querySelectorAll('.loan-information');
    infoSections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('visible');
    });

    // Show the selected loan info section
    document.getElementById(infoId).classList.remove('hidden');
    document.getElementById(infoId).classList.add('visible');

    // Update toggle button active state
    const buttons = document.querySelectorAll('.toggle-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`button[onclick="showInfo('${infoId}')"]`).classList.add('active');
    // Reset the result section
    var resultContainer = document.getElementById("eligibility-results");
    resultContainer.innerHTML = "<h3>Eligibility Results</h3><p id='result-text'>Submit the form to see your eligibility results here.</p>";
}

function checkEligibility(event, type) {
    event.preventDefault(); // Prevent form submission
    var formId = type + "-loan-form";
    var income = parseInt(document.getElementById(type + "-income").value);
    var creditScore = parseInt(document.getElementById(type + "-credit-score").value);
    var resultContainer = document.getElementById("eligibility-results");

    // Check eligibility
    var eligibilityResult = checkEligibilityCriteria(income, creditScore, type);
    // Display result
    if (eligibilityResult.eligible) {
        resultContainer.innerHTML = "Congratulations! You are eligible for the " + type + " loan.";
    } else {
        var reason = eligibilityResult.reason;
        var action = eligibilityResult.action;
        resultContainer.innerHTML = "Sorry, you are not eligible for the " + type + " loan.<br><br>" + 
                                    "Reason: " + reason + "<br><br>" + 
                                    "Action:<br>" + action.split("\n").join("<br>");
    }
}

function checkEligibilityCriteria(income, creditScore, type) {
    var eligible = false;
    var reason = "";
    var action = "";

    if (type === "home") {
        if (income >= 50000 && creditScore >= 700) {
            eligible = true;
        } else {
            if (income < 50000 && creditScore < 700) {
                reason = "Your income and credit score are below the required minimum.";
                action = "To improve your chances of qualifying for a home loan, you can consider taking the following steps:\n" +
                         "Increase your income by seeking additional sources of revenue or negotiating a higher salary.\n" +
                         "Work on improving your credit score by paying bills on time, reducing debt, and checking for any errors on your credit report.\n" +
                         "Save for a larger down payment, which can help offset a lower credit score or income.";
            } else if (income < 50000) {
                reason = "Your income is below the required minimum.";
                action = "To improve your chances of qualifying for a home loan, you can consider taking the following steps:\n" +
                         "Increase your income by seeking additional sources of revenue or negotiating a higher salary.\n" +
                         "Reduce your debt-to-income ratio by paying off existing debts or consolidating loans.\n" +
                         "Save for a larger down payment, which can help offset a lower income.";
            } else if (creditScore < 700) {
                reason = "Your credit score is below the required minimum.";
                action = "To improve your credit score and increase your chances of qualifying for a home loan, you can consider taking the following steps:\n" +
                         "Pay bills on time to establish a positive payment history.\n" +
                         "Reduce credit card balances to lower your credit utilization ratio.\n" +
                         "Check your credit report for errors and dispute any inaccuracies with credit bureaus.\n" +
                         "Avoid opening new credit accounts or closing existing ones, as this can impact your credit score.";
            }
        }
    } else if (type === "auto") {
        if (income >= 30000 && creditScore >= 650) {
            eligible = true;
        } else {
            if (income < 30000 && creditScore < 650) {
                reason = "Your income and credit score are below the required minimum.";
                action = "To improve your chances of qualifying for an auto loan, you can consider taking the following steps:\n" +
                         "Increase your income by seeking additional sources of revenue or negotiating a higher salary.\n" +
                         "Work on improving your credit score by paying bills on time, reducing debt, and checking for any errors on your credit report.\n" +
                         "Consider a less expensive vehicle or save for a larger down payment.";
            } else if (income < 30000) {
                reason = "Your income is below the required minimum.";
                action = "To improve your chances of qualifying for an auto loan, you can consider taking the following steps:\n" +
                         "Increase your income by seeking additional sources of revenue or negotiating a higher salary.\n" +
                         "Reduce your debt-to-income ratio by paying off existing debts or consolidating loans.\n" +
                         "Consider a less expensive vehicle or save for a larger down payment.";
            } else if (creditScore < 650) {
                reason = "Your credit score is below the required minimum.";
                action = "To improve your credit score and increase your chances of qualifying for an auto loan, you can consider taking the following steps:\n" +
                         "Pay bills on time to establish a positive payment history.\n" +
                         "Reduce credit card balances to lower your credit utilization ratio.\n" +
                         "Check your credit report for errors and dispute any inaccuracies with credit bureaus.\n" +
                         "Avoid opening new credit accounts or closing existing ones, as this can impact your credit score.";
            }
        }
    } else if (type === "education") {
        if (income >= 20000 && creditScore >= 600) {
            eligible = true;
        } else {
            if (income < 20000 && creditScore < 600) {
                reason = "Your income and credit score are below the required minimum.";
                action = "To improve your chances of qualifying for an education loan, you can consider taking the following steps:\n" +
                         "Increase your income by seeking part-time work, internships, or other employment opportunities.\n" +
                         "Look for scholarships, grants, or other financial aid options to supplement your income.\n" +
                         "Work on improving your credit score by paying bills on time, reducing debt, and checking for any errors on your credit report.";
            } else if (income < 20000) {
                reason = "Your income is below the required minimum.";
                action = "To improve your chances of qualifying for an education loan, you can consider taking the following steps:\n" +
                         "Increase your income by seeking part-time work, internships, or other employment opportunities.\n" +
                         "Look for scholarships, grants, or other financial aid options to supplement your income.";
            } else if (creditScore < 600) {
                reason = "Your credit score is below the required minimum.";
                action = "To improve your credit score and increase your chances of qualifying for an education loan, you can consider taking the following steps:\n" +
                         "Pay bills on time to establish a positive payment history.\n" +
                         "Reduce credit card balances to lower your credit utilization ratio.\n" +
                         "Check your credit report for errors and dispute any inaccuracies with credit bureaus.";
            }
        }
    } else if (type === "business") {
        if (income >= 60000 && creditScore >= 720) {
            eligible = true;
        } else {
            if (income < 60000 && creditScore < 720) {
                reason = "Your income and credit score are below the required minimum.";
                action = "To improve your chances of qualifying for a business loan, you can consider taking the following steps:\n" +
                         "Increase your business revenue by expanding your customer base, offering new products or services, or increasing marketing efforts.\n" +
                         "Work on improving your credit score by paying bills on time, reducing debt, and checking for any errors on your credit report.\n" +
                         "Explore alternative financing options such as lines of credit, small business loans, or crowdfunding.";
            } else if (income < 60000) {
                reason = "Your income is below the required minimum.";
                action = "To improve your chances of qualifying for a business loan, you can consider taking the following steps:\n" +
                         "Increase your business revenue by expanding your customer base, offering new products or services, or increasing marketing efforts.\n" +
                         "Explore alternative financing options such as lines of credit, small business loans, or crowdfunding.";
            } else if (creditScore < 720) {
                reason = "Your credit score is below the required minimum.";
                action = "To improve your credit score and increase your chances of qualifying for a business loan, you can consider taking the following steps:\n" +
                         "Pay bills on time to establish a positive payment history.\n" +
                         "Reduce credit card balances to lower your credit utilization ratio.\n" +
                         "Check your credit report for errors and dispute any inaccuracies with credit bureaus.\n" +
                         "Explore alternative financing options such as lines of credit, small business loans, or crowdfunding.";
            }
        }
    }

    return { eligible: eligible, reason: reason, action: action };
}
