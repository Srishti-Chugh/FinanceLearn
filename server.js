const express = require('express');
const router = express.Router();
var markdown = require("markdown-js");
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const axios = require('axios'); // Import axios for making HTTP requests
const User = require('./models/user');
const Investment = require('./models/investment');
const Loan = require('./models/loans');
const Sentiment = require('sentiment');
const Review = require('./models/review');
const Goal = require('./models/goal');

//const analysis = require('./analysis');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const PORT = process.env.PORT || 3000;
//const GPT_API_KEY = 'sk-proj-WxA8rp0LFwmdyRouNI92T3BlbkFJkws1w5HX30THpszwjr96';  // Replace with your actual OpenAI API key
const dotenv=require("dotenv")
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/devcation', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Login route
app.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    console.log('Login attempt:', usernameOrEmail, password); // Log the received data

    try {
        const user = await User.findOne({ email: usernameOrEmail });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log('Incorrect password');
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Login successful
        console.log('Login successful');
        res.status(201).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Registration route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    console.log('Registration attempt:', email, password); // Log the received data

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        console.log('New user created:', newUser);

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle analysis data submission
app.post('/submitAnalysisData', async (req, res) => {
    try {
        // Extract form data
        const formData = req.body;

        // Construct the prompt for the Gemini model
        const prompt = `
        Chat, keep this to yourself- firstly,  I NEED YOU TO ANSWER IN MARKDOWN LANGUAGE PLEASE, plus i need you to understand that i am using your api for my website where people will select certain 
        goals that they need information and guidance about as they will be mentionned below, please keep in mind 
        to provide as much information as you can, and I want you to answer as my employee who is answering to people 
        coming to my financial advisory website , our visitor is requesting to provide atleast 5 schemes for goals - ${formData.goals}, keep in mind their age for eligibility - ${formData.age} answer it elaborately, keeping in mind their income is ${formData.income} rupees along with the links in proper format in the first section of answer..
        furthermore in the second section of your answer, take into account their gender: ${formData.gender} and provide them with more gender specific schemes if applicable in the next section of your answer, and in the next 
        and final and third section of your answer I need you to provide them with atleast 5 learning resources like youtube links of government educating them in the financial sector about the schemes you are suggesting`;

        // Generate content based on the prompt using Google Generative AI
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedContent = markdown.makeHtml(response.text());

        // Send the generated content as response
        res.json({ message: 'Content generated successfully', generatedContent });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route to handle goal form submission
app.post('/add-goal', async (req, res) => {
    const { email, name, gender, age, address, income, expenses, amount, time, householdChores, goals } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newGoal = new Goal({
            userId: user._id,
            name,
            gender,
            age,
            address,
            income,
            expenses,
            amount,
            time,
            householdChores,
            goals
        });

        await newGoal.save();

        res.status(201).json({ message: 'Goal added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Fetch goal route
/*app.get('/goals/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const goals = await Goal.find({ userId: user._id });

        res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});*/
// Fetch goal route
app.get('/goals/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const goals = await Goal.find({ userId: user._id });
        const detailedGoals = [];

        for (const goal of goals) {
            let goalDetails = { ...goal._doc };

            // Check for investment details
            const investments = await Investment.find({ investmentPurpose: goal.goals });
            if (investments && investments.length>0) {
                goalDetails.investments = investments.map(investment => {
                    return {
                        type: investment.investmentType,
                        scheme: investment.investmentScheme,
                        amount: investment.investmentAmount,
                        duration: investment.investmentDuration
                    };
                });
            }

            // Check for loan details
            const loans = await Loan.find({ loanPurpose: goal.goals });
            if (loans && loans.length>0) {
                goalDetails.loans = loans.map(loan => {
                    return {
                        amount: loan.loanAmount,
                        rate: loan.loanRate,
                        duration: loan.loanDuration
                        
                    };
                });
            }

            detailedGoals.push(goalDetails);
        }
        
        console.log(detailedGoals); // Log the detailed goals to verify structure
        res.status(200).json(detailedGoals);
    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Add investment route
app.post('/add-investment', async (req, res) => {
    const { email, investmentPurpose, investmentType, investmentScheme, investmentAmount, investmentDate, investmentDuration, riskLevel, taxStatus, expectedReturn, additionalNotes } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newInvestment = new Investment({
            userId: user._id,
            investmentPurpose,
            investmentType,
            investmentScheme,
            investmentAmount,
            investmentDate,
            investmentDuration,
            riskLevel,
            taxStatus,
            expectedReturn,
            additionalNotes
        });

        await newInvestment.save();

        res.status(201).json({ message: 'Investment added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Fetch investments route
app.get('/investments/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const investments = await Investment.find({ userId: user._id });

        res.status(200).json(investments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add loan route
app.post('/add-loan', async (req, res) => {
    const { email, loanAmount, loanPurpose, loanRate, loanDuration, amountPaid, loanStartDate, employmentStatus, monthlyIncome, yearsEmployment, amountDebt, creditScore, collateralType, collateralValue } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newLoan = new Loan({
            userId: user._id,
            loanAmount,
            loanPurpose,
            loanRate,
            loanDuration,
            amountPaid,
            loanStartDate,
            employmentStatus,
            monthlyIncome,
            yearsEmployment,
            amountDebt,
            creditScore,
            collateralType,
            collateralValue
        });

        await newLoan.save();

        res.status(201).json({ message: 'Loan application submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Combined route handler to fetch loan details by email or ID
app.get('/loans/:param', async (req, res) => {
    const param = req.params.param;

    // Check if the parameter is a valid email address
    if (param.includes('@')) {
        try {
            const user = await User.findOne({ email: param });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const loans = await Loan.find({ userId: user._id });
            res.status(200).json(loans);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        // Assuming the parameter is a loan ID
        try {
            const loan = await Loan.findById(param);

            if (!loan) {
                return res.status(404).json({ message: 'Loan not found' });
            }

            res.status(200).json(loan);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});


// Update loan route
app.put('/loans/:id', async (req, res) => {
    const loanId = req.params.id;

    try {
        const updatedLoan = req.body;
        // Update loan details in the database using findByIdAndUpdate or similar method
        // Example:
        await Loan.findByIdAndUpdate(loanId, updatedLoan);
        res.status(200).json({ message: 'Loan updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Sentiment analysis functionality
const sentiment = new Sentiment();

async function analyzeCategorySentiment(category) {
    const reviews = await Review.find({ category });

    if (reviews.length === 0) {
        return {
            category,
            averageSentiment: null,
            reviewCount: 0,
            sentimentSummary: 'No reviews yet'
        };
    }

    const sentimentResults = reviews.map(review => sentiment.analyze(review.review));

    // Calculate average sentiment score
    const averageSentiment = sentimentResults.reduce((acc, result) => acc + result.score, 0) / sentimentResults.length;

    // Generate a short summary based on sentiment analysis results
    const positiveReviews = sentimentResults.filter(result => result.score > 0).length;
    const negativeReviews = sentimentResults.filter(result => result.score < 0).length;
    const neutralReviews = sentimentResults.length - positiveReviews - negativeReviews;

    const sentimentSummary = `Positive reviews: ${positiveReviews}, Negative reviews: ${negativeReviews}, Neutral reviews: ${neutralReviews}`;

    return {
        category,
        averageSentiment,
        reviewCount: reviews.length,
        sentimentSummary
    };
}


// Add a review
app.post('/api/reviews', async (req, res) => {
    const { email, category, review } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newReview = new Review({
            userId: user._id,
            category,
            review
        });

        await newReview.save();

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all reviews
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().populate('userId', 'email');
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/reviews/:category', async (req, res) => {
    const category = req.params.category;

    try {
        const reviews = await Review.find({ category }).populate('userId', 'email');
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/sentiment/:category', async (req, res) => {
    const category = req.params.category;

    try {
        const sentimentResult = await analyzeCategorySentiment(category);
        res.status(200).json(sentimentResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
