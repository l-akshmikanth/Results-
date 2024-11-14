async function loadResults() {
    try {
        const response = await fetch('results.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading results:", error);
        return [];
    }
}

async function searchResults() {
    const studentID = document.getElementById("studentID").value.trim();
    if (!studentID) {
        alert("Please enter a Student ID");
        return;
    }

    const results = await loadResults();
    const student = results.find(result => result.student_id === studentID);

    let output = '<h4>Results:</h4>';
    if (student) {
        output += `<p>Student ID: ${student.student_id}<br>
                   Name: ${student.name}<br>
                   Score: ${student.score}</p>`;
    } else {
        output = '<p>No results found for the given Student ID.</p>';
    }

    document.getElementById("resultDisplay").innerHTML = output;
}
