let studentData = [];

// Fetch student data from JSON file
fetch('results.json')
    .then(response => response.json())
    .then(data => {
        studentData = data.students;
    })
    .catch(error => {
        console.error('Error loading student data:', error);
    });

function searchResults() {
    const studentID = parseInt(document.getElementById('studentID').value);
    
    const student = studentData.find(s => s.slNo === studentID);
    
    if (student) {
        document.getElementById('student-name').innerText = `Student Name: ${student.name}`;
        
        // Set Part A Results (Languages)
        setLanguageResult('kannada', student.marks.kannada);
        setLanguageResult('english', student.marks.english);
        
        // Set Part B Results (Core Subjects)
        setCoreSubjectResult('physics', student.marks.physics);
        setCoreSubjectResult('chemistry', student.marks.chemistry);
        setCoreSubjectResult('mathematics', student.marks.mathematics);
        setCoreSubjectResult('biology', student.marks.biology);
        
        // Calculate totals
        const partATotal = student.marks.kannada.theory + student.marks.english.theory;
        const partBTotal = calculatePartBTotal(student.marks);
        const grandTotal = partATotal + partBTotal;
        
        document.getElementById('partA-total').innerText = partATotal;
        document.getElementById('partB-total').innerText = partBTotal;
        document.getElementById('grand-total').innerText = grandTotal;
        
        let finalResult;
        if (grandTotal >= 510) finalResult = "Distinction";
        else if (grandTotal >= 350) finalResult = "First Class";
        else if (grandTotal >= 250) finalResult = "Second Class";
        else finalResult = "Fail";
        
        document.getElementById('final-result').innerText = finalResult;
        document.getElementById('result-section').style.display = 'block';
    } else {
        alert("No results found for the given Student ID.");
        document.getElementById('result-section').style.display = 'none';
    }
}

function setLanguageResult(subject, marks) {
    document.getElementById(`${subject}-theory`).innerText = marks.theory;
    document.getElementById(`${subject}-practical`).innerText = '-';
    document.getElementById(`${subject}-result`).innerText = marks.theory >= 35 ? "Pass" : "Fail";
}

function setCoreSubjectResult(subject, marks) {
    document.getElementById(`${subject}-theory`).innerText = marks.theory;
    
    if (subject === 'mathematics') {
        document.getElementById(`${subject}-practical`).innerText = '-';
        document.getElementById(`${subject}-total`).innerText = marks.theory;
        document.getElementById(`${subject}-result`).innerText = marks.theory >= 35 ? "Pass" : "Fail";
    } else {
        document.getElementById(`${subject}-practical`).innerText = marks.practical;
        const total = marks.theory + marks.practical;
        document.getElementById(`${subject}-total`).innerText = total;
        document.getElementById(`${subject}-result`).innerText = total >= 35 ? "Pass" : "Fail";
    }
}

function calculatePartBTotal(marks) {
    return (marks.physics.theory + marks.physics.practical) +
           (marks.chemistry.theory + marks.chemistry.practical) +
           marks.mathematics.theory +
           (marks.biology.theory + marks.biology.practical);
}

function printMarksheet() {
    window.print();
}
