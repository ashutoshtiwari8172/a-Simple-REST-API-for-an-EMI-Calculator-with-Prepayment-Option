const express = require('express');
const router = express.Router();
const db = require('../models');

// Helper function to calculate EMI
function calculateEMI(loanAmount, monthlyRate, tenureMonths) {
  return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
         (Math.pow(1 + monthlyRate, tenureMonths) - 1);
}

// POST /api/calculate-emi
router.post('/calculate-emi', async (req, res) => {
  try {
    const { loan_amount, interest_rate, loan_tenure_months, prepayment_amount } = req.body;

    const monthlyRate = (interest_rate / 12) / 100;
    const emi = calculateEMI(loan_amount, monthlyRate, loan_tenure_months);

    let remaining_balance = loan_amount;

    // Handle prepayments and adjust balance and tenure
    let payments = [];
    for (let month = 1; month <= loan_tenure_months; month++) {
      const interest_paid = remaining_balance * monthlyRate;
      const principal_paid = emi - interest_paid;

      let prepayment = 0;
      if (prepayment_amount && month === 1) {
        prepayment = prepayment_amount;
        remaining_balance -= prepayment;
      }

      remaining_balance -= principal_paid;

      payments.push({
        month,
        emiPaid: emi,
        interestPaid: interest_paid,
        principalPaid: principal_paid,
        prepayment,
        remainingBalance: remaining_balance,
      });

      if (remaining_balance <= 0) break;
    }

    // Store in DB
    const loan = await db.Loan.create({
      loan_amount,
      interest_rate,
      loan_tenure_months,
      emi,
      prepayment_amount: prepayment_amount || null,
      remaining_balance,
    });

    res.status(201).json({
      loanAmount: loan_amount,
      interestRate: interest_rate,
      loanTenureMonths: loan_tenure_months,
      emi,
      prepayment: prepayment_amount,
      monthWisePayments: payments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/emis
router.get('/emis', async (req, res) => {
  try {
    const loans = await db.Loan.findAll();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/emi/:id
router.get('/emi/:id', async (req, res) => {
  try {
    const loan = await db.Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
