function calculateProfit() {
    let chickens = Number(document.getElementById("chickens").value);
    let chickPrice = Number(document.getElementById("chickPrice").value);
    let feedCost = Number(document.getElementById("feedCost").value);
    let medicineCost = Number(document.getElementById("medicineCost").value);
    let otherCost = Number(document.getElementById("otherCost").value);
    let mortality = Number(document.getElementById("mortality").value);
    let sellingPrice = Number(document.getElementById("sellingPrice").value);

    let chickCost = chickens * chickPrice;

    let deaths = Math.round(chickens * mortality / 100);

    let chickensSold = chickens - deaths;

    let totalCost =
        chickCost +
        feedCost +
        medicineCost +
        otherCost;

    let revenue = chickensSold * sellingPrice;

    let profit = revenue - totalCost;

    let profitPerChicken =
        chickensSold > 0
            ? profit / chickensSold
            : 0;

    let breakEvenPrice =
        chickensSold > 0
            ? totalCost / chickensSold
            : 0;

    function money(amount) {
        return "₦" + amount.toLocaleString("en-NG", {
            maximumFractionDigits: 2
        });
    }

    document.getElementById("result").innerHTML = `
        <div class="result-box">
            <span>🐣 Chick Cost</span>
            <strong>${money(chickCost)}</strong>
        </div>

        <div class="result-box">
            <span>💀 Expected Deaths</span>
            <strong>${deaths}</strong>
        </div>

        <div class="result-box">
            <span>🐔 Expected Chickens Sold</span>
            <strong>${chickensSold}</strong>
        </div>

        <div class="result-box">
            <span>💵 Total Cost</span>
            <strong>${money(totalCost)}</strong>
        </div>

        <div class="result-box">
            <span>💰 Expected Revenue</span>
            <strong>${money(revenue)}</strong>
        </div>

        <div class="result-box profit">
            <span>📈 Profit / Loss</span>
            <strong>${money(profit)}</strong>
        </div>

        <div class="result-box">
            <span>🐔 Profit per Chicken</span>
            <strong>${money(profitPerChicken)}</strong>
        </div>

        <div class="result-box">
            <span>⚖️ Break-even Price per Chicken</span>
            <strong>${money(breakEvenPrice)}</strong>
        </div>
    `;
}


function resetCalculator() {
    document.getElementById("chickens").value = 20;
    document.getElementById("chickPrice").value = 1500;
    document.getElementById("feedCost").value = 21000;
    document.getElementById("medicineCost").value = 5000;
    document.getElementById("otherCost").value = 0;
    document.getElementById("mortality").value = 0;
    document.getElementById("sellingPrice").value = 5000;

    calculateProfit();
}


function calculateFeed() {
    let chickens = Number(
        document.getElementById("feedChickens").value
    );

    let feedPerChicken = Number(
        document.getElementById("feedPerChicken").value
    );

    let days = Number(
        document.getElementById("feedDays").value
    );

    let dailyFeed = chickens * feedPerChicken;

    let totalFeedGrams = dailyFeed * days;

    let totalFeedKg = totalFeedGrams / 1000;

    document.getElementById("feedResult").innerHTML = `
        <div class="result-box">
            <span>🐔 Chickens</span>
            <strong>${chickens}</strong>
        </div>

        <div class="result-box">
            <span>🌾 Feed Needed Per Day</span>
            <strong>${dailyFeed.toLocaleString()} grams</strong>
        </div>

        <div class="result-box">
            <span>📅 Number of Days</span>
            <strong>${days} days</strong>
        </div>

        <div class="result-box profit">
            <span>🌾 Total Feed Required</span>
            <strong>${totalFeedKg.toLocaleString("en-NG", {
                maximumFractionDigits: 2
            })} kg</strong>
        </div>
    `;
}


/* =========================
   FARM RECORDS
========================= */

let farmRecords =
    JSON.parse(localStorage.getItem("farmRecords")) || [];


function addRecord() {

    let date = document.getElementById("recordDate").value;
    let chickens = Number(
        document.getElementById("recordChickens").value
    );
    let eggs = Number(
        document.getElementById("eggsCollected").value
    );
    let feed = Number(
        document.getElementById("feedUsed").value
    );
    let medicine = Number(
        document.getElementById("medicineExpense").value
    );
    let sales = Number(
        document.getElementById("sales").value
    );


    if (!date) {
        alert("Please select a date.");
        return;
    }

    if (
        chickens < 0 ||
        eggs < 0 ||
        feed < 0 ||
        medicine < 0 ||
        sales < 0
    ) {
        alert("Please enter valid numbers.");
        return;
    }
const record = {
    id: Date.now(),
    date: date,
    chickens: chickens,
    eggs: eggs,
    feed: feed,
    medicine: medicine,
    sales: sales
};
    farmRecords.push(record);

    localStorage.setItem(
        "farmRecords",
        JSON.stringify(farmRecords)
    );


    document.getElementById("recordDate").value = "";
    document.getElementById("recordChickens").value = "";
    document.getElementById("eggsCollected").value = "";
    document.getElementById("feedUsed").value = "";
    document.getElementById("medicineExpense").value = "";
    document.getElementById("sales").value = "";


    displayRecords();
}


function displayRecords() {

    let recordsList =
        document.getElementById("recordsList");

    recordsList.innerHTML = "";


    if (farmRecords.length === 0) {

        recordsList.innerHTML = `
            <div class="record-item">
                <p>No farm records yet.</p>
            </div>
        `;

        updateSummary();
        return;
    }


    farmRecords.forEach(function(record, index) {

        recordsList.innerHTML += `
            <div class="record-item">

                <h3>📅 ${record.date}</h3>

                <p>
                    🐔 Chickens:
                    <strong>${record.chickens}</strong>
                </p>

                <p>
                    🥚 Eggs:
                    <strong>${record.eggs}</strong>
                </p>

                <p>
                    🌾 Feed:
                    <strong>${record.feed} kg</strong>
                </p>

                <p>
                    💊 Medicine:
                    <strong>₦${record.medicine.toLocaleString()}</strong>
                </p>

                <p>
                    💰 Sales:
                    <strong>₦${record.sales.toLocaleString()}</strong>
                </p>

                <button
                    class="delete-button"
                    onclick="deleteRecord(${index})">
                    🗑️ Delete
                </button>

            </div>
        `;
    });


    updateSummary();
}


function updateSummary() {

    let totalChickens = 0;
    let totalEggs = 0;
    let totalFeed = 0;
    let totalMedicine = 0;
    let totalSales = 0;


    farmRecords.forEach(function(record) {

        totalChickens += record.chickens;
        totalEggs += record.eggs;
        totalFeed += record.feed;
        totalMedicine += record.medicine;
        totalSales += record.sales;

    });


    let netBalance =
        totalSales - totalMedicine;


    document.getElementById("totalChickens").textContent =
        totalChickens;

    document.getElementById("totalEggs").textContent =
        totalEggs;

    document.getElementById("totalFeed").textContent =
        totalFeed.toLocaleString("en-NG") + " kg";

    document.getElementById("totalMedicine").textContent =
        "₦" + totalMedicine.toLocaleString("en-NG");

    document.getElementById("totalSales").textContent =
        "₦" + totalSales.toLocaleString("en-NG");

    document.getElementById("netBalance").textContent =
        "₦" + netBalance.toLocaleString("en-NG");
}


function deleteRecord(index) {

    if (confirm("Delete this farm record?")) {

        farmRecords.splice(index, 1);

        localStorage.setItem(
            "farmRecords",
            JSON.stringify(farmRecords)
        );

        displayRecords();
    }
}


function clearRecords() {

    if (farmRecords.length === 0) {
        alert("There are no records to clear.");
        return;
    }


    if (confirm("Are you sure you want to delete ALL farm records?")) {

        farmRecords = [];

        localStorage.removeItem("farmRecords");

        displayRecords();
    }
}


/* =========================
   NAVIGATION
========================= */

function showHome() {
    document.getElementById("home").scrollIntoView({
        behavior: "smooth"
    });
}


function showCalculator() {
    document.getElementById("profitCalculator").scrollIntoView({
        behavior: "smooth"
    });
}


function showFeedCalculator() {
    document.getElementById("feedCalculator").scrollIntoView({
        behavior: "smooth"
    });
}


function showPoultryHealth() {
    document.getElementById("poultryHealth").scrollIntoView({
        behavior: "smooth"
    });
}


function showRecords() {
    document.getElementById("records").scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================
   START WEBSITE
========================= */



function updateDashboard() {
    let totalChickens = 0;
    let totalEggs = 0;
    let totalFeed = 0;
    let farmMedicine = 0;
    let farmSales = 0;
    let financeIncome = 0;
    let financeExpenses = 0;

    farmRecords.forEach(function(record) {
        totalChickens += Number(record.chickens) || 0;
        totalEggs += Number(record.eggs) || 0;
        totalFeed += Number(record.feed) || 0;
        farmMedicine += Number(record.medicine) || 0;
        farmSales += Number(record.sales) || 0;
    });

    financeRecords.forEach(function(record) {
        const amount = Number(record.amount) || 0;

        if (record.type === "income") {
            financeIncome += amount;
        } else {
            financeExpenses += amount;
        }
    });

    const totalSales = farmSales + financeIncome;
    const totalExpenses = farmMedicine + financeExpenses;
    const netBalance = totalSales - totalExpenses;

    document.getElementById("dashboardChickens").textContent =
        totalChickens.toLocaleString("en-NG");

    document.getElementById("dashboardEggs").textContent =
        totalEggs.toLocaleString("en-NG");

    document.getElementById("dashboardFeed").textContent =
        totalFeed.toLocaleString("en-NG") + " kg";

    document.getElementById("dashboardSales").textContent =
        "₦" + totalSales.toLocaleString("en-NG");

    document.getElementById("dashboardMedicine").textContent =
        "₦" + totalExpenses.toLocaleString("en-NG");

    document.getElementById("dashboardBalance").textContent =
        "₦" + netBalance.toLocaleString("en-NG");

    document.getElementById("dashboardRecords").textContent =
        farmRecords.length;

    const chartCanvas = document.getElementById("farmPerformanceChart");

    if (typeof Chart !== "undefined" && chartCanvas) {
        if (window.farmPerformanceChart) {
            window.farmPerformanceChart.destroy();
        }

        window.farmPerformanceChart = new Chart(chartCanvas, {
            type: "bar",
            data: {
                labels: ["Sales", "Expenses"],
                datasets: [{
                    label: "Amount (₦)",
                    data: [totalSales, totalExpenses],
                    backgroundColor: ["#2e9d63", "#e67e22"]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}


function showDashboard() {

    document.getElementById("dashboard").scrollIntoView({
        behavior: "smooth"
    });

}


let financeRecords = JSON.parse(localStorage.getItem("financeRecords")) || [];

let healthRecords = JSON.parse(localStorage.getItem("healthRecords")) || [];

calculateProfit();
calculateFeed();
displayRecords();
updateDashboard();

function addFinance() {
    const type = document.getElementById("financeType").value;
    const category = document.getElementById("financeCategory").value;
    const amount = Number(document.getElementById("financeAmount").value);
    const description = document.getElementById("financeDescription").value;

const date = document.getElementById("financeDate").value || new Date().toISOString().split("T")[0];

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const record = {
        id: Date.now(),
        type: type,
        category: category,
        amount: amount,
        description: description,
              date: date
    };

function filterFinance() {
    const search = document.getElementById("financeSearch").value.toLowerCase();
    const typeFilter = document.getElementById("financeFilterType").value;
    const categoryFilter = document.getElementById("financeFilterCategory").value;

    const list = document.getElementById("financeList");

    list.innerHTML = "";

    const filteredRecords = financeRecords.filter(record => {
        const matchesSearch =
            record.description.toLowerCase().includes(search);

        const matchesType =
            typeFilter === "all" || record.type === typeFilter;

        const matchesCategory =
            categoryFilter === "all" || record.category === categoryFilter;

        return matchesSearch && matchesType && matchesCategory;
    });

    filteredRecords.forEach(record => {
        const item = document.createElement("div");
        item.className = "record-item";

        item.innerHTML = `
            <h3>${record.type === "income" ? "💰 Income" : "💸 Expense"}</h3>
            <p>📅 Date: ${record.date}</p>
            <p>📂 Category: ${record.category}</p>
            <p>💵 Amount: ₦${record.amount.toLocaleString("en-NG")}</p>
            <p>📝 ${record.description || "No description"}</p>
            <button class="delete-button" onclick="deleteFinance(${record.id})">
                🗑️ Delete
            </button>
        `;

        list.appendChild(item);
    });
}
    financeRecords.push(record);
    localStorage.setItem("financeRecords", JSON.stringify(financeRecords));

    document.getElementById("financeAmount").value = "";
    document.getElementById("financeDescription").value = "";

    displayFinance();
}

function displayFinance() {
    const list = document.getElementById("financeList");

    if (!list) return;

    list.innerHTML = "";

    let income = 0;
    let expenses = 0;

    financeRecords.forEach(record => {
        if (record.type === "income") {
            income += record.amount;
        } else {
            expenses += record.amount;
        }

        const item = document.createElement("div");
        item.className = "record-item";

        item.innerHTML = `
            <h3>${record.type === "income" ? "💰 Income" : "💸 Expense"}</h3>
            <p>📅 Date: ${record.date}</p>
            <p>📂 Category: ${record.category}</p>
            <p>💵 Amount: ₦${record.amount.toLocaleString("en-NG")}</p>
            <p>📝 ${record.description || "No description"}</p>
            <button class="delete-button" onclick="deleteFinance(${record.id})">
                🗑️ Delete
            </button>
        `;

        list.appendChild(item);
    });

    document.getElementById("totalIncome").textContent =
        "₦" + income.toLocaleString("en-NG");

    document.getElementById("totalExpenses").textContent =
        "₦" + expenses.toLocaleString("en-NG");

    document.getElementById("financeBalance").textContent =
        "₦" + (income - expenses).toLocaleString("en-NG");
    document.getElementById("financeTransactions").textContent = financeRecords.length;

    document.getElementById("reportIncome").textContent =
        "₦" + income.toLocaleString("en-NG");

    document.getElementById("reportExpenses").textContent =
        "₦" + expenses.toLocaleString("en-NG");

    document.getElementById("reportProfit").textContent =
        "₦" + (income - expenses).toLocaleString("en-NG");

    drawFinanceChart();
}

function downloadFinancePDF() {
    let income = 0;
    let expenses = 0;

    financeRecords.forEach(record => {
        if (record.type === "income") {
            income += Number(record.amount);
        } else {
            expenses += Number(record.amount);
        }
    });

    const profit = income - expenses;

    const reportWindow = window.open("", "_blank");

    if (!reportWindow) {
        alert("Please allow pop-ups to download your report.");
        return;
    }

    const rows = financeRecords.map(record => `
        <tr>
            <td>${record.date || ""}</td>
            <td>${record.type}</td>
            <td>${record.category}</td>
            <td>${record.description || ""}</td>
            <td>₦${Number(record.amount).toLocaleString("en-NG")}</td>
        </tr>
    `).join("");

    reportWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>A&F Poultry Farm Finance Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    color: #222;
                }
                h1, h2 {
                    color: #176b3a;
                    text-align: center;
                }
                .summary {
                    margin: 20px 0;
                    padding: 12px;
                    border: 1px solid #ccc;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ccc;
                    padding: 8px;
                    text-align: left;
                    overflow-wrap: anywhere;
                }
                th {
                    background: #176b3a;
                    color: white;
                }
                @media print {
                    button { display: none; }
                }
            </style>
        </head>
        <body>
            <h1>A&F Poultry Farm</h1>
            <h2>Finance Report</h2>

            <div class="summary">
                <p><strong>Total Income:</strong>
                    ₦${income.toLocaleString("en-NG")}</p>
                <p><strong>Total Expenses:</strong>
                    ₦${expenses.toLocaleString("en-NG")}</p>
                <p><strong>Net Profit:</strong>
                    ₦${profit.toLocaleString("en-NG")}</p>
                <p><strong>Total Transactions:</strong>
                    ${financeRecords.length}</p>
            </div>

            <h2>Transaction Details</h2>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>

            <p>Report generated: ${new Date().toLocaleDateString()}</p>

            <button onclick="window.print()">Print / Save as PDF</button>
        </body>
        </html>
    `);

    reportWindow.document.close();
    reportWindow.onload = function () {
        reportWindow.print();
    };
}

function deleteFinance(id) {
    financeRecords = financeRecords.filter(record => record.id !== id);
    localStorage.setItem("financeRecords", JSON.stringify(financeRecords));
    displayFinance();
}

function drawFinanceChart() {
    const canvas = document.getElementById("financeChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const income = financeRecords
        .filter(record => record.type === "income")
        .reduce((sum, record) => sum + Number(record.amount || 0), 0);

    const expenses = financeRecords
        .filter(record => record.type !== "income")
        .reduce((sum, record) => sum + Number(record.amount || 0), 0);

    const profit = income - expenses;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "12px Arial";
    ctx.textAlign = "center";

    const values = [income, expenses, profit];
    const labels = ["Income", "Expenses", "Profit"];
    const colors = ["#176b3a", "#d9534f", "#2878b5"];
    const maxValue = Math.max(...values.map(Math.abs), 1);
    const baseline = 175;
    const chartHeight = 120;
    const barWidth = 55;
    const positions = [65, 160, 255];

    ctx.strokeStyle = "#888";
    ctx.beginPath();
    ctx.moveTo(15, baseline);
    ctx.lineTo(305, baseline);
    ctx.stroke();

    values.forEach((value, index) => {
        const barHeight = Math.abs(value) / maxValue * chartHeight;

        ctx.fillStyle = colors[index];
        ctx.fillRect(
            positions[index] - barWidth / 2,
            value >= 0 ? baseline - barHeight : baseline,
            barWidth,
            barHeight
        );

        ctx.fillStyle = "#222";
        ctx.fillText(labels[index], positions[index], 205);
        ctx.fillText(
            "₦" + Math.round(value).toLocaleString(),
            positions[index],
            value >= 0 ? Math.max(15, baseline - barHeight - 8) : baseline + barHeight + 15
        );
    });
}

function showMonthlyReport() {
    const month = document.getElementById("financeMonth").value;
    const result = document.getElementById("monthlyReportResult");

    if (!month) {
        result.innerHTML = "<p>Please select a month.</p>";
        return;
    }

    let income = 0;
    let expenses = 0;

    financeRecords.forEach(record => {
        if (record.date.startsWith(month)) {
            if (record.type === "income") {
                income += record.amount;
            } else {
                expenses += record.amount;
            }
        }
    });

    const profit = income - expenses;

    result.innerHTML = `
        <div class="report-box">
            💰 Income:
            <strong>₦${income.toLocaleString("en-NG")}</strong>
        </div>

        <div class="report-box">
            💸 Expenses:
            <strong>₦${expenses.toLocaleString("en-NG")}</strong>
        </div>

        <div class="report-box">
            📈 Profit:
            <strong>₦${profit.toLocaleString("en-NG")}</strong>
        </div>
    `;
}

function clearFinance() {
    if (confirm("Are you sure you want to clear all finance records?")) {
        financeRecords = [];

        localStorage.setItem("financeRecords", JSON.stringify(financeRecords));

        displayFinance();
    }
}

displayFinance();


function showFinance() {
    document.getElementById("finance").scrollIntoView({
        behavior: "smooth"
    });
}


// =========================
// POULTRY HEALTH RECORDS
// =========================

function showPoultryHealth() {
    document.getElementById("poultryHealth").scrollIntoView({
        behavior: "smooth"
    });
}

function displayHealthRecords() {
    const list = document.getElementById("healthRecordsList");
    if (!list) return;

    if (healthRecords.length === 0) {
        list.innerHTML = "<p>No health records saved yet.</p>";
        return;
    }

    list.innerHTML = healthRecords.map(record => `
        <div class="summary-box">
            <strong>${record.type}</strong>
            <p><b>Date:</b> ${record.date}</p>
            <p><b>Birds:</b> ${record.birds}</p>
            <p><b>Details:</b> ${record.details}</p>
            ${record.nextDate ? `<p><b>Next date:</b> ${record.nextDate}</p>` : ""}
            ${record.notes ? `<p><b>Notes:</b> ${record.notes}</p>` : ""}
            <button type="button" onclick="deleteHealthRecord('${record.id}')">
                🗑️ Delete
            </button>
        </div>
    `).join("");
}

function deleteHealthRecord(id) {
    if (!confirm("Delete this health record?")) return;

    healthRecords = healthRecords.filter(record => record.id !== id);
    localStorage.setItem("healthRecords", JSON.stringify(healthRecords));
    displayHealthRecords();
}

const healthForm = document.getElementById("healthForm");

if (healthForm) {
    document.getElementById("healthDate").value =
        new Date().toISOString().split("T")[0];

    healthForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const record = {
            id: String(Date.now()),
            date: document.getElementById("healthDate").value,
            type: document.getElementById("healthType").value,
            birds: Number(document.getElementById("healthBirds").value),
            details: document.getElementById("healthDetails").value.trim(),
            nextDate: document.getElementById("healthNextDate").value,
            notes: document.getElementById("healthNotes").value.trim()
        };

        healthRecords.push(record);
        localStorage.setItem("healthRecords", JSON.stringify(healthRecords));

        healthForm.reset();
        document.getElementById("healthDate").value =
            new Date().toISOString().split("T")[0];

        displayHealthRecords();
        alert("Health record saved successfully!");
    });
}

displayHealthRecords();

function showAuth() {
    const authSection = document.getElementById("authSection");

    if (authSection) {
        authSection.style.display = "block";
        authSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// A&F Poultry Farm — Firebase Authentication

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const authMessage = document.getElementById("authMessage");

function showAuthMessage(message) {
    if (authMessage) {
        authMessage.textContent = message;
    }
}

function getAuthError(error) {
    const code = error.code || "";

    const messages = {
        "auth/email-already-in-use": "This email already has an account. Please log in.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Please choose a stronger password.",
        "auth/invalid-credential": "Email or password is incorrect.",
        "auth/user-not-found": "No account was found. Please create an account.",
        "auth/wrong-password": "Email or password is incorrect.",
        "auth/network-request-failed": "Network error. Check your internet connection."
    };

    return messages[code] || "Something went wrong. Please try again.";
}

if (registerForm) {
    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password.length < 8) {
            showAuthMessage("Your password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            showAuthMessage("Your passwords do not match.");
            return;
        }

        if (typeof farmAuth === "undefined") {
            showAuthMessage("Firebase is not ready. Check your connection.");
            return;
        }

        try {
            showAuthMessage("Creating your account...");

            const result = await farmAuth.createUserWithEmailAndPassword(
                email,
                password
            );

            await result.user.updateProfile({
                displayName: name
            });

            showAuthMessage("Account created successfully! Welcome to A&F Poultry Farm.");
            registerForm.reset();

        } catch (error) {
            showAuthMessage(getAuthError(error));
        }
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        if (typeof farmAuth === "undefined") {
            showAuthMessage("Firebase is not ready. Check your connection.");
            return;
        }

        try {
            showAuthMessage("Logging in...");

            await farmAuth.signInWithEmailAndPassword(email, password);

            showAuthMessage("Login successful! Welcome back.");
            loginForm.reset();

        } catch (error) {
            showAuthMessage(getAuthError(error));
        }
    });
}

function showRegister() {
    document.getElementById("registerPanel").style.display = "block";
    document.getElementById("loginPanel").style.display = "none";
    showAuthMessage("");
}

function showLogin() {
    document.getElementById("registerPanel").style.display = "none";
    document.getElementById("loginPanel").style.display = "block";
    showAuthMessage("");
}

// A&F POULTRY FARM: BACKUP AND RESTORE

function downloadFarmBackup() {
    try {
        const backup = {
            app: "A&F Poultry Farm",
            version: 1,
            createdAt: new Date().toISOString(),
            farmRecords: JSON.parse(localStorage.getItem("farmRecords") || "[]"),
            financeRecords: JSON.parse(localStorage.getItem("financeRecords") || "[]"),
            healthRecords: JSON.parse(localStorage.getItem("healthRecords") || "[]")
        };

        const file = new Blob(
            [JSON.stringify(backup, null, 2)],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = "AF-Poultry-Farm-Backup-" +
            new Date().toISOString().slice(0, 10) + ".json";

        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        document.getElementById("backupMessage").textContent =
            "Backup downloaded successfully!";
    } catch (error) {
        document.getElementById("backupMessage").textContent =
            "Backup failed. Please check your saved records.";
    }
}

function restoreFarmBackup() {
    const fileInput = document.getElementById("backupFile");
    const message = document.getElementById("backupMessage");
    const file = fileInput.files[0];

    if (!file) {
        message.textContent = "Please select a backup JSON file first.";
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        try {
            const backup = JSON.parse(reader.result);

            if (
                !backup ||
                backup.app !== "A&F Poultry Farm" ||
                !Array.isArray(backup.farmRecords) ||
                !Array.isArray(backup.financeRecords) ||
                !Array.isArray(backup.healthRecords)
            ) {
                message.textContent =
                    "Invalid backup file. Your existing records were not changed.";
                return;
            }

            const confirmed = confirm(
                "Restoring this backup will replace your current farm, financial, " +
                "and health records. Download a backup of your current data first. " +
                "Do you want to continue?"
            );

            if (!confirmed) {
                message.textContent = "Restore cancelled. Your records are unchanged.";
                return;
            }

            localStorage.setItem("farmRecords", JSON.stringify(backup.farmRecords));
            localStorage.setItem("financeRecords", JSON.stringify(backup.financeRecords));
            localStorage.setItem("healthRecords", JSON.stringify(backup.healthRecords));

            message.textContent = "Backup restored successfully. Reloading website...";
            setTimeout(function () {
                location.reload();
            }, 1200);

        } catch (error) {
            message.textContent =
                "Could not read this backup file. Your records were not changed.";
        }
    };

    reader.onerror = function () {
        message.textContent = "Could not read the selected file.";
    };

    reader.readAsText(file);
}

function showBackup() {
    const section = document.getElementById("backupSection");

    if (section) {
        section.style.display = "block";
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// Register service worker for offline support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("A&F Poultry Farm service worker registered"))
      .catch(error => console.error("Service worker registration failed:", error));
  });
}
