// Function to fetch and display sentiment analysis
function fetchAndDisplaySentiment(category) {
    fetch(`/api/sentiment/${category}`)
        .then(response => response.json())
        .then(data => {
            const sentimentDisplay = document.getElementById('sentimentDisplay');
            if (!sentimentDisplay) {
                console.error('Sentiment display element not found');
                return;
            }

            let averageSentimentDisplay = 'No reviews yet';
            if (data.averageSentiment !== null) {
                averageSentimentDisplay = data.averageSentiment.toFixed(2);
            }
            let sentimentSummaryDisplay = data.sentimentSummary || 'No reviews yet';
            sentimentDisplay.innerHTML = `
                <p>Category: ${data.category}</p>
                <p>Average Sentiment: ${averageSentimentDisplay}</p>
                <p>Summary: ${sentimentSummaryDisplay}</p>
                <p>Number of Reviews: ${data.reviewCount}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching sentiment analysis:', error);
            alert('Error fetching sentiment analysis');
        });
}

// Function to fetch and display reviews based on the selected category
function fetchAndDisplayReviews(category) {
    fetch(`/api/reviews/${category}`)
        .then(response => response.json())
        .then(data => {
            const reviewsList = document.getElementById('reviewsList');
            if (!reviewsList) {
                console.error('Reviews list element not found');
                return;
            }

            reviewsList.innerHTML = ''; // Clear existing reviews
            data.forEach(review => {
                addReviewToList(review.userId.email, review.category, review.review);
            });
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
            alert('Error fetching reviews');
        });
}

// Add the definition of addReviewToList function if not already defined
function addReviewToList(email, category, review) {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) {
        console.error('Reviews list element not found');
        return;
    }

    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    reviewItem.innerHTML = `
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Review:</strong> ${review}</p>
    `;
    reviewsList.appendChild(reviewItem);
}

// Attach event listener for submitting reviews
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = sessionStorage.getItem('username'); // Assuming username is stored in session storage
    const category = document.getElementById('category').value;
    const review = document.getElementById('review').value;

    if (email && category && review) {
        fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, category, review })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server responded with an error');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response:', data); // Log the response for debugging
            if (data.message === 'Review added successfully') {
                alert('Review submitted successfully');
                addReviewToList(email, category, review); // Call the addReviewToList function
                document.getElementById('reviewForm').reset();
                fetchAndDisplayReviews(category); // Refresh reviews after submitting
                fetchAndDisplaySentiment(category); // Refresh sentiment analysis after submitting
            } else {
                throw new Error('Unexpected response from server');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error submitting review');
        });
    } else {
        alert('Please fill out all fields before submitting');
    }
});

// Attach event listener to the category dropdown to fetch reviews and sentiment on change
document.getElementById('category').addEventListener('change', function() {
    const category = this.value;
    fetchAndDisplayReviews(category);
    fetchAndDisplaySentiment(category);
});

// Initial fetch of reviews and sentiment based on the default category
window.onload = function() {
    const category = document.getElementById('category').value;
    fetchAndDisplayReviews(category);
    fetchAndDisplaySentiment(category);
}
